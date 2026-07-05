'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import StatCards from '@/components/dashboard/stat-cards';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  Bell, Settings, Download, Link2, ExternalLink,
  Trophy, ChevronRight, Copy, Clock, ArrowUpRight,
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', earnings: 4200, conversions: 180 },
  { month: 'Feb', earnings: 5800, conversions: 248 },
  { month: 'Mar', earnings: 4900, conversions: 210 },
  { month: 'Apr', earnings: 7200, conversions: 310 },
  { month: 'May', earnings: 8400, conversions: 362 },
  { month: 'Jun', earnings: 9100, conversions: 395 },
  { month: 'Jul', earnings: 11200, conversions: 482 },
  { month: 'Aug', earnings: 13500, conversions: 584 },
  { month: 'Sep', earnings: 12100, conversions: 521 },
  { month: 'Oct', earnings: 15800, conversions: 680 },
  { month: 'Nov', earnings: 18200, conversions: 782 },
  { month: 'Dec', earnings: 24830, conversions: 1284 },
];

const categoryBreakdown = [
  { name: 'Electronics', pct: 38, amount: '$9,435' },
  { name: 'Software', pct: 22, amount: '$5,462' },
  { name: 'Courses', pct: 18, amount: '$4,469' },
  { name: 'Fashion', pct: 14, amount: '$3,476' },
  { name: 'Others', pct: 8, amount: '$1,986' },
];

const topLinks = [
  { product: 'Sony WH-1000XM5', clicks: 8420, conversions: 342, earnings: '$9,576', cr: '4.1%' },
  { product: 'Adobe Creative Cloud', clicks: 5810, conversions: 290, earnings: '$5,220', cr: '4.9%' },
  { product: 'Shopify Annual Plan', clicks: 4230, conversions: 198, earnings: '$3,960', cr: '4.7%' },
  { product: 'Udemy Bootcamp', clicks: 3980, conversions: 167, earnings: '$2,840', cr: '4.2%' },
  { product: 'PlayStation 5', clicks: 3450, conversions: 145, earnings: '$2,895', cr: '4.2%' },
];

const activities = [
  { text: 'Commission earned — Sony WH-1000XM5 sale', amount: '+$28.00', time: '2 min ago' },
  { text: 'Adobe Creative Cloud link — 12 clicks', amount: null, time: '18 min ago' },
  { text: 'Weekly payout sent to PayPal', amount: '$1,842.00', time: '2 hours ago' },
  { text: 'New brand offer available: Peloton', amount: null, time: '5 hours ago' },
  { text: 'Achievement unlocked — 10K Clicks Club', amount: null, time: 'Yesterday' },
];

const leaderboard = [
  { rank: 1, name: 'Alex Turner', earnings: '$52,400', isMe: false },
  { rank: 2, name: 'Priya Sharma', earnings: '$41,200', isMe: false },
  { rank: 3, name: 'John D. (You)', earnings: '$24,830', isMe: true },
  { rank: 4, name: 'Marcus Chen', earnings: '$19,600', isMe: false },
  { rank: 5, name: 'Emma Wilson', earnings: '$17,200', isMe: false },
];

const periods = ['7D', '30D', '3M', '6M', '1Y'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-lg text-xs">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-gray-500">
            {p.name}: <span className="font-semibold text-gray-800">{p.name === 'earnings' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState('1Y');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-400 mt-0.5">Welcome back, John</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings size={17} />
              </button>
              <Link
                href="/marketplace"
                className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Link2 size={14} />
                New Link
              </Link>
            </div>
          </div>

          <div className="flex gap-0.5 border-b border-transparent -mb-px">
            {['overview', 'earnings', 'links', 'campaigns'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Stat Cards */}
        <StatCards />

        {/* Earnings Line Chart */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Earnings Over Time</h2>
              <p className="text-xs text-gray-400 mt-0.5">Monthly earnings performance</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activePeriod === p
                      ? 'bg-white shadow-sm text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two column: Conversions bar + Category breakdown */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Conversions Bar Chart */}
          <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Monthly Conversions</h2>
                <p className="text-xs text-gray-400 mt-0.5">Total sales per month</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 rounded-lg hover:bg-gray-100 transition-colors">
                <Download size={12} />
                Export
              </button>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="conversions" fill="#bfdbfe" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">Revenue by Category</h2>
            <p className="text-xs text-gray-400 mb-6">This month's breakdown</p>
            <div className="space-y-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{cat.amount}</span>
                      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{cat.pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-200 rounded-full"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: Top Links + Right column */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Performing Links */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">Top Performing Links</h2>
              <Link
                href="/marketplace"
                className="text-xs text-gray-500 font-medium flex items-center gap-1 hover:text-gray-700"
              >
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left text-xs text-gray-400 font-medium pb-3">Product</th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3">Clicks</th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3 hidden sm:table-cell">Conv.</th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3">Earnings</th>
                  <th className="text-right text-xs text-gray-400 font-medium pb-3 hidden sm:table-cell">CR</th>
                  <th className="pb-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {topLinks.map((link, i) => (
                  <tr key={link.product} className={`${i < topLinks.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <td className="py-3.5 text-gray-800 text-sm font-medium truncate max-w-36">{link.product}</td>
                    <td className="py-3.5 text-right text-gray-500 text-xs">{link.clicks.toLocaleString()}</td>
                    <td className="py-3.5 text-right text-gray-500 text-xs hidden sm:table-cell">{link.conversions}</td>
                    <td className="py-3.5 text-right text-gray-900 text-sm font-semibold">{link.earnings}</td>
                    <td className="py-3.5 text-right hidden sm:table-cell">
                      <span className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-0.5">
                        <ArrowUpRight size={11} />{link.cr}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <button className="p-1 text-gray-300 hover:text-gray-600 transition-colors ml-2">
                        <Copy size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Leaderboard */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={15} className="text-gray-400" />
                <h2 className="text-sm font-semibold text-gray-900">Monthly Leaderboard</h2>
              </div>
              <div className="space-y-1">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                      entry.isMe ? 'bg-blue-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <span className="text-xs text-gray-400 w-4 font-medium">#{entry.rank}</span>
                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600">
                      {entry.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className={`text-xs flex-1 truncate ${entry.isMe ? 'text-blue-700 font-semibold' : 'text-gray-700 font-medium'}`}>
                      {entry.name}
                    </span>
                    <span className="text-xs font-semibold text-gray-800">{entry.earnings}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 leading-relaxed">{a.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-300">{a.time}</span>
                        {a.amount && <span className="text-xs font-semibold text-gray-700">{a.amount}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Link2, label: 'Generate Link', desc: 'Create tracking link', href: '/marketplace' },
            { icon: Download, label: 'Export Report', desc: 'Download analytics CSV', href: '#' },
            { icon: ExternalLink, label: 'Browse Products', desc: 'Find new products', href: '/marketplace' },
            { icon: Trophy, label: 'View Rankings', desc: 'Monthly leaderboard', href: '#' },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col gap-3"
            >
              <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">
                <action.icon size={16} className="text-gray-500" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{action.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
