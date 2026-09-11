'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Mapping role → dashboard URL
const ROLE_DASHBOARD: Record<string, string> = {
  dpjp:    '/dashboard/dokter',
  nurse:   '/dashboard/perawat',
  pharma:  '/dashboard/farmasi',
  front:   '/dashboard/pendaftaran',
  itadmin: '/dashboard/itadmin',
};

type Role = 'dpjp' | 'nurse' | 'pharma' | 'front' | 'itadmin';

const roles = [
  { id: 'dpjp',    title: 'Dokter Spesialis / DPJP',         icon: 'stethoscope',    label: 'Dokter DPJP' },
  { id: 'nurse',   title: 'Perawat & Tenaga Rawat Inap',     icon: 'medical_services', label: 'Perawat Tim' },
  { id: 'pharma',  title: 'Apoteker & Depo Farmasi',         icon: 'prescriptions',  label: 'Apoteker' },
  { id: 'front',   title: 'Loket Admisi & Pendaftaran',      icon: 'assignment_ind', label: 'Pendaftaran' },
  { id: 'itadmin', title: 'Administrator IT & Rekam Medis',  icon: 'shield_person',  label: 'Manajemen IT', colSpan: true },
];

// Demo credentials hint per role
const DEMO_HINTS: Record<string, string> = {
  dpjp:    'dokter@sehatnusantara.id',
  nurse:   'perawat@sehatnusantara.id',
  pharma:  'apoteker@sehatnusantara.id',
  front:   'resepsionis@sehatnusantara.id',
  itadmin: 'itadmin@sehatnusantara.id',
};

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>('front');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('nip') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi.');
      return;
    }

    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Login gagal: ' + authError.message);
      setLoading(false);
      return;
    }

    // Ambil profile/role dari metadata atau tabel profiles
    const role = data.user?.user_metadata?.role as string ?? 'front';
    const redirectTo = ROLE_DASHBOARD[role] ?? '/dashboard';
    router.push(redirectTo);
  };

  const currentRole = roles.find(r => r.id === activeRole)!;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#dae2fd]/40 to-[#cce5ff]/20 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-[#99efe5]/30 to-[#e2e7ff]/40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
          style={{ backgroundImage: 'radial-gradient(#006194 0.75px, transparent 0.75px)', backgroundSize: '24px 24px' }}></div>
      </div>

      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #006194, #00685f)' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '22px' }}>local_hospital</span>
          </div>
          <div>
            <span className="font-extrabold text-[#131b2e] text-[1.125rem] block tracking-tight">RS Sehat Nusantara</span>
            <span className="text-[0.65rem] text-[#6d7a77] uppercase tracking-widest">Sistem Informasi Manajemen Rumah Sakit</span>
          </div>
        </div>

        {/* Card */}
        <div className="w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 20px 60px -10px rgba(15,23,42,0.12)' }}>
          <div className="p-7">
            <h1 className="text-[1.25rem] font-extrabold text-[#131b2e] mb-1">Portal Masuk Staf Medis &amp; Administrasi</h1>
            <p className="text-[0.8rem] text-[#6d7a77] mb-5">Masukkan kredensial pegawai Anda untuk mengakses modul layanan klinik dan rekam medis.</p>

            {/* Role Selector */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-widest">Pilih Peran Penugasan</label>
                <span className="text-[0.75rem] font-bold text-[#006194]">{currentRole.title}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 p-1 rounded-xl" style={{ background: 'rgba(234,237,255,0.6)' }}>
                {roles.map((role) => {
                  const isActive = activeRole === role.id;
                  return (
                    <button key={role.id} type="button"
                      onClick={() => setActiveRole(role.id as Role)}
                      className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg transition-all text-center ${isActive ? 'text-white shadow-md' : 'text-[#3d4947] hover:text-[#131b2e]'} ${role.colSpan ? 'col-span-2 sm:col-span-1' : ''}`}
                      style={isActive ? { background: 'linear-gradient(135deg, #006194, #00685f)' } : {}}>
                      <span className="material-symbols-outlined text-[1.2rem]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{role.icon}</span>
                      <span className="text-[0.6rem] font-semibold leading-tight">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email / NIP */}
              <div>
                <label className="block text-[0.8rem] font-semibold text-[#131b2e] mb-1.5">
                  Email / NIP Pegawai
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#6d7a77] text-[1.1rem] pointer-events-none">badge</span>
                  <input name="nip" type="email" required
                    placeholder={DEMO_HINTS[activeRole]}
                    defaultValue={DEMO_HINTS[activeRole]}
                    className="w-full h-11 pl-11 pr-4 rounded-xl text-[0.875rem] text-[#131b2e] focus:outline-none transition-all"
                    style={{ background: 'rgba(234,237,255,0.5)', border: '1px solid rgba(188,201,198,0.4)' }} />
                </div>
                <p className="text-[0.65rem] text-[#6d7a77] mt-1">Demo: <span className="font-mono font-semibold text-[#006194]">{DEMO_HINTS[activeRole]}</span></p>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[0.8rem] font-semibold text-[#131b2e]">Kata Sandi Portal</label>
                  <button type="button" className="text-[0.75rem] font-semibold text-[#006194] hover:underline">Lupa Kata Sandi?</button>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#6d7a77] text-[1.1rem] pointer-events-none">lock</span>
                  <input name="password" type={showPassword ? 'text' : 'password'} required
                    defaultValue="Demo@1234"
                    className="w-full h-11 pl-11 pr-11 rounded-xl text-[0.875rem] text-[#131b2e] focus:outline-none transition-all"
                    style={{ background: 'rgba(234,237,255,0.5)', border: '1px solid rgba(188,201,198,0.4)' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-[#6d7a77] hover:text-[#131b2e] transition-colors">
                    <span className="material-symbols-outlined text-[1.1rem]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p className="text-[0.65rem] text-[#6d7a77] mt-1">Demo password: <span className="font-mono font-semibold text-[#006194]">Demo@1234</span></p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl text-[0.8rem] text-red-700 bg-red-50 border border-red-200">
                  <span className="material-symbols-outlined text-[1rem] text-red-500">error</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <div className="pt-2">
                <button type="submit" disabled={loading}
                  className="w-full h-12 rounded-xl font-bold text-[0.9rem] flex items-center justify-center gap-2 text-white transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                  style={{ background: loading ? '#6d7a77' : 'linear-gradient(135deg, #006194, #00685f)', boxShadow: loading ? 'none' : '0 6px 20px rgba(0,97,148,0.35)' }}>
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-[1.2rem] animate-spin">sync</span>
                      Mengautentikasi...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[1.2rem]">login</span>
                      Masuk ke Sistem SIMRS
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Demo accounts info */}
          <div className="px-7 py-4 border-t border-[#bcc9c6]/20" style={{ background: 'rgba(234,237,255,0.3)' }}>
            <div className="text-[0.65rem] font-bold text-[#6d7a77] uppercase tracking-wider mb-2">Akun Demo — Password: Demo@1234</div>
            <div className="grid grid-cols-2 gap-1.5 text-[0.65rem]">
              {roles.map(r => (
                <button key={r.id} type="button" onClick={() => setActiveRole(r.id as Role)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-left hover:bg-white/60 transition-colors text-[#3d4947]">
                  <span className="material-symbols-outlined text-[0.8rem] text-[#006194]">{r.icon}</span>
                  <span className="font-mono text-[#006194] truncate">{DEMO_HINTS[r.id]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-[0.65rem] text-[#6d7a77]">SIMRS RS Sehat Nusantara • FHIR R4 • Satu Sehat Ready</p>
      </main>
    </>
  );
}
