// components/carousel/photo-card.tsx
'use client';

import { motion } from 'framer-motion';

interface PhotoCardProps {
  image: string;
  title: string;
  description: string;
  isActive: boolean;
  index: number;
}

export function PhotoCard({ image, title, description, isActive, index }: PhotoCardProps) {
  return (
    <motion.div
      className={`absolute w-full h-full`}
      initial={{ scale: 0.9, y: 100, opacity: 0 }}
      animate={{
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : index * 20,
        opacity: isActive ? 1 : 0.5,
        zIndex: isActive ? 10 : 10 - index,
      }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: isActive ? 1.05 : 0.9 }}
    >
      <div className="relative h-full rounded-xl overflow-hidden shadow-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
