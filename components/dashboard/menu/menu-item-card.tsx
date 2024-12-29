"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getFallbackImage } from '@/lib/constants/menuItem';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'main' | 'desserts' | 'beverages';
  imageUrl: string;
  isAvailable: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuItemCard({ item, onEdit, onDelete }: MenuItemCardProps) {
  const [showActions, setShowActions] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.imageUrl);

  const handleImageError = () => {
    const fallbackImage = getFallbackImage(item.category);
    if (imgSrc !== fallbackImage) {
      setImgSrc(fallbackImage);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setShowActions(true)}
      onHoverEnd={() => setShowActions(false)}
    >
      <Card className="relative overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img
            src={imgSrc}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={handleImageError}
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="font-bold mt-2">₹{item.price}</p>
          <div className={`absolute top-2 right-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => onEdit(item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onDelete(item._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}