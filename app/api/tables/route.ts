import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Table, Bill } from '@/models/Table';

export async function GET() {
  try {
    await connectDB();
    const tables = await Table.find().populate('currentOrder.items.menuItem');
    return NextResponse.json(tables);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch tables' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const table = await Table.create(data);
    return NextResponse.json(table, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create table' },
      { status: 500 }
    );
  }
}