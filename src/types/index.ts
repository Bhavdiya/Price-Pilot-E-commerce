
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currentPrice: number;
  stock: number;
  category: string;
  image: string;
  demand: number;
  priceHistory: PricePoint[];
  tags: string[];
}

export interface PricePoint {
  timestamp: number;
  price: number;
  reason: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  purchaseHistory: Purchase[];
  behaviorScore: number;
}

export interface Purchase {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  timestamp: number;
}

export interface PricingFactors {
  stockLevel: number;
  demandLevel: number;
  userBehavior: number;
  timeOfDay: number;
  seasonality: number;
}
