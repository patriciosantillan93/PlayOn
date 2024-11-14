"use client"

import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { AuthModal } from '../components/auth/AuthModal';

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">PlayOn</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Fields
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              My Bookings
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
            <div className="flex items-center gap-2">
              <button className="bg-transparent text-muted-foreground hover:text-primary transition-colors" onClick={() => openAuthModal('login')}>
                Login
              </button>
              <button className="bg-primary text-white rounded px-4 py-2" onClick={() => openAuthModal('register')}>
                Sign up
              </button>
            </div>
          </nav>
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </header>
  );
}
