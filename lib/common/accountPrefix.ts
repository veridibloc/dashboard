export const accountPrefix = () => {
  return process.env.NEXT_PUBLIC_LEDGER_IS_TESTNET === 'true' ? 'TS' : 'S';
};