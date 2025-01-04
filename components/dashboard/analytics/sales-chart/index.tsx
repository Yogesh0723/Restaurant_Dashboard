"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TimeRangeSelector } from "./time-range-selector";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalesChartProps {
  data: any;
}
interface SalesData {
    name: string; // Assuming 'name' is a string
    value: number; // Assuming 'value' is a number
    // Add other properties as needed
  }

export function SalesCharts({ data }: SalesChartProps) {
  const [timeRange, setTimeRange] = useState("12m");
  const { scrollY } = useScroll();
  
  // Parallax effect for the card
  const y = useTransform(scrollY, [0, 500], [0, -50]);

  const getFilteredData = () => {
    switch (timeRange) {
      case "6m":
        return data.slice(-6);
      case "30d":
        return data.slice(-30);
      case "7d":
        return data.slice(-7);
      default:
        return data;
    }
  };

    const exportToCSV = () => {
    const filteredData = getFilteredData();
    const headers = Object.keys(filteredData[0]).join(',');
    const rows = filteredData.map((row: SalesData) => 
    Object.values(row).map(value => 
    typeof value === 'string' ? `"${value}"` : value
    ).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    // Create download link
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_report_${timeRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SVG background pattern
  const PatternBackground = () => (
    <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 opacity-10">
      <pattern
        id="grid-pattern"
        width="24"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 0 L24 0 M0 0 L0 24"
          fill="none"
          strokeWidth="1"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ y }}
    >
      <Card className="p-6 relative overflow-hidden">
        <PatternBackground />
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold">Sales Report</h3>
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <TimeRangeSelector
                selectedRange={timeRange}
                onRangeChange={setTimeRange}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportToCSV}
                className="hover:shadow-lg transition-shadow"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="h-[400px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getFilteredData()}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#818cf8"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </Card>
    </motion.div>
  );
}