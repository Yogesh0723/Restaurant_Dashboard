"use client";

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface RevenueCardsProps {
  todaySales: number;
  monthlyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
}

export function RevenueCards({ todaySales, monthlyRevenue, totalOrders, averageOrderValue }: RevenueCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Today Sales</h3>
          <p className="text-3xl font-bold">₹{todaySales.toLocaleString()}</p>
          <div className="flex items-center text-sm mt-2">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">12%</span>
            <span className="text-muted-foreground ml-1">from yesterday</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Monthly Revenue</h3>
          <p className="text-3xl font-bold">₹{monthlyRevenue.toLocaleString()}</p>
          <div className="flex items-center text-sm mt-2">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">8%</span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders.toLocaleString()}</p>
          <div className="flex items-center text-sm mt-2">
            <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">15%</span>
            <span className="text-muted-foreground ml-1">from last week</span>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold">₹{averageOrderValue.toLocaleString()}</p>
          <div className="flex items-center text-sm mt-2">
            <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">3%</span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}