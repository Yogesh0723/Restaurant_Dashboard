"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FoodCard } from '@/components/food-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featuredDishes = [
  {
    name: "Batata Poha",
    description: "flavourful Indian breakfast recipe.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2022/12/blog1.jpg?w=500&q=80",
    price: "₹120"
  },
  {
    name: "Misal Pav",
    description: "Curry with crunchy farsan and pav.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80",
    price: "₹120"
  },
  {
    name: "Vada Pav",
    description: "Mumbai's favorite street food.",
    image: "https://www.cookwithmanali.com/wp-content/uploads/2018/04/Vada-Pav.jpg?w=500&q=80",
    price: "₹30"
  },
  {
    name: "Rawa Idli",
    description: "Multi-grain savory pancake.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80",
    price: "₹80"
  },
  {
    name: "Bharli Vangi",
    description: "Indian smoked aubergine.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2023/06/Blog_1-2.jpg?w=500&q=80",
    price: "₹120"
  },
  {
    name: "Aloo-Gobi",
    description: "Indian side dish with aloo and gobi.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2022/02/final_logo-2.jpg?w=500&q=80",
    price: "₹120"
  },
  {
    name: "Nachanichi Bhakri",
    description: "Indian flatbread prepared with ragi.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2023/02/Blog_1-5.jpg?w=500&q=80&ssl=1",
    price: "₹7"
  },
  {
    name: "Puran Poli",
    description: "Sweet flatbread with lentil stuffing.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2023/03/Blog.jpg?w=500&q=80&ssl=1",
    price: "₹60"
  },
  {
    name: "Ukdiche Modak",
    description: "Sweet coconut dumplings.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2021/10/ukadiche-modak.jpg?w=800&q=80",
    price: "₹10"
  },
  {
    name: "Gajar Halwa",
    description: "Super delicious carrot dessert.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2021/12/final.jpg?w=800&q=80",
    price: "₹70"
  },
  {
    name: "Shrikhand ",
    description: "Super delicious yoghurt dessert.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2021/09/shrikhand.jpg?w=800&q=80",
    price: "₹70"
  },
  {
    name: "Prawns Masala",
    description: "Super tempting prawns tangy masala.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2021/03/final-5.jpg?w=500&q=80&ssl=1",
    price: "₹360"
  },
  {
    name: "Mushroom",
    description: "Gravy prepared with mushrooms.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2021/07/final-6.jpg?w=500&q=80&ssl=1",
    price: "₹260"
  },
  {
    name: "Chicken Cafreal",
    description: "Goan gravy with chicken.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2023/01/blog_1-3.jpg?w=500&q=80&ssl=1",
    price: "₹300"
  },
  {
    name: "Tambda Rassa",
    description: "Spicy red mutton curry",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=500&q=80",
    price: "₹250"
  },
  {
    name: "Rawa fry",
    description: "Goan style Rawa fried fish.",
    image: "https://i0.wp.com/delishbite.in/wp-content/uploads/2022/09/seabass.jpg?w=500&q=80",
    price: "₹350"
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
    }, 3000);

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