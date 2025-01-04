'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MenuFilter } from '@/types/menu';
import { Circle } from 'lucide-react';

interface MenuFiltersProps {
  filters: MenuFilter;
  onFilterChange: (filters: MenuFilter) => void;
}

const filterVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  hover: { scale: 1.1 }
};

export function MenuFilters({ filters, onFilterChange }: MenuFiltersProps) {
  const categories = ['all', 'starters', 'main', 'desserts', 'beverages', 'breakfast'];
  const types = ['all', 'veg', 'non-veg'];

  return (
    <div className="flex justify-between items-center space-y-4">
      {/* Category Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Category:</span>
        {categories.map((category) => (
          <motion.span
            key={category}
            variants={filterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className={`cursor-pointer text-sm transition-all ease-out duration-300 ${
              filters.category === category
                ? 'font-bold underline text-blue-600'
                : 'text-gray-700'
            }`}
            onClick={() =>
              onFilterChange({
                ...filters,
                category: category === 'all' ? undefined : category
              })
            }
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.span>
        ))}
      </div>

      {/* Type Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Type:</span>
        {types.map((type) => (
          <motion.span
            key={type}
            variants={filterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            className={`cursor-pointer flex items-center gap-2 text-sm transition-all ease-out duration-300 ${
              filters.type === type
                ? 'font-bold underline text-blue-600'
                : 'text-gray-700'
            }`}
            onClick={() =>
              onFilterChange({
                ...filters,
                type: type === 'all' ? undefined : (type as 'veg' | 'non-veg')
              })
            }
          >
            <Circle
              className={
                type === 'veg'
                  ? 'text-green-500'
                  : type === 'non-veg'
                  ? 'text-red-500'
                  : 'text-gray-400'
              }
              size={16}
              fill={
                type === 'veg'
                  ? 'green'
                  : type === 'non-veg'
                  ? 'red'
                  : 'gray'
              }
            />
            {type === 'veg' ? 'Veg' : type === 'non-veg' ? 'Non-Veg' : 'All'}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default MenuFilters;