'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar } from '../components';

const antrian = [
  { no: 'A-016', name: 'Siti Rahmawati', rm: 'RM-2025-08413', nik: '3201••••••••', age: '38 Thn', gender: 'Perempuan', estimasi: '08:15 WIB', durasi: '12 menit', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Finished', statusColor: '#16a34a' },
  { no: 'A-017', name: 'Nurul Mayasari', rm: 'RM-2025-08413', nik: '3273••••••••', age: '42 Thn', gender: 'Perempuan', estimasi: '08:30 WIB', durasi: '8m (Sedang Berlangsung)', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'In-progress', statusColor: '#006398', active: true },
  { no: 'A-018', name: 'Budi Santoso', rm: 'RM-2025-08942', nik: '3171••••••••', age: '55 Thn', gender: 'Laki-laki', estimasi: '08:45 WIB', durasi: 'Siap Masuk Poli', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Arrived', statusColor: '#e57c00' },
  { no: 'A-019', name: 'Ahmad Fauzi', rm: 'RM-2025-08939', nik: '3204••••••••', age: '30 Thn', gender: 'Laki-laki', estimasi: '09:00 WIB', durasi: 'Ruang Tunggu Poli', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Arrived', statusColor: '#e57c00' },
  { no: 'A-020', name: 'Dewi Wulandari', rm: 'RM-2025-08415', nik: '3271••••••••', age: '29 Thn', gender: 'Perempuan', estimasi: '09:15 WIB', durasi: 'Pendaftaran Online Mobile', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Planned', statusColor: '#6d7a77' },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  'Finished': { bg: '#dcfce7', text: '#16a34a', label: 'Finished (Selesai)' },
  'In-progress': { bg: '#dbeafe', text: '#006398', label: 'In-progress (Periksa)' },
  'Arrived': { bg: '#fef9c3', text: '#e57c00', label: 'Arrived (Tiba)' },
  'Planned': { bg: '#f3f4f6', text: '#6d7a77', label: 'Planned (Rencana)' },
};

export default function AntrianPage() {
  const router = useRouter();
  const [activePatient] = useState(antrian[1]);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/3 -right-20 w-[550px] h-[550px] bg-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <Sidebar active="/dashboard/antrian" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-[1.5rem] font-extrabold text-[#131b2e] tracking-tight">Manajemen Antrian Poliklinik Rawat Jalan</h1>
              <p className="text-[0.875rem] text-[#6d7a77]">Pemantauan real-time status antrian pasien di poliklinik dan kontrol panggilan ruang periksa.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl text-[0.75rem] font-bold text-emerald-700 border border-emerald-200" style={{ background: 'rgba(220,252,231,0.6)' }}>
                <div className="text-[0.6rem] text-[#6d7a77] uppercase tracking-wider">Jam Operasional</div>
                <div>08:00 – 14:00 WIB</div>
              </div>
              <div className="px-4 py-2 rounded-xl text-[0.75rem] font-bold border border-[#bcc9c6]/30" style={{ background: 'rgba(255,255,255,0.7)' }}>
                <div className="text-[0.6rem] text-[#6d7a77] uppercase tracking-wider">Sistem Audio Ruang</div>
                <div className="text-emerald-600">PA Speaker Ready</div>
              </div>
            </div>
          </div>

          {/* Poli Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { label: 'Semua Poli', count: null },
              { label: 'Poli Penyakit Dalam (dr. Hendra Wijaya, Sp.PD)', count: 12, active: true },
              { label: 'Poli Anak (dr. Siti Aminah, Sp.A)', count: 6 },
              { label: 'Poli Gigi (drg. Ratna Dewi)', count: 4 },
            ].map(tab => (
              <button key={tab.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[0.8rem] font-semibold whitespace-nowrap transition-all ${tab.active ? 'text-white shadow-md' : 'text-[#3d4947] hover:bg-white/60 border border-[#bcc9c6]/30'}`}
                style={tab.active ? { background: 'linear-gradient(90deg, #00685f, #008378)', boxShadow: '0 4px 12px rgba(0,104,95,0.25)' } : { background: 'rgba(255,255,255,0.6)' }}>
                {tab.count && <span className="material-symbols-outlined text-[0.875rem]">clinical_notes</span>}
                {tab.label}
                {tab.count && <span className={`w-6 h-6 rounded-full text-[0.7rem] font-bold flex items-center justify-center ${tab.active ? 'bg-white/20' : 'bg-[#00685f]/10 text-[#00685f]'}`}>{tab.count}</span>}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Patient Card */}
            <div className="lg:col-span-8 space-y-4">
              {/* Current patient */}
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.08)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[0.75rem] font-bold text-[#6d7a77] uppercase tracking-wider">Ruang Periksa 1A • Poli Penyakit Dalam</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-white animate-pulse" style={{ background: '#006398' }}>SEDANG DIPERIKSA (IN-PROGRESS)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center px-6 py-4 rounded-2xl text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #00685f, #008378)', boxShadow: '0 8px 24px rgba(0,104,95,0.3)' }}>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-80 mb-1">ANTRIAN SEDANG DILAYANI</div>
                    <div className="text-[4rem] font-black tracking-tight leading-none">{activePatient.no}</div>
                    <div className="text-[0.65rem] opacity-70 mt-1">Encounter #ENC-20250324-0017</div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="text-[0.7rem] text-[#6d7a77] font-semibold uppercase tracking-wider">Nama Pasien</div>
                    <div className="text-[1.5rem] font-extrabold text-[#131b2e]">{activePatient.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.8rem] font-bold text-[#006398]">{activePatient.rm}</span>
                      <span className="text-[0.8rem] text-[#6d7a77]">{activePatient.age} • {activePatient.gender}</span>
                      <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-blue-600">BPJS Kesehatan</span>
                    </div>
                    <div className="text-[0.8rem] text-[#3d4947]">
                      <span className="text-[#6d7a77]">Dokter Penanggung Jawab Pelayanan (DPJP)</span><br/>
                      <span className="font-bold">{activePatient.dokter}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#bcc9c6]/20">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.875rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <span className="material-symbols-outlined text-[1rem] text-[#006398]">campaign</span>
                    Panggil Ulang Suara
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.875rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <span className="material-symbols-outlined text-[1rem]">notifications_active</span>
                    Bel Ding-Dong
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.875rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                    <span className="material-symbols-outlined text-[1rem]">skip_next</span>
                    Lewati (Skip)
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[0.875rem] font-bold text-white transition-all hover:scale-[1.01]"
                    style={{ background: 'linear-gradient(90deg, #00685f, #008378)', boxShadow: '0 4px 12px rgba(0,104,95,0.3)' }}>
                    <span className="material-symbols-outlined text-[1rem]">task_alt</span>
                    Selesai &amp; Tutup Encounter
                  </button>
                </div>
              </div>

              {/* Queue Table */}
              <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between p-5 border-b border-[#bcc9c6]/20">
                  <div>
                    <h2 className="text-[1rem] font-bold text-[#131b2e]">Daftar Antrian Poliklinik Hari Ini</h2>
                    <span className="text-[0.75rem] text-[#6d7a77]">Senin, 24 Maret 2025</span>
                  </div>
                  <div className="flex gap-2">
                    <select className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.7)' }}>
                      <option>Semua Status</option>
                      <option>Arrived</option>
                      <option>In-progress</option>
                      <option>Planned</option>
                      <option>Finished</option>
                    </select>
                    <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold text-white"
                      style={{ background: 'linear-gradient(90deg, #00685f, #008378)' }}>
                      <span className="material-symbols-outlined text-[0.875rem]">add</span>
                      Pendaftaran Antrian Manual
                    </button>
                  </div>
                </div>
                <table className="w-full text-[0.8rem]">
                  <thead>
                    <tr className="border-b border-[#bcc9c6]/20" style={{ background: 'rgba(234,237,255,0.5)' }}>
                      {['NO. ANTRIAN', 'IDENTITAS PASIEN', 'ESTIMASI / WAKTU', 'DOKTER PEMERIKSA', 'STATUS ENCOUNTER', 'AKSI TINDAKAN'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {antrian.map((a) => {
                      const sc = statusConfig[a.status];
                      return (
                        <tr key={a.no} className={`border-b border-[#bcc9c6]/10 transition-colors ${a.active ? 'bg-[#eaedff]/50' : 'hover:bg-[#eaedff]/20'}`}>
                          <td className="px-4 py-3">
                            <span className={`font-black text-[1rem] ${a.active ? 'text-[#006398]' : 'text-[#131b2e]'}`}>{a.no}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className={`font-bold ${a.active ? 'text-[#006398]' : 'text-[#131b2e]'}`}>{a.name}</div>
                            <div className="text-[0.7rem] text-[#6d7a77]">No. RM: {a.rm} • NIK: {a.nik}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-[#131b2e]">{a.estimasi}</div>
                            <div className={`text-[0.7rem] ${a.active ? 'text-[#006398] font-bold' : 'text-[#6d7a77]'}`}>{a.durasi}</div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-[#131b2e] text-[0.8rem]">{a.dokter}</div>
                            <div className="text-[0.7rem] text-[#6d7a77]">{a.ruang}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.65rem] font-bold" style={{ background: sc.bg, color: sc.text }}>
                              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: sc.text }}></span>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {a.status === 'Arrived' && (
                              <div className="flex gap-2">
                                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white text-[#131b2e]">
                                  <span className="material-symbols-outlined text-[0.875rem] text-[#006398]">campaign</span>
                                  Panggil
                                </button>
                                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[0.7rem] font-bold text-white"
                                  style={{ background: 'linear-gradient(90deg, #00685f, #008378)' }}>
                                  <span className="material-symbols-outlined text-[0.875rem]">play_arrow</span>
                                  Mulai Periksa
                                </button>
                              </div>
                            )}
                            {a.status === 'In-progress' && (
                              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[0.7rem] font-bold text-white"
                                style={{ background: 'linear-gradient(90deg, #16a34a, #15803d)' }}>
                                <span className="material-symbols-outlined text-[0.875rem]">task_alt</span>
                                Selesaikan
                              </button>
                            )}
                            {a.status === 'Finished' && <span className="text-[0.7rem] text-[#6d7a77] italic">Selesai diperiksa</span>}
                            {a.status === 'Planned' && <span className="text-[0.7rem] text-[#6d7a77] italic">Antri Urutan #2</span>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="p-4 border-t border-[#bcc9c6]/20 text-[0.75rem] text-[#6d7a77] flex items-center justify-between">
                  <span>Menampilkan 5 dari 24 pasien terdaftar pada sesi pagi.</span>
                  <div className="flex gap-1">
                    {[1,2,3].map(p => <button key={p} className={`w-8 h-8 rounded-lg text-[0.8rem] font-semibold ${p===1 ? 'text-white' : 'text-[#3d4947] hover:bg-[#eaedff]'}`}
                      style={p===1 ? { background: '#00685f' } : {}}>{p}</button>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Beban Antrian Poli Ini</h3>
                <div className="text-[2.5rem] font-extrabold text-[#131b2e]">8 <span className="text-[1rem] font-normal text-[#6d7a77]">Pasien Menunggu</span></div>
                <div>
                  <div className="flex justify-between text-[0.75rem] mb-1.5">
                    <span className="text-[#6d7a77]">Selesai: 16 dari 24 pasien</span>
                    <span className="font-bold text-[#00685f]">66.7%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#eaedff] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#00685f] to-[#008378]" style={{ width: '66.7%' }}></div>
                  </div>
                </div>
                <div className="p-3 rounded-xl" style={{ background: 'rgba(234,237,255,0.5)' }}>
                  <div className="text-[0.7rem] text-[#6d7a77] mb-1">Efisiensi Konsultasi</div>
                  <div className="text-[1.5rem] font-extrabold text-[#131b2e]">11 <span className="text-[0.875rem] font-normal">Menit / Pasien</span></div>
                  <div className="text-[0.7rem] text-emerald-600 font-semibold mt-1">✓ Target SPM Rawat Jalan: &lt; 15 menit. Standar tercapai optimal.</div>
                </div>

                <div className="border-t border-[#bcc9c6]/20 pt-3">
                  <div className="text-[0.7rem] font-bold text-[#6d7a77] uppercase tracking-wider mb-2">Status FHIR Encounter</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Planned (Rencana)', color: '#6d7a77', bg: '#f3f4f6' },
                      { label: 'Arrived (Check-in)', color: '#e57c00', bg: '#fef9c3' },
                      { label: 'In-progress (Periksa)', color: '#006398', bg: '#dbeafe' },
                      { label: 'Finished (Selesai)', color: '#16a34a', bg: '#dcfce7' },
                    ].map(s => (
                      <div key={s.label} className="px-2.5 py-2 rounded-lg text-[0.65rem] font-bold flex items-center gap-1.5" style={{ background: s.bg, color: s.color }}>
                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: s.color }}></span>
                        <span style={{ color: s.color }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Mode Display &amp; Audio</h3>
                <div className="p-3 rounded-xl border border-[#bcc9c6]/30" style={{ background: 'rgba(234,237,255,0.4)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#006398]">monitor</span>
                    <span className="text-[0.8rem] font-semibold text-[#131b2e]">Mode Layar TV Display Ruang Tunggu</span>
                  </div>
                  <p className="text-[0.7rem] text-[#6d7a77] mb-3">Tampilkan antrian poli saat ini pada monitor koridor lantai 2 secara otomatis.</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg text-[0.75rem] font-semibold border border-[#bcc9c6]/40 text-[#131b2e] hover:bg-white transition-all">
                      Buka Tampilan Monitor
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg text-[0.75rem] font-bold text-white transition-all"
                      style={{ background: 'linear-gradient(90deg, #006398, #0284c7)' }}>
                      <span className="material-symbols-outlined text-[0.875rem] mr-1">volume_up</span>
                      Uji Audio Speaker
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
