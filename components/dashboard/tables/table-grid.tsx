"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TableOrder } from './table-order';
import { cn } from '@/lib/utils';

interface TableStatus {
  id: number;
  status: 'available' | 'occupied' | 'reserved';
  order?: any;
}

export function TableGrid() {
  const [tables, setTables] = useState<TableStatus[]>(
    Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      status: 'available'
    }))
  );
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const getTableColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 hover:bg-green-200';
      case 'occupied':
        return 'bg-red-100 hover:bg-red-200';
      case 'reserved':
        return 'bg-yellow-100 hover:bg-yellow-200';
      default:
        return 'bg-gray-100';
    }
  };

  const handleTableClick = (tableId: number) => {
    setSelectedTable(tableId);
  };

  const handleOrderComplete = (tableId: number) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, status: 'available', order: undefined } : table
    ));
    setSelectedTable(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Tables</h2>
        <div className="grid grid-cols-5 gap-4">
          {tables.map((table) => (
            <Card
              key={table.id}
              className={cn(
                "p-4 cursor-pointer transition-colors",
                getTableColor(table.status)
              )}
              onClick={() => handleTableClick(table.id)}
            >
              <div className="text-center">
                <h3 className="font-bold">Table {table.id}</h3>
                <p className="capitalize text-sm text-muted-foreground">
                  {table.status}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="lg:col-span-1">
        {selectedTable && (
          <TableOrder
            tableId={selectedTable}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </div>
    </div>
  );
}