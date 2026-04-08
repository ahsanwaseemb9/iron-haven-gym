'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Menu, X } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Check if user is logged in
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-black border-b border-zinc-800">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Zap className="text-orange-500" fill="currentColor" />
          <span className="font-black uppercase italic tracking-tighter text-white">Iron Haven</span>
        </Link>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase italic tracking-widest">
          <Link href="/classes" className="text-zinc-400 hover:text-white">Classes</Link>
          
          {user ? (
            <button 
              onClick={handleSignOut}
              className="bg-zinc-800 text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/profile" className="bg-orange-500 text-black px-4 py-2 rounded-full hover:bg-white transition-all">
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 md:hidden">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-3xl font-black italic">HOME</Link>
            <Link href="/classes" onClick={() => setIsOpen(false)} className="text-3xl font-black italic">CLASSES</Link>
            
            {user ? (
              <button 
                onClick={handleSignOut}
                className="text-3xl font-black italic text-orange-500"
              >
                SIGN OUT
              </button>
            ) : (
              <Link href="/profile" onClick={() => setIsOpen(false)} className="bg-orange-500 text-black px-8 py-4 rounded-full text-xl font-black italic">
                LOGIN
              </Link>
            )}
            
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 text-xs mt-10">CLOSE</button>
          </div>
        )}
      </div>
    </nav>
  );
}