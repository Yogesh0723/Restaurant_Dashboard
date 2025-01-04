'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MenuForm } from './menu/menu-form';
import { MenuGrid } from './menu/menu-grid';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types/menu';

export function MenuManagement() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | undefined>(undefined); 
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/menu');
      if (!res.ok) throw new Error('Failed to fetch menu items');
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch menu items",
        variant: "destructive",
      });
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: Partial<MenuItem>) => {
    try {
      const url = editItem ? `/api/menu/${editItem._id}` : '/api/menu';
      const method = editItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Operation failed: ${errorMessage}`);
      }

      toast({
        title: "Success",
        description: `Menu item ${editItem ? 'updated' : 'added'} successfully`,
      });
      setShowForm(false);
      setEditItem(undefined);
      fetchMenuItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Operation failed",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Delete failed');

      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
      fetchMenuItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete menu item",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <Button onClick={() => setShowForm(true)} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {showForm ? (
        <MenuForm
          onSubmit={handleSubmit}
          initialData={editItem}
          onCancel={() => {
            setShowForm(false);
            setEditItem(undefined);
          }}
        />
      ) : (
        <MenuGrid
          items={items}
          onEdit={(item) => {
            setEditItem(item);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}