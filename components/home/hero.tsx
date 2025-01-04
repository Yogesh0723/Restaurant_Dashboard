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
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

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
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#ebfdf2] overflow-hidden flex flex-col items-center justify-center">
        <PaperAirplane />
        
        {/* Hero Content */}
        <div className={`absolute inset-0 flex ${isMobile ? 'flex-col' : 'items-center justify-between'} px-8 py-6 gap-8`}>
          {/* Left Section - Text Content */}
          <motion.div 
            className={`w-full ${isMobile ? 'text-center' : 'w-1/2 pr-8'}`}
            style={{ y, opacity }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold leading-tight text-gray-900"
            >
              Connections that spark
              <br />
              culinary delight
            </motion.h1>
            <p className="text-lg text-gray-600 mt-4">
              Experience Patil Dhaba — where authentic Maharashtrian cuisine creates lasting connections.
            </p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <Button size="lg" className="bg-black text-white rounded-full px-8">
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
              <Button size="lg" className="bg-black text-white rounded-full px-8">
                <Link href="/dashboard" className="bg-black text-white rounded-full px-8 flex items-center gap-2">
                  <LayoutDashboardIcon className="w-5 h-5" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Section - Image Carousel */}
          <div className={`w-full ${isMobile ? 'mt-10' : 'w-1/2'}`}>
            <AspectRatio ratio={isMobile ? 4/5 : 16/9}>
              {backgroundImages.map((image, index) => (
                <motion.img
                  key={image}
                  src={image}
                  alt="Restaurant ambiance"
                  className={`w-full h-full rounded-xl object-cover absolute ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
                  transition={{ duration: 1 }}
                />
              ))}
            </AspectRatio>
          </div>
        </div>

        {/* Connection Lines and Footer */}
        <ConnectionLines />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-[#1a1a1a]"
          >
            Wide Reach, Close Connection
          </motion.p>
          <ChevronDown className="text-gray-600 text-3xl mt-4" />
        </div>

        {/* Auth Dialog */}
        <AuthDialog 
          open={showAuthDialog} 
          onOpenChange={setShowAuthDialog}
          defaultType={authType}
        />
      </section>

      {/* 3D Food Model */}
      <FoodModel />
    </div>
  );
}