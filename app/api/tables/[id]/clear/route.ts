// app/api/tables/[id]/clear/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Table } from '@/models/Table';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // Find the table by ID and delete it
    const table = await Table.findByIdAndDelete(params.id);
    
    if (!table) {
      return NextResponse.json(
        { message: 'Table not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Table deleted successfully' });
  } catch (error) {
    console.error('Error deleting table:', error); // Log the error for debugging
    return NextResponse.json(
      { message: 'Failed to delete table' },
      { status: 500 }
    );
  }
}