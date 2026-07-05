'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Mail, Lock, Chrome } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1200);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-950 relative flex-col justify-between p-12">
        <Link href="/" className="text-xl font-bold text-white">
          Linkkart
        </Link>

        <div>
          <h2 className="text-3xl font-bold text-white mb-5 leading-snug">
            The affiliate platform built for serious marketers
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Track every click, earn on every sale, and scale your income with tools that actually work.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg. Monthly Earnings', value: '$8,200' },
              { label: 'Active Affiliates', value: '50K+' },
              { label: 'Partner Brands', value: '10K+' },
              { label: 'Countries', value: '120+' },
            ].map((stat) => (
              <div key={stat.label} className="border border-gray-800 rounded-xl p-4">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-800 rounded-xl p-5">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            "Linkkart helped me replace my full-time income in 6 months. The AI recommendations are genuinely accurate — not just random products."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=80"
              alt="Sarah"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-white font-medium text-sm">Sarah Mitchell</p>
              <p className="text-gray-500 text-xs">Full-time affiliate · $18K/month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <Link href="/" className="text-xl font-bold text-gray-900 mb-8 block lg:hidden">
            Linkkart
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-gray-900 font-semibold hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          {/* Google */}
          <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-5">
            <Chrome size={16} className="text-blue-500" />
            Continue with Google
          </button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-11 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60 text-sm mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign in <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6">
            By signing in, you agree to our{' '}
            <Link href="/" className="text-gray-600 hover:text-gray-800">Terms</Link>
            {' '}and{' '}
            <Link href="/" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
