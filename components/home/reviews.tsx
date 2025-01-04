"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews, Review } from '@/lib/reviews-data';

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
};

const ReviewCard = ({ 
  review, 
  onHoverStart, 
  onHoverEnd,
  index
}: { 
  review: Review;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ 
        x: 300, 
        opacity: 0,
        scale: 0.9 
      }}
      animate={{ 
        x: 0, 
        opacity: 1,
        scale: 1,
        transition: {
          x: { type: "spring", stiffness: 100, damping: 30, duration: 0.8 },
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }
      }}
      exit={{ 
        x: -300, 
        opacity: 0,
        scale: 0.9,
        transition: {
          x: { type: "spring", stiffness: 100, damping: 30, duration: 0.8 },
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }
      }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { 
          type: "spring",
          stiffness: 200,
          damping: 20
        }
      }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl 
                 transition-all duration-500 ease-out cursor-pointer min-h-[300px]
                 backdrop-blur-sm bg-white/90"
    >
      {/* Background gradient with animation */}
      <motion.div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(239, 246, 255, 0.5), rgba(245, 243, 255, 0.5))",
            "linear-gradient(to bottom right, rgba(245, 243, 255, 0.5), rgba(239, 246, 255, 0.5))"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Decorative quote */}
      <motion.div 
        className="absolute -top-4 -right-4 text-blue-100"
        animate={{ 
          rotate: [0, 5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Quote size={48} />
      </motion.div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <motion.img
            whileHover={{ 
              scale: 1.15,
              rotate: 5,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
              }
            }}
            src={review.profile_photo_url}
            alt={review.author_name}
            className="w-12 h-12 rounded-full object-cover shadow-md"
          />
          <div>
            <h3 className="font-semibold">{review.author_name}</h3>
            <div className="flex text-yellow-400">
              {Array.from({ length: review.rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: i * 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <Star className="w-4 h-4 fill-current" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.p 
          className="text-gray-600 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.2,
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          {review.text}
        </motion.p>

        <motion.div 
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.5
          }}
        >
          {formatDate(review.time)}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Reviews = () => {
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    setVisibleReviews(reviews.slice(0, 3));
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (isInitialLoad || isPaused) return;

    const interval = setInterval(() => {
      setVisibleReviews(prev => {
        const nextReviews = [...prev];
        const firstReview = nextReviews.shift()!;
        const lastVisibleIndex = reviews.findIndex(r => r.id === prev[prev.length - 1].id);
        const nextIndex = (lastVisibleIndex + 1) % reviews.length;
        nextReviews.push(reviews[nextIndex]);
        reviews.push(firstReview);
        reviews.shift();
        return nextReviews;
      });
    }, 2500); // Increased interval for smoother viewing

    return () => clearInterval(interval);
  }, [isInitialLoad, isPaused]);

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </motion.h2>
        
        <div className="relative h-[300px]">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="absolute w-1/3 px-4"
                style={{
                  left: `${index * 33.33}%`
                }}
              >
                <ReviewCard 
                  review={review}
                  onHoverStart={() => setIsPaused(true)}
                  onHoverEnd={() => setIsPaused(false)}
                  index={index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Reviews;