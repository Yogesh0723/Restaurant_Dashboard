"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronDown } from 'lucide-react';
import { AuthDialog } from '@/components/auth/auth-dialog';
import Link from 'next/link';

const backgroundImages = [
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&q=80",
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80",
  "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&q=80",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80",
  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=1200&q=80"
];

export function Hero() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      {backgroundImages.map((image, index) => (
        <motion.div
        key={image}
        initial={{ opacity: 0 }}
        animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          zIndex: currentImageIndex === index ? 1 : 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        >
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>
      ))}
      
      <div className="text-center space-y-8 p-8 max-w-4xl z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl font-bold text-white hover:text-primary transition-colors duration-300"
        >
          Welcome to Patil Dhaba
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-white/90 hover:text-white transition-opacity duration-300"
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
            className="bg-white/90 hover:bg-white text-black"
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