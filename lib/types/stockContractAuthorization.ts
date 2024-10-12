export interface StockContractAuthorization {
  type: 'user' | 'partner' | string,
  level: number,
  accountId: string,
  email: string,
}