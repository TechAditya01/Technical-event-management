'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AddMembershipPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [membershipNumber, setMembershipNumber] = useState('');
  const [durationMonths, setDurationMonths] = useState('6');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch vendors for the dropdown
    const fetchVendors = async () => {
      try {
        const response = await fetch('/api/vendors/list');
        const data = await response.json();
        if (data.success) {
          setVendors(data.vendors || []);
        }
      } catch (err) {
        console.error('[v0] Error fetching vendors:', err);
      }
    };

    fetchVendors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!selectedVendor || !membershipNumber.trim() || !startDate) {
        setError('All fields are required');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/membership/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendorId: parseInt(selectedVendor),
          membershipNumber,
          durationMonths: parseInt(durationMonths),
          startDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to add membership');
        setLoading(false);
        return;
      }

      setSuccess('Membership added successfully!');
      setTimeout(() => {
        router.push('/admin-dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Add Membership</h1>
          <Link href="/admin-dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Vendor Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Vendor</label>
                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-blue-100"
                >
                  <option value="">Choose a vendor...</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.vendor_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Membership Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membership Number</label>
                <Input
                  type="text"
                  placeholder="Enter Membership Number"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  className="bg-blue-100"
                />
              </div>

              {/* Duration Months - Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Duration</label>
                <RadioGroup value={durationMonths} onValueChange={setDurationMonths}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6" id="duration-6" />
                    <label htmlFor="duration-6" className="font-normal cursor-pointer">6 Months (Default)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12" id="duration-12" />
                    <label htmlFor="duration-12" className="font-normal cursor-pointer">1 Year</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24" id="duration-24" />
                    <label htmlFor="duration-24" className="font-normal cursor-pointer">2 Years</label>
                  </div>
                </RadioGroup>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-blue-100"
                />
              </div>

              {error && (
                <Alert className="bg-red-50 border-red-300">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 border-green-300">
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4 pt-6">
                <Link href="/admin-dashboard" className="flex-1">
                  <Button variant="outline" className="w-full" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Membership'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
