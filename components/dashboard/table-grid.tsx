"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tables</h2>
      <div className="grid grid-cols-5 gap-4">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={`p-4 cursor-pointer transition-colors ${getTableColor(table.status)}`}
          >
            <div className="text-center">
              <h3 className="font-bold">Table {table.id}</h3>
              <p className="capitalize text-sm text-muted-foreground">{table.status}</p>
              {table.status === 'occupied' && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => {/* Handle bill settlement */}}
                >
                  Settle Bill
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}