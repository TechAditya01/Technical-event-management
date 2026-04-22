'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Shield, Store, TrendingUp, Lock, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EMS</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">EventHub</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-primary transition-colors font-medium">Features</a>
            <a href="#roles" className="text-slate-600 hover:text-primary transition-colors font-medium">Get Started</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
                <span className="text-secondary font-semibold text-sm">Welcome to EventHub</span>
              </div>
              <h2 className="text-5xl font-bold text-primary leading-tight">
                Manage Your Events with Confidence
              </h2>
              <p className="text-xl text-slate-600">
                Connect vendors, manage memberships, and streamline your event management process. All in one powerful platform.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                'Comprehensive vendor management system',
                'Real-time order tracking and analytics',
                'Secure membership and transaction management'
              ].map((feature, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-secondary/10">
                      <span className="text-secondary font-bold">✓</span>
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/event-hero.jpg"
              alt="Event Management"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-primary mb-4">Why Choose EventHub?</h3>
            <p className="text-lg text-slate-600">Everything you need to manage events professionally</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Track sales, transactions, and vendor performance in real-time' },
              { icon: Lock, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data and transactions' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Real-time updates and instant notifications for all events' },
              { icon: Users, title: 'Team Collaboration', desc: 'Multi-user access with role-based controls and permissions' },
              { icon: Shield, title: 'Payment Ready', desc: 'Secure support for multiple payment methods' },
              { icon: Store, title: 'Mobile Friendly', desc: 'Seamless experience on all devices and screen sizes' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card-professional text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-primary mb-2">{feature.title}</h4>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-primary mb-4">Choose Your Role</h3>
          <p className="text-lg text-slate-600">Select your account type to get started</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Admin Card */}
          <div className="card-professional group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary hover:-translate-y-1">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-primary mb-3 text-center">Administrator</h4>
            <p className="text-slate-600 text-center mb-6">Full system access. Manage all users, vendors, memberships, and view comprehensive analytics.</p>
            <div className="space-y-3">
              <Link href="/admin-login" className="block">
                <Button className="w-full btn-primary">Admin Login</Button>
              </Link>
              <Link href="/admin-register" className="block">
                <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Register as Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Vendor Card */}
          <div className="card-professional group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary hover:-translate-y-1">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Store className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3 text-center">Vendor</h4>
            <p className="text-slate-600 text-center mb-6">Manage your products, memberships, view sales transactions and performance metrics.</p>
            <div className="space-y-3">
              <Link href="/vendor-login" className="block">
                <Button className="w-full btn-secondary">Vendor Login</Button>
              </Link>
              <Link href="/vendor-register" className="block">
                <Button variant="outline" className="w-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white">
                  Register as Vendor
                </Button>
              </Link>
            </div>
          </div>

          {/* User Card */}
          <div className="card-professional group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-amber-500 hover:-translate-y-1">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-3 text-center">Customer</h4>
            <p className="text-slate-600 text-center mb-6">Browse vendors, shop for services, manage your cart, and track all your orders.</p>
            <div className="space-y-3">
              <Link href="/user-login" className="block">
                <Button className="w-full bg-amber-600 text-white hover:bg-amber-700">User Login</Button>
              </Link>
              <Link href="/user-signup" className="block">
                <Button variant="outline" className="w-full border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Access */}
        <div className="mt-16 text-center p-8 bg-white rounded-xl shadow-card">
          <p className="text-slate-600 text-lg mb-4 font-medium">Want to explore without creating an account?</p>
          <Link href="/demo-accounts">
            <Button className="px-8 py-3 btn-primary flex items-center justify-center mx-auto">
              View Demo Accounts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">EventHub</h5>
              <p className="text-white/70 text-sm">Professional event management platform for organizers and vendors.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#roles" className="hover:text-white transition-colors">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">For Users</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="/user-login" className="hover:text-white transition-colors">Login</a></li>
                <li><a href="/user-signup" className="hover:text-white transition-colors">Sign Up</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2024 EventHub. Professional Event Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
