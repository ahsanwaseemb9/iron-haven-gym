'use client'
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Mail, Lock, ShieldAlert } from 'lucide-react';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = isLoginMode 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (authError) {
        setError(authError.message);
        setLoading(false);
      } else {
        if (!isLoginMode) {
          alert("Check your email for a confirmation link!");
          setLoading(false);
        } else {
          // THE KEY FIX: Hard redirect forces the Middleware to see the new session
          window.location.href = '/profile';
        }
      }
    } catch (err) {
      setError("System failure. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            {isLoginMode ? 'Member' : 'New'} <span className="text-orange-500">Vault</span>
          </h1>
        </div>

        <form onSubmit={handleAuth} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2.5rem] space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-white outline-none focus:border-orange-500" 
              required 
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-zinc-800 p-4 pl-12 rounded-xl text-white outline-none focus:border-orange-500" 
              required 
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-500 text-[10px] font-black uppercase italic">
              <ShieldAlert size={14} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : (isLoginMode ? 'Enter Vault' : 'Join Iron Haven')}
          </button>

          <button 
            type="button"
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="w-full text-zinc-500 text-[10px] font-black uppercase tracking-widest pt-2 hover:text-white transition-colors"
          >
            {isLoginMode ? "Need an account? Sign Up" : "Already a member? Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}