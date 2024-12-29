// components/dashboard/menu-search.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './search-bar';
import { MenuItem } from '@/types/menu';
import { toast } from 'sonner';

interface MenuSearchProps {
  onAddItem: (item: MenuItem) => void;
}

export function MenuSearch({ onAddItem }: MenuSearchProps) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showItems, setShowItems] = useState(false); // State to manage visibility of items

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/menu');
      if (!res.ok) throw new Error('Failed to fetch menu items');
      const data = await res.json();
      setItems(data);
    } catch (error) {
      toast.error('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleFocus = () => {
    setShowItems(true); // Show items when the search bar is focused
  };

  const handleBlur = () => {
    setShowItems(false); // Hide items when the search bar loses focus
  };

  return (
    <div className="relative">
      <SearchBar
        value={query}
        onChange={(value) => {
          setQuery(value);
          if (value) {
            setShowItems(true); // Show items if there is a query
          } else {
            setShowItems(false); // Hide items if the query is empty
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      
      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : showItems && filteredItems.length > 0 ? (
        <div className="absolute z-10 bg-white shadow-lg max-h-60 overflow-y-auto">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
              onClick={() => {
                onAddItem(item);
                setQuery(''); // Clear the search query
                setShowItems(false); // Hide items after selection
              }}
            >
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-600">₹{item.price}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddItem(item)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : showItems && filteredItems.length === 0 ? (
        <div className="absolute z-10 bg-white shadow-lg max-h-60 overflow-y-auto">
          <div className="text-center py-4 text-gray-500">
            No items found
          </div>
        </div>
      ) : null}
    </div>
  );
}