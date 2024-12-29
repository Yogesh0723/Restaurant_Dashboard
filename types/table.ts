export interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    price: number;
  };
  menuItemName: string;
  menuItemCategory: string;
  quantity: number;
  price: number;
}

export interface Order {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export interface Table {
  _id: string;
  tableNumber: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrder?: Order;
  lastBill?: string;
}

export interface Bill {
  _id: string;
  kotNumber: string;
  tableNumber: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  settledAt?: string;
}