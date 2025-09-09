export interface Auction {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  category: string;
  location: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'upcoming' | 'closed';
  images: string[];
  organizerName: string;
  organizerContact: string;
  participantsCount: number;
  bidsCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  amount: number;
  timestamp: Date;
  userName: string;
}