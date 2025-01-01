"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageLinks = [
    "https://images.unsplash.com/photo-1660145416818-b9a2b1a1f193?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594817060351-8f3de84b7e0e?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1664818757194-798295889bcd?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571982646493-6dd99f1f26f3?q=80&w=1974&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1680328655580-6429f1107deb?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1644322681422-ef9c29d6c461?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554579699-b7c00299a3f0?q=80&w=2070&auto=format&fit=crop",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageLinks.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src={imageLinks[currentIndex]}
                alt="Heritage Image"
                className="rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">Our Heritage</h2>
            <p className="text-lg text-gray-600">
              Founded in 1970, Patil Dhaba began as a humble establishment in the heart of Maharashtra. 
              Our journey started with a vision to preserve and showcase the rich culinary heritage of 
              Maharashtra through authentic recipes passed down through generations.
            </p>
            <p className="text-lg text-gray-600">
              From the aromatic Misal Pav to the delectable Puran Poli, every dish tells a story of our 
              cultural heritage. Our commitment to traditional cooking methods and locally-sourced ingredients 
              has made us a beloved destination for authentic Maharashtrian cuisine.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Traditional Recipes</h3>
                <p className="text-gray-600">Authentic flavors preserved through generations</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Local Ingredients</h3>
                <p className="text-gray-600">Fresh, locally-sourced produce and spices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
