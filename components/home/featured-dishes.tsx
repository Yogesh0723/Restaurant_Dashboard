"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FoodCard } from '@/components/food-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredDishes = [
  {
    name: "Misal Pav",
    description: "Spicy curry with crunchy farsan and pav",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=500&q=80",
    price: "₹120"
  },
  {
    name: "Vada Pav",
    description: "Mumbai's favorite street food",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80",
    price: "₹30"
  },
  {
    name: "Puran Poli",
    description: "Sweet flatbread with lentil stuffing",
    image: "https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=500&q=80",
    price: "₹60"
  },
  {
    name: "Bharli Vangi",
    description: "Stuffed eggplant curry",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80",
    price: "₹180"
  },
  {
    name: "Tambda Rassa",
    description: "Spicy red mutton curry",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=500&q=80",
    price: "₹250"
  },
  {
    name: "Kothimbir Vadi",
    description: "Crispy coriander fritters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
    price: "₹100"
  },
  {
    name: "Thalipeeth",
    description: "Multi-grain savory pancake",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80",
    price: "₹80"
  },
  {
    name: "Modak",
    description: "Sweet coconut dumplings",
    image: "https://images.unsplash.com/photo-1605197584547-b93086aef8bb?w=500&q=80",
    price: "₹40"
  }
];

export function FeaturedDishes() {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = constraintsRef.current as HTMLDivElement | null;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      scrollContainer('right');
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="featured-dishes" className="py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Dishes
        </motion.h2>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scrollContainer('left')}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={() => scrollContainer('right')}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div 
            ref={constraintsRef}
            className="overflow-hidden" // Change to overflow-hidden
          >
            <motion.div 
              className="flex gap-6 py-8 px-4"
              style={{ width: `${featuredDishes.length * 320}px` }}
            >
              {featuredDishes.map((dish, index) => (
                <motion.div
                  key={dish.name}
                  className="w-[300px] flex-shrink-0"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 50
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.1
                  }}
                >
                  <FoodCard {...dish} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}