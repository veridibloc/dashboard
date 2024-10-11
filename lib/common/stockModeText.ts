import { StockModeType } from '@veridibloc/smart-contracts';

export function stockModeText(mode: StockModeType) {
  return {
    L: "Lot",
    W: "Weight",
    LW: "Weight Per Lot"
  }[mode] ?? "unknown"
}