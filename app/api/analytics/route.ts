import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Bill, Table } from '@/models/Table';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, subDays } from 'date-fns';

export async function GET() {
  try {
    await connectDB();
    const now = new Date();

    // Today's sales
    const todayBills = await Bill.find({
      createdAt: {
        $gte: startOfDay(now),
        $lte: endOfDay(now)
      },
      status: 'paid'
    });
    const todaySales = todayBills.reduce((sum, bill) => sum + (bill.order?.total || 0), 0);

    // Monthly revenue
    const monthlyBills = await Bill.find({
      createdAt: {
        $gte: startOfMonth(now),
        $lte: endOfMonth(now)
      },
      status: 'paid'
    });
    const monthlyRevenue = monthlyBills.reduce((sum, bill) => sum + (bill.order?.total || 0), 0);

    // Total orders today
    const totalOrders = todayBills.length;

    // Average order value
    const averageOrderValue = totalOrders > 0 ? todaySales / totalOrders : 0;

    // Weekly sales trend
    const weeklySales = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const date = subDays(now, i);
        const dayBills = await Bill.find({
          createdAt: {
            $gte: startOfDay(date),
            $lte: endOfDay(date)
          },
          status: 'paid'
        });
        const sales = dayBills.reduce((sum, bill) => sum + (bill.order?.total || 0), 0);
        console.log(
          "name:", date.toLocaleDateString('en-US', { weekday: 'short' }),
        sales)
        return {
          name: date.toLocaleDateString('en-US', { weekday: 'short' }),
          sales
        };
      })
    );

    // Category data
    const categoryData = await Bill.aggregate([
      { $match: { status: 'paid' } },
      { $unwind: '$order.items' },
      {
        $group: {
          _id: '$order.items.menuItemCategory', // Group by menuItemCategory
          value: { $sum: { $multiply: ['$order.items.price', '$order.items.quantity'] } } // Sum total price
        }
      }
    ]);

    // Best sellers
    const bestSellers = await Bill.aggregate([
      { $match: { status: 'paid' } },
      { $unwind: '$order.items' },
      {
        $group: {
          _id: '$order.items.menuItemName', // Group by menuItemName
          sales: { $sum: '$order.items.quantity' } // Sum the quantities
        }
      },
      { $sort: { sales: -1 } },
      { $limit: 5 }
    ]);

    // Hourly sales distribution
    const hourlySales = await Bill.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: { $hour: '$createdAt' },
          sales: { $sum: '$order.total' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Payment method distribution
    const paymentMetrics = await Bill.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: '$paymentMethod',
          value: { $sum: 1 }
        }
      }
    ]);

    return NextResponse.json({
      todaySales,
      monthlyRevenue,
      totalOrders,
      averageOrderValue,
      weeklySales: weeklySales.reverse(),
      categoryData,
      bestSellers: bestSellers.map(item => ({
        name: item._id,
        sales: item.sales
      })),
      hourlySales: hourlySales.map(item => ({
        hour: item._id,
        sales: item.sales
      })),
      performanceMetrics: paymentMetrics.map(item => ({
        subject: item._id,
        value: item.value
      }))
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}