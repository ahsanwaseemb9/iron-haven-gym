'use client'
import React, { useState } from 'react';
import Link from 'next/link';
// Ensure Zap, Menu, and X are all here!
import { Zap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link href="/" className="flex items-center gap-2 z-[110]" onClick={() => setIsMenuOpen(false)}>
          <Zap className="text-orange-500" fill="currentColor" size={24} />
          <span className="text-xl font-black uppercase italic tracking-tighter text-white">Iron Haven</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] italic">
          <Link href="/classes" className="text-zinc-400 hover:text-orange-500">Classes</Link>
          <Link href="/membership" className="text-zinc-400 hover:text-orange-500">Membership</Link>
          <Link href="/profile" className="bg-orange-500 text-black px-6 py-2 rounded-full">The Vault</Link>
        </div>

        {/* Mobile Button */}
        <button 
          className="md:hidden text-white z-[110]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-[100] md:hidden transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic">Classes</Link>
          <Link href="/membership" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic">Membership</Link>
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-black px-10 py-4 rounded-full text-xl font-black uppercase italic">The Vault</Link>
        </div>
      </div>
    </nav>
  );
}