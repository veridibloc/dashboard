import { UserAccount } from '@/types/userAccount';

export type CreationData = {
  owner: Readonly<UserAccount>
  certificateContractId: string
  materialId: string
  description: string
}