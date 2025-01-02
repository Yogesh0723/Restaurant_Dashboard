'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, LayoutDashboardIcon, ChevronDown } from 'lucide-react';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { PaperAirplane } from '@/components/ui/paper-airplane';
import { ConnectionLines } from '@/components/ui/connection-lines';
import { FoodModel } from '@/components/3d/food-model';
import Link from 'next/link';

const backgroundImages = [
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=80",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&q=80",
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80",
  "https://images.unsplash.com/photo-1567337710282-00832b415979?w=1200&q=80",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80",
  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=1200&q=80",
  "https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=1200&q=80",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
  "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200&q=80"
];

export function Hero() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  return (
    <div ref={containerRef} className="relative">
      <section className="relative min-h-screen bg-[#ebfdf2] overflow-hidden">
        <PaperAirplane />
        
        <div className="absolute inset-0 flex items-center justify-between px-12 py-8">
          <motion.div 
            className="w-1/2 pr-8 z-10"
            style={{ y, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-6xl font-bold text-[#1a1a1a] leading-tight">
                Connections that spark
                <br />
                culinary delight
              </h1>
              <p className="text-xl text-gray-600">
                Experience Patil Dhaba — where authentic Maharashtrian cuisine creates lasting connections across multiple locations.
              </p>
              <div className="flex gap-4 mt-8">
              <Button 
                asChild
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
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
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="bg-black text-white hover:bg-greens-800 rounded-full px-10"
              >
                <Link href="/dashboard">
                <LayoutDashboardIcon className="w-s h-5" />
                  Dashboard
                </Link>
              </Button>
            </div>
            </motion.div>
          </motion.div>

          <div className="w-1/2 relative h-[800px]">
            {backgroundImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: currentImageIndex === index ? 1 : 0,
                  x: currentImageIndex === index ? 0 : 100
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  zIndex: currentImageIndex === index ? 1 : 0,
                }}
              >
                <div className="w-full h-full rounded-[2rem] overflow-hidden">
                  <img 
                    src={image} 
                    alt="Restaurant ambiance" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <ConnectionLines />

        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-8 z-10">
          <div className="flex space-x-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-[#1a1a1a]"
            >
              Wide reach
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl font-bold text-[#1a1a1a]"
            >
              Close connection
            </motion.div>
          </div>
          <ChevronDown className="text-gray-600 text-3xl mx-auto" />
        </div>

        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog}
          defaultType={authType}
        />
      </section>

      <FoodModel />
    </div>
  );
}