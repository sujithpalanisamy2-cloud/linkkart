import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowLeft, ExternalLink, Star, BadgeCheck } from 'lucide-react';
import { getProductById } from '../data';

interface MarketplaceProductPageProps {
  params: {
    id: string;
  };
}

export default function MarketplaceProductPage({ params }: MarketplaceProductPageProps) {
  const productId = Number(params.id);
  const product = getProductById(productId);

  if (!product) {
    return notFound();
  }

  const affiliateUrl = `https://www.google.com/search?q=${encodeURIComponent(`${product.brand} ${product.name}`)}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">Marketplace / Product</p>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-600">Earn commission by sharing this product link.</p>
          </div>
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900">
            <ArrowLeft size={16} /> Back to marketplace
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[390px_1fr]">
          <div className="rounded-3xl border border-gray-100 overflow-hidden bg-gray-50 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
          </div>

          <section className="space-y-6">
            <div className="rounded-3xl border border-gray-100 p-6 shadow-sm bg-white">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Brand</p>
                  <p className="text-lg font-semibold text-gray-900">{product.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Commission</p>
                  <p className="text-lg font-semibold text-emerald-600">{product.commission}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="text-xl font-semibold text-gray-900">${product.price}</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-400">You earn</p>
                  <p className="text-xl font-semibold text-emerald-600">${product.earnings.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 p-6 shadow-sm bg-white">
              <div className="flex items-center gap-2 mb-4">
                <Star size={16} className="text-amber-400" />
                <span className="text-sm font-semibold text-gray-900">{product.rating} rating</span>
                <span className="text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <BadgeCheck size={12} /> Verified product
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                  {product.category}
                </span>
              </div>

              <p className="text-sm leading-7 text-gray-600">
                Share this product with your audience and earn when they purchase through your link.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-100 p-6 shadow-sm bg-white">
              <p className="text-sm font-semibold text-gray-900 mb-3">Your affiliate link</p>
              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm break-words text-gray-700">{affiliateUrl}</p>
              </div>
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                <ExternalLink size={16} /> Open product link
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
