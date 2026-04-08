'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. HOME BUTTON (LOGO) - Always Visible */}
        <Link href="/" className="flex items-center gap-2 group z-[110]" onClick={() => setIsMenuOpen(false)}>
          <Zap className="text-orange-500 group-hover:scale-110 transition-transform" fill="currentColor" size={24} />
          <span className="text-xl font-black uppercase italic tracking-tighter text-white">Iron Haven</span>
        </Link>

        {/* 2. DESKTOP NAVIGATION - Hidden on small screens */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] italic">
          <Link href="/classes" className="text-zinc-400 hover:text-orange-500 transition-colors">Classes</Link>
          <Link href="/membership" className="text-zinc-400 hover:text-orange-500 transition-colors">Membership</Link>
          {/* This is your "Login" button */}
          <Link href="/profile" className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-white transition-all shadow-lg shadow-orange-500/20">
            The Vault
          </Link>
        </div>

        {/* 3. MOBILE HAMBURGER BUTTON - Visible only on mobile */}
        <button 
          className="md:hidden text-white z-[110] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 4. MOBILE OVERLAY - Contains all links including Login/Home */}
        <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-[100] md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic hover:text-orange-500">Home</Link>
          <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic hover:text-orange-500">Classes</Link>
          <Link href="/membership" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic hover:text-orange-500">Membership</Link>
          {/* Mobile Login Button */}
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-black px-10 py-4 rounded-full text-xl font-black uppercase italic mt-4 shadow-xl shadow-orange-500/40">
            The Vault
          </Link>
        </div>

      </div>
    </nav>
  );
}