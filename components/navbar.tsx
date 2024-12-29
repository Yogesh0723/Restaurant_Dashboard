"use client";

import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthDialog } from "@/components/auth/auth-dialog";

export function Navbar() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthType(type);
    setShowAuthDialog(true);
  };

  return (
    <header className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <UtensilsCrossed className="h-8 w-8" />
            <span className="font-bold text-xl">Patil Dhaba</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost"
              onClick={() => handleAuthClick('login')}
            >
              Login
            </Button>
            <Button
              onClick={() => handleAuthClick('register')}
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        defaultType={authType}
      />
    </header>
  );
}