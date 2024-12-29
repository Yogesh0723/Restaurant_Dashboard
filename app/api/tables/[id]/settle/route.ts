import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Table, Bill } from '@/models/Table';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { paymentMethod } = await req.json();
    
    const table = await Table.findById(params.id);
    if (!table || !table.currentOrder) {
      return NextResponse.json(
        { message: 'Table not found or no active order' },
        { status: 404 }
      );
    }

    // Generate KOT number (timestamp + table number)
    const kotNumber = `${Date.now()}${table.tableNumber}`;

    // Complete current order
    table.currentOrder.status = 'completed';
    table.currentOrder.completedAt = new Date();
    table.orderHistory.push(table.currentOrder);

    // Create bill
    const bill = await Bill.create({
      kotNumber,
      tableNumber: table.tableNumber,
      order: table.currentOrder,
      paymentMethod,
      status: 'paid',
      settledAt: new Date()
    });

    // Update table
    table.bills.push(bill._id);
    table.currentOrder = undefined;
    table.status = 'cleaning';
    await table.save();

    return NextResponse.json({ table, bill });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to settle bill' },
      { status: 500 }
    );
  }
}