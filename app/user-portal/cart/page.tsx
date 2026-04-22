'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartItems || []);
        setTotalAmount(data.totalAmount || 0);
      }
    } catch (err) {
      console.error('[v0] Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (cartItemId: number) => {
    try {
      const response = await fetch(`/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId }),
      });

      if (response.ok) {
        fetchCart();
      }
    } catch (err) {
      console.error('[v0] Error removing item:', err);
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      try {
        const response = await fetch('/api/cart/clear', { method: 'POST' });
        if (response.ok) {
          fetchCart();
        }
      } catch (err) {
        console.error('[v0] Error clearing cart:', err);
      }
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Loading cart...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Link href="/user-portal">
              <Button className="bg-green-600 hover:bg-green-700">Home</Button>
            </Link>
            <Link href="/user-portal">
              <Button className="bg-gray-400 hover:bg-gray-500">View Product</Button>
            </Link>
            <div className="flex gap-2">
              <Link href="/user-portal/request-item">
                <Button className="bg-blue-600 hover:bg-blue-700">Request Item</Button>
              </Link>
              <Link href="/user-portal/product-status">
                <Button className="bg-green-600 hover:bg-green-700">Product Status</Button>
              </Link>
            </div>
          </div>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">Logout</Button>
          </Link>
        </div>

        {/* Shopping Cart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead className="bg-blue-600 text-white">
                      <tr>
                        <th className="px-4 py-2 text-left">Image</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Total Price</th>
                        <th className="px-4 py-2 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                              Image
                            </div>
                          </td>
                          <td className="px-4 py-3">{item.products?.product_name}</td>
                          <td className="px-4 py-3">₹{item.products?.price}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">
                            ₹{(item.products?.price || 0) * item.quantity}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total and Actions */}
                <div className="flex justify-between items-center mb-4 bg-blue-600 text-white p-4 rounded">
                  <p className="text-lg font-bold">Grand Total</p>
                  <p className="text-lg font-bold">₹{totalAmount}</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteAll}
                  >
                    Delete All
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => router.push('/user-portal/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
