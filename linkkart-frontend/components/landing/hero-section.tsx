'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { label: 'Active Affiliates', display: (n: number) => `${Math.floor(n / 1000)}K+`, target: 50000 },
  { label: 'Partner Brands', display: (n: number) => `${Math.floor(n / 1000)}K+`, target: 10000 },
  { label: 'Revenue Generated', display: (n: number) => `$${n}M+`, target: 100 },
  { label: 'Countries', display: (n: number) => `${n}+`, target: 120 },
];

export default function HeroSection() {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const counts = [
    useCountUp(50000, 2000, animated),
    useCountUp(10000, 2000, animated),
    useCountUp(100, 2000, animated),
    useCountUp(120, 2000, animated),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-600">Trusted by 50,000+ affiliates worldwide</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Grow your business through smart affiliate partnerships
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
              Linkkart connects creators and brands. Track every click, earn on every sale, and scale your income with tools built for serious marketers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-14">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm"
              >
                Start for free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/marketplace"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Browse marketplace
              </Link>
            </div>

            <div className="flex items-center gap-5 text-sm text-gray-400">
              <span>No credit card required</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Free forever plan</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Setup in minutes</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
              <img
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Team collaborating"
                className="w-full h-[440px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 pt-12 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.display(counts[i])}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
