'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] bg-black border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO - FORCED LEFT */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <Zap className="text-orange-500" fill="currentColor" size={24} />
          <span className="text-xl font-black uppercase italic tracking-tighter text-white">Iron Haven</span>
        </Link>

        {/* DESKTOP LINKS - FORCED RIGHT */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/classes" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white">Classes</Link>
          <Link href="/membership" className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white">Membership</Link>
          <Link href="/profile" className="bg-orange-500 text-black px-5 py-2 rounded-full text-[10px] font-black uppercase italic hover:bg-white transition-all">
            The Vault
          </Link>
        </div>

        {/* MOBILE BUTTON - FORCED RIGHT */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE OVERLAY */}
        <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic">Home</Link>
          <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic">Classes</Link>
          <Link href="/membership" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic">Membership</Link>
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-black px-10 py-4 rounded-full text-xl font-black uppercase italic">The Vault</Link>
          
          {/* Close button inside overlay */}
          <button onClick={() => setIsMenuOpen(false)} className="mt-10 text-zinc-500 uppercase text-xs tracking-widest font-bold">Close Menu</button>
        </div>
      </div>
    </nav>
  );
}