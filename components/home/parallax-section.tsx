"use client";

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center space-y-4 p-8 bg-black/50 rounded-lg backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-black">Experience Authentic Indian Cuisine</h2>
          <p className="text-xl text-black/90">A journey through traditional flavors</p>
        </div>
      </motion.div>
      <div 
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </section>
  );
}