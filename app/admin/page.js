import { supabase } from '@/lib/supabase'
import { Users, Mail, Calendar, CheckCircle } from 'lucide-react'

export const revalidate = 0; // This ensures the page always shows fresh data

export default async function AdminPage() {
  // Fetch all leads from Supabase, newest first
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return <div className="p-20 text-white">Error loading leads...</div>

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-orange-500 font-black uppercase tracking-widest text-xs mb-2 block">Management Console</span>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter">Iron <span className="text-orange-500">Leads</span></h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em]">Total Prospects</p>
            <p className="text-4xl font-black text-white italic">{leads.length}</p>
          </div>
        </header>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2rem] overflow-hidden backdrop-blur-md">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80">
                <th className="p-6 font-black uppercase tracking-widest text-xs text-zinc-500 italic">Member Name</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs text-zinc-500 italic">Email Address</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs text-zinc-500 italic text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-orange-500/5 transition-colors group">
                  <td className="p-6 font-bold text-lg flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[10px] text-orange-500 group-hover:bg-orange-500 group-hover:text-black transition-all">
                      {lead.full_name[0]}
                    </div>
                    {lead.full_name}
                  </td>
                  <td className="p-6 text-zinc-400 font-medium font-mono text-sm tracking-tight">
                    {lead.email}
                  </td>
                  <td className="p-6 text-center">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                      Pass Issued
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {leads.length === 0 && (
            <div className="p-20 text-center text-zinc-600 uppercase font-black italic tracking-widest">
              No leads captured yet. Get to work.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}