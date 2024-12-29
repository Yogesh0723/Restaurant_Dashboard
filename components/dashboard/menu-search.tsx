"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

export function MenuSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Selected Items</h3>
        {selectedItems.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">₹{item.price}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedItems(selectedItems.filter((_, i) => i !== index));
                }}
              >
                Remove
              </Button>
            </div>
          </Card>
        ))}

        {selectedItems.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ₹{selectedItems.reduce((acc, item) => acc + item.price, 0)}
              </span>
            </div>
            <Button className="w-full">Place Order</Button>
          </div>
        )}
      </div>
    </div>
  );
}