'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface UserRoleInfo {
  name: string;
  roleId: string;
  roleTitle: string;
  unit: string;
  nip: string;
  initials: string;
}

const DEFAULT_ROLE_PROFILES: Record<string, UserRoleInfo> = {
  dpjp: {
    name: 'dr. Adrian Wijaya, Sp.PD',
    roleId: 'dpjp',
    roleTitle: 'Dokter Spesialis / DPJP',
    unit: 'Poli Penyakit Dalam',
    nip: '198805202021021004',
    initials: 'AW',
  },
  nurse: {
    name: 'Ns. Sari Indah, S.Kep',
    roleId: 'nurse',
    roleTitle: 'Perawat Penanggung Jawab',
    unit: 'Rawat Inap & Triase',
    nip: '199203152019032001',
    initials: 'SI',
  },
  pharma: {
    name: 'Apt. Riska Amalia, S.Farm',
    roleId: 'pharma',
    roleTitle: 'Apoteker Penanggung Jawab',
    unit: 'Depo Farmasi Central',
    nip: '199507202021032003',
    initials: 'RA',
  },
  front: {
    name: 'Budi Santoso, A.Md.RMK',
    roleId: 'front',
    roleTitle: 'Petugas Loket Admisi',
    unit: 'Loket Pendaftaran & RM',
    nip: '199801012020011002',
    initials: 'BS',
  },
  itadmin: {
    name: 'Rizki Admin IT',
    roleId: 'itadmin',
    roleTitle: 'Administrator IT & Sistem',
    unit: 'Departemen IT & SIMRS',
    nip: '199204102018021001',
    initials: 'RI',
  },
};

const DASHBOARD_ROUTES: Record<string, string> = {
  dpjp: '/dashboard/dokter',
  nurse: '/dashboard/perawat',
  pharma: '/dashboard/farmasi',
  front: '/dashboard/pendaftaran',
  itadmin: '/dashboard/itadmin',
};

export function useCurrentUser() {
  const [userProfile, setUserProfile] = useState<UserRoleInfo>(DEFAULT_ROLE_PROFILES.front);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const meta = session.user.user_metadata || {};
          const roleKey = meta.role as string || 'front';
          const defaultProf = DEFAULT_ROLE_PROFILES[roleKey] || DEFAULT_ROLE_PROFILES.front;
          
          const fullName = meta.full_name || defaultProf.name;
          const initials = fullName
            .split(' ')
            .filter((n: string) => !n.startsWith('dr.') && !n.startsWith('Ns.') && !n.startsWith('Apt.'))
            .map((n: string) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || defaultProf.initials;

          setUserProfile({
            name: fullName,
            roleId: roleKey,
            roleTitle: defaultProf.roleTitle,
            unit: meta.unit || defaultProf.unit,
            nip: meta.nip || defaultProf.nip,
            initials: initials || defaultProf.initials,
          });
        }
      } catch (err) {
        console.error('Error fetching current user profile:', err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return { userProfile, loading };
}

// Shared Sidebar Component
export function Sidebar({ active }: { active: string }) {
  const router = useRouter();
  const { userProfile } = useCurrentUser();

  const navItems = [
    { label: 'Pendaftaran Pasien', icon: 'assignment_ind', href: '/dashboard/pendaftaran', role: 'front' },
    { label: 'Dokter DPJP (RME)', icon: 'stethoscope', href: '/dashboard/dokter', role: 'dpjp' },
    { label: 'Perawat & Triase', icon: 'medical_services', href: '/dashboard/perawat', role: 'nurse' },
    { label: 'Apoteker & Farmasi', icon: 'prescriptions', href: '/dashboard/farmasi', role: 'pharma' },
    { label: 'IT Admin & System', icon: 'shield_person', href: '/dashboard/itadmin', role: 'itadmin' },
    { label: 'Monitoring Antrian Poli', icon: 'clinical_notes', href: '/dashboard/antrian', role: 'all' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 z-40 flex flex-col justify-between p-4 hidden lg:flex"
      style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(188,201,198,0.4)', boxShadow: '0 0 30px rgba(15,23,42,0.05)' }}>
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00685f, #008378)' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>local_hospital</span>
          </div>
          <div>
            <span className="block font-extrabold text-[#131b2e] text-[0.95rem] tracking-tight">RS Sehat Nusantara</span>
            <span className="text-[0.65rem] text-[#6d7a77] flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              SIMRS FHIR v4.2 • Online
            </span>
          </div>
        </div>

        {/* Current Active User Role Badge */}
        <div className="mx-1 mb-4 p-2.5 rounded-xl border border-[#00685f]/20" style={{ background: 'rgba(0,104,95,0.05)' }}>
          <div className="text-[0.6rem] font-bold text-[#6d7a77] uppercase tracking-wider">Peran Sesi Aktif</div>
          <div className="text-[0.8rem] font-extrabold text-[#00685f] truncate">{userProfile.roleTitle}</div>
          <div className="text-[0.65rem] text-[#3d4947] truncate">{userProfile.unit}</div>
        </div>

        <nav className="space-y-1">
          <div className="px-3 pb-1 text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">Navigasi Modul SIMRS</div>
          {navItems.map((item) => {
            const isActive = active === item.href;
            const isUserRoleModule = item.role === userProfile.roleId;

            return (
              <button key={item.href} onClick={() => router.push(item.href)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-[0.825rem] font-semibold transition-all duration-200 ${isActive ? 'text-[#00685f] shadow-sm ring-1 ring-[#00685f]/25 bg-[#00685f]/10' : 'text-[#3d4947] hover:text-[#00685f] hover:bg-white/60'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[1.1rem]" style={{ color: isActive ? '#00685f' : '#6d7a77' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isUserRoleModule && (
                  <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 pt-3 border-t border-[#bcc9c6]/30">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-white text-[0.8rem] font-bold shadow-md transition-all hover:scale-[1.01]"
          style={{ background: 'linear-gradient(90deg, #ba0035, #f43f5e)' }}
          onClick={() => router.push('/dashboard/perawat')}>
          <span className="material-symbols-outlined text-[0.875rem]">warning</span>
          Pendaftaran Pasien CITO
        </button>
      </div>
    </aside>
  );
}

// Shared TopBar Component with Role Switcher & Logout
export function TopBar() {
  const router = useRouter();
  const { userProfile } = useCurrentUser();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleSwitchRole = (roleId: string) => {
    setShowRoleMenu(false);
    const targetRoute = DASHBOARD_ROUTES[roleId] || '/dashboard/pendaftaran';
    router.push(targetRoute);
  };

  return (
    <header className="sticky top-0 w-full z-30 border-b border-[#bcc9c6]/30 shadow-sm"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' }}>
      <div className="flex items-center justify-between px-4 lg:px-6 py-2.5">
        <div className="flex items-center gap-4">
          {/* Quick Search */}
          <div className="relative w-48 sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77] text-[1.1rem]">search</span>
            <input className="w-full pl-9 pr-3 py-1.5 text-[0.8rem] rounded-xl placeholder:text-[#6d7a77] focus:outline-none transition-all"
              style={{ background: 'rgba(234,237,255,0.5)', border: '1px solid rgba(188,201,198,0.45)' }}
              placeholder="Cari No. RM, NIK Pasien..." type="text" />
          </div>

          {/* Quick Role Jump Buttons for Header */}
          <div className="hidden xl:flex items-center gap-1 bg-[#eaedff]/60 p-1 rounded-xl">
            {[
              { id: 'front', label: 'Pendaftaran' },
              { id: 'dpjp', label: 'Dokter' },
              { id: 'nurse', label: 'Perawat' },
              { id: 'pharma', label: 'Farmasi' },
              { id: 'itadmin', label: 'IT Admin' },
            ].map(r => (
              <button key={r.id} onClick={() => handleSwitchRole(r.id)}
                className={`px-2.5 py-1 rounded-lg text-[0.7rem] font-bold transition-all ${userProfile.roleId === r.id ? 'bg-[#00685f] text-white shadow' : 'text-[#3d4947] hover:text-[#00685f]'}`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#bcc9c6]/40 text-[#131b2e] text-[0.75rem] font-semibold hover:bg-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.6)' }}
            onClick={() => router.push('/dashboard/antrian')}>
            <span className="material-symbols-outlined text-[#00685f] text-[1rem]">campaign</span>
            Panggil Antrean
          </button>

          <div className="h-6 w-[1px] bg-[#bcc9c6]/40 mx-1 hidden sm:block"></div>

          {/* Role Switcher & User Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl border border-[#bcc9c6]/40 hover:bg-white transition-all text-left"
              style={{ background: 'rgba(255,255,255,0.8)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-[0.75rem] shadow-sm"
                style={{ background: 'linear-gradient(135deg, #00685f, #006398)' }}>
                {userProfile.initials}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[0.75rem] font-extrabold text-[#131b2e] leading-tight flex items-center gap-1">
                  {userProfile.name}
                  <span className="material-symbols-outlined text-[0.9rem] text-[#6d7a77]">expand_more</span>
                </span>
                <span className="text-[0.65rem] text-[#00685f] font-semibold">{userProfile.roleTitle}</span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white p-3 shadow-2xl border border-[#bcc9c6]/30 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="pb-2 border-b border-[#bcc9c6]/20 mb-2">
                  <div className="text-[0.7rem] font-bold text-[#6d7a77] uppercase">Profil Pengguna Sesi</div>
                  <div className="text-[0.8rem] font-bold text-[#131b2e]">{userProfile.name}</div>
                  <div className="text-[0.65rem] text-[#6d7a77]">NIP: {userProfile.nip}</div>
                  <div className="text-[0.65rem] font-semibold text-[#00685f] mt-0.5">{userProfile.unit}</div>
                </div>

                <div className="text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider mb-1 px-1">
                  Beralih Tampilan Role (Demo):
                </div>
                <div className="space-y-1 mb-2">
                  {[
                    { id: 'front', label: 'Loket Pendaftaran & Admisi', icon: 'assignment_ind' },
                    { id: 'dpjp', label: 'Dokter Spesialis / DPJP', icon: 'stethoscope' },
                    { id: 'nurse', label: 'Perawat & Triase', icon: 'medical_services' },
                    { id: 'pharma', label: 'Apoteker & Depo Farmasi', icon: 'prescriptions' },
                    { id: 'itadmin', label: 'Administrator IT & System', icon: 'shield_person' },
                  ].map(r => (
                    <button key={r.id} onClick={() => handleSwitchRole(r.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-[0.75rem] font-semibold transition-colors ${userProfile.roleId === r.id ? 'bg-[#00685f]/10 text-[#00685f] font-bold' : 'text-[#3d4947] hover:bg-[#eaedff]'}`}>
                      <span className="material-symbols-outlined text-[1rem]" style={{ color: userProfile.roleId === r.id ? '#00685f' : '#6d7a77' }}>{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#bcc9c6]/20">
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-red-600 hover:bg-red-50 text-[0.75rem] font-bold transition-colors">
                    <span className="material-symbols-outlined text-[1rem]">logout</span>
                    Keluar Sesi (Logout)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
