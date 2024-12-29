"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronDown } from 'lucide-react';
import { AuthDialog } from '@/components/auth/auth-dialog';
import Link from 'next/link';

export function Hero() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  const handleAuthClick = (type: 'login' | 'register') => {
    setAuthType(type);
    setShowAuthDialog(true);
  };

  const scrollToContent = () => {
    const featuredSection = document.getElementById('featured-dishes');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-black/60"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80)",
            backgroundSize: 'cover',
            backgroundPosition: "center",
            backgroundAttachment: "fixed"
          }}
        />
      </motion.div>
      
      <div className="text-center space-y-8 p-8 max-w-4xl z-10"> {/* Added z-10 to ensure content is above background */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold text-white"
        >
          Welcome to Patil Dhaba
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-white/90"
        >
          Experience the finest authentic Maharashtrian cuisine
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="bg-primary/90 hover:bg-primary text-white"
            onClick={() => handleAuthClick('login')}
          >
            Login
          </Button>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white/90 hover:bg-grey text-black"
            onClick={() => handleAuthClick('register')}
          >
            Register
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/20"
            asChild
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="default"
            className="bg-red-600 hover:bg-red-700"
          >
            <a 
              href="https://maps.app.goo.gl/UHFY9RmML2YmS4UY9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Visit Now
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:text-white/80"
            onClick={scrollToContent}
          >
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </Button>
        </motion.div>
      </div>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        defaultType={authType}
      />
    </section>
  );
}