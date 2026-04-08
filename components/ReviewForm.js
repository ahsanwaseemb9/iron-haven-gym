'use client'
import React, { useActionState, useState } from 'react';
import { submitReview } from '@/app/actions'; 
import { Send, Star, Info, Zap } from 'lucide-react';

export default function ReviewForm() {
  const [state, formAction] = useActionState(submitReview, null);
  const [rating, setRating] = useState(5); // Track stars locally

  return (
    <div className="space-y-6">
      {/* POWER SCORE FORMULA CARD */}
      <div className="bg-orange-500/5 border border-orange-500/20 p-6 rounded-[2rem]">
        <div className="flex items-center gap-2 mb-3 text-orange-500">
          <Info size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">The Power Formula</span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
          <span className="text-white font-bold">Score</span> = (Duration × Intensity) + (Calories × 0.1)
          <br />
          <span className="text-zinc-600 italic mt-1 block">*Intensity: Low(1.0), Mod(1.5), High(2.0)</span>
        </p>
      </div>

      {/* FEEDBACK FORM */}
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem]">
        <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6">
          Member <span className="text-orange-500">Feedback</span>
        </h3>

        {state?.success ? (
          <div className="bg-orange-500 p-6 rounded-2xl text-black text-center animate-in zoom-in">
            <Zap className="mx-auto mb-2" size={20} />
            <p className="font-black uppercase italic text-sm">Review Submitted</p>
            <p className="text-[10px] font-bold uppercase">Pending Admin Approval</p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            {/* HIDDEN INPUT TO SEND RATING TO SERVER */}
            <input type="hidden" name="rating" value={rating} />

            {/* STAR RATING PICKER */}
            <div className="flex flex-col gap-2 mb-4 ml-1">
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Rating</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="transition-transform active:scale-90"
                  >
                    <Star 
                      size={20} 
                      className={`${num <= rating ? 'fill-orange-500 text-orange-500' : 'text-zinc-800'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <input 
              name="full_name" 
              placeholder="Display Name" 
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-orange-500 transition-all font-bold text-sm text-white" 
            />
            
            <select 
              name="role" 
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-orange-500 transition-all font-bold text-sm text-white appearance-none cursor-pointer"
            >
              <option>Powerlifter</option>
              <option>Bodybuilder</option>
              <option>Hyrox Athlete</option>
              <option>Member</option>
            </select>

            <textarea 
              name="content" 
              placeholder="What do you love about the Haven?" 
              rows="3"
              required
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl outline-none focus:border-orange-500 transition-all font-bold text-sm resize-none text-white"
            ></textarea>

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-white text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-orange-500 transition-all active:scale-95 mt-2"
            >
              <Send size={16} />
              Post Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}