'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Thali from '@/components/images/Thali.png';
import Panner from '@/components/images/freepik__background__80362.png';
import Chicken from '@/components/images/rb_26006.png';
import { ChevronDown } from 'lucide-react';

const foodItems = [
  {
    name: "Patil Thali",
    image: Thali.src,
    rotate: 20
  },
  {
    name: "Butter Paneer",
    image: Panner.src,
    rotate: -20
  },
  {
    name: "Butter Chicken",
    image: Chicken.src,
    rotate: 20
  }
];

export function FoodModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to circular rotation (Z-axis rotation)
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 360]); // Full circle rotation

  return (
    <div 
      ref={containerRef} 
      className="relative h-[40vh] overflow-hidden bg-gradient-to-b from-[#ebfdf2] to-white"
    >
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="flex justify-center items-center gap-16 pt-12"
      >
        {foodItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{ 
              rotate: rotateZ // Apply circular rotation
            }}
            className="relative w-48 h-48 transform-gpu"
          >
            <div className="w-full h-full object-contain drop-shadow-2xl">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-8 left-0 right-0 text-center"
            >
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}