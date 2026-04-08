'use client'
import React, { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { logWorkout } from '../actions';
import { ArrowLeft, Flame, Timer, Activity, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-orange-500 text-black font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50"
    >
      {pending ? 'Saving to Haven...' : 'Confirm Session'}
    </button>
  );
}

export default function LogWorkoutPage() {
  const [state, formAction] = useActionState(logWorkout, null);
  const router = useRouter();

  // Redirect back to profile after success
  useEffect(() => {
    if (state?.success) {
      setTimeout(() => router.push('/profile'), 2000);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-20">
      <div className="max-w-xl mx-auto">
        <Link href="/profile" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors uppercase font-bold text-xs tracking-widest">
          <ArrowLeft size={14} /> Back to Profile
        </Link>

        <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-10">
          Log <span className="text-orange-500">Iron</span>
        </h1>

        {state?.success ? (
          <div className="bg-zinc-900 border border-orange-500 p-10 rounded-[2rem] text-center animate-in zoom-in duration-300">
             <Dumbbell className="mx-auto text-orange-500 mb-4" size={48} />
             <h2 className="text-2xl font-black uppercase italic">Session Recorded</h2>
             <p className="text-zinc-500 mt-2">Returning to your profile...</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Exercise Name</label>
              <div className="relative">
                <Dumbbell className="absolute left-5 top-5 text-zinc-700" size={18} />
                <input name="exercise_name" placeholder="e.g. Bench Press" className="w-full bg-zinc-900/50 border border-zinc-800 p-5 pl-14 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Duration</label>
                <div className="relative">
                  <Timer className="absolute left-5 top-5 text-zinc-700" size={18} />
                  <input name="duration" placeholder="45 min" className="w-full bg-zinc-900/50 border border-zinc-800 p-5 pl-14 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Calories</label>
                <div className="relative">
                  <Flame className="absolute left-5 top-5 text-zinc-700" size={18} />
                  <input name="calories" type="number" placeholder="300" className="w-full bg-zinc-900/50 border border-zinc-800 p-5 pl-14 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-3 ml-1">Intensity</label>
              <select name="intensity" className="w-full bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold appearance-none">
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
                <option>Elite</option>
              </select>
            </div>

            {state?.error && <p className="text-red-500 font-black italic uppercase text-xs tracking-widest">{state.error}</p>}

            <SubmitButton />
          </form>
        )}
      </div>
    </div>
  );
}