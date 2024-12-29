'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: string) => Promise<void>;
  total: number;
}

export function PaymentModal({ isOpen, onClose, onConfirm, total }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (method: string) => {
    try {
      setLoading(true);
      await onConfirm(method);
      onClose();
    } catch (error) {
      // Error is handled by the parent component
    } finally {
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Wallet },
    { id: 'card', label: 'Card', icon: CreditCard },
    { id: 'cash', label: 'Cash', icon: Banknote },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Payment Method</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-center mb-6">
            <p className="text-lg">Total Amount</p>
            <p className="text-3xl font-bold text-green-600">₹{total}</p>
          </div>

          <div className="space-y-3">
            {paymentMethods.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => handlePayment(id)}
                disabled={loading}
                className="w-full justify-start text-lg h-12"
                variant="outline"
              >
                <Icon className="w-5 h-5 mr-3" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}