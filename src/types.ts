export interface Product {
  id: string;
  name: string;
  category: 'shop' | 'nursery' | 'livestock' | 'hospitality';
  description: string;
  price: number;
  unit: string;
  options?: string[];
  image?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  option?: string;
}

export interface Booking {
  type: string;
  date: string;
  guests: number;
  days: number;
  needs: string;
}
