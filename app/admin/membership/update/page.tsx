'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function UpdateMembershipPage() {
  const [membershipNumber, setMembershipNumber] = useState('');
  const [membershipData, setMembershipData] = useState<any>(null);
  const [action, setAction] = useState('extend');
  const [extensionMonths, setExtensionMonths] = useState('6');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    setError('');
    setMembershipData(null);
    setSearching(true);

    try {
      if (!membershipNumber.trim()) {
        setError('Please enter a membership number');
        setSearching(false);
        return;
      }

      const response = await fetch(
        `/api/membership/update?membershipNumber=${encodeURIComponent(membershipNumber)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Membership not found');
        setSearching(false);
        return;
      }

      setMembershipData(data.membership);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!membershipNumber.trim() || !action) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/membership/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          membershipNumber,
          action,
          extensionMonths: action === 'extend' ? parseInt(extensionMonths) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to update membership');
        setLoading(false);
        return;
      }

      setSuccess(`Membership ${action === 'extend' ? 'extended' : 'cancelled'} successfully!`);
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
          <h1 className="text-3xl font-bold text-gray-900">Update Membership</h1>
          <Link href="/admin-dashboard">
            <Button variant="outline">Back</Button>
          </Link>
        </div>

        <Card>
          <CardContent className="pt-6">
            {/* Search Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <label className="block text-sm font-medium text-gray-700 mb-2">Membership Number</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter Membership Number"
                  value={membershipNumber}
                  onChange={(e) => setMembershipNumber(e.target.value)}
                  className="bg-blue-100 flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={searching || !membershipNumber.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {searching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-300 mb-4">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {membershipData && (
              <>
                {/* Membership Details */}
                <div className="mb-6 p-4 bg-blue-50 rounded space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Vendor</p>
                      <p className="font-semibold">{membershipData.vendors?.vendor_name || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Status</p>
                      <p className="font-semibold capitalize">{membershipData.status}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Start Date</p>
                      <p className="font-semibold">{membershipData.start_date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">End Date</p>
                      <p className="font-semibold">{membershipData.end_date}</p>
                    </div>
                  </div>
                </div>

                {/* Action Selection */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Update Action</label>
                    <RadioGroup value={action} onValueChange={setAction}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="extend" id="action-extend" />
                        <label htmlFor="action-extend" className="font-normal cursor-pointer">
                          Extend Membership
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cancel" id="action-cancel" />
                        <label htmlFor="action-cancel" className="font-normal cursor-pointer">
                          Cancel Membership
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {action === 'extend' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Extension Duration</label>
                      <RadioGroup value={extensionMonths} onValueChange={setExtensionMonths}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="6" id="ext-6" />
                          <label htmlFor="ext-6" className="font-normal cursor-pointer">6 Months (Default)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="12" id="ext-12" />
                          <label htmlFor="ext-12" className="font-normal cursor-pointer">1 Year</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="24" id="ext-24" />
                          <label htmlFor="ext-24" className="font-normal cursor-pointer">2 Years</label>
                        </div>
                      </RadioGroup>
                    </div>
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
                      {loading ? 'Updating...' : 'Update'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
