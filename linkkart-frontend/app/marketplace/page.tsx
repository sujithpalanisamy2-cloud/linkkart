'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import {
  Search, Star, Laptop, Shirt, Dumbbell, Home,
  Gamepad2, BookOpen, Sparkles, Package, Link2,
  SlidersHorizontal, ChevronDown, BadgeCheck, Filter,
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Products', icon: Package },
  { id: 'electronics', label: 'Electronics', icon: Laptop },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'beauty', label: 'Beauty', icon: Sparkles },
  { id: 'home', label: 'Home & Living', icon: Home },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'software', label: 'Software', icon: Package },
];

const products = [
  { id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', brand: 'Sony', category: 'electronics', commission: 8, price: 349.99, earnings: 28.0, rating: 4.9, reviews: 12400, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 2, name: 'Apple MacBook Pro 14" M3 Chip', brand: 'Apple', category: 'electronics', commission: 3, price: 1999, earnings: 59.97, rating: 4.9, reviews: 9600, image: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 3, name: 'Samsung 65" QLED 4K Smart TV', brand: 'Samsung', category: 'electronics', commission: 5, price: 1749, earnings: 87.45, rating: 4.8, reviews: 4200, image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 4, name: 'Canon EOS R6 Mark II Mirrorless Camera', brand: 'Canon', category: 'electronics', commission: 4, price: 2499, earnings: 99.96, rating: 4.8, reviews: 2800, image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 5, name: 'Bose QuietComfort 45 Headphones', brand: 'Bose', category: 'electronics', commission: 7, price: 279, earnings: 19.53, rating: 4.7, reviews: 8900, image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 6, name: 'Nike Air Max 270 React Running Shoes', brand: 'Nike', category: 'fashion', commission: 12, price: 120, earnings: 14.4, rating: 4.8, reviews: 8200, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 7, name: "Levi's 511 Slim Fit Stretch Jeans", brand: "Levi's", category: 'fashion', commission: 15, price: 69.5, earnings: 10.43, rating: 4.6, reviews: 18400, image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500', verified: false },
  { id: 8, name: 'Adidas Ultraboost 23 Running Shoes', brand: 'Adidas', category: 'fashion', commission: 10, price: 180, earnings: 18.0, rating: 4.7, reviews: 6300, image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 9, name: 'Ray-Ban Aviator Classic Sunglasses', brand: 'Ray-Ban', category: 'fashion', commission: 18, price: 150, earnings: 27.0, rating: 4.8, reviews: 11200, image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 10, name: 'Charlotte Tilbury Hollywood Glow Kit', brand: 'Charlotte Tilbury', category: 'beauty', commission: 20, price: 75, earnings: 15.0, rating: 4.7, reviews: 6900, image: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 11, name: 'Dyson Airwrap Complete Multi-Styler', brand: 'Dyson', category: 'beauty', commission: 8, price: 599, earnings: 47.92, rating: 4.8, reviews: 4800, image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 12, name: 'Fenty Beauty Pro Filt\'r Foundation', brand: 'Fenty Beauty', category: 'beauty', commission: 18, price: 60, earnings: 10.8, rating: 4.9, reviews: 15600, image: 'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 13, name: 'Dyson V15 Detect Absolute Vacuum', brand: 'Dyson', category: 'home', commission: 6, price: 699, earnings: 41.94, rating: 4.9, reviews: 3100, image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 14, name: 'Instant Pot Duo 7-in-1 Electric Cooker', brand: 'Instant Brands', category: 'home', commission: 6, price: 99.95, earnings: 5.99, rating: 4.9, reviews: 20100, image: 'https://images.pexels.com/photos/4259707/pexels-photo-4259707.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 15, name: 'Philips Hue Smart Lighting Starter Kit', brand: 'Philips', category: 'home', commission: 8, price: 199.99, earnings: 15.99, rating: 4.7, reviews: 12600, image: 'https://images.pexels.com/photos/1125137/pexels-photo-1125137.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 16, name: 'PlayStation 5 Digital Edition Console', brand: 'Sony', category: 'gaming', commission: 4, price: 399, earnings: 15.96, rating: 4.9, reviews: 20800, image: 'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 17, name: 'Xbox Game Pass Ultimate 12 Month', brand: 'Microsoft', category: 'gaming', commission: 25, price: 139.99, earnings: 34.97, rating: 4.7, reviews: 9300, image: 'https://images.pexels.com/photos/1777761/pexels-photo-1777761.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 18, name: 'Razer BlackWidow V4 Pro Keyboard', brand: 'Razer', category: 'gaming', commission: 10, price: 199.99, earnings: 19.99, rating: 4.6, reviews: 5700, image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 19, name: 'The Complete Web Development Bootcamp', brand: 'Udemy', category: 'courses', commission: 40, price: 89.99, earnings: 36.0, rating: 4.8, reviews: 14200, image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 20, name: 'Python for Data Science & ML', brand: 'Coursera', category: 'courses', commission: 35, price: 79.99, earnings: 27.99, rating: 4.7, reviews: 8600, image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 21, name: 'AWS Cloud Practitioner Prep Course', brand: 'A Cloud Guru', category: 'courses', commission: 35, price: 99.99, earnings: 34.97, rating: 4.8, reviews: 5300, image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 22, name: 'Peloton Bike+ Smart Exercise Bike', brand: 'Peloton', category: 'fitness', commission: 5, price: 2495, earnings: 124.75, rating: 4.6, reviews: 2400, image: 'https://images.pexels.com/photos/4162579/pexels-photo-4162579.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 23, name: 'Bowflex SelectTech 552 Dumbbells', brand: 'Bowflex', category: 'fitness', commission: 8, price: 449, earnings: 35.92, rating: 4.8, reviews: 8900, image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 24, name: 'WHOOP 4.0 Fitness & Health Tracker', brand: 'WHOOP', category: 'fitness', commission: 20, price: 239, earnings: 47.8, rating: 4.5, reviews: 6100, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 25, name: 'Adobe Creative Cloud All Apps', brand: 'Adobe', category: 'software', commission: 30, price: 59.99, earnings: 18.0, rating: 4.7, reviews: 5800, image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 26, name: 'Shopify Business Annual Subscription', brand: 'Shopify', category: 'software', commission: 20, price: 299, earnings: 59.8, rating: 4.8, reviews: 11100, image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 27, name: 'NordVPN 2-Year Premium Plan', brand: 'NordVPN', category: 'software', commission: 40, price: 119, earnings: 47.6, rating: 4.6, reviews: 22000, image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
  { id: 28, name: 'Notion Team Workspace Annual', brand: 'Notion', category: 'software', commission: 25, price: 50, earnings: 12.5, rating: 4.8, reviews: 9400, image: 'https://images.pexels.com/photos/6804068/pexels-photo-6804068.jpeg?auto=compress&cs=tinysrgb&w=500', verified: true },
];

const sortOptions = [
  { value: 'default', label: 'Most Popular' },
  { value: 'commission_high', label: 'Highest Commission' },
  { value: 'earnings_high', label: 'Top Earnings' },
  { value: 'rating', label: 'Best Rated' },
  { value: 'price_low', label: 'Lowest Price' },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [showSort, setShowSort] = useState(false);
  const [minCommission, setMinCommission] = useState(0);

  const filtered = useMemo(() => {
    let items = products.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (p.commission < minCommission) return false;
      return true;
    });
    if (sort === 'commission_high') items = [...items].sort((a, b) => b.commission - a.commission);
    else if (sort === 'earnings_high') items = [...items].sort((a, b) => b.earnings - a.earnings);
    else if (sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating);
    else if (sort === 'price_low') items = [...items].sort((a, b) => a.price - b.price);
    return items;
  }, [activeCategory, search, sort, minCommission]);

  const sortLabel = sortOptions.find(o => o.value === sort)?.label || 'Most Popular';

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Product Marketplace</h1>
              <p className="text-gray-500">Browse verified products, generate your affiliate link, and start earning.</p>
            </div>
            <div className="flex items-center gap-5 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{products.length}+</div>
                <div className="text-xs text-gray-400">Products</div>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">40%</div>
                <div className="text-xs text-gray-400">Max commission</div>
              </div>
              <div className="w-px h-8 bg-gray-100" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$124</div>
                <div className="text-xs text-gray-400">Max per sale</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or brands..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 font-medium hover:bg-gray-100 transition-colors min-w-44"
              >
                <SlidersHorizontal size={14} className="text-gray-400" />
                {sortLabel}
                <ChevronDown size={13} className={`text-gray-400 ml-auto transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1">
                  {sortOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => { setSort(o.value); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === o.value ? 'text-gray-900 font-medium bg-gray-50' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-600">
              <Filter size={13} className="text-gray-400 flex-shrink-0" />
              <span className="hidden sm:block whitespace-nowrap">Min {minCommission}%</span>
              <input
                type="range"
                min={0}
                max={30}
                step={5}
                value={minCommission}
                onChange={(e) => setMinCommission(Number(e.target.value))}
                className="w-16 accent-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0 hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">Categories</p>
              <nav className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-left ${
                      activeCategory === cat.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <cat.icon size={14} className={activeCategory === cat.id ? 'text-white' : 'text-gray-400'} />
                    <span>{cat.label}</span>
                    <span className={`ml-auto text-xs ${activeCategory === cat.id ? 'text-gray-300' : 'text-gray-400'}`}>
                      {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-5 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                <p className="text-xs font-semibold text-gray-700 mb-0.5">Highest commission</p>
                <p className="text-2xl font-bold text-gray-900">40%</p>
                <p className="text-xs text-gray-400 mt-1">NordVPN & Udemy</p>
              </div>
            </div>
          </aside>

          {/* Mobile category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 lg:hidden w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === cat.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <cat.icon size={12} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-800">{filtered.length}</span> products
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <Search size={28} className="mx-auto mb-3 text-gray-200" />
                <p className="font-medium text-gray-600">No products found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-md transition-all group">
                    <div className="relative h-48 overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {product.verified && (
                        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-sm">
                          <BadgeCheck size={13} className="text-blue-500" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 h-10">{product.name}</h3>

                      <div className="flex items-center gap-1 mb-4">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                      </div>

                      <div className="flex items-end justify-between mb-4 pt-3 border-t border-gray-50">
                        <div>
                          <p className="text-xs text-gray-400 mb-0.5">Commission</p>
                          <p className="text-lg font-bold text-gray-900">{product.commission}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-0.5">Price</p>
                          <p className="text-sm text-gray-600">${product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-0.5">You earn</p>
                          <p className="text-lg font-bold text-emerald-600">${product.earnings.toFixed(2)}</p>
                        </div>
                      </div>

                      <button className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gray-900 text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                        <Link2 size={12} />
                        Get Affiliate Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
