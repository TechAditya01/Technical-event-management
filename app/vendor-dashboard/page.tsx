'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function VendorDashboard() {
  const [vendorInfo, setVendorInfo] = useState<any>(null);
  const [productCount, setProductCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchVendorInfo = async () => {
      try {
        const response = await fetch('/api/vendor/info');
        if (response.ok) {
          const data = await response.json();
          setVendorInfo(data.vendor);
          setProductCount(data.productCount || 0);
        }
      } catch (err) {
        console.error('[v0] Error fetching vendor info:', err);
      }
    };

    fetchVendorInfo();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-blue-600">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome {vendorInfo?.vendor_name || 'Vendor'}</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Home</Button>
            </Link>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded p-6">
            <p className="text-gray-600 text-sm">Products</p>
            <p className="text-3xl font-bold text-blue-600">{productCount}</p>
          </div>
          <div className="bg-white rounded p-6">
            <p className="text-gray-600 text-sm">Status</p>
            <p className="text-lg font-bold text-green-600">Active</p>
          </div>
          <div className="bg-white rounded p-6">
            <p className="text-gray-600 text-sm">Contact</p>
            <p className="text-sm font-semibold">{vendorInfo?.contact_details || 'N/A'}</p>
          </div>
          <div className="bg-white rounded p-6">
            <p className="text-gray-600 text-sm">Address</p>
            <p className="text-sm font-semibold">{vendorInfo?.address || 'N/A'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/vendor/products">
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-6 text-base">
              Product Status
            </Button>
          </Link>
          <Link href="/vendor/request-item">
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-6 text-base">
              Request Item
            </Button>
          </Link>
          <Link href="/vendor/products/add">
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-6 text-base">
              Add Product
            </Button>
          </Link>
          <Link href="/vendor/transactions">
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-6 text-base">
              Transactions
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
