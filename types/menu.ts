export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'main' | 'desserts' | 'beverages' | 'breakfast';
  type: 'veg' | 'non-veg';
  imageUrl?: string;
  isAvailable: boolean;
}

export type MenuFilter = {
  category?: string;
  type?: 'veg' | 'non-veg';
};