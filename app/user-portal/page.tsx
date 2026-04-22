'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function UserPortal() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userName, setUserName] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const categories = ['all', 'Catering', 'Florist', 'Decoration', 'Lighting'];

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserName(user.name || user.userId);
    }

    fetchVendors();
    fetchCartCount();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/vendors/list');
      const data = await response.json();
      if (data.success) {
        setVendors(data.vendors || []);
        setFilteredVendors(data.vendors || []);
      }
    } catch (err) {
      console.error('[v0] Error fetching vendors:', err);
    }
  };

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart/count');
      const data = await response.json();
      if (data.success) {
        setCartCount(data.count || 0);
      }
    } catch (err) {
      console.error('[v0] Error fetching cart count:', err);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(vendors.filter((v) => v.vendor_name?.includes(category)));
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">WELCOME USER</h1>
            {userName && <p className="text-sm">{userName}</p>}
          </div>
          <div className="flex gap-4">
            <Link href="/user-portal/cart">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Cart ({cartCount})
              </Button>
            </Link>
            <Link href="/user-portal/guest-list">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Guest List</Button>
            </Link>
            <Link href="/user-portal/order-status">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">Order Status</Button>
            </Link>
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700">LogOut</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => handleCategoryFilter(cat)}
                className={selectedCategory === cat ? 'bg-blue-600' : ''}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredVendors.map((vendor) => (
            <Card key={vendor.id} className="bg-blue-600 text-white">
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold mb-2">{vendor.vendor_name}</h3>
                <p className="text-sm mb-4">{vendor.contact_details}</p>
                <Link href={`/user-portal/vendor/${vendor.id}`}>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Shop Item
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No vendors found</p>
          </div>
        )}
      </div>
    </main>
  );
}
