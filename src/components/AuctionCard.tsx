import Link from 'next/link';
import Image from 'next/image';
import { Auction } from '@/lib/types';

interface AuctionCardProps {
  auction: Auction;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-200 relative">
        {auction.images.length > 0 ? (
          <Image
            src={auction.images[0]}
            alt={auction.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(auction.status)}`}>
            {getStatusText(auction.status)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {auction.title}
          </h3>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {auction.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Categorie:</span>
            <span className="font-medium">{auction.category}</span>
          </div>
          <div className="flex justify-between">
            <span>Locație:</span>
            <span className="font-medium">{auction.location}</span>
          </div>
          <div className="flex justify-between">
            <span>Preț curent:</span>
            <span className="font-bold text-green-600">{formatPrice(auction.currentPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Participanți:</span>
            <span className="font-medium">{auction.participantsCount}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span>Sfârșește: {formatDate(auction.endDate)}</span>
          </div>
          
          <Link
            href={`/auction/${auction.id}`}
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Vezi detalii
          </Link>
        </div>
      </div>
    </div>
  );
}