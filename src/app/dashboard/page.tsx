'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const ROLE_DASHBOARD: Record<string, string> = {
  dpjp:    '/dashboard/dokter',
  nurse:   '/dashboard/perawat',
  pharma:  '/dashboard/farmasi',
  front:   '/dashboard/pendaftaran',
  itadmin: '/dashboard/itadmin',
};

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    async function redirectByRole() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const role = session.user.user_metadata?.role as string || 'front';
          const target = ROLE_DASHBOARD[role] || '/dashboard/pendaftaran';
          router.replace(target);
        } else {
          router.replace('/dashboard/pendaftaran');
        }
      } catch (e) {
        router.replace('/dashboard/pendaftaran');
      }
    }

    redirectByRole();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white shadow-xl border border-slate-200">
        <span className="material-symbols-outlined text-[1.8rem] text-[#00685f] animate-spin">sync</span>
        <div>
          <div className="text-[0.95rem] font-bold text-[#131b2e]">Mengarahkan ke Dashboard Role Anda...</div>
          <div className="text-[0.75rem] text-[#6d7a77]">Menyiapkan modul sesuai hak otorisasi penugasan.</div>
        </div>
      </div>
    </div>
  );
}
