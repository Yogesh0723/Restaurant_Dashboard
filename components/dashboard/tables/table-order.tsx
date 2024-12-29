"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  category: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

interface PaymentMethod {
  type: 'cash' | 'card' | 'upi';
  details?: string;
}

export function TableOrder({ tableId, onOrderComplete }: { 
  tableId: number;
  onOrderComplete: (tableId: number) => void;
}) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch menu items",
        variant: "destructive",
      });
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems(prev => {
      const existing = prev.find(item => item._id === itemId);
      if (existing) {
        const newQuantity = existing.quantity + change;
        if (newQuantity <= 0) {
          return prev.filter(item => item._id !== itemId);
        }
        return prev.map(item =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
      }
      const menuItem = menuItems.find(item => item._id === itemId);
      if (menuItem && change > 0) {
        return [...prev, { ...menuItem, quantity: 1 }];
      }
      return prev;
    });
  };

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handlePayment = async (paymentMethod: PaymentMethod) => {
    try {
      const order = {
        tableNumber: tableId,
        items: selectedItems.map(item => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        subtotal,
        discount: discountAmount,
        total,
        status: 'completed',
        paymentMethod: paymentMethod.type,
        paymentDetails: paymentMethod.details
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (res.ok) {
        const { orderId } = await res.json();
        toast({
          title: "Success",
          description: `Order #${orderId} completed successfully`,
        });
        onOrderComplete(tableId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order",
        variant: "destructive",
      });
    }
  };

  if (showPayment) {
    return (
      <Card className="p-4 space-y-4">
        <h3 className="font-bold text-lg">Select Payment Method</h3>
        <div className="space-y-2">
          <Button 
            className="w-full" 
            onClick={() => handlePayment({ type: 'cash' })}
          >
            Cash
          </Button>
          <Button 
            className="w-full" 
            onClick={() => handlePayment({ type: 'card' })}
          >
            Card
          </Button>
          <Button 
            className="w-full" 
            onClick={() => handlePayment({ type: 'upi' })}
          >
            UPI
          </Button>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setShowPayment(false)}
          >
            Back
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="h-[300px] overflow-y-auto space-y-2">
        {filteredItems.map((item) => (
          <Card key={item._id} className="p-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleQuantityChange(item._id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span>
                {selectedItems.find(i => i._id === item._id)?.quantity || 0}
              </span>
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleQuantityChange(item._id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            min="0"
            max="100"
          />
          <span>-₹{discountAmount}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
        <div className="flex gap-2">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => onOrderComplete(tableId)}
          >
            Clear Table
          </Button>
          <Button
            className="flex-1"
            onClick={() => setShowPayment(true)}
            disabled={selectedItems.length === 0}
          >
            Settle Bill
          </Button>
        </div>
      </div>
    </Card>
  );
}