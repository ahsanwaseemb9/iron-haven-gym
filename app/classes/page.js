'use client'
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Clock, User, Users, ChevronRight, Zap, Trophy, Calendar } from 'lucide-react';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('time', { ascending: true });
      if (error) console.error(error);
      setClasses(data || []);
      setLoading(false);
    };
    fetchClasses();
  }, []);

const handleBooking = async (classId) => {
  setBookingId(classId);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = '/login';
    return;
  }

  const { error } = await supabase
    .from('bookings')
    .insert([{ user_id: user.id, class_id: classId }]);

  if (error) {
    // Check for the unique constraint error code '23505'
    if (error.code === '23505') {
      alert("SECURED: You are already on the roster for this session.");
    } else {
      alert(`VAULT ERROR: ${error.message}`);
    }
  } else {
    alert("SPOT SECURED: Your biometrics are registered.");
  }
  
  setBookingId(null);
};

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Zap className="text-orange-500 animate-pulse" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
              IRON <span className="text-orange-500">SESSIONS</span>
            </h1>
          </div>
          <div className="hidden lg:block bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
            <div className="flex items-center gap-4">
              <Calendar className="text-orange-500" size={24} />
              <p className="text-sm font-bold uppercase italic">Spring Protocol 2026</p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((item) => (
            <div key={item.id} className="group bg-zinc-900/30 border border-zinc-800 rounded-[3rem] overflow-hidden hover:border-orange-500/50 transition-all flex flex-col">
              
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={item.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000'} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100"
                  alt={item.name}
                />
                <div className="absolute top-6 left-6 bg-black/80 px-4 py-2 rounded-full border border-zinc-700 flex items-center gap-2">
                  <Trophy size={12} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase italic">{item.category || 'Core'}</span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-4xl font-black uppercase italic mb-6 group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-black p-4 rounded-2xl border border-zinc-800">
                    <p className="text-[10px] font-bold text-white uppercase flex items-center gap-2">
                      <Clock size={14} className="text-orange-500" /> {item.time}
                    </p>
                  </div>
                  <div className="bg-black p-4 rounded-2xl border border-zinc-800">
                    <p className="text-[10px] font-bold text-white uppercase flex items-center gap-2">
                      <User size={14} className="text-orange-500" /> {item.instructor.split(' ')[0]}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleBooking(item.id)}
                  disabled={bookingId === item.id}
                  className="w-full py-5 bg-white text-black rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
                >
                  {bookingId === item.id ? <Zap className="animate-spin" size={18} /> : "Reserve Spot"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}