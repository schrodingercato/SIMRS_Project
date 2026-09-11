'use client';

import { useRouter } from 'next/navigation';
import { Sidebar, TopBar } from './components';

const stats = [
  { label: 'Total Pasien Terdaftar', value: '1,428', sub: '+12% vs bulan lalu', icon: 'groups', color: '#006398' },
  { label: 'Kunjungan Hari Ini', value: '142', sub: '86% dari kuota harian', icon: 'assignment_ind', color: '#00685f' },
  { label: 'Pasien Menunggu di Loket', value: '18', sub: 'Waktu tunggu: 7.4 menit', icon: 'hourglass_top', color: '#e57c00', warn: true },
  { label: 'Kunjungan Selesai', value: '94', sub: '66.2% selesai encounter', icon: 'task_alt', color: '#16a34a' },
];

const recentPatients = [
  { rm: 'RM-2024-0891', nik: '3171851203890061', name: 'Hendra Kurniawan', age: '45 Thn', poli: 'Penyakit Dalam', status: 'Arrived', fhir: 'Synced #88219', statusColor: '#16a34a' },
  { rm: 'RM-2024-0892', nik: '3204126507920063', name: 'Siti Sarah Marlina', age: '31 Thn', poli: 'Poli Anak', status: 'In-Progress', fhir: 'Synced Patient & Encounter', statusColor: '#006398' },
  { rm: 'RM-2024-0893', nik: '3172081404550002', name: 'Djoko Wahyudi', age: '69 Thn', poli: 'IGD & Bedah Akut', status: 'Triase Merah', fhir: 'Synced #88221', statusColor: '#ba0035', cito: true },
  { rm: 'RM-2024-0894', nik: '3275034811980004', name: 'Nurul Khotimah', age: '26 Thn', poli: 'Poli Mata', status: 'Planned', fhir: 'Queueing FHIR Payload', statusColor: '#6d7a77' },
  { rm: 'RM-2024-0895', nik: '3174092509800005', name: 'Bambang Pamungkas', age: '44 Thn', poli: 'Penyakit Dalam', status: 'Arrived', fhir: 'Synced #88225', statusColor: '#16a34a' },
];

const quickActions = [
  { label: 'Registrasi Pasien Baru', icon: 'person_add', href: '/dashboard', color: '#00685f' },
  { label: 'Buka Tiket Kunjungan (Encounter)', icon: 'add_card', href: '/dashboard/antrian', color: '#006398' },
  { label: 'Monitoring Antrian Loket', icon: 'display_settings', href: '/dashboard/antrian', color: '#3d4947' },
  { label: 'Verifikasi NIK Dukcapil & BPJS', icon: 'verified_user', href: '/dashboard', color: '#3d4947' },
];

export default function DashboardHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/3 -right-20 w-[550px] h-[550px] bg-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <Sidebar active="/dashboard" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[0.75rem] text-[#6d7a77] mb-1">SIMRS Terpadu › Loket Registrasi & Rawat Jalan › <span className="text-[#00685f] font-semibold">Dashboard Hari Ini</span></div>
              <h1 className="text-[1.75rem] font-extrabold text-[#131b2e] tracking-tight">Dashboard Pelayanan &amp; Registrasi Pasien</h1>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-[0.75rem] font-bold text-emerald-700 border border-emerald-200" style={{ background: 'rgba(220,252,231,0.6)' }}>
              <span className="material-symbols-outlined text-[1rem]">verified_user</span>
              Kemenkes SATUSEHAT Environment: Production R4.01
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-[0.75rem] text-[#6d7a77] font-semibold">{s.label}</span>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.color + '18' }}>
                    <span className="material-symbols-outlined text-[1rem]" style={{ color: s.color }}>{s.icon}</span>
                  </div>
                </div>
                <div className="text-[2.25rem] font-extrabold tracking-tight" style={{ color: s.warn ? '#e57c00' : '#131b2e' }}>{s.value}</div>
                <div className="text-[0.7rem] text-[#6d7a77]">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart Area */}
            <div className="lg:col-span-8 rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-[1.125rem] font-bold text-[#131b2e]">Tren Kunjungan &amp; Distribusi Poliklinik</h2>
                  <p className="text-[0.75rem] text-[#6d7a77]">7 Hari Terakhir — Terintegrasi SATUSEHAT Encounter</p>
                </div>
                <div className="flex gap-2">
                  {['Minggu Ini', 'Bulan Lalu', 'Triwulan'].map((t) => (
                    <button key={t} className="px-3 py-1 rounded-lg text-[0.75rem] font-semibold transition-all first:bg-[#00685f] first:text-white text-[#3d4947] hover:bg-[#eaedff]">{t}</button>
                  ))}
                </div>
              </div>
              {/* Simple SVG chart */}
              <div className="mt-4 h-48 relative">
                <svg viewBox="0 0 700 180" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00685f" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#00685f" stopOpacity="0.02"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,130 C80,110 140,120 200,90 C260,60 300,80 350,50 C400,20 460,40 500,30 C540,20 600,35 700,25" stroke="#00685f" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M0,130 C80,110 140,120 200,90 C260,60 300,80 350,50 C400,20 460,40 500,30 C540,20 600,35 700,25 L700,180 L0,180 Z" fill="url(#chartGrad)"/>
                  <path d="M0,150 C80,140 140,145 200,130 C260,115 300,125 350,110 C400,95 460,108 500,100 C540,92 600,102 700,98" stroke="#006398" strokeWidth="2" fill="none" strokeDasharray="5,3" strokeLinecap="round" opacity="0.6"/>
                </svg>
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[0.65rem] text-[#6d7a77] px-1">
                  {['Senin (18)', 'Selasa (19)', 'Rabu (20)', 'Kamis (21)', 'Jumat (22)', 'Sabtu (23)', 'Minggu (24)'].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#bcc9c6]/20 text-[0.7rem] font-semibold text-[#3d4947]">
                {['Kapasitas Poli Terpakai: 88.2%', 'Sinkronisasi SatuSehat Sukses: 99.4%', '⚠ Pembatalan / Reschedule: 2 Pasien'].map(t => <span key={t}>{t}</span>)}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-4 rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-[1.125rem] font-bold text-[#131b2e]">Aksi Cepat Resepsionis</h2>
                <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#ba0035' }}>Fast-Lane</span>
              </div>

              <button onClick={() => router.push('/dashboard')} className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-white font-bold text-[0.875rem] transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: 'linear-gradient(90deg, #00685f, #008378)', boxShadow: '0 4px 16px rgba(0,104,95,0.3)' }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[1.1rem]">person_add</span>
                  Registrasi Pasien Baru
                </div>
                <span className="material-symbols-outlined text-[1.1rem]">arrow_forward</span>
              </button>

              {quickActions.slice(1).map((a) => (
                <button key={a.label} onClick={() => router.push(a.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[0.875rem] font-semibold text-[#131b2e] transition-all hover:scale-[1.01]"
                  style={{ background: 'rgba(234,237,255,0.6)', border: '1px solid rgba(188,201,198,0.3)' }}>
                  <span className="material-symbols-outlined text-[1.1rem]" style={{ color: a.color }}>{a.icon}</span>
                  {a.label}
                </button>
              ))}

              <div className="pt-2 border-t border-[#bcc9c6]/20 space-y-2">
                <div className="text-[0.7rem] font-bold text-[#6d7a77] uppercase tracking-wider">Status Loket Pendaftaran — 3 Aktif</div>
                {[
                  { no: '01', label: 'Loket 1 - Pasien BPJS', petugas: 'Siti Aminah, A.Md.RMK', antrian: '#A-024', color: '#16a34a' },
                  { no: '02', label: 'Loket 2 - Umum & Asuransi', petugas: 'Budi Santoso', antrian: '#B-011', color: '#16a34a' },
                  { no: '03', label: 'Loket 3 - CITO / Lansia', petugas: 'Ns. Ratna Dewi', antrian: '#C-005', color: '#e57c00' },
                ].map(l => (
                  <div key={l.no} className="flex items-center justify-between p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.6)' }}>
                    <div>
                      <div className="text-[0.75rem] font-bold text-[#131b2e]">{l.label}</div>
                      <div className="text-[0.65rem] text-[#6d7a77]">Petugas: {l.petugas}</div>
                    </div>
                    <div>
                      <div className="text-[0.6rem] font-bold text-right" style={{ color: l.color }}>Melayani</div>
                      <div className="text-[0.75rem] font-mono font-bold text-right" style={{ color: l.color }}>{l.antrian}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center justify-between p-5 border-b border-[#bcc9c6]/20">
              <div>
                <h2 className="text-[1rem] font-bold text-[#131b2e]">Daftar Registrasi &amp; Kunjungan Pasien Hari Ini</h2>
                <p className="text-[0.75rem] text-[#6d7a77]">142 Data Masuk — Terintegrasi SATUSEHAT Encounter FHIR R4</p>
              </div>
              <div className="flex gap-2">
                <input placeholder="Filter tabel..." className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.7)' }} />
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold text-[#00685f] border border-[#00685f]/30" style={{ background: 'rgba(0,104,95,0.05)' }}>
                  <span className="material-symbols-outlined text-[0.875rem]">download</span>
                  Ekspor FHIR
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.8rem]">
                <thead>
                  <tr className="border-b border-[#bcc9c6]/20" style={{ background: 'rgba(234,237,255,0.5)' }}>
                    {['NO. RM', 'NIK PASIEN', 'NAMA PASIEN & UMUR', 'WAKTU DAFTAR', 'POLIKLINIK TUJUAN', 'STATUS ENCOUNTER', 'SATUSEHAT SYNC', 'AKSI'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map((p, i) => (
                    <tr key={p.rm} className="border-b border-[#bcc9c6]/10 hover:bg-[#eaedff]/30 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-[#006398] text-[0.8rem]">{p.rm}</td>
                      <td className="px-4 py-3 font-mono text-[0.75rem] text-[#3d4947]">{p.nik.slice(0,8)}••••••••</td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                          {p.name}
                          {p.cito && <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold text-white bg-[#ba0035]">CITO</span>}
                        </div>
                        <div className="text-[0.7rem] text-[#6d7a77]">{p.age}</div>
                      </td>
                      <td className="px-4 py-3 text-[#3d4947]">0{8+i}:{10+i*12} WIB</td>
                      <td className="px-4 py-3 text-[#3d4947] font-medium">{p.poli}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[0.65rem] font-bold" style={{ background: p.statusColor + '20', color: p.statusColor }}>
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: p.statusColor }}></span>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[0.65rem] font-semibold text-emerald-700">{p.fhir}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => router.push('/dashboard/antrian')} className="p-1.5 rounded-lg text-[#00685f] hover:bg-[#00685f]/10 transition-colors">
                          <span className="material-symbols-outlined text-[1rem]">open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-[#bcc9c6]/20">
              <span className="text-[0.75rem] text-[#6d7a77]">Menampilkan 1–5 dari 142 pasien terdaftar</span>
              <div className="flex items-center gap-2">
                {[1,2,3,'...',29].map((p,i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg text-[0.8rem] font-semibold transition-colors ${p===1 ? 'text-white' : 'text-[#3d4947] hover:bg-[#eaedff]'}`}
                    style={p===1 ? { background: '#00685f' } : {}}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </main>

        <footer className="border-t border-[#bcc9c6]/20 px-8 py-3 flex items-center justify-between text-[0.65rem] text-[#6d7a77]" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <span>RS Sehat Nusantara • Sistem Informasi Manajemen Rumah Sakit Terakreditasi Paripurna</span>
          <span className="text-emerald-600 font-semibold">● SATUSEHAT Gateway v4.2.0-release • Server Node: JKT-HLTH-04 • Latensi FHIR: 48ms</span>
        </footer>
      </div>
    </div>
  );
}
