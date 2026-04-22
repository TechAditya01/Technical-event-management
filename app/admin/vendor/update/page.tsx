'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function UpdateVendorPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Update Vendor</h1>
          <Link href="/admin-dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Vendor Update Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Update vendor information functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
