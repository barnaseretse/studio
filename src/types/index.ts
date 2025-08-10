export interface User {
  uid: string;
  email: string | null;
  fullName: string;
  role: 'Buyer' | 'Supplier';
}

export interface Product {
  id: string;
  name: string;
  category: 'Fresh Produce' | 'Bakery' | 'Dairy & Eggs' | 'Meats';
  price: number;
  unit: string;
  supplier: string;
  imageUrl: string;
  aiHint: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  address: string;
}