'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { AuthProvider } from '@/lib/auth';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}