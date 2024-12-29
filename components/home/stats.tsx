"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Stats() {
  const [customers, setCustomers] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => {
      setCustomers(prev => prev + 1);
    }, 120000); // Increment every 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-4xl font-bold text-primary">{customers.toLocaleString()}</h3>
            <p className="text-gray-600">Happy Customers</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-4xl font-bold text-primary">4.8</h3>
            <p className="text-gray-600">Average Rating</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-4xl font-bold text-primary">4+</h3>
            <p className="text-gray-600">Cities Served</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-4xl font-bold text-primary">50+</h3>
            <p className="text-gray-600">Signature Dishes</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}