export type Category = 'All' | 'Aviator' | 'Square' | 'Round' | 'Cat-Eye' | 'Geometric' | 'Shield';

export interface Colorway {
  name: string;
  colorHex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'Aviator' | 'Square' | 'Round' | 'Cat-Eye' | 'Geometric' | 'Shield';
  frameColor: string;
  lensColor: string;
  description: string;
  details: string[];
  frameMaterial: string;
  lensType: string;
  dimensions: {
    lensWidth: number;
    bridgeWidth: number;
    templeLength: number;
  };
  polarized: boolean;
  uvProtection: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  colorways: Colorway[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColorway: Colorway;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  caseOption: 'minimalist' | 'leather';
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  method: 'card' | 'apple_pay' | 'google_pay';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingDetails: ShippingDetails;
  trackingNumber: string;
  estimatedDelivery: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  image: string;
}
