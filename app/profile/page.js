'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Activity, Clock, Zap, ChevronRight, Dumbbell, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import LogWorkout from '@/app/log-workout/page';
import ReviewForm from '@/components/ReviewForm'; 
import { useRouter } from 'next/navigation';


export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        window.location.href = '/login';
        return;
      }
      setUser(currentUser);

      const { data: workoutData } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });
      
      const { data: bookingData } = await supabase
        .from('bookings')
        .select(`
          id,
          classes (
            name,
            time,
            instructor
          )
        `)
        .eq('user_id', currentUser.id);

      setWorkouts(workoutData || []);
      setBookings(bookingData || []);
      setLoading(false);
    };
    fetchData();
    
    return () => {
    const autoLogout = async () => {
      await supabase.auth.signOut();
      router.refresh(); // Forces the Navbar to flip back to "Login"
    };
    autoLogout();
  };
},
   [supabase, router]);

  const totalCalories = workouts.reduce((acc, curr) => acc + (curr.calories || 0), 0);
  const powerScore = 500 + (workouts.length * 100) + Math.floor(totalCalories * 0.1);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Zap className="text-orange-500 animate-pulse" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">
            THE <span className="text-orange-500">VAULT</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            
            {/* ACTIVE ROSTER */}
            <div>
              <h2 className="text-xl font-black uppercase italic border-l-4 border-orange-500 pl-4 mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-orange-500" /> Active Roster
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <div key={b.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] hover:border-orange-500 transition-all">
                      <p className="text-[10px] font-black uppercase text-orange-500 mb-1 tracking-widest">
                        {b.classes?.time || 'TBD'}
                      </p>
                      <h3 className="text-2xl font-black uppercase italic text-white leading-tight">
                        {b.classes?.name || 'Session'}
                      </h3>
                      <div className="flex items-center gap-2 mt-3 text-zinc-500 text-[10px] font-bold uppercase">
                        <User size={12} /> {b.classes?.instructor || 'Staff'}
                      </div>
                    </div>
                  ))
                ) : (
                  <Link href="/classes" className="md:col-span-2 border-2 border-dashed border-zinc-800 p-10 rounded-[2rem] text-center hover:border-zinc-600 transition-all block">
                    <p className="text-zinc-500 font-black uppercase italic text-xs tracking-widest">No Bookings. View Schedule.</p>
                  </Link>
                )}
              </div>
            </div>

            {/* WORKOUTS */}
            <div>
              <h2 className="text-xl font-black uppercase italic border-l-4 border-zinc-800 pl-4 mb-6">Performance History</h2>
              <div className="space-y-4">
                {workouts.map(w => (
                  <div key={w.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center">
                    <span className="text-xl font-black uppercase italic">{w.exercise_name}</span>
                    <span className="text-orange-500 font-black italic">{w.calories} KCAL</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* POWER SCORE */}
          <div className="space-y-6">
            <div className="bg-orange-500 p-10 rounded-[3rem] text-black shadow-xl shadow-orange-500/10">
              <TrendingUp size={32} className="mb-4" />
              <h3 className="text-4xl font-black uppercase italic leading-none">Power Score</h3>
              <div className="text-8xl font-black mt-2 tracking-tighter leading-none">{powerScore}</div>
            </div>
          </div>

        </div>
      </div>
{/* Vertical Stack Container */}
<div className="flex flex-col gap-6 mt-12 max-w-[800px] mx-auto px-4">
  
  {/* 1. Performance Log - Rectangular */}
  <section className="border border-zinc-800 rounded-xl p-5 w-full bg-zinc-900/20">
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-4">
      Performance Tracking
    </h3>
    <LogWorkout user={user} />
  </section>

  {/* 2. Review Form - Rectangular */}
  <section className="border border-zinc-800 rounded-xl p-5 w-full bg-zinc-900/20">
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-4">
      Member Feedback
    </h3>
    <ReviewForm />
  </section>

</div>
    </div>

  );
}