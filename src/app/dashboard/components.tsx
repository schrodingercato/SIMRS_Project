'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Shared Sidebar Component
export function Sidebar({ active }: { active: string }) {
  const router = useRouter();

  const navItems = [
    { label: 'Dashboard Pelayanan', icon: 'space_dashboard', href: '/dashboard' },
    { label: 'Rawat Jalan / Poliklinik', icon: 'clinical_notes', href: '/dashboard/antrian' },
    { label: 'IGD & Triase CITO', icon: 'emergency', href: '/dashboard/igd' },
    { label: 'Rawat Inap & Bed Management', icon: 'hotel', href: '/dashboard/rawat-inap' },
    { label: 'Farmasi & E-Resep', icon: 'prescriptions', href: '/dashboard/farmasi' },
    { label: 'Laboratorium & Radiologi', icon: 'biotech', href: '/dashboard/lab' },
    { label: 'SATUSEHAT FHIR Console', icon: 'sync_saved_locally', href: '/dashboard/fhir' },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 z-40 flex flex-col justify-between p-4 hidden lg:flex"
      style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(188,201,198,0.4)', boxShadow: '0 0 30px rgba(15,23,42,0.05)' }}>
      <div>
        <div className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md" style={{ background: 'linear-gradient(135deg, #00685f, #008378)' }}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>local_hospital</span>
          </div>
          <div>
            <span className="block font-extrabold text-[#131b2e] text-[1rem] tracking-tight">RS Sehat Nusantara</span>
            <span className="text-[0.7rem] text-[#6d7a77] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              SIMRS FHIR v4.2 • Online
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <button key={item.href} onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[0.875rem] font-semibold transition-all duration-200 ${isActive ? 'text-[#00685f] shadow-sm ring-1 ring-[#00685f]/25' : 'text-[#3d4947] hover:text-[#00685f]'}`}
                style={isActive ? { background: 'rgba(0,104,95,0.1)' } : {}}>
                <span className="material-symbols-outlined text-[1.1rem]" style={isActive ? { fontVariationSettings: "'FILL' 1", color: '#00685f' } : { color: '#6d7a77' }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-3 border-t border-[#bcc9c6]/30">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-white text-[0.875rem] font-bold shadow-md transition-all"
          style={{ background: 'linear-gradient(90deg, #ba0035, #f43f5e)' }}
          onClick={() => router.push('/dashboard/antrian')}>
          <span className="material-symbols-outlined text-[0.875rem]">warning</span>
          Pendaftaran Pasien CITO
        </button>
        <button onClick={() => router.push('/dashboard/pengaturan')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#3d4947] hover:text-[#00685f] transition-colors text-[0.75rem]">
          <span className="material-symbols-outlined text-[#6d7a77] text-[1rem]">settings</span>
          <span>Pengaturan SIMRS</span>
        </button>
      </div>
    </aside>
  );
}

// Shared TopBar Component
export function TopBar() {
  const router = useRouter();
  return (
    <header className="sticky top-0 w-full z-30 border-b border-[#bcc9c6]/30 shadow-sm"
      style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(16px)' }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77] text-[1.1rem]">search</span>
            <input className="w-full pl-10 pr-4 py-2 text-[0.875rem] rounded-xl placeholder:text-[#6d7a77] focus:outline-none transition-all"
              style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }}
              placeholder="Cari Rekam Medis, NIK..." type="text" />
          </div>
          <nav className="hidden xl:flex items-center gap-5">
            {[
              { label: 'Poliklinik Utama', href: '/dashboard/antrian' },
              { label: 'IGD Terpadu', href: '/dashboard/igd' },
              { label: 'Depo Farmasi Central', href: '/dashboard/farmasi' },
              { label: 'SATUSEHAT Gateway', href: '/dashboard/fhir' },
            ].map(link => (
              <button key={link.href} onClick={() => router.push(link.href)}
                className="text-[#3d4947] hover:text-[#00685f] transition-colors text-[0.875rem] font-semibold">
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#bcc9c6]/40 text-[#131b2e] text-[0.75rem] font-semibold hover:bg-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.6)' }}>
            <span className="material-symbols-outlined text-[#00685f] text-[1rem]">campaign</span>
            Panggil Antrean
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-white text-[0.75rem] font-semibold shadow-md transition-all"
            style={{ background: 'linear-gradient(90deg, #00685f, #008378)', boxShadow: '0 4px 12px rgba(0,104,95,0.3)' }}>
            <span className="material-symbols-outlined text-[0.875rem] animate-spin">sync</span>
            Sinkronisasi FHIR
          </button>
          <div className="h-6 w-[1px] bg-[#bcc9c6]/40 mx-1"></div>
          <button className="p-2 rounded-xl text-[#6d7a77] hover:text-[#00685f] relative transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba0035] rounded-full"></span>
          </button>
          <button className="p-2 rounded-xl hover:bg-[#00685f]/5 transition-colors">
            <span className="material-symbols-outlined text-emerald-600">wifi_tethering</span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-[#bcc9c6]/40">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[0.75rem] ring-2 ring-[#00685f]/20"
              style={{ background: 'linear-gradient(135deg, #00685f, #006398)' }}>AD</div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-[0.75rem] font-semibold text-[#131b2e]">dr. Adrian, Sp.PD</span>
              <span className="text-[0.6875rem] text-[#6d7a77]">DPJP / Resepsionis</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
