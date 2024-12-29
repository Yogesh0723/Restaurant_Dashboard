import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Table, Bill } from '@/models/Table';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await req.json();
    
    const table = await Table.findById(params.id);
    if (!table) {
      return NextResponse.json(
        { message: 'Table not found' },
        { status: 404 }
      );
    }

    // If there's an active order, complete it and move to history
    if (table.currentOrder && table.currentOrder.status === 'active') {
      table.currentOrder.status = 'completed';
      table.currentOrder.completedAt = new Date();
      table.orderHistory.push(table.currentOrder);
    }

    // Create new order
    table.currentOrder = {
      ...data,
      status: 'active',
      startedAt: new Date()
    };
    table.status = 'occupied';
    
    await table.save();
    return NextResponse.json(table);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update order' },
      { status: 500 }
    );
  }
}