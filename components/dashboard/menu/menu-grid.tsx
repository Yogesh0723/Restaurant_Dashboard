'use client';

import { useState } from 'react';
import { MenuItemCard } from './menu-item-card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MenuFilters } from './menu-filters';
import { MenuItem, MenuFilter } from '@/types/menu';

interface MenuGridProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuGrid({ items = [], onEdit, onDelete }: MenuGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<MenuFilter>({});

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesType = !filters.type || item.type === filters.type;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <MenuFilters 
        filters={filters}
        onFilterChange={setFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item._id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}