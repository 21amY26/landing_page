'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [results, setResults] = useState<Record<string, FetchedResult>>({});
  const itemKeys = useMemo(
    () => items.map((item, index) => `${index}-${item.item}`),
    [items]
  );

  useEffect(() => {
    if (!items || items.length === 0) return;

    let isCancelled = false;

    items.forEach(async (item, index) => {
      const key = `${index}-${item.item}`;

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(item.item)}`);
        const data = await res.json();

        if (isCancelled) return;

        setResults((prev) => ({
          ...prev,
          [key]: {
            recommendation: item,
            products: data.results || [],
            isLoading: false,
          },
        }));
      } catch {
        if (isCancelled) return;

        setResults((prev) => ({
          ...prev,
          [key]: {
            recommendation: item,
            products: [],
            isLoading: false,
            error: 'Failed to find products',
          },
        }));
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-4 mt-2 w-full space-y-4">
      <div className="mb-2 flex items-center gap-2 px-1">
        <ShoppingCart size={16} className="text-[var(--accent)]" />
        <span className="text-sm font-semibold text-white">Prognos Cart - Recommended Items</span>
      </div>

      <div className="flex flex-col gap-5">
        {items.map((item, index) => {
          const key = itemKeys[index];
          const result = results[key] ?? {
            recommendation: item,
            products: [],
            isLoading: true,
          };

          return (
            <div key={key} className="w-full">
              <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-white/55">
                {result.recommendation.item}
                {result.recommendation.requiresPrescription && (
                  <span className="ml-2 inline-flex items-center gap-1 rounded bg-red-500/14 px-1.5 py-0.5 text-[10px] font-bold text-red-200">
                    <ShieldAlert size={10} /> Rx Required
                  </span>
                )}
              </div>

              {result.isLoading ? (
                <div className="flex snap-x gap-3 overflow-x-auto px-1 pb-4">
                  {[1, 2].map((skeleton) => (
                    <div
                      key={skeleton}
                      className="h-32 w-64 flex-shrink-0 snap-center rounded-xl border border-white/10 bg-white/[0.05] animate-pulse md:w-72"
                    />
                  ))}
                </div>
              ) : result.error || result.products.length === 0 ? (
                <div className="px-1 text-sm italic text-white/42">No direct purchase links found.</div>
              ) : (
                <div className="flex snap-x gap-3 overflow-x-auto px-1 pb-4">
                  {result.products.map((prod) => (
                    <motion.div
                      key={prod.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex w-64 flex-shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] shadow-[0_12px_30px_rgba(0,0,0,0.14)] md:w-72"
                    >
                      <div className="flex h-24 gap-3 p-3">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] p-1">
                          <img src={prod.imageUrl} alt={prod.name} className="max-h-full max-w-full object-contain" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="mb-1 line-clamp-2 text-sm font-semibold leading-tight text-white" title={prod.name}>
                            {prod.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">₹{prod.price}</span>
                            {prod.originalPrice && prod.originalPrice > prod.price && (
                              <span className="text-xs text-white/35 line-through">₹{prod.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between border-t border-white/8 bg-black/10 p-2.5">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                          {prod.platform === 'Blinkit' && (
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-yellow-400 text-[10px] font-bold text-green-800">B</div>
                          )}
                          {prod.platform === 'Amazon' && (
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-slate-900 text-[10px] font-bold text-white">a</div>
                          )}
                          {prod.platform === 'Zepto' && (
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-purple-600 text-[10px] font-bold text-white">Z</div>
                          )}
                          {prod.platform === 'Tata 1mg' && (
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-orange-600 text-[10px] font-bold text-white">1</div>
                          )}
                          <span className="flex items-center gap-1 text-[10px] sm:text-xs">
                            <Clock size={10} /> {prod.deliveryTime}
                          </span>
                        </div>

                        {result.recommendation.requiresPrescription ? (
                          <button
                            disabled
                            className="flex cursor-not-allowed items-center gap-1 rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/35"
                          >
                            <AlertTriangle size={12} /> Consult Doctor
                          </button>
                        ) : (
                          <a
                            href={prod.addToCartUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition-transform active:scale-95 ${
                              prod.platform === 'Amazon'
                                ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
                                : prod.platform === 'Blinkit'
                                  ? 'bg-green-600 text-white hover:bg-green-700'
                                  : prod.platform === 'Zepto'
                                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                                    : 'bg-orange-600 text-white hover:bg-orange-700'
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
          );
        })}
      </div>
    </div>
  );
}
