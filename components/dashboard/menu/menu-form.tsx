'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/types/menu';

interface MenuFormProps {
  onSubmit: (data: Partial<MenuItem>) => void;
  initialData?: MenuItem;
  onCancel: () => void;
}

export function MenuForm({ onSubmit, initialData, onCancel }: MenuFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    category: initialData?.category || 'main',
    type: initialData?.type || 'veg',
    imageUrl: initialData?.imageUrl || '',
    isAvailable: initialData?.isAvailable ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert form data to match MenuItem type
    const submissionData: Partial<MenuItem> = {
      ...formData,
      price: parseFloat(formData.price), // Convert string to number
    };

    onSubmit(submissionData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Item Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <select
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as MenuItem['category'] })}
        >
          <option value="starters">Starters</option>
          <option value="main">Main Course</option>
          <option value="desserts">Desserts</option>
          <option value="beverages">Beverages</option>
          <option value="breakfast">Breakfast</option>
        </select>
        <select
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'veg' | 'non-veg' })}
        >
          <option value="veg">Vegetarian</option>
          <option value="non-veg">Non-Vegetarian</option>
        </select>
        <Input
          placeholder="Image URL (optional)"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            {initialData ? 'Update' : 'Add'} Item
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}