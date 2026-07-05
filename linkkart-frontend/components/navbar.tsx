'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

const navItems = [
  {
    label: 'Platform',
    children: [
      { label: 'Link Generator', href: '/features#platform', desc: 'Create tracking links instantly' },
      { label: 'Analytics', href: '/dashboard', desc: 'Real-time performance data' },
      { label: 'AI Recommendations', href: '/features#ai', desc: 'Smart product suggestions' },
      { label: 'Campaign Manager', href: '/features#campaigns', desc: 'End-to-end campaign control' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'For Affiliates', href: '/features#affiliates', desc: 'Monetize your audience' },
      { label: 'For Merchants', href: '/features#merchants', desc: 'Scale through partners' },
      { label: 'For Networks', href: '/features#networks', desc: 'Manage at enterprise scale' },
    ],
  },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {announcementVisible && (
        <div className="bg-gray-900 text-white text-sm py-2.5 px-4 text-center relative">
          <span className="text-gray-300">AI-powered affiliate matching is now live —</span>
          <Link href="/register" className="ml-1.5 text-white font-semibold underline underline-offset-2 hover:text-gray-200 transition-colors">
            Try it free
          </Link>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <nav
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-sm' : ''
        } border-b border-gray-100`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-0 flex-shrink-0">
              <span className="text-xl font-bold tracking-tight text-gray-900">Linkkart</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                      {item.label}
                      <ChevronDown size={13} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 z-50">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-800">{child.label}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{child.desc}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'text-gray-900 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Get started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</div>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="block px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-2">
              <Link href="/login" className="block text-center py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl">Log in</Link>
              <Link href="/register" className="block text-center py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-xl">Get started</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
