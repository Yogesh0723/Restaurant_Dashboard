"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  kotNumber: string;
  amount: number;
  paymentMethod: string;
  status: "paid" | "pending" | "cancelled";
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "pending":
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
          </svg>
        );
      case "cancelled":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6 shadow-lg rounded-2xl bg-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-xl">Recent Transactions</h3>
        <Link href="/dashboard/transactions" className="text-sm text-blue-600 hover:underline">
          See all transactions
        </Link>
      </div>

      <AnimatePresence>
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.kotNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 120 }}
            className="flex items-center justify-between p-4 rounded-xl shadow-md bg-gray-50 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                {getStatusIcon(transaction.status)} 
              </div>
              <div>
                <p className="font-medium text-lg">KOT #{transaction.kotNumber}</p>
                <p className="text-sm text-gray-500">{transaction.paymentMethod}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg">₹{transaction.amount.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300">
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </Card>
  );
}
