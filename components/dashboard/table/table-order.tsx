'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, OrderItem } from '@/types/table';
import { MenuItem } from '@/types/menu';
import { MenuSearch } from './menu-search';
import { PaymentModal } from './payment-modal';
import { toast } from 'sonner';

interface TableOrderProps {
  table: Table;
  onUpdate: () => void;
}

export function TableOrder({ table, onUpdate }: TableOrderProps) {
  const [items, setItems] = useState<OrderItem[]>(table.currentOrder?.items || []);
  const [discount, setDiscount] = useState(table.currentOrder?.discount || 0);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return {
      subtotal,
      discount,
      total: subtotal - discount < 0 ? 0 : subtotal - discount // Ensure total does not go below 0
    };
  };

  const handleAddItem = (menuItem: MenuItem) => {
    const existingItem = items.find(item => item.menuItem._id === menuItem._id);
    
    if (existingItem) {
      handleUpdateQuantity(items.indexOf(existingItem), 1);
    } else {
      const newItem: OrderItem = {
        menuItem: {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price
        },
        menuItemName: menuItem.name, // Added menuItemName
        menuItemCategory: menuItem.category, // Added menuItemCategory
        quantity: 1,
        price: menuItem.price
      };
      setItems([...items, newItem]);
      updateOrder([...items, newItem]);
    }
  };


  const handleUpdateQuantity = async (itemIndex: number, change: number) => {
    const newItems = [...items];
    const item = newItems[itemIndex];
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      newItems.splice(itemIndex, 1);
    } else {
      item.quantity = newQuantity;
    }

    setItems(newItems);
    await updateOrder(newItems);
  };

  const updateOrder = async (updatedItems: OrderItem[]) => {
    try {
      setLoading(true);
      const { subtotal, total } = calculateTotal();
      
      const res = await fetch(`/api/tables/${table._id}/order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: updatedItems,
          subtotal,
          discount,
          total
        })
      });

      if (!res.ok) throw new Error('Failed to update order');
      onUpdate();
    } catch (error) {
      toast.error('Failed to update order');
    } finally {
      setLoading(false);
    }
  };

  const handleSettleBill = async (paymentMethod: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/tables/${table._id}/settle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          discount,
          paymentMethod
        })
      });

      if (!res.ok) throw new Error('Failed to settle bill');
      
      const data = await res.json();
      toast.success(`Bill settled successfully. KOT #${data.bill.kotNumber}`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to settle bill');
      throw error; // Re-throw for the payment modal to handle
    } finally {
      setLoading(false);
    }
  };

  const handleClearTable = async () => {
    if (!confirm('Are you sure you want to clear this table?')) return;
    
    try {
      setLoading(true);
      const res = await fetch(`/api/tables/${table._id}/clear`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to clear table');
      toast.success('Table cleared successfully');
      onUpdate();
    } catch (error) {
      toast.error('Failed to clear table');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <MenuSearch onAddItem={handleAddItem} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-2">
            <div>
              <h4 className="font-medium">{item.menuItemName}</h4> {/* Display menuItemName */}
              <p className="text-sm text-gray-600">{item.menuItemCategory} - ₹{item.price} × {item.quantity}</p> {/* Display menuItemCategory */}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateQuantity(index, -1)}
                disabled={loading}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateQuantity(index, 1)}
                disabled={loading}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="space-y-4 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{calculateTotal().subtotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount:</span>
            <Input
              type="number"
              value={discount}
              onChange={(e) => {
                const value = Number(e.target.value);
                setDiscount(value);
                updateOrder(items);
              }}
              className="w-24 text-right"
              min="0"
            />
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>₹{calculateTotal().total}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setShowPaymentModal(true)}
            disabled={loading || items.length === 0}
          >
            Settle Bill
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleClearTable}
            disabled={loading}
          >
            Clear Table
          </Button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={handleSettleBill}
        total={calculateTotal().total}
      />
    </div>
  );
}