import { cache } from 'react';
import { contractsProvider } from '@/common/contractsProvider';


export const fetchStockContractErrors = cache(async (contractId: string) => {
  try {
    const contract =  await contractsProvider.getStockContractService().with(contractId);
    return contract.getErrors();
  } catch (e: any) {
    console.error(`fetchStockContractErrors ${contractId} failed`, e.message);
    return [];
  }
});


export const fetchSingleContract = cache(async (id: string) => {
  try {
    return await contractsProvider.ledger.contract.getContract(id);
  } catch (e: any) {
    console.error(`fetchContract ${id} failed`, e.message);
    return null;
  }
});

export const fetchAllContracts = cache(async () => {
  try {
    const [stockContracts, certificateContracts] = await Promise.all([
      contractsProvider.getAllStockContracts(),
      contractsProvider.getAllCertificateContracts()
    ]);
    return {
      stockContracts,
      certificateContracts
    };
  } catch (e: any) {
    console.error('fetchContracts failed', e.message);
    return {
      stockContracts: [],
      certificateContracts: []
    };
  }
});