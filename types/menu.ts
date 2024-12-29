export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'starter' | 'main' | 'dessert' | 'beverage';
  imageUrl?: string;
  isAvailable: boolean;
}