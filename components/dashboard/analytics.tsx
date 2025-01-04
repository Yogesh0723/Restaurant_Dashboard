"use client";

import { useState, useEffect } from 'react';
import { RevenueCards } from './analytics/revenue-cards';
import { SalesChart } from './analytics/sales-chart';
import { CategoryChart } from './analytics/category-chart';
import { BestSellers } from './analytics/best-sellers';
import { ThreeDChart } from './analytics/three-d-chart';
import { HourlySales } from './analytics/hourly-sales';
import { RadarMetrics } from './analytics/radar-chart';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { RecentTransactions } from './analytics/recent-transactions';
import { SalesCharts } from './analytics/sales-chart/index';

interface AnalyticsData {
  todaySales: number;
  monthlyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  weeklySales: any[];
  categoryData: any[];
  bestSellers: any[];
  hourlySales: any[];
  performanceMetrics: any[];
  recentTransactions: any[];
  salesData: any[];
}

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) throw new Error('Failed to fetch analytics');
      const data = await res.json();
      // Log the received data
      console.log(data)
      console.log('Analytics Data:', data);
      setAnalyticsData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analyticsData) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RevenueCards {...analyticsData} />
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        {/* <ThreeDChart
          data={analyticsData.weeklySales}
          title="Weekly Sales Trend"
        /> */}
        {/* <SalesChart
          data={analyticsData.weeklySales}
          title="Weekly Sales Analysis"
        /> */}
        <SalesCharts data={analyticsData.salesData} />
        <RecentTransactions transactions={analyticsData.recentTransactions} />
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CategoryChart data={analyticsData.categoryData} />
        <RadarMetrics data={analyticsData.performanceMetrics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HourlySales data={analyticsData.hourlySales} />
        <BestSellers data={analyticsData.bestSellers} />
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[150px] rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[400px] rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}