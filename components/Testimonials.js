'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Loader2, Dumbbell } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loading, setLoading] = useState(true)

  // 1. FETCH APPROVED REVIEWS FROM SUPABASE
  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true) // Only show what you've cleared
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setReviews(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const nextSlide = useCallback(() => {
    if (reviews.length === 0) return;
    setActive((current) => (current + 1) % reviews.length)
  }, [reviews.length])

  const prevSlide = () => {
    if (reviews.length === 0) return;
    setActive((current) => (current - 1 + reviews.length) % reviews.length)
  }

  // Auto-Play Logic
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide()
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, reviews.length]);

  // 2. LOADING STATE
  if (loading) {
    return (
      <div className="py-24 bg-black flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-orange-500 animate-spin" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic">Loading the Verdict...</p>
      </div>
    );
  }

  // 3. EMPTY STATE (If no reviews are approved yet)
  if (reviews.length === 0) {
    return (
      <div className="py-24 bg-black text-center border-y border-zinc-900">
        <Dumbbell className="mx-auto text-zinc-800 mb-4" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700 italic">No approved testimonials yet.</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-black overflow-hidden select-none border-t border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-2 block italic">
              Community Voice
            </span>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter">
              The <span className="text-zinc-800 underline decoration-orange-500/50">Verdict</span>
            </h2>
          </div>
          
          {/* NAVIGATION BUTTONS (Only show if more than 1 review) */}
          {reviews.length > 1 && (
            <div className="flex gap-2 relative z-20">
              <button 
                onClick={prevSlide} 
                className="p-4 bg-zinc-900 rounded-full hover:bg-orange-500 hover:text-black transition-all border border-zinc-800 active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide} 
                className="p-4 bg-zinc-900 rounded-full hover:bg-orange-500 hover:text-black transition-all border border-zinc-800 active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* SLIDER CONTAINER */}
        <div 
          className="relative h-[400px] md:h-[300px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {reviews.map((review, i) => (
            <div 
              key={review.id} // Using database UUID as key
              className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center ${
                i === active 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 translate-x-24 scale-95 pointer-events-none'
              }`}
            >
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-12 rounded-[3rem] w-full flex flex-col md:flex-row gap-8 items-start relative overflow-hidden backdrop-blur-sm">
                
                <Quote className="absolute -right-4 -top-4 text-zinc-800/30 rotate-12" size={160} />
                
                <div className="flex-1 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating || 5)].map((_, starIndex) => (
                      <Star key={starIndex} size={14} className="fill-orange-500 text-orange-500" />
                    ))}
                  </div>

                  {/* Testimonial Content (Database Column Name is 'content') */}
                  <p className="text-2xl md:text-3xl font-bold italic text-zinc-200 mb-8 leading-tight tracking-tight max-w-3xl">
                    "{review.content}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-black font-black italic shadow-lg shadow-orange-500/20">
                      {review.full_name ? review.full_name[0] : 'M'}
                    </div>
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-orange-500 leading-none mb-1">
                        {review.full_name}
                      </h4>
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-[0.2em]">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS DOTS (Only show if more than 1) */}
        {reviews.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === active ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-800'
                }`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}