'use client'
import React, { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { saveLead } from './actions';
import { Trophy, Users, CheckCircle2, Zap, Star, Quote } from 'lucide-react';
import Testimonials from '@/components/Testimonials'; // Import your new component


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-orange-500 text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50"
    >
      {pending ? 'Verifying...' : 'Claim My Pass'}
    </button>
  );
}

export default function HomePage() { // ONLY ONE DEFAULT EXPORT
  const [state, formAction] = useActionState(saveLead, null);

  // Auto-Reset Logic
  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        window.location.reload(); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-orange-500">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 text-center">
          <span className="bg-orange-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase mb-6 inline-block">Est. 2026</span>
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6">
            Iron <span className="text-orange-500 underline decoration-zinc-800">Haven</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium italic text-zinc-400 max-w-2xl mx-auto uppercase tracking-widest">
            The standard for elite performance.
          </p>
        </div>
      </section>

      {/* LEAD GEN SECTION */}
      <section className="py-32 bg-zinc-900/30 border-y border-zinc-800/50 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black italic uppercase mb-8">
              Claim Your <span className="text-orange-500">24-Hour</span> Access
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Trophy className="text-orange-500" />
                <p className="font-bold uppercase text-sm">Full Facility Access</p>
              </div>
              <div className="flex items-start gap-4">
                <Users className="text-orange-500" />
                <p className="font-bold uppercase text-sm">Group Sessions</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {state?.success ? (
              <div className="bg-zinc-900 border-2 border-orange-500 p-12 rounded-[2.5rem] text-center shadow-2xl shadow-orange-500/20">
                <CheckCircle2 size={40} className="text-orange-500 mx-auto mb-6" />
                <h3 className="text-3xl font-black uppercase italic mb-3">Pass Secured</h3>
                <p className="text-zinc-400">Welcome to the Haven. Check your email.</p>
              </div>
            ) : (
              <form action={formAction} className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-zinc-800 space-y-6">
                <input name="full_name" type="text" placeholder="Full Name" className="w-full bg-black border border-zinc-800 p-5 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold" />
                <input name="email" type="email" placeholder="name@email.com" className="w-full bg-black border border-zinc-800 p-5 rounded-2xl outline-none focus:border-orange-500 transition-all font-bold" />
                {state?.error && <p className="text-red-500 font-black italic uppercase text-[11px]">{state.error}</p>}
                <SubmitButton />
              </form>
            )}
          </div>
        </div>
      </section>

      {/* NEW INTERACTIVE TESTIMONIALS SECTION */}
      <Testimonials />

      <footer className="py-12 text-center text-zinc-700 text-[10px] font-bold uppercase tracking-[0.5em] border-t border-zinc-900">
        &copy; 2026 Iron Haven Fitness Collective
      </footer>
    </div>
  );
}