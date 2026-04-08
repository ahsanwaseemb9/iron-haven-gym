'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Menu, X } from 'lucide-react';
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
    <nav className="fixed top-0 left-0 w-full z-[999] bg-black border-b border-zinc-800 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* LEFT GROUP: LOGO + LINKS */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="text-orange-500" size={24} />
            <span className="text-xl font-black italic uppercase text-white tracking-tighter">
              IRON<span className="text-orange-500">HAVEN</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <Link href="/" className="hover:text-white transition flex items-center gap-1">
              <Home size={12} /> Home
            </Link>
            <Link href="/membership" className="hover:text-white transition">Membership</Link>
            <Link href="/classes" className="hover:text-white transition">Classes</Link>
          </div>
        </div>

        {/* RIGHT GROUP: AUTH */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/profile" className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-white border border-zinc-800 hover:border-orange-500 transition-all">
                <ShieldCheck size={14} className="text-orange-500" />
                <span>Vault</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase font-bold hover:bg-white hover:text-red-600 transition-all"
              >
                <LogOut size={14} />
                <span className="ml-1">Exit</span>
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-orange-500 text-black px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}