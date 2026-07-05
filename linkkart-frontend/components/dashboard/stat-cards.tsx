import { DollarSign, MousePointer, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  {
    icon: DollarSign,
    label: 'Total Earnings',
    value: '$24,830',
    change: '+18.3%',
    up: true,
    sub: 'vs last month',
  },
  {
    icon: MousePointer,
    label: 'Total Clicks',
    value: '284,932',
    change: '+12.1%',
    up: true,
    sub: 'vs last month',
  },
  {
    icon: Users,
    label: 'Conversions',
    value: '1,284',
    change: '+8.7%',
    up: true,
    sub: 'vs last month',
  },
  {
    icon: TrendingUp,
    label: 'Conversion Rate',
    value: '4.28%',
    change: '-0.3%',
    up: false,
    sub: 'vs last month',
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">
              <stat.icon size={16} className="text-gray-500" />
            </div>
            <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {stat.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
          <div className="text-xs text-gray-300 mt-1">{stat.sub}</div>
        </div>
      ))}
    </div>
  );
}
