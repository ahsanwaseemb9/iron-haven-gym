'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Dumbbell, Home, ShieldCheck, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-zinc-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group z-[110]" onClick={() => setIsMenuOpen(false)}>
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
          className="md:hidden text-white z-[110] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE OVERLAY MENU */}
        <div className={`fixed inset-0 bg-black flex flex-col items-center justify-center gap-8 z-[100] md:hidden transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link href="/classes" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic hover:text-orange-500">Classes</Link>
          <Link href="/membership" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase italic hover:text-orange-500">Membership</Link>
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="bg-orange-500 text-black px-10 py-4 rounded-full text-xl font-black uppercase italic mt-4">The Vault</Link>
        </div>

      </div>
    </nav>
  )
}