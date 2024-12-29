"use client";

import { motion } from 'framer-motion';

export function About() {
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
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
              alt="Patil Dhaba History"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-600">
              Founded in 1970, Patil Dhaba began as a small roadside eatery in Maharashtra. 
              What started as a passion for authentic Indian cuisine has grown into a beloved 
              culinary destination, serving generations of food lovers.
            </p>
            <p className="text-lg text-gray-600">
              Our commitment to traditional recipes, fresh ingredients, and warm hospitality 
              has made us a landmark in Indian dining. Today, we continue to serve the same 
              authentic flavors that made us famous, while embracing modern culinary innovations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}