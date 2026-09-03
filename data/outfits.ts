import type { Outfit } from '@/types';
import { products } from './products';

type OutfitKey = string;

export const outfitMap: Record<OutfitKey, Outfit> = {
  'date_minimal': { products: [products[0], products[1], products[2]], totalPrice: 6497, deliveryEta: '38 min' },
  'date_bold': { products: [products[4], products[1], products[2], products[3]], totalPrice: 9496, deliveryEta: '42 min' },
  'party_bold': { products: [products[0], products[5], products[7], products[3]], totalPrice: 6596, deliveryEta: '35 min' },
  'party_minimal': { products: [products[6], products[1], products[7]], totalPrice: 5097, deliveryEta: '40 min' },
  'office_classic': { products: [products[4], products[1], products[2]], totalPrice: 8497, deliveryEta: '44 min' },
  'office_minimal': { products: [products[0], products[5], products[2]], totalPrice: 6297, deliveryEta: '41 min' },
  'college_casual': { products: [products[6], products[5], products[7]], totalPrice: 4497, deliveryEta: '30 min' },
  'college_streetwear': { products: [products[6], products[5], products[7], products[3]], totalPrice: 5496, deliveryEta: '32 min' },
  'casual_casual': { products: [products[6], products[5], products[7]], totalPrice: 4497, deliveryEta: '28 min' },
  'street_streetwear': { products: [products[6], products[5], products[7]], totalPrice: 4497, deliveryEta: '33 min' },
  'weekend_casual': { products: [products[6], products[5], products[7]], totalPrice: 4497, deliveryEta: '29 min' },
};

export function getOutfit(destination: string, style: string): Outfit {
  const key = `${destination}_${style}`;
  return outfitMap[key] ?? outfitMap['casual_casual'];
}
