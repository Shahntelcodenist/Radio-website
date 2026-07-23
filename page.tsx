'use client';

import { useState } from 'react';
import Image from 'next/image';
import { newsItems, NewsItem } from '@/lib/data/content';

const CATEGORIES: (NewsItem['category'] | 'All')[] = [
  'All',
  'Community',
  'Entertainment',
  'Sports',
  'Politics',
  'Education'
];

export default function NewsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All');
  const filtered = filter === 'All' ? newsItems : newsItems.filter((n) => n.category === filter);

  return (
    <div>
      <section className="bg-navy-900 text-white py-16 px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">Reporting From The Ground</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl">News</h1>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                filter === cat ? 'bg-signal text-white' : 'bg-navy-50 text-navy-500 hover:bg-navy-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-2xl overflow-hidden border border-navy-100 group">
              <div className="relative h-44">
                <Image src={item.image} alt="" fill quality={90} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-signal">{item.category}</span>
                <h3 className="font-display font-semibold text-navy-700 mt-1.5 leading-snug">{item.title}</h3>
                <p className="text-sm text-navy-500 mt-2 leading-relaxed">{item.excerpt}</p>
                <span className="text-xs text-navy-400 mt-3 block">{item.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
