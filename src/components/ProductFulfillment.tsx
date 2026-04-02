'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Clock, ExternalLink, AlertTriangle, ShieldAlert } from 'lucide-react';
import { CartRecommendation, FulfillmentProduct } from '@/lib/types';

interface ProductFulfillmentProps {
  items: CartRecommendation[];
}

interface FetchedResult {
  recommendation: CartRecommendation;
  products: FulfillmentProduct[];
  isLoading: boolean;
  error?: string;
}

export default function ProductFulfillment({ items }: ProductFulfillmentProps) {
  const [results, setResults] = useState<FetchedResult[]>([]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Initialize state with loading flags
    const initials = items.map(item => ({
      recommendation: item,
      products: [],
      isLoading: true
    }));
    setResults(initials);

    // Fetch prices for each item independently
    items.forEach(async (item, index) => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(item.item)}`);
        const data = await res.json();
        
        setResults(prev => {
          const raw = [...prev];
          raw[index] = {
            ...raw[index],
            isLoading: false,
            products: data.results || []
          };
          return raw;
        });
      } catch (err) {
        setResults(prev => {
          const raw = [...prev];
          raw[index] = {
            ...raw[index],
            isLoading: false,
            error: 'Failed to find products'
          };
          return raw;
        });
      }
    });
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full mt-2 mb-4 space-y-4">
      <div className="flex items-center gap-2 mb-2 px-1">
        <ShoppingCart size={16} className="text-healing-600" />
        <span className="text-sm font-semibold text-slate-800">Prognos Cart - Recommended Items</span>
      </div>

      <div className="flex flex-col gap-5">
        {results.map((result, idx) => (
          <div key={idx} className="w-full">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">
              {result.recommendation.item}
              {result.recommendation.requiresPrescription && (
                <span className="ml-2 inline-flex items-center gap-1 bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                  <ShieldAlert size={10} /> Rx Required
                </span>
              )}
            </div>

            {result.isLoading ? (
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 snap-x no-scrollbar">
                {[1, 2].map(skeleton => (
                  <div key={skeleton} className="flex-shrink-0 w-64 h-32 rounded-xl bg-slate-100 animate-pulse border border-slate-200 snap-center" />
                ))}
              </div>
            ) : result.error || result.products.length === 0 ? (
              <div className="text-sm text-slate-400 italic px-1">No direct purchase links found.</div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-4 px-1 snap-x scrollbar-hide">
                {result.products.map(prod => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-shrink-0 w-64 md:w-72 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col snap-center hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 flex gap-3 h-24">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 border border-slate-100 p-1 flex items-center justify-center">
                        <img src={prod.imageUrl} alt={prod.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-slate-800 line-clamp-2 leading-tight mb-1" title={prod.name}>
                          {prod.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">₹{prod.price}</span>
                          {prod.originalPrice && prod.originalPrice > prod.price && (
                            <span className="text-xs text-slate-400 line-through">₹{prod.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-slate-50 p-2.5 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                        {prod.platform === 'Blinkit' && (
                          <div className="w-4 h-4 bg-yellow-400 rounded flex items-center justify-center font-bold text-[10px] text-green-800">B</div>
                        )}
                        {prod.platform === 'Amazon' && (
                          <div className="w-4 h-4 bg-slate-900 rounded flex items-center justify-center font-bold text-[10px] text-white">a</div>
                        )}
                        {prod.platform === 'Zepto' && (
                          <div className="w-4 h-4 bg-purple-600 rounded flex items-center justify-center font-bold text-[10px] text-white">Z</div>
                        )}
                        {prod.platform === 'Tata 1mg' && (
                          <div className="w-4 h-4 bg-orange-600 rounded flex items-center justify-center font-bold text-[10px] text-white">1</div>
                        )}
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs">
                          <Clock size={10} /> {prod.deliveryTime}
                        </span>
                      </div>

                      {result.recommendation.requiresPrescription ? (
                        <button disabled className="bg-slate-200 text-slate-400 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-not-allowed">
                          <AlertTriangle size={12} /> Consult Doctor
                        </button>
                      ) : (
                        <a
                          href={prod.addToCartUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 text-white ${
                            prod.platform === 'Amazon' ? 'bg-amber-400 hover:bg-amber-500 !text-slate-900' :
                            prod.platform === 'Blinkit' ? 'bg-green-600 hover:bg-green-700' :
                            prod.platform === 'Zepto' ? 'bg-purple-600 hover:bg-purple-700' :
                            'bg-orange-600 hover:bg-orange-700'
                          }`}
                        >
                          {prod.platform === 'Amazon' ? 'Add to Cart' : 'Buy Now'} <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
