'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, playDingDongBell } from '../components';

export default function DokterDashboard() {
  const router = useRouter();

  const [dbPatients, setDbPatients] = useState<any[]>([]);

  const defaultMockPatients = [
    { id: '1', no: 'A-017', name: 'Nurul Mayasari', rm: 'RM-2025-08413', age: '32 Thn', gender: 'P', waktu: '08:30 WIB', status: 'Finished', alergi: null, asuransi: 'BPJS Kesehatan' },
    { id: '2', no: 'A-018', name: 'Budi Santoso',   rm: 'RM-2025-08942', age: '35 Thn', gender: 'L', waktu: '08:45 WIB', status: 'In-progress', alergi: 'PENISILIN', asuransi: 'Mandiri/Umum' },
    { id: '3', no: 'A-019', name: 'Ahmad Fauzi',    rm: 'RM-2025-08939', age: '43 Thn', gender: 'L', waktu: '09:00 WIB', status: 'Arrived', alergi: null, asuransi: 'BPJS Kesehatan' },
    { id: '4', no: 'A-020', name: 'Dewi Wulandari', rm: 'RM-2025-08415', age: '24 Thn', gender: 'P', waktu: '09:15 WIB', status: 'Arrived', alergi: null, asuransi: 'Asuransi Swasta' },
  ];

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients');
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map((p: any, index: number) => ({
          id: p.id,
          no: `A-0${index + 21}`,
          name: p.full_name,
          rm: `RM-2026-${(p.nik || '00000').slice(-5)}`,
          age: p.dob ? `${new Date().getFullYear() - new Date(p.dob).getFullYear()} Thn` : '30 Thn',
          gender: p.gender === 'male' ? 'L' : 'P',
          waktu: '09:30 WIB',
          status: index === 0 ? 'Arrived' : 'Arrived',
          alergi: null,
          asuransi: 'BPJS Kesehatan',
        }));
        setDbPatients(mapped);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 3000);
    return () => clearInterval(interval);
  }, []);

  const patientsList = dbPatients.length > 0 ? [...dbPatients, ...defaultMockPatients] : defaultMockPatients;

  const [patients, setPatients] = useState<any[]>(patientsList);

  useEffect(() => {
    setPatients(patientsList);
  }, [dbPatients]);

  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [showLabModal, setShowLabModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const statusColor: Record<string, { text: string; bg: string }> = {
    'Finished':    { text: '#16a34a', bg: '#dcfce7' },
    'In-progress': { text: '#006398', bg: '#dbeafe' },
    'Arrived':     { text: '#e57c00', bg: '#fef9c3' },
  };

  const handlePanggilPasien = (no: string, name: string) => {
    playDingDongBell();
    setPatients(prev => prev.map(p => p.no === no ? { ...p, status: 'In-progress' } : p));
    setToast(`Memanggil ${name} (${no}) masuk ke Ruang Periksa Dokter...`);
    setTimeout(() => setToast(null), 3500);
  };

  const filteredPatients = patients.filter(p => {
    if (filterStatus === 'Semua Status') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/dokter" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Dokter Header */}
          <div className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #006194, #00685f)' }}>AW</div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-[1.25rem] font-extrabold text-[#131b2e]">dr. Adrian Wijaya, Sp.PD</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-[#006194]">DPJP UTAMA</span>
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">NIP: 198805202021021004 • 🏥 Poli Penyakit Dalam (Ruang 204) • ⏰ Jadwal: 08:00 – 13:00 WIB</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={fetchPatients} className="px-3.5 py-2 rounded-xl border border-[#bcc9c6]/40 text-[#006194] font-bold text-[0.75rem] hover:bg-white flex items-center gap-1">
                <span className="material-symbols-outlined text-[0.9rem]">refresh</span>
                Refresh Data Pasien Realtime
              </button>
              <button className="px-3.5 py-2 rounded-xl text-[0.75rem] font-bold text-white bg-[#006194] shadow-sm">DPJP Poli</button>
              <button onClick={() => router.push('/dashboard/perawat')}
                className="px-3.5 py-2 rounded-xl text-[0.75rem] font-semibold border border-[#bcc9c6]/40 text-[#3d4947] hover:bg-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[1rem]">medical_services</span>
                Buka Perawat Triage
              </button>
            </div>
          </div>

          {toast && (
            <div className="p-3.5 rounded-xl text-[0.8rem] font-bold bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[1.1rem]">campaign</span>
              {toast}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Pasien Poli Realtime', value: patients.length.toString(), sub: 'Tersambung Supabase DB', icon: 'groups', color: '#006194' },
              { label: 'Pasien Menunggu', value: patients.filter(p=>p.status==='Arrived').length.toString(), sub: '~14 mnt/pasien', icon: 'hourglass_top', color: '#e57c00', warn: true },
              { label: 'Sedang Diperiksa', value: 'A-018', sub: 'Budi Santoso • Aktif 18 mnt', icon: 'person_check', color: '#00685f' },
              { label: 'Pemeriksaan Selesai', value: patients.filter(p=>p.status==='Finished').length.toString(), sub: 'Konsultasi Beres', icon: 'task_alt', color: '#16a34a' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.7rem] text-[#6d7a77] font-semibold">{s.label}</span>
                  <span className="material-symbols-outlined text-[1.1rem]" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="text-[1.75rem] font-extrabold" style={{ color: s.warn ? '#e57c00' : '#131b2e' }}>{s.value}</div>
                <div className="text-[0.65rem] text-[#6d7a77] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Patient List */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between p-5 border-b border-[#bcc9c6]/20">
                  <div>
                    <h2 className="text-[1rem] font-bold text-[#131b2e]">Daftar Pasien Poli Hari Ini</h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Antrian Poliklinik Penyakit Dalam Khusus Dokter Jaga</p>
                  </div>
                  <div className="flex gap-2">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.7)' }}>
                      <option value="Semua Status">Semua Status</option>
                      <option value="Arrived">Arrived (Menunggu)</option>
                      <option value="In-progress">In-progress (Periksa)</option>
                      <option value="Finished">Finished (Selesai)</option>
                    </select>
                    <button onClick={fetchPatients} className="p-1.5 rounded-lg border border-[#bcc9c6]/40 hover:bg-white transition-colors" title="Refresh">
                      <span className="material-symbols-outlined text-[1rem] text-[#6d7a77]">refresh</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-[0.8rem]">
                    <thead>
                      <tr className="border-b border-[#bcc9c6]/20 bg-[#eaedff]/50">
                        {['NO. ANTRIAN', 'IDENTITAS PASIEN', 'JK & UMUR', 'WAKTU TIBA', 'STATUS ENCOUNTER', 'AKSI KLINIS'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map(p => {
                        const sc = statusColor[p.status] ?? { text: '#6d7a77', bg: '#f3f4f6' };
                        const isActive = p.status === 'In-progress';
                        return (
                          <tr key={p.id || p.no} className={`border-b border-[#bcc9c6]/10 transition-colors ${isActive ? 'bg-blue-50/40' : 'hover:bg-[#eaedff]/20'}`}>
                            <td className="px-4 py-3 font-black text-[1rem]" style={{ color: isActive ? '#006398' : '#131b2e' }}>{p.no}</td>
                            <td className="px-4 py-3">
                              <div className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                                {p.name}
                                {p.alergi && <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold bg-amber-100 text-amber-800">ALERGI {p.alergi}</span>}
                              </div>
                              <div className="text-[0.7rem] text-[#006194] font-mono">{p.rm} • {p.asuransi}</div>
                            </td>
                            <td className="px-4 py-3 text-[#3d4947]">{p.gender} / {p.age}</td>
                            <td className="px-4 py-3 font-semibold text-[#131b2e]">{p.waktu}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-bold" style={{ background: sc.bg, color: sc.text }}>
                                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: sc.text }}></span>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {p.status === 'Finished' && (
                                <button onClick={() => router.push('/dashboard/dokter/rekam-medis')}
                                  className="text-[0.7rem] text-emerald-700 font-bold flex items-center gap-1 hover:underline">
                                  <span className="material-symbols-outlined text-[0.9rem]">task_alt</span> Lihat RME Selesai
                                </button>
                              )}
                              {p.status === 'In-progress' && (
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white transition-transform hover:scale-[1.02]"
                                  onClick={() => router.push('/dashboard/dokter/rekam-medis')}
                                  style={{ background: 'linear-gradient(90deg, #006194, #00685f)' }}>
                                  <span className="material-symbols-outlined text-[0.875rem]">description</span>
                                  Buka Rekam Medis Elektronik (RME)
                                </button>
                              )}
                              {p.status === 'Arrived' && (
                                <button onClick={() => handlePanggilPasien(p.no, p.name)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white transition-transform hover:scale-[1.02]"
                                  style={{ background: 'linear-gradient(90deg, #e57c00, #d97706)' }}>
                                  <span className="material-symbols-outlined text-[0.875rem]">campaign</span>
                                  Panggil ke Ruang
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-4 space-y-4">
              {/* Hasil Lab CITO */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[1rem] font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ba0035]">biotech</span>
                    Hasil Lab Cito Siap
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-[#ba0035]">2 Pasien</span>
                </div>
                {[
                  { name: 'Budi Santoso (A-018)', badge: 'KRITIS', badgeColor: '#ba0035', result: 'Leukosit: 14.800 /uL (Tinggi)', time: '10 mnt lalu' },
                  { name: 'Siti Rahmawati (A-015)', badge: 'VERIFIKASI', badgeColor: '#e57c00', result: 'Hb: 9.1 g/dL • Trombosit Normal', time: '22 mnt lalu' },
                ].map(lab => (
                  <div key={lab.name} className="p-3 rounded-xl border border-[#bcc9c6]/20 bg-[#eaedff]/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.8rem] font-bold text-[#131b2e]">{lab.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold text-white" style={{ background: lab.badgeColor }}>{lab.badge}</span>
                    </div>
                    <div className="text-[0.75rem] text-[#3d4947]">{lab.result}</div>
                  </div>
                ))}
                <button onClick={() => setShowLabModal(true)}
                  className="w-full py-2 rounded-xl text-[0.75rem] font-semibold text-[#006194] border border-[#006194]/30 hover:bg-[#006194]/10 transition-colors flex items-center justify-center gap-1">
                  Buka Dashboard Laboratorium Terpadu →
                </button>
              </div>

              {/* SOAP Template */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Template SOAP Cepat</h3>
                <div className="space-y-1.5">
                  {['HT Primer Stage 2', 'DM Tipe 2 Terkontrol', 'Dispepsia Fungsional', 'GERD Evaluasi'].map(t => (
                    <button key={t} onClick={() => router.push('/dashboard/dokter/rekam-medis')}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[0.75rem] font-semibold text-[#3d4947] hover:bg-[#eaedff] transition-colors text-left">
                      <span className="material-symbols-outlined text-[0.875rem] text-[#006194]">article</span>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Lab Modal */}
      {showLabModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600 text-[1.5rem]">biotech</span>
                <h3 className="text-[1.1rem] font-extrabold text-[#131b2e]">Hasil Laboratorium Terpadu</h3>
              </div>
              <button onClick={() => setShowLabModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[0.8rem]">
              <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                <div className="font-bold text-red-900">Budi Santoso (RM-2025-08942) - CITO KRITIS</div>
                <div className="text-[#3d4947] mt-1">• Leukosit: 14.800 /uL (Tinggi - Normal: 4.000 - 10.000)</div>
                <div className="text-[#3d4947]">• Hemoglobin: 13.5 g/dL (Normal)</div>
                <div className="text-[#3d4947]">• Trombosit: 245.000 /uL (Normal)</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-800">Siti Rahmawati (RM-2025-08413)</div>
                <div className="text-[#3d4947] mt-1">• Gula Darah Puasa (GDP): 142 mg/dL (Tinggi)</div>
                <div className="text-[#3d4947]">• HbA1c: 7.2% (DM Terkontrol)</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowLabModal(false)}
                className="px-4 py-2 rounded-xl bg-[#006194] text-white font-bold text-[0.8rem]">
                Tutup Hasil Lab
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
