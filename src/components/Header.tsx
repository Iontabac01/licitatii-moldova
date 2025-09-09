'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Licitații Moldova
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Acasă
            </Link>
            <Link href="/add-auction" className="hover:text-blue-200 transition-colors">
              Adaugă Licitație
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-200">Bună, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition-colors"
                >
                  Ieșire
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-400 px-3 py-1 rounded transition-colors"
              >
                Autentificare
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}