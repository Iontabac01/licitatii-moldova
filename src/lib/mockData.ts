import { Auction, Bid } from './types';

export const mockAuctions: Auction[] = [
  {
    id: '1',
    title: 'Teren agricol în Orhei',
    description: 'Teren agricol cu suprafața de 50 hectare, situat în raionul Orhei. Solul este fertil, ideal pentru cultivarea cerealelor. Accesul la drumul principal este asigurat.',
    startingPrice: 250000,
    currentPrice: 285000,
    category: 'Terenuri',
    location: 'Orhei',
    startDate: new Date('2024-01-15T10:00:00'),
    endDate: new Date('2024-02-15T18:00:00'),
    status: 'active',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    organizerName: 'Primăria Orhei',
    organizerContact: 'contact@orhei.md',
    participantsCount: 12,
    bidsCount: 23
  },
  {
    id: '2',
    title: 'Echipament medical - Spitalul Republican',
    description: 'Licitație pentru achiziționarea echipamentului medical modern: aparate de radiografie, ecografe și monitoare pentru terapie intensivă.',
    startingPrice: 150000,
    currentPrice: 150000,
    category: 'Echipamente',
    location: 'Chișinău',
    startDate: new Date('2024-02-01T09:00:00'),
    endDate: new Date('2024-02-28T17:00:00'),
    status: 'upcoming',
    images: ['/api/placeholder/400/300'],
    organizerName: 'Ministerul Sănătății',
    organizerContact: 'licitatii@ms.gov.md',
    participantsCount: 0,
    bidsCount: 0
  },
  {
    id: '3',
    title: 'Renovarea drumului Chișinău-Bălți',
    description: 'Contract pentru renovarea și modernizarea drumului național M2 pe sectorul Chișinău-Bălți. Lucrările includ asfaltarea, marcajele rutiere și sistemul de iluminat.',
    startingPrice: 2500000,
    currentPrice: 2750000,
    category: 'Construcții',
    location: 'Național',
    startDate: new Date('2024-01-10T08:00:00'),
    endDate: new Date('2024-02-10T16:00:00'),
    status: 'active',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    organizerName: 'Administrația de Stat a Drumurilor',
    organizerContact: 'licitatii@asd.gov.md',
    participantsCount: 8,
    bidsCount: 15
  },
  {
    id: '4',
    title: 'Servicii de catering pentru școli',
    description: 'Licitație pentru prestarea serviciilor de catering în școlile din municipiul Chișinău. Contractul include prepararea și livrarea mesei pentru aproximativ 15.000 de elevi.',
    startingPrice: 800000,
    currentPrice: 920000,
    category: 'Servicii',
    location: 'Chișinău',
    startDate: new Date('2024-01-05T10:00:00'),
    endDate: new Date('2024-01-25T15:00:00'),
    status: 'closed',
    images: ['/api/placeholder/400/300'],
    organizerName: 'Primăria Chișinău',
    organizerContact: 'achizitii@chisinau.md',
    participantsCount: 6,
    bidsCount: 18
  },
  {
    id: '5',
    title: 'Autobuze electrice pentru transport public',
    description: 'Achiziția de autobuze electrice moderne pentru îmbunătățirea transportului public în Chișinău. Se solicită 20 de autobuze cu capacitate de 80 de pasageri.',
    startingPrice: 3200000,
    currentPrice: 3450000,
    category: 'Transport',
    location: 'Chișinău',
    startDate: new Date('2024-01-20T09:00:00'),
    endDate: new Date('2024-03-01T17:00:00'),
    status: 'active',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    organizerName: 'Regia Transport Electric',
    organizerContact: 'licitatii@rte.md',
    participantsCount: 4,
    bidsCount: 8
  }
];

export const mockBids: Bid[] = [
  {
    id: '1',
    auctionId: '1',
    userId: 'user1',
    amount: 285000,
    timestamp: new Date('2024-01-18T14:30:00'),
    userName: 'Ion Popescu'
  },
  {
    id: '2',
    auctionId: '1',
    userId: 'user2',
    amount: 280000,
    timestamp: new Date('2024-01-18T12:15:00'),
    userName: 'Maria Ionescu'
  },
  {
    id: '3',
    auctionId: '3',
    userId: 'user3',
    amount: 2750000,
    timestamp: new Date('2024-01-15T16:20:00'),
    userName: 'Constructor SRL'
  }
];

export function getAuctionById(id: string): Auction | undefined {
  return mockAuctions.find(auction => auction.id === id);
}

export function getBidsForAuction(auctionId: string): Bid[] {
  return mockBids.filter(bid => bid.auctionId === auctionId);
}

export function getActiveAuctions(): Auction[] {
  return mockAuctions.filter(auction => auction.status === 'active');
}

export function getAuctionsByCategory(category: string): Auction[] {
  return mockAuctions.filter(auction => auction.category === category);
}