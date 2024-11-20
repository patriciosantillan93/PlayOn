"use client"

import { useState } from 'react';
import { CalendarDays, LogOut  } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { AuthModal } from '../components/auth/AuthModal';
import { Button } from '../components/ui/button';
import { useAuth } from '../hooks/use-auth'

export default function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const { user, logout } = useAuth();
  console.log(user);  // Debugging the value of `user
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
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.name}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={logout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => openAuthModal('login')}>
                    Login
                  </Button>
                  <Button onClick={() => openAuthModal('register')}>
                    Sign up
                  </Button>
                </>
              )}
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