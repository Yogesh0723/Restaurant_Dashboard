'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { MenuItem } from '@/types/menu';

interface TableOrderProps {
  table: any;
  onUpdate: () => void;
}

export function TableOrder({ table, onUpdate }: TableOrderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [discount, setDiscount] = useState(table.currentOrder?.discount || 0);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const filtered = menuItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, menuItems]);

  const fetchMenuItems = async () => {
    try {
      const res = await fetch('/api/menu');
      const data = await res.json();
      setMenuItems(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleAddItem = async (menuItem: any) => {
    try {
      const res = await fetch(`/api/tables/${table._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addItem',
          item: {
            menuItem: menuItem._id,
            name: menuItem.name,
            quantity: 1,
            price: menuItem.price
          }
        })
      });

      if (!res.ok) throw new Error('Failed to add item');
      onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleUpdateQuantity = async (itemIndex: number, change: number) => {
    // Implementation
  };

  const handleClearTable = async () => {
    try {
      const res = await fetch(`/api/tables/${table._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clearTable' })
      });

      if (!res.ok) throw new Error('Failed to clear table');
      onUpdate();
      toast.success('Table cleared successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleSettleBill = async () => {
    try {
      const res = await fetch(`/api/tables/${table._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'settleBill' })
      });

      if (!res.ok) throw new Error('Failed to settle bill');
      onUpdate();
      toast.success('Bill settled successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Implementation of the table order UI */}
    </div>
  );
}