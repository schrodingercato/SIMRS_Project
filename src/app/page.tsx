'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'dpjp' | 'nurse' | 'pharma' | 'front' | 'itadmin';

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>('dpjp');
  const [roleTitle, setRoleTitle] = useState('Dokter Spesialis / DPJP');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'dpjp', title: 'Dokter Spesialis / DPJP', icon: 'stethoscope', label: 'Dokter DPJP' },
    { id: 'nurse', title: 'Perawat & Tenaga Rawat Inap', icon: 'medical_services', label: 'Perawat Tim' },
    { id: 'pharma', title: 'Apoteker & Depo Farmasi', icon: 'prescriptions', label: 'Apoteker' },
    { id: 'front', title: 'Loket Admisi & Pendaftaran', icon: 'assignment_ind', label: 'Pendaftaran' },
    { id: 'itadmin', title: 'Administrator IT & Rekam Medis', icon: 'shield_person', label: 'Manajemen IT', colSpan: true },
  ];

  const handleRoleClick = (role: typeof roles[0]) => {
    setActiveRole(role.id as Role);
    setRoleTitle(role.title);
  };

  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nip = formData.get('nip') as string;

    if (!nip) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-surface-variant/40 to-primary-fixed/20 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-secondary-container/30 to-surface-container-high/40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-40 bg-[radial-gradient(#006194_0.75px,transparent_0.75px)] [background-size:24px_24px]"></div>
      </div>
      
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-between p-base lg:p-2xl">
        <div className="flex flex-col w-full">
          <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center py-6 px-4">
            
            <div className="w-full max-w-5xl flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md shadow-primary/20">
                  <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: '"FILL" 1' }}>local_hospital</span>
                </div>
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface block tracking-tight">RS Sehat Nusantara</span>
                  <span className="font-label-xs text-label-xs text-outline uppercase tracking-wider block">Sistem Informasi Manajemen Rumah Sakit</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-secondary-container/40 blur-2xl pointer-events-none"></div>
              
              <div className="relative bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden">
                <div className="p-6 md:p-8">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6">
                    <div>
                      <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Portal Masuk Staf Medis & Administrasi</h1>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">Masukkan kredensial pegawai Anda untuk mengakses modul layanan klinik dan rekam medis.</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Pilih Peran Penugasan</label>
                      <span className="font-label-xs text-label-xs text-primary font-semibold">{roleTitle}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-surface-container-low rounded-lg">
                      {roles.map((role) => {
                        const isActive = activeRole === role.id;
                        return (
                          <button 
                            key={role.id}
                            type="button"
                            onClick={() => handleRoleClick(role)}
                            className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-md transition-all text-center group ${
                              isActive 
                                ? 'bg-primary text-on-primary shadow-sm' 
                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                            } ${role.colSpan ? 'col-span-2 sm:col-span-1' : ''}`}
                          >
                            <span className="material-symbols-outlined text-headline-sm" style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}>{role.icon}</span>
                            <span className="font-label-xs text-label-xs line-clamp-1">{role.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5" htmlFor="nip_input">
                        NIP Pegawai / ID Karyawan / Email Resmi
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-headline-sm text-outline pointer-events-none">badge</span>
                        <input 
                          id="nip_input" 
                          name="nip" 
                          placeholder="Contoh: 198805202021021004 atau dokter@sehatnusantara.id" 
                          required 
                          type="text"
                          className="w-full h-11 pl-11 pr-4 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="pass_input">
                          Kata Sandi Portal
                        </label>
                        <button 
                          type="button" 
                          className="font-label-xs text-label-xs text-primary hover:text-primary-container font-semibold transition-colors" 
                          onClick={() => alert('Silakan hubungi IT Helpdesk (Ext. 102).')}
                        >
                          Lupa Kata Sandi?
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-headline-sm text-outline pointer-events-none">lock</span>
                        <input 
                          id="pass_input" 
                          name="password" 
                          placeholder="••••••••••••" 
                          required 
                          type={showPassword ? "text" : "password"}
                          className="w-full h-11 pl-11 pr-11 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 text-outline hover:text-on-surface transition-colors flex items-center justify-center p-1"
                        >
                          <span className="material-symbols-outlined text-headline-sm">{showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1.5" htmlFor="clinic_unit_input">
                        Stasiun / Poliklinik Tugas Aktif
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-headline-sm text-outline pointer-events-none">domain</span>
                        <select 
                          id="clinic_unit_input" 
                          name="clinic_unit"
                          className="w-full h-11 pl-11 pr-10 bg-surface-container-low rounded-lg text-on-surface font-body-md text-body-md appearance-none focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all cursor-pointer"
                        >
                          <option value="poli_internal">Poli Spesialis Penyakit Dalam (Gedung B Lt. 2)</option>
                          <option value="poli_pediatric">Poli Tumbuh Kembang Anak (Gedung B Lt. 1)</option>
                          <option value="igd_emergency">Instalasi Gawat Darurat (IGD 24 Jam - Zona Merah/Kuning)</option>
                          <option value="pharmacy_central">Depo Farmasi Sentral & Rawat Inap (Gedung A Lt. 1)</option>
                          <option value="admission_counter">Loket Admisi Pendaftaran & Bridging BPJS (Lobby Utama)</option>
                          <option value="icu_hcu">Intensive Care Unit (ICU / ICCU Gedung C)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3.5 text-headline-sm text-outline pointer-events-none">expand_more</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <label className="flex items-center gap-2.5 cursor-pointer select-none">
                        <input defaultChecked type="checkbox" className="w-4 h-4 rounded text-primary bg-surface-container-high focus:ring-0 cursor-pointer" />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Ingat sesi pada terminal workstation ini
                        </span>
                      </label>
                    </div>

                    <div className="pt-3">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full h-12 rounded-lg font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-[0.99] ${
                          loading 
                            ? 'bg-secondary text-on-secondary shadow-secondary/25'
                            : 'bg-primary hover:bg-primary-container text-on-primary shadow-primary/25'
                        }`}
                      >
                        {loading ? (
                          <>
                            <span className="material-symbols-outlined text-headline-md animate-spin">sync</span>
                            <span>Mengautentikasi Kredensial Medis...</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-headline-md">login</span>
                            <span>Masuk ke Sistem SIMRS</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

            <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 text-on-surface-variant">
              <div className="flex items-center gap-2"></div>
              <div className="flex items-center gap-4">
                <span className="text-outline-variant font-label-xs text-label-xs">• UI/UX from Google Stitch</span>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  );
}
