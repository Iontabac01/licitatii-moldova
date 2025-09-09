'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuctionById, getBidsForAuction } from '@/lib/mockData';
import { useAuth } from '@/lib/auth';
import { Auction, Bid } from '@/lib/types';

export default function AuctionDetails() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [newBidAmount, setNewBidAmount] = useState('');
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const foundAuction = getAuctionById(params.id as string);
      if (foundAuction) {
        setAuction(foundAuction);
        setBids(getBidsForAuction(foundAuction.id));
      } else {
        router.push('/');
      }
    }
  }, [params?.id, router]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !auction) {
      alert('Vă rugăm să vă autentificați pentru a face o ofertă.');
      return;
    }

    const bidAmount = parseFloat(newBidAmount);
    if (bidAmount <= auction.currentPrice) {
      alert('Oferta trebuie să fie mai mare decât prețul curent.');
      return;
    }

    setIsSubmittingBid(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newBid: Bid = {
      id: Math.random().toString(36).substr(2, 9),
      auctionId: auction.id,
      userId: user.id,
      amount: bidAmount,
      timestamp: new Date(),
      userName: user.name
    };

    setBids([newBid, ...bids]);
    setAuction({
      ...auction,
      currentPrice: bidAmount,
      bidsCount: auction.bidsCount + 1
    });
    setNewBidAmount('');
    setIsSubmittingBid(false);
    alert('Oferta a fost înregistrată cu succes!');
  };

  if (!auction) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-lg">Se încarcă...</div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ro-MD', {
      style: 'currency',
      currency: 'MDL',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ro-MD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activă';
      case 'upcoming':
        return 'În curând';
      case 'closed':
        return 'Închisă';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Înapoi la listă
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Images */}
          <div className="mb-6">
            {auction.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auction.images.map((image, index) => (
                  <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${auction.title} - imagine ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Nu sunt imagini disponibile</span>
              </div>
            )}
          </div>

          {/* Title and Status */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{auction.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(auction.status)}`}>
                {getStatusText(auction.status)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Categorie:</span>
                <div className="font-medium">{auction.category}</div>
              </div>
              <div>
                <span className="text-gray-600">Locație:</span>
                <div className="font-medium">{auction.location}</div>
              </div>
              <div>
                <span className="text-gray-600">Participanți:</span>
                <div className="font-medium">{auction.participantsCount}</div>
              </div>
              <div>
                <span className="text-gray-600">Oferte:</span>
                <div className="font-medium">{auction.bidsCount}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Descriere</h2>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed">{auction.description}</p>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Informații organizator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Nume:</span>
                <div className="font-medium">{auction.organizerName}</div>
              </div>
              <div>
                <span className="text-gray-600">Contact:</span>
                <div className="font-medium">{auction.organizerContact}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Pricing Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Informații preț</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Preț pornire:</span>
                <span className="font-medium">{formatPrice(auction.startingPrice)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Preț curent:</span>
                <span className="font-bold text-green-600">{formatPrice(auction.currentPrice)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Program</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-600">Început:</span>
                <div className="font-medium">{formatDate(auction.startDate)}</div>
              </div>
              <div>
                <span className="text-gray-600">Sfârșit:</span>
                <div className="font-medium">{formatDate(auction.endDate)}</div>
              </div>
            </div>
          </div>

          {/* Bidding Form */}
          {auction.status === 'active' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Faceți o ofertă</h3>
              {user ? (
                <form onSubmit={handleBidSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Suma (MDL)
                    </label>
                    <input
                      type="number"
                      value={newBidAmount}
                      onChange={(e) => setNewBidAmount(e.target.value)}
                      min={auction.currentPrice + 1}
                      step="1"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Minim ${formatPrice(auction.currentPrice + 1)}`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingBid}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingBid ? 'Se trimite...' : 'Trimite oferta'}
                  </button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Pentru a face o ofertă, trebuie să vă autentificați.</p>
                  <Link
                    href="/login"
                    className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center"
                  >
                    Autentificare
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Recent Bids */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Oferte recente</h3>
            {bids.length > 0 ? (
              <div className="space-y-3">
                {bids.slice(0, 5).map((bid) => (
                  <div key={bid.id} className="flex justify-between items-center text-sm">
                    <div>
                      <div className="font-medium">{bid.userName}</div>
                      <div className="text-gray-500">
                        {new Intl.DateTimeFormat('ro-MD', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(bid.timestamp)}
                      </div>
                    </div>
                    <div className="font-bold text-green-600">
                      {formatPrice(bid.amount)}
                    </div>
                  </div>
                ))}
                {bids.length > 5 && (
                  <div className="text-center text-sm text-gray-500">
                    ... și încă {bids.length - 5} oferte
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center">Nu sunt oferte încă.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}