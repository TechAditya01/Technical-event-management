'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VendorTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/vendor/transactions');
      if (response.ok) {
        const data = await response.json();
        setTransactions(data.transactions || []);
        setTotalAmount(data.totalAmount || 0);
      }
    } catch (err) {
      console.error('[v0] Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <Link href="/vendor-dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-600">Loading transactions...</p>
            ) : transactions.length === 0 ? (
              <p className="text-gray-600">No transactions found</p>
            ) : (
              <>
                <div className="mb-6 bg-blue-50 p-4 rounded">
                  <p className="text-lg font-bold text-blue-600">Total Amount: ₹{totalAmount}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, idx) => (
                        <tr key={idx} className="border-t hover:bg-gray-50">
                          <td className="px-4 py-2">₹{transaction.amount}</td>
                          <td className="px-4 py-2 capitalize">{transaction.transaction_type}</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{transaction.created_at?.split('T')[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
