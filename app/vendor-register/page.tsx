'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Eye, EyeOff, Store } from 'lucide-react';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vendorName: '',
    contactName: '',
    email: '',
    userId: '',
    password: '',
    confirmPassword: '',
    vendorType: 'catering',
    contactDetails: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const vendorTypes = [
    { value: 'catering', label: 'Catering Services' },
    { value: 'florist', label: 'Florist' },
    { value: 'decoration', label: 'Decoration' },
    { value: 'lighting', label: 'Lighting Services' },
    { value: 'photography', label: 'Photography' },
    { value: 'venue', label: 'Venue' }
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vendorName.trim()) newErrors.vendorName = 'Business name is required';
    if (!formData.vendorType) newErrors.vendorType = 'Please select a vendor type';
    if (!formData.contactDetails.trim()) newErrors.contactDetails = 'Contact number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.contactName.trim()) newErrors.contactName = 'Contact person name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.userId.trim()) newErrors.userId = 'Vendor ID is required';
    else if (formData.userId.length < 3) newErrors.userId = 'Vendor ID must be at least 3 characters';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
          userType: 'vendor',
          name: formData.contactName,
          email: formData.email,
          vendorName: formData.vendorName,
          vendorType: formData.vendorType,
          contactDetails: formData.contactDetails,
          address: formData.address
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/vendor-login');
        }, 2000);
      } else {
        setErrors({ submit: data.error || 'Registration failed' });
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-light flex items-center justify-center py-12 px-4">
        <div className="card-professional max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Welcome to EventHub!</h2>
          <p className="text-slate-600 mb-6">Your vendor account has been created. Redirecting to login...</p>
          <div className="animate-spin inline-block w-6 h-6 border-3 border-primary border-t-transparent rounded-full"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-light py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-semibold">
          ← Back to Home
        </Link>

        {/* Card */}
        <div className="card-professional">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Store className="w-6 h-6 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Vendor Registration</h1>
            <p className="text-slate-600">Join our platform and start selling</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${
              step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
            <div className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${
              step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Business Information</h2>
                  <p className="text-slate-600 text-sm">Tell us about your business</p>
                </div>

                {/* Vendor Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Business Name *</label>
                  <input
                    type="text"
                    value={formData.vendorName}
                    onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.vendorName ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="e.g., Gourmet Catering Co."
                    disabled={loading}
                  />
                  {errors.vendorName && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.vendorName}</p>}
                </div>

                {/* Vendor Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Business Type *</label>
                  <select
                    value={formData.vendorType}
                    onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.vendorType ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    disabled={loading}
                  >
                    {vendorTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.vendorType && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.vendorType}</p>}
                </div>

                {/* Contact Details */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    value={formData.contactDetails}
                    onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.contactDetails ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="+91 98765 43210"
                    disabled={loading}
                  />
                  {errors.contactDetails && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.contactDetails}</p>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Business Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.address ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="Full business address"
                    disabled={loading}
                  />
                  {errors.address && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.address}</p>}
                </div>

                {/* Next Button */}
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="w-full btn-primary py-3 text-lg"
                >
                  Next: Account Details
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Account Information</h2>
                  <p className="text-slate-600 text-sm">Create your login credentials</p>
                </div>

                {/* Contact Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Contact Person Name *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.contactName ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="John Doe"
                    disabled={loading}
                  />
                  {errors.contactName && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.contactName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.email ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="vendor@example.com"
                    disabled={loading}
                  />
                  {errors.email && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Vendor ID (Login Username) *</label>
                  <input
                    type="text"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                      errors.userId ? 'border-rose-500' : 'border-slate-300'
                    }`}
                    placeholder="vendor_catering"
                    disabled={loading}
                  />
                  {errors.userId && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.userId}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                        errors.password ? 'border-rose-500' : 'border-slate-300'
                      }`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                        errors.confirmPassword ? 'border-rose-500' : 'border-slate-300'
                      }`}
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-700"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.confirmPassword}</p>}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-rose-700">{errors.submit}</p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    disabled={loading}
                    className="flex-1 py-3 text-lg border-2 border-slate-300"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-secondary py-3 text-lg"
                  >
                    {loading ? 'Creating Account...' : 'Create Vendor Account'}
                  </Button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-600 mt-6">
            Already have an account?{' '}
            <Link href="/vendor-login" className="text-primary hover:text-primary/80 font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
