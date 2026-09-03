export type VibeCategory =
  | 'DATE NIGHT'
  | 'COLLEGE'
  | 'PARTY'
  | 'OFFICE'
  | 'STREET'
  | 'CASUAL'
  | 'WEEKEND';

export type Destination = 'date' | 'party' | 'office' | 'college' | 'casual' | 'street' | 'weekend';
export type StylePreference = 'minimal' | 'bold' | 'classic' | 'streetwear' | 'casual' | 'formal';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  brand: string;
}

export interface Outfit {
  products: Product[];
  totalPrice: number;
  deliveryEta: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
}

export interface AppScreen {
  id: string;
  title: string;
  description: string;
  bgColor: string;
}

export type IntroState = 'loading' | 'intro' | 'hero';
