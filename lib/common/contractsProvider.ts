import {
  CertificateContract,
  CertificateContractService,
  CollectorTokenContractService, StockContract,
  StockContractService
} from '@veridibloc/smart-contracts';
import { Ledger } from '@signumjs/core';
import { Amount } from '@signumjs/util';
import { getEnv } from './getEnv';
import { getLedgerClient } from './getLedgerClient';
import { Contract } from '@signumjs/contracts';

const envAsArray = (envValue:string = "") => envValue.split(',');

export class ContractsProvider {
  constructor(private _ledger: Ledger) {
  }

  get ledger() {
    return this._ledger;
  }

  fetchCertificateTokenContract(contractId: string) {
    return this.getCertificateTokenContractService().with(contractId);
  }

  getCertificateTokenContractService() {
    return new CertificateContractService({
      ledger: this.ledger,
      activationCosts: Amount.fromSigna(0.25),
      baseTransactionFee: Amount.fromSigna(0.01),
      // we don't need the reference nor hash, as we do not create contracts
      codeHash: '',
      reference: ''
    });
  }

  getCollectorTokenContractService() {
    return new CollectorTokenContractService({
      ledger: this.ledger,
      activationCosts: Amount.fromSigna(0.5),
      baseTransactionFee: Amount.fromSigna(0.01)
    });
  }

  getCollectorTokenContractSingleton() {
    return this.getCollectorTokenContractService().with(getEnv('NEXT_PUBLIC_VERICLEAN_TOKEN_CONTRACT'));
  }


  getStockContractService() {
    return new StockContractService({
      ledger: this.ledger,
      activationCosts: Amount.fromSigna(1.0),
      baseTransactionFee: Amount.fromSigna(0.01),
      // we don't need the reference nor hash, as we do not create contracts
      reference: '',
      codeHash: ''
    });
  }

  toStockContract(contract: Contract) : StockContract {
    if(!envAsArray(process.env.NEXT_PUBLIC_STOCK_CONTRACT_HASH_CODES).includes(contract.machineCodeHashId)){
      throw new Error("Contract is not a Stock Contract (Hashcode not supported).");
    }
    const stockContract = new StockContract({
      ledger: this.ledger,
      activationCosts: Amount.fromPlanck(contract.minActivation),
      codeHash: contract.machineCodeHashId,
      baseTransactionFee: Amount.Zero()
    })
    stockContract.setContract(contract);
    return stockContract;
  }

  toCertContract(contract: Contract) : CertificateContract {
    if(!envAsArray(process.env.NEXT_PUBLIC_CERT_CONTRACT_HASH_CODES).includes(contract.machineCodeHashId)){
      throw new Error("Contract is not a Certificate Contract (Hashcode not supported).");
    }
    const certificateContract = new CertificateContract({
      ledger: this.ledger,
      activationCosts: Amount.fromPlanck(contract.minActivation),
      codeHash: contract.machineCodeHashId,
      baseTransactionFee: Amount.Zero()
    })
    certificateContract.setContract(contract);
    return certificateContract;
  }

  async fetchStockContract(contractId: string) {
    const contract = await this.getStockContractService().with(contractId);
    const contractCreatorId = process.env.NEXT_PUBLIC_CONTRACTS_CREATOR_ID || '';
    if (contract.contract.creator !== process.env.NEXT_PUBLIC_CONTRACTS_CREATOR_ID) {
      throw new Error(`Contract Id (${contractId}) is not created by VeridiBloc! Expected (id: ${contractCreatorId}), but got (id: ${contract.contract.creator})`);
    }
    return contract;
  }

  async getLotDetails(contractId: string, lotId: string) {
    const stockContract = await this.fetchStockContract(contractId);
    return stockContract.getLotData(lotId);
  }

  async getLotReceiptData(contractId: string, lotId: string) {
    const stockContract = await this.fetchStockContract(contractId);
    return stockContract.getSingleLotReceipt(lotId);
  }

  getManyStockContracts(contractIds: string[]) {
    const service = this.getStockContractService();
    const contractRequests = contractIds.map(id => service.with(id));
    return Promise.all(contractRequests);
  }

  async getAllCertificateContracts() {
    return this.getContractsPerHashcodes(envAsArray(process.env.NEXT_PUBLIC_CERT_CONTRACT_HASH_CODES));
  }

  async getAllStockContracts() {
    return this.getContractsPerHashcodes(envAsArray(process.env.NEXT_PUBLIC_STOCK_CONTRACT_HASH_CODES));
  }

  async getContractsPerHashcodes(hashCodes: string[]) {
    const contractCreatorId = process.env.NEXT_PUBLIC_CONTRACTS_CREATOR_ID || '';
    const contracts = await Promise.all(hashCodes.map(hashCode => this.ledger.contract.getAllContractsByCodeHash({
      machineCodeHash: hashCode,
      includeDetails: true
    })));
    return contracts.flatMap(c => c.ats).filter(c => c.creator === contractCreatorId);
  }
}

export const contractsProvider = new ContractsProvider(getLedgerClient());


