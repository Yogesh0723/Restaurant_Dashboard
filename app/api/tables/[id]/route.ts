import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Table, Bill } from '@/models/Table';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await req.json();
    const table = await Table.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(table);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update table' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { action, ...data } = await req.json();

    switch (action) {
      case 'addItem': {
        const table = await Table.findById(params.id);
        if (!table.currentOrder) {
          table.currentOrder = { items: [], subtotal: 0, discount: 0, total: 0 };
        }
        table.currentOrder.items.push(data.item);
        await table.save();
        return NextResponse.json(table);
      }

      case 'settleBill': {
        const table = await Table.findById(params.id);
        const bill = await Bill.create({
          kotNumber: Date.now().toString(),
          tableNumber: table.tableNumber,
          items: table.currentOrder.items,
          subtotal: table.currentOrder.subtotal,
          discount: table.currentOrder.discount,
          total: table.currentOrder.total,
          status: 'paid',
          settledAt: new Date()
        });
        
        table.currentOrder = undefined;
        table.status = 'cleaning';
        table.lastBill = bill._id;
        await table.save();
        
        return NextResponse.json({ table, bill });
      }

      case 'clearTable': {
        const table = await Table.findById(params.id);
        table.currentOrder = undefined;
        table.status = 'available';
        await table.save();
        return NextResponse.json(table);
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to perform table action' },
      { status: 500 }
    );
  }
}