'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TableOrder } from './table/table-order';
import { Table } from '@/types/table';
import { toast } from 'sonner';

export function TableManagement() {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/tables');
      if (!res.ok) throw new Error('Failed to fetch tables');
      const data = await res.json();
      setTables(data);
    } catch (error) {
      toast.error('Failed to fetch tables');
      setTables([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = async (tableNumber: number) => {
    const existingTable = tables.find(t => t.tableNumber === tableNumber);
    
    if (existingTable) {
      setSelectedTable(existingTable);
      return;
    }

    // Create new table if it doesn't exist
    try {
      const res = await fetch('/api/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber })
      });

      if (!res.ok) throw new Error('Failed to create table');
      
      const newTable = await res.json();
      setTables(prev => [...prev, newTable]);
      setSelectedTable(newTable);
    } catch (error) {
      toast.error('Failed to select table');
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const getTableColor = (status: Table['status']) => {
    switch (status) {
      case 'occupied': return 'bg-orange-100 text-orange-800';
      case 'reserved': return 'bg-blue-100 text-blue-800';
      case 'cleaning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
      </div>
    );
  }

  return (
    <div className="flex h-full gap-6">
      <div className="w-1/3 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Tables</h2>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 25 }).map((_, index) => {
            const tableNumber = index + 1;
            const table = tables.find(t => t.tableNumber === tableNumber);
            return (
              <motion.button
                key={tableNumber}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTableSelect(tableNumber)}
                className={`
                  p-4 rounded-lg shadow-md text-center font-medium cursor-pointer
                  ${getTableColor(table?.status || 'available')}
                `}
              >
                <span className="text-lg font-bold">Table {tableNumber}</span>
                {table?.currentOrder && (
                  <p className="text-sm mt-1">
                    ₹{table.currentOrder.total}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        {selectedTable ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Table {selectedTable.tableNumber}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTableColor(selectedTable.status)}`}>
                {selectedTable.status}
              </span>
            </div>
            <TableOrder 
              table={selectedTable}
              onUpdate={fetchTables}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a table to manage
          </div>
        )}
      </div>
    </div>
  );
}