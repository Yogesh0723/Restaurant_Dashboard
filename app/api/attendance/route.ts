import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Employee from '@/models/Employee';

export async function POST(req: Request) {
  try {
    const { employeeId, date, status } = await req.json();
    await connectDB();
    
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    const attendance = {
      date: new Date(date),
      status,
    };

    employee.attendance.push(attendance);
    await employee.save();

    return NextResponse.json(
      { message: 'Attendance marked successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}