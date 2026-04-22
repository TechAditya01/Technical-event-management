'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get user info from session
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserName(user.name || user.userId);
    }
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('userInfo');
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Admin</h1>
            {userName && <p className="text-gray-600 mt-1">{userName}</p>}
          </div>
          <Link href="/">
            <Button variant="outline">Home</Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Maintenance Section */}
          <Card className="border-2 border-green-300">
            <CardHeader>
              <CardTitle className="text-xl">Maintenance Menu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Membership Management</p>
                <div className="flex gap-2">
                  <Link href="/admin/membership/add" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add</Button>
                  </Link>
                  <Link href="/admin/membership/update" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Update</Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-700">User Management</p>
                <div className="flex gap-2">
                  <Link href="/admin/user/add" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add</Button>
                  </Link>
                  <Link href="/admin/user/update" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Update</Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Vendor Management</p>
                <div className="flex gap-2">
                  <Link href="/admin/vendor/add" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add</Button>
                  </Link>
                  <Link href="/admin/vendor/update" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Update</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports & Transactions Section */}
          <Card className="border-2 border-blue-300">
            <CardHeader>
              <CardTitle className="text-xl">Reports & Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/reports" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">View Reports</Button>
              </Link>
              <Link href="/admin/transactions" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">View Transactions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
