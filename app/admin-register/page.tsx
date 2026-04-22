'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userId: '',
    password: '',
    confirmPassword: '',
    approvalCode: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.userId.trim()) newErrors.userId = 'Admin ID is required';
    else if (formData.userId.length < 3) newErrors.userId = 'Admin ID must be at least 3 characters';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.approvalCode) newErrors.approvalCode = 'Approval code is required';
    else if (formData.approvalCode !== 'ADMIN2024') newErrors.approvalCode = 'Invalid approval code';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
          userType: 'admin',
          name: formData.name,
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          useRouter().push('/admin-login');
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
          <h2 className="text-2xl font-bold text-primary mb-2">Registration Successful!</h2>
          <p className="text-slate-600 mb-6">Your admin account has been created. Redirecting to login...</p>
          <div className="animate-spin inline-block w-6 h-6 border-3 border-primary border-t-transparent rounded-full"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-light py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-semibold">
          ← Back to Home
        </Link>

        {/* Card */}
        <div className="card-professional">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Registration</h1>
            <p className="text-slate-600">Create a new administrator account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.name ? 'border-rose-500' : 'border-slate-300'
                }`}
                placeholder="John Doe"
                disabled={loading}
              />
              {errors.name && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.email ? 'border-rose-500' : 'border-slate-300'
                }`}
                placeholder="admin@example.com"
                disabled={loading}
              />
              {errors.email && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.email}</p>}
            </div>

            {/* Admin ID */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Admin ID</label>
              <input
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.userId ? 'border-rose-500' : 'border-slate-300'
                }`}
                placeholder="admin_username"
                disabled={loading}
              />
              {errors.userId && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.userId}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
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
              <label className="block text-sm font-semibold text-slate-900 mb-2">Confirm Password</label>
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

            {/* Approval Code */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-2">
              <p className="text-sm text-slate-700 mb-3"><span className="font-semibold">Approval Code Required:</span> For security, admin registration requires an approval code.</p>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Approval Code</label>
              <input
                type="text"
                value={formData.approvalCode}
                onChange={(e) => setFormData({ ...formData, approvalCode: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.approvalCode ? 'border-rose-500' : 'border-slate-300'
                }`}
                placeholder="Enter approval code"
                disabled={loading}
              />
              {errors.approvalCode && <p className="text-rose-500 text-sm mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.approvalCode}</p>}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 text-rose-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-rose-700">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg"
            >
              {loading ? 'Creating Account...' : 'Create Admin Account'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-slate-600 mt-6">
            Already have an account?{' '}
            <Link href="/admin-login" className="text-primary hover:text-primary/80 font-semibold">
              Login here
            </Link>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">Demo Admin Code:</span> <code className="bg-slate-100 px-2 py-1 rounded">ADMIN2024</code>
          </p>
        </div>
      </div>
    </main>
  );
}

import { Shield } from 'lucide-react';
