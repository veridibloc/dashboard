import { Contract } from '@signumjs/contracts';

export interface StockContractDescriptor {
  material: string;
  name: string;
  geoCoords: { lat: string; long: string };
  description: string;
  alias: string;
  ownerId: string;
}

export function getStockContractDescriptor(
  contract: Contract
): StockContractDescriptor {
  let obj: any = {};
  try {
    obj = JSON.parse(contract.description);
  } catch (e) {}
  return {
    material: obj['x-mat']?.toUpperCase() ?? '',
    geoCoords: {
      lat: obj['x-lat'] ?? '',
      long: obj['x-long'] ?? ''
    },
    description: obj['ds'] ?? '',
    name: obj['nm'] ?? '',
    alias: obj['al'] ?? '',
    ownerId: obj['ac'] ?? ''
  };
}
