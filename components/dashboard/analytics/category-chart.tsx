// components/dashboard/analytics/category-chart.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

interface CategoryChartProps {
  data: Array<{ name: string; value: number }>;
}

const COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa'];

export function CategoryChart({ data }: CategoryChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm">₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 flex">
      <h3 className="font-semibold mb-4">Sales by Category</h3>
      <div className="flex-1 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  stroke="#fff"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 mt-10 ml-9"> {/* Adjust margin as needed */}
        <div className="grid grid-cols-2 gap-2">
          {data.map((entry, index) => (
            <motion.div
              key={entry.name}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">{entry.name}</span> {/* Display category name here */}
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}