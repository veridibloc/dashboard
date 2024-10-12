import { cache } from 'react';
import { contractsProvider } from '@/common/contractsProvider';
import {
  AuthorizedUserSelector,
  BusinessPartnerSelector
} from '@veridibloc/smart-contracts';
import { StockContractAuthorization } from '@/types/stockContractAuthorization';
import { clerkPlantAppClient } from '@/server/clerkPlantAppClient';

export const fetchStockContractLotsIds = cache(async (contractId: string) => {
  try {
    const contract = await contractsProvider
      .getStockContractService()
      .with(contractId);
    return (await contract.getAllLotIds()) || [];
  } catch (e: any) {
    console.error(`fetchStockContractLotIds ${contractId} failed`, e.message);
    return [];
  }
});

export const fetchStockContractErrors = cache(async (contractId: string) => {
  try {
    const contract = await contractsProvider
      .getStockContractService()
      .with(contractId);
    return await contract.getErrors();
  } catch (e: any) {
    console.error(`fetchStockContractErrors ${contractId} failed`, e.message);
    return [];
  }
});



export const fetchStockContractAuthorizedUsers = cache(
  async (contractId: string): Promise<StockContractAuthorization[]> => {
    try {
      const contract = await contractsProvider
        .getStockContractService()
        .with(contractId);
      const [users,partners] = await Promise.all([
        contract.getAuthorizedUsers(AuthorizedUserSelector.Authorized),
        contract.getBusinessPartners(BusinessPartnerSelector.Authorized)
      ]);
      
      const userAccountIds =  [...users, ...partners].map(({accountId}) => (accountId));
      const vbAccounts = await prisma.account.findMany({
        select: {
          userId: true,
          accountId: true
        },
        where:{
          accountId : {
            in: userAccountIds
          }
        }
      })


      const clerkUsers = await clerkPlantAppClient.users.getUserList({ userId: vbAccounts.map(({userId})=>(userId)) })

      const emailMap = new Map<string, string>();
      clerkUsers.data.forEach(user => {
        const account = vbAccounts.find(({userId})=> userId === user.id)
        if(account){
          emailMap.set(account.accountId, user.emailAddresses.length ? user.emailAddresses[0].emailAddress : '');
        }
      })

      return [
        ...users.map(u => ({level: u.active, accountId: u.accountId, type:'user', email: emailMap.get(u.accountId)??''})),
        ...partners.map(p => ({level: p.active, accountId: p.accountId, type:'partner', email: emailMap.get(p.accountId)??''}))
      ];
    } catch (e: any) {
      console.error(
        `fetchStockContractAuthorizedUsers ${contractId} failed`,
        e.message
      );
      return [];
    }
  }
);

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