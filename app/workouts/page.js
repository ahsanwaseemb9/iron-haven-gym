import React from 'react';
import { Activity, Clock, Flame, ChevronRight } from 'lucide-react';

export default function WorkoutsPage() {
  const history = [
    { date: "Oct 24", exercise: "Chest & Triceps", duration: "65 min", calories: "450 kcal", intensity: "High" },
    { date: "Oct 22", exercise: "Leg Day (Squats focus)", duration: "80 min", calories: "620 kcal", intensity: "Extreme" },
    { date: "Oct 20", exercise: "Cardio & Core", duration: "45 min", calories: "310 kcal", intensity: "Medium" },
    { date: "Oct 19", exercise: "Back & Biceps", duration: "70 min", calories: "480 kcal", intensity: "High" },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black italic uppercase text-orange-500 mb-2">Workout History</h1>
        <p className="text-zinc-500 mb-10 font-medium italic">Track every rep. Own every set.</p>

        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <Activity className="text-orange-500 mb-2" size={18} />
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Total Sessions</p>
            <p className="text-xl font-black">124</p>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <Flame className="text-orange-500 mb-2" size={18} />
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Calories Burned</p>
            <p className="text-xl font-black">42.8k</p>
          </div>
          <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800">
            <Clock className="text-orange-500 mb-2" size={18} />
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Hours Spent</p>
            <p className="text-xl font-black">156h</p>
          </div>
          <div className="bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/20">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-[10px] font-black">+</span>
            </div>
            <p className="text-[10px] uppercase text-black/60 font-bold">New Session</p>
            <p className="text-xl font-black text-black uppercase italic">Log Now</p>
          </div>
        </div>

        {/* WORKOUT LIST */}
        <div className="space-y-3">
          <h2 className="text-xs font-black uppercase text-zinc-600 tracking-[0.2em] mb-4">Recent Logs</h2>
          {history.map((log, i) => (
            <div key={i} className="group bg-zinc-900 p-5 rounded-2xl border border-zinc-800 flex items-center justify-between hover:border-orange-500 transition-all cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="text-center min-w-[50px]">
                  <p className="text-[10px] uppercase text-zinc-500 font-black tracking-tighter">{log.date.split(' ')[0]}</p>
                  <p className="text-xl font-black italic text-orange-500">{log.date.split(' ')[1]}</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-orange-500 transition-colors">{log.exercise}</h3>
                  <div className="flex gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                    <span>{log.duration}</span>
                    <span className="text-orange-500/50">•</span>
                    <span>{log.calories}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`hidden md:block text-[10px] font-black px-3 py-1 rounded-full border border-zinc-800 text-zinc-400 uppercase tracking-widest`}>
                  {log.intensity}
                </span>
                <ChevronRight size={20} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}