'use client';

import { useMemo, useState } from 'react';
import { MagnifyingGlassIcon, PlayIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import { podcasts } from '@/lib/data/content';

export default function PodcastsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(podcasts.map((p) => p.category)))];

  const filtered = useMemo(
    () =>
      podcasts.filter(
        (p) =>
          (category === 'All' || p.category === category) &&
          p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  return (
    <div>
      <section className="bg-navy-900 text-white py-16 px-5 md:px-8 text-center">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-signal mb-4">Catch Up Anytime</p>
        <h1 className="font-display font-bold text-4xl md:text-5xl">Podcast Library</h1>
      </section>

      <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search episodes..."
              className="w-full rounded-full border border-navy-200 pl-10 pr-4 py-2.5 text-sm outline-none focus-visible:ring-2 ring-signal"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-navy-200 px-4 py-2.5 text-sm bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="divide-y divide-navy-100 border-y border-navy-100">
          {filtered.map((pod) => (
            <div key={pod.id} className="flex items-center gap-5 py-5">
              <button
                aria-label={`Play ${pod.title}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 hover:bg-signal hover:text-white transition-colors"
              >
                <PlayIcon className="h-4 w-4 ml-0.5" />
              </button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-signal">{pod.category}</span>
                  <span className="text-[11px] text-navy-400 font-mono">{pod.date}</span>
                </div>
                <h3 className="font-display font-semibold text-navy-700 mt-0.5 truncate">{pod.title}</h3>
                <p className="text-xs text-navy-500 mt-0.5 truncate">{pod.description}</p>
              </div>
              <span className="font-mono text-xs text-navy-400 shrink-0">{pod.duration}</span>
              <button aria-label={`Download ${pod.title}`} className="shrink-0 text-navy-400 hover:text-signal">
                <ArrowDownTrayIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-navy-400">No episodes match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}
