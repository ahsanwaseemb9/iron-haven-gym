import React from 'react';
import { Check, Star } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-4 text-orange-500 italic uppercase">Membership Plans</h1>
        <p className="text-zinc-400 mb-12 text-lg font-medium tracking-tight">Pick your path to greatness. No hidden fees.</p>

        {/* Updated Grid: Now 4 columns on large screens */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* NEW: Free Trial Card */}
          <div className="bg-zinc-900/50 p-8 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-white transition-all">
            <div className="flex justify-center mb-4 text-zinc-500"><Star size={24} /></div>
            <h3 className="text-xl font-bold mb-1 uppercase tracking-widest text-zinc-300">Starter</h3>
            <div className="text-3xl font-black mb-6 uppercase text-white">7-Day Free</div>
            <ul className="text-left space-y-3 mb-8 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> Full Gym Access</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> 1 Personal Intro</li>
              <li className="flex items-center gap-2 text-zinc-600"><Check size={14}/> No Classes</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-zinc-700 text-white font-bold hover:bg-white hover:text-black transition-all uppercase text-xs tracking-widest">
              Claim Free Pass
            </button>
          </div>

          {/* Basic Plan */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all">
            <h3 className="text-xl font-bold mb-1 uppercase tracking-widest text-zinc-400">Basic</h3>
            <div className="text-3xl font-black mb-6">$29<span className="text-sm text-zinc-500">/mo</span></div>
            <ul className="text-left space-y-3 mb-8 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> 24/7 Access</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> Locker Room</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-all uppercase text-xs tracking-widest">
              Join Basic
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-zinc-900 p-8 rounded-2xl border-2 border-orange-500 transform lg:scale-110 shadow-2xl shadow-orange-500/10 z-10">
            <div className="bg-orange-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit mx-auto mb-4 tracking-tighter">Recommended</div>
            <h3 className="text-xl font-bold mb-1 uppercase tracking-widest text-orange-500">Pro</h3>
            <div className="text-3xl font-black mb-6">$59<span className="text-sm text-zinc-500">/mo</span></div>
            <ul className="text-left space-y-3 mb-8 text-sm text-zinc-300 font-medium">
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> All Basic Features</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> All Group Classes</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> Guest Passes</li>
            </ul>
            <button className="w-full py-4 rounded-xl bg-orange-500 text-white font-black hover:bg-orange-600 transition-all uppercase text-xs tracking-widest shadow-lg shadow-orange-500/20">
              Go Pro
            </button>
          </div>

          {/* Elite Plan */}
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all">
            <h3 className="text-xl font-bold mb-1 uppercase tracking-widest text-zinc-400">Elite</h3>
            <div className="text-3xl font-black mb-6">$99<span className="text-sm text-zinc-500">/mo</span></div>
            <ul className="text-left space-y-3 mb-8 text-sm text-zinc-400">
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> All Pro Features</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> Personal Training</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-orange-500"/> Sauna & Spa</li>
            </ul>
            <button className="w-full py-3 rounded-xl border border-orange-500 text-orange-500 font-bold hover:bg-orange-500 hover:text-white transition-all uppercase text-xs tracking-widest">
              Go Elite
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}