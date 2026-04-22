'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const order = localStorage.getItem('lastOrder');
    if (order) {
      setOrderDetails(JSON.parse(order));
    }
  }, []);

  const handleContinueShopping = () => {
    localStorage.removeItem('lastOrder');
    router.push('/user-portal');
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-green-600">THANK YOU</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {orderDetails && (
            <>
              <div className="bg-blue-50 p-4 rounded text-center">
                <p className="text-2xl font-bold text-blue-600">₹{orderDetails.totalAmount}</p>
                <p className="text-sm text-gray-600 mt-1">Total Amount</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">Name</p>
                  <p className="font-semibold text-sm">{orderDetails.customerName}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">Number</p>
                  <p className="font-semibold text-sm">{orderDetails.customerNumber}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">E-mail</p>
                  <p className="font-semibold text-sm text-xs">{orderDetails.customerEmail}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">Payment Method</p>
                  <p className="font-semibold text-sm capitalize">{orderDetails.paymentMethod}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center col-span-2">
                  <p className="text-xs text-gray-600">Address</p>
                  <p className="font-semibold text-sm">{orderDetails.customerAddress}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">City</p>
                  <p className="font-semibold text-sm">{orderDetails.customerCity}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded text-center">
                  <p className="text-xs text-gray-600">State</p>
                  <p className="font-semibold text-sm">{orderDetails.customerState}</p>
                </div>
              </div>

              <Button
                onClick={handleContinueShopping}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
