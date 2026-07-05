'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Chrome, Check } from 'lucide-react';

const plans = [
  { id: 'affiliate', label: 'Affiliate', desc: 'Promote products & earn commissions' },
  { id: 'merchant', label: 'Merchant', desc: 'List products & grow through partners' },
];

const benefits = [
  'Access to 10,000+ products across all categories',
  'AI-powered product recommendations',
  'Real-time analytics and earnings dashboard',
  'Free link generator and QR codes',
  'Weekly payouts with no minimum (Pro)',
  'Dedicated affiliate manager on paid plans',
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('affiliate');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1200);
  };

  const passwordStrength =
    form.password.length === 0 ? 0 :
    form.password.length < 6 ? 1 :
    form.password.length < 10 ? 2 :
    form.password.length < 14 ? 3 : 4;

  const strengthColor = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-emerald-500'][passwordStrength];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gray-950 flex-col justify-between p-12">
        <Link href="/" className="text-xl font-bold text-white">
          Linkkart
        </Link>

        <div>
          <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
            Join the world's fastest-growing affiliate network
          </h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">
            Start earning today with zero upfront costs.
          </p>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={11} className="text-emerald-400" />
                </div>
                <span className="text-gray-400 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-800 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <img
              src="https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="David"
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                "I signed up expecting decent results. Three months later I was making $22K a month. Linkkart is the real deal."
              </p>
              <p className="text-white font-semibold text-sm">David Park</p>
              <p className="text-gray-500 text-xs">YouTuber · $22K/month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <Link href="/" className="text-xl font-bold text-gray-900 mb-8 block lg:hidden">
            Linkkart
          </Link>

          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your free account</h1>
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-gray-900 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className={`text-sm font-bold mb-0.5 ${selectedPlan === plan.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {plan.label}
                </div>
                <div className="text-xs text-gray-400">{plan.desc}</div>
              </button>
            ))}
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-5">
            <Chrome size={16} className="text-blue-500" />
            Sign up with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColor : 'bg-gray-100'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 text-sm mt-1"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create free account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            By signing up, you agree to our{' '}
            <Link href="/" className="text-gray-600 hover:text-gray-800">Terms</Link>
            {' '}and{' '}
            <Link href="/" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
