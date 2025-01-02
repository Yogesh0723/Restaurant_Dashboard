'use client';

import { motion } from 'framer-motion';

export function PaperAirplane() {
  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 2, repeat: Infinity }
    }
  };

  return (
    <motion.div
      animate={{
        rotate: 360,
        x: [0, 100, 0],
        y: [0, -50, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-20 left-20 bottom-10 z-10"
    >
      <svg width="40" height="40" viewBox="0 0 24 24" className="text-emerald-600">
        <motion.path
          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
      </svg>
    </motion.div>
  );
}