'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function DemoAccountsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const accounts = [
    {
      role: 'Administrator',
      userId: 'admin',
      password: 'admin123',
      loginUrl: '/admin-login',
      color: 'primary',
      description: 'Full system access - manage all users, vendors, memberships, and view analytics'
    },
    {
      role: 'Vendor - Catering',
      userId: 'vendor_catering',
      password: 'vendor123',
      loginUrl: '/vendor-login',
      color: 'secondary',
      description: 'Manage products, memberships, and view transaction history'
    },
    {
      role: 'Vendor - Florist',
      userId: 'vendor_florist',
      password: 'vendor123',
      loginUrl: '/vendor-login',
      color: 'secondary',
      description: 'Manage products, memberships, and view transaction history'
    },
    {
      role: 'Customer User',
      userId: 'user_demo',
      password: 'user123',
      loginUrl: '/user-login',
      color: 'accent',
      description: 'Browse vendors, shop for services, manage cart and track orders'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-light py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 font-semibold">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-primary mb-4">Demo Accounts</h1>
          <p className="text-xl text-slate-600">
            Use these credentials to explore EventHub. Perfect for mentors and evaluators.
          </p>
        </div>

        {/* Info Card */}
        <div className="card-professional mb-12 bg-blue-50 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-primary mb-2">How to Use</h3>
          <p className="text-slate-700">
            Click on any account below and use the provided credentials to log in. Each role has different permissions and features to explore.
          </p>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {accounts.map((account, i) => (
            <div key={i} className="card-professional hover:shadow-lg transition-shadow border-l-4 border-primary">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{account.role}</h3>
                <p className="text-slate-600">{account.description}</p>
              </div>

              {/* Credentials */}
              <div className="space-y-4 mb-6 bg-slate-50 p-4 rounded-lg">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">User ID / Username</label>
                  <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-200">
                    <code className="font-mono text-sm text-primary font-bold">{account.userId}</code>
                    <button
                      onClick={() => copyToClipboard(account.userId, `userid-${i}`)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied === `userid-${i}` ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Password</label>
                  <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-200">
                    <code className="font-mono text-sm text-primary font-bold">{account.password}</code>
                    <button
                      onClick={() => copyToClipboard(account.password, `password-${i}`)}
                      className="p-1 hover:bg-slate-100 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied === `password-${i}` ? (
                        <Check className="w-4 h-4 text-secondary" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Link href={account.loginUrl}>
                <Button className="w-full btn-primary">
                  Login as {account.role}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Features to Test */}
        <div className="card-professional bg-amber/5 border-l-4 border-amber-500 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Features to Explore</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-3 text-lg">Admin Features</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Manage vendor memberships (6mo, 1yr, 2yr)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Add and update users and vendors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>View reports and analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Track all transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>User and vendor management</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-secondary mb-3 text-lg">Vendor Features</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Add and manage products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Update product status</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>View transaction history</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Check order requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Dashboard with vendor info</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-semibold text-amber-600 mb-3 text-lg">Customer Features</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Browse all vendors by category</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>View vendor products and details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Add items to shopping cart</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Checkout with complete order details</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-3 font-bold">✓</span>
                  <span>Track order status and history</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card-professional bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Important Notes</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>All accounts are pre-configured and ready to use</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Sessions expire after 24 hours. Simply log in again to continue</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Passwords are hashed and stored securely in the database</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Each role has specific access permissions enforced by middleware</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 font-bold">•</span>
              <span>Form validations are implemented on all pages</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
