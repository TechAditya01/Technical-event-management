'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RequestItemPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Request Item</h1>
          <Link href="/user-portal">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Item request functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
