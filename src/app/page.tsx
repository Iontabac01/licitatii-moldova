'use client';

import { useState } from 'react';
import AuctionCard from '@/components/AuctionCard';
import { mockAuctions } from '@/lib/mockData';
import { Auction } from '@/lib/types';

export default function HomePage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'closed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(mockAuctions.map(a => a.category)))];

  const filteredAuctions = mockAuctions.filter((auction: Auction) => {
    const statusMatch = filter === 'all' || auction.status === filter;
    const categoryMatch = categoryFilter === 'all' || auction.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Bine ați venit la Licitații Moldova
        </h1>
        <p className="text-xl mb-6">
          Platforma națională pentru licitații publice și private transparente
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{mockAuctions.length}</div>
            <div className="text-blue-200">Licitații totale</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {mockAuctions.filter(a => a.status === 'active').length}
            </div>
            <div className="text-blue-200">Licitații active</div>
          </div>
          <div>
            <div className="text-3xl font-bold">
              {mockAuctions.reduce((sum, a) => sum + a.participantsCount, 0)}
            </div>
            <div className="text-blue-200">Participanți activi</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtrează licitațiile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'upcoming' | 'closed')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toate</option>
              <option value="active">Active</option>
              <option value="upcoming">În curând</option>
              <option value="closed">Închise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categorie
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Toate categoriile' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Auctions Grid */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Licitații disponibile ({filteredAuctions.length})
          </h2>
        </div>

        {filteredAuctions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              Nu sunt licitații disponibile cu filtrele selectate.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
