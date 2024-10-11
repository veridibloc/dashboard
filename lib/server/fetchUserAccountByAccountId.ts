import {cache} from 'react'
import {MetaInfo, UserAccount} from '@/types/userAccount';
import prisma from './prisma';
import { clerkPlantAppClient } from '@/server/clerkPlantAppClient';

const fetchAccountFromDatabaseByAccountId = cache( async (accountId: string) => {
    console.debug("Fetching account from database...", accountId);
    return prisma.account.findUnique({where: {accountId: accountId}})
});


const fetchPlantAppkUserData = cache( async (id: string) => {
    console.debug("Fetching clerk user...", id);
    return clerkPlantAppClient.users.getUser(id)
});

export async function fetchUserAccountByAccountId(accountId: string): Promise<UserAccount | null> {
    const account = await fetchAccountFromDatabaseByAccountId(accountId);
    if (!account) return null;

    const user = await fetchPlantAppkUserData(account.userId);
    if(!user) return null;

    const metaInfo = (user.publicMetadata as unknown as MetaInfo) ?? {};
    // being defensive
    if(!metaInfo.collectible){
        metaInfo.collectible = [];
    }
    if(!metaInfo.stockContracts){
        metaInfo.stockContracts = [];
    }

    return {
        email: user.emailAddresses[0].emailAddress,
        logoUrl: user.imageUrl,
        publicKey: account.publicKey,
        accountId: accountId,
        firstName: user.firstName ?? "",
        isActive: account.status === "Active",
        ...metaInfo,
    }
}
