import { cache } from 'react';
import { MetaInfo, UserAccount } from '@/types/userAccount';
import prisma from './prisma';
import { clerkPlantAppClient } from '@/server/clerkPlantAppClient';
import { UserStatus, Account } from '@prisma/client';
import { User } from '@clerk/backend';

type SafeAccount = Omit<Account, 'encSeed' | 'createdAt' | 'updatedAt' | 'id'>;

const fetchAccountFromDatabaseByAccountId = cache(async (accountId: string) => {
  console.debug('Fetching account from database...', accountId);
  return prisma.account.findUnique({
    where: {
      accountId: accountId,
      OR: [{ status: UserStatus.Active }, { status: UserStatus.Inactive }]
    },
    select: { accountId: true, userId: true, publicKey: true, status: true }
  });
});

const fetchPlantAppUserData = cache(async (id: string) => {
  console.debug('Fetching clerk user...', id);
  return clerkPlantAppClient.users.getUser(id);
});

const asUserAccount = (user: User, account: SafeAccount) => {
  const metaInfo = (user.publicMetadata as unknown as MetaInfo) ?? {};
  // being defensive
  if (!metaInfo.collectible) {
    metaInfo.collectible = [];
  }
  if (!metaInfo.stockContracts) {
    metaInfo.stockContracts = [];
  }

  return {
    email: user.emailAddresses[0].emailAddress,
    logoUrl: user.imageUrl,
    publicKey: account.publicKey,
    accountId: account.accountId,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    created: user.createdAt ?? null,
    isActive: account.status === 'Active',
    ...metaInfo
  };
};

export async function fetchUserAccountByAccountId(
  accountId: string
): Promise<UserAccount | null> {
  const account = await fetchAccountFromDatabaseByAccountId(accountId);
  if (!account) return null;

  const user = await fetchPlantAppUserData(account.userId);
  if (!user) return null;

  return asUserAccount(user, account);
}

const fetchAllAccountsFromDatabase = cache(
  async (onlyActive: boolean = false) => {
    console.debug('Fetching all accounts from database...');
    if (onlyActive) {
      return prisma.account.findMany({
        select: {
          accountId: true,
          userId: true,
          publicKey: true,
          status: true
        },
        where: { status: UserStatus.Active }
      });
    }
    return prisma.account.findMany({
      select: { accountId: true, userId: true, publicKey: true, status: true },
      where: {
        OR: [{ status: UserStatus.Active }, { status: UserStatus.Inactive }]
      }
    });
  }
);

const fetchPlantAppUserDataByManyIds = cache(async (ids: string[]) => {
  console.debug('Fetching multiple clerk users...', ids);

  const ChunkSize = 100;
  const chunks = [];

  for (let i = 0; i < ids.length; i += ChunkSize) {
    const chunk = ids.slice(i, i + ChunkSize);
    chunks.push(chunk);
  }

  const users = await Promise.all(
    chunks.map((chunk, index) =>
      clerkPlantAppClient.users.getUserList({
        userId: chunk,
        limit: 100,
        offset: index * ChunkSize
      })
    )
  );

  const userMap = new Map<string, User>();

  users
    .flatMap(({ data }) => data)
    .forEach((user) => {
      userMap.set(user.id, user);
    });
  return userMap;
});

export async function fetchAllUserAccounts({
  onlyActive = false
}: {
  onlyActive?: boolean;
}): Promise<UserAccount[]> {
  const accounts = await fetchAllAccountsFromDatabase(onlyActive);
  const users = await fetchPlantAppUserDataByManyIds(
    accounts.map(({ userId }) => userId)
  );

  const userAccounts = new Array<UserAccount>();
  for (const account of accounts) {
    const user = users.get(account.userId);
    if (user) {
      userAccounts.push(asUserAccount(user, account));
    }
  }
  return userAccounts;
}
