'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight, Dumbbell, Trophy, Users, Shield, Menu, X } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu helper
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black font-sans">
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group z-[110]" onClick={closeMenu}>
            <Zap className="text-orange-500 group-hover:scale-110 transition-transform" fill="currentColor" size={24} />
            <span className="text-xl font-black uppercase italic tracking-tighter text-white">Iron Haven</span>
          </Link>

          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] italic">
            <Link href="/classes" className="hover:text-orange-500 transition-colors text-zinc-400">Classes</Link>
            <Link href="/membership" className="hover:text-orange-500 transition-colors text-zinc-400">Membership</Link>
            <Link href="/profile" className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-white transition-all shadow-lg shadow-orange-500/20">The Vault</Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
          <button 
            className="md:hidden text-white z-[110] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* MOBILE OVERLAY MENU */}
          <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-[100] md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <Link href="/classes" onClick={closeMenu} className="text-4xl font-black uppercase italic hover:text-orange-500">Classes</Link>
            <Link href="/membership" onClick={closeMenu} className="text-4xl font-black uppercase italic hover:text-orange-500">Membership</Link>
            <Link href="/profile" onClick={closeMenu} className="bg-orange-500 text-black px-10 py-4 rounded-full text-xl font-black uppercase italic mt-4">The Vault</Link>
          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="h-[2px] w-12 bg-orange-500" />
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs italic">Elite Training Protocol</span>
            </div>
            <h1 className="text-5xl md:text-[10rem] font-black uppercase italic leading-[0.8] tracking-tighter">
              DOMINATE <br />
              <span className="text-zinc-800">THE</span> <span className="text-orange-500">GRIND</span>
            </h1>
          </div>

          <p className="max-w-xl text-zinc-400 font-medium text-lg mb-12 leading-relaxed">
            Welcome to the digital frontline. Track your output, secure your sessions, and unlock your true potential in the Iron Haven Vault.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link href="/classes" className="group flex items-center gap-4 bg-white text-black px-10 py-6 rounded-2xl font-black uppercase italic hover:bg-orange-500 transition-all duration-300 transform hover:-translate-y-1">
              View Schedule <ChevronRight size={20} />
            </Link>
            <div className="flex items-center gap-4 px-8 py-6 border border-zinc-800 rounded-2xl bg-zinc-900/20 backdrop-blur-sm">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-700" />
                ))}
              </div>
              <span className="text-xs font-black uppercase italic text-zinc-500 tracking-wider">+120 Members Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS / FEATURES */}
      <section className="py-20 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-white">
          {[
            { icon: <Dumbbell className="text-orange-500" />, title: "Precision Gear", desc: "Access to Olympic-grade equipment and specialized zones." },
            { icon: <Trophy className="text-orange-500" />, title: "Elite Coaching", desc: "Train under the Hammer protocol with certified instructors." },
            { icon: <Shield className="text-orange-500" />, title: "The Sanctuary", desc: "A facility for those who refuse to settle for average performance." }
          ].map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800/50 hover:border-orange-500/30 transition-all">
              <div className="mb-6 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
              <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-bold uppercase tracking-widest">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}