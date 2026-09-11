'use client';

import { useRouter } from 'next/navigation';
import { Sidebar, TopBar } from '../components';

const patients = [
  { no: 'A-017', name: 'Nurul Mayasari', rm: 'RM-2025-08413', age: '32 Thn', gender: 'P', waktu: '08:30 WIB', status: 'Finished', alergi: null, asuransi: 'BPJS Kesehatan' },
  { no: 'A-018', name: 'Budi Santoso',   rm: 'RM-2025-08942', age: '35 Thn', gender: 'L', waktu: '08:45 WIB', status: 'In-progress', alergi: 'PENISILIN', asuransi: 'Mandiri/Umum' },
  { no: 'A-019', name: 'Ahmad Fauzi',    rm: 'RM-2025-08939', age: '43 Thn', gender: 'L', waktu: '09:00 WIB', status: 'Arrived', alergi: null, asuransi: 'BPJS Kesehatan' },
  { no: 'A-020', name: 'Dewi Wulandari', rm: 'RM-2025-08415', age: '24 Thn', gender: 'P', waktu: '09:15 WIB', status: 'Arrived', alergi: null, asuransi: 'Asuransi Swasta' },
];

const statusColor: Record<string, { text: string; bg: string }> = {
  'Finished':    { text: '#16a34a', bg: '#dcfce7' },
  'In-progress': { text: '#006398', bg: '#dbeafe' },
  'Arrived':     { text: '#e57c00', bg: '#fef9c3' },
};

export default function DokterDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <Sidebar active="/dashboard/dokter" />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">

          {/* Dokter Header */}
          <div className="rounded-2xl p-5 flex items-center gap-5" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #006194, #00685f)' }}>AD</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[1.25rem] font-extrabold text-[#131b2e]">dr. Adrian Wijaya, Sp.PD</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white" style={{ background: '#006194' }}>DPJP UTAMA</span>
              </div>
              <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">NIP: 198805202021021004 • 🏥 Poli Penyakit Dalam (Ruang 204) • ⏰ Jadwal: 08:00 – 13:00 WIB</div>
              <div className="text-[0.7rem] font-semibold mt-1 text-[#00685f]">Hak Otorisasi: Akses Klinis Aktif (Dokter DPJP)</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white" style={{ background: '#006194' }}>DPJP Poli</button>
              <button className="px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold border border-[#bcc9c6]/40 text-[#3d4947]">Perawat Triage</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Pasien Poli', value: '28', sub: 'Target 30/hari', icon: 'groups', color: '#006194', warn: false },
              { label: 'Pasien Menunggu', value: '6', sub: '~14 mnt/pasien', icon: 'hourglass_top', color: '#e57c00', warn: true },
              { label: 'Sedang Diperiksa', value: 'A-018', sub: 'Budi Santoso • 35 thn • Aktif 18 mnt', icon: 'person_check', color: '#00685f', warn: false },
              { label: 'Pemeriksaan Selesai', value: '21', sub: '75% Konsultasi Beres', icon: 'task_alt', color: '#16a34a', warn: false },
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
                    <select className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40" style={{ background: 'rgba(255,255,255,0.7)' }}>
                      <option>Semua Status</option>
                    </select>
                    <button className="p-1.5 rounded-lg border border-[#bcc9c6]/40 hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-[1rem] text-[#6d7a77]">refresh</span>
                    </button>
                  </div>
                </div>
                <table className="w-full text-[0.8rem]">
                  <thead>
                    <tr className="border-b border-[#bcc9c6]/20" style={{ background: 'rgba(234,237,255,0.5)' }}>
                      {['NO. ANTRIAN', 'IDENTITAS PASIEN', 'JK & UMUR', 'WAKTU TIBA', 'STATUS ENCOUNTER', 'AKSI KLINIS'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map(p => {
                      const sc = statusColor[p.status] ?? { text: '#6d7a77', bg: '#f3f4f6' };
                      const isActive = p.status === 'In-progress';
                      return (
                        <tr key={p.no} className={`border-b border-[#bcc9c6]/10 transition-colors ${isActive ? 'bg-blue-50/40' : 'hover:bg-[#eaedff]/20'}`}>
                          <td className="px-4 py-3 font-black text-[1rem]" style={{ color: isActive ? '#006398' : '#131b2e' }}>{p.no}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-[#131b2e] flex items-center gap-1.5">
                              {p.name}
                              {p.alergi && <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold" style={{ background: '#fef9c3', color: '#b45309' }}>ALERGI {p.alergi}</span>}
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
                            {p.status === 'Finished' && <span className="text-[0.7rem] text-[#6d7a77] flex items-center gap-1"><span className="material-symbols-outlined text-[0.875rem] text-emerald-600">task_alt</span> Rekam Medis Tersimpan</span>}
                            {p.status === 'In-progress' && (
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white"
                                onClick={() => router.push('/dashboard/dokter/rekam-medis')}
                                style={{ background: 'linear-gradient(90deg, #006194, #00685f)' }}>
                                <span className="material-symbols-outlined text-[0.875rem]">description</span>
                                Buka Rekam Medis Elektronik (RME)
                              </button>
                            )}
                            {p.status === 'Arrived' && (
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white"
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
                <div className="p-4 border-t border-[#bcc9c6]/20 flex items-center justify-between text-[0.75rem] text-[#6d7a77]">
                  <span>Menampilkan antrian poli penyakit dalam dalam shift aktif</span>
                  <div className="flex gap-1">
                    <span className="text-[0.7rem]">Hal 1 dari 7</span>
                    <button className="font-bold text-[#006194]">Selanjutnya →</button>
                  </div>
                </div>
              </div>

              {/* SPM */}
              <div className="mt-4 rounded-2xl p-4 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#006194]">query_stats</span>
                  <div>
                    <span className="text-[0.875rem] font-bold text-[#131b2e]">Rata-Rata Waktu Rawat Jalan Hari Ini</span>
                    <span className="text-[0.75rem] text-[#6d7a77] ml-2">Target per pasien: 15 menit (Kesesuaian SPM: 94.2%)</span>
                  </div>
                </div>
                <div className="text-[1.5rem] font-extrabold text-emerald-600">12.4 mnt <span className="text-[0.75rem] font-normal text-emerald-600">Optimal</span></div>
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
                  <div key={lab.name} className="p-3 rounded-xl border border-[#bcc9c6]/20" style={{ background: 'rgba(234,237,255,0.4)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.8rem] font-bold text-[#131b2e]">{lab.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold text-white" style={{ background: lab.badgeColor }}>{lab.badge}</span>
                    </div>
                    <div className="text-[0.75rem] text-[#3d4947]">{lab.result}</div>
                    <div className="text-[0.65rem] text-[#6d7a77] mt-0.5">{lab.time}</div>
                  </div>
                ))}
                <button className="w-full py-2 rounded-xl text-[0.75rem] font-semibold text-[#006194] border border-[#006194]/30 hover:bg-[#006194]/5 transition-colors flex items-center justify-center gap-1">
                  Buka Dashboard Laboratorium Terpadu →
                </button>
              </div>

              {/* SOAP Template */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Template SOAP Cepat</h3>
                <div className="space-y-1.5">
                  {['HT Primer Stage 2', 'DM Tipe 2 Terkontrol', 'Dispepsia Fungsional', 'GERD Evaluasi'].map(t => (
                    <button key={t} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[0.75rem] font-semibold text-[#3d4947] hover:bg-[#eaedff] transition-colors text-left">
                      <span className="material-symbols-outlined text-[0.875rem] text-[#006194]">article</span>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="text-[0.7rem] text-[#6d7a77] pt-1 border-t border-[#bcc9c6]/20">Shortcut SOAP: Ketik <span className="font-mono font-bold text-[#006194]">/soap</span> pada editor RME</div>
              </div>

              {/* SATUSEHAT Status */}
              <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[0.875rem] font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685f]">sync</span>
                    Konektivitas SATUSEHAT
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-emerald-600">LIVE 200 OK</span>
                </div>
                <div className="space-y-1.5 text-[0.7rem]">
                  {[
                    ['Standar Regulasi', 'Permenkes 24/2022'],
                    ['Resource Terpetakan', 'Condition, Encounter, Obs'],
                    ['Payload Queue', '0 Tertunda (Sync Realtime)'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-[#3d4947]">
                      <span className="text-[#6d7a77]">{k}:</span>
                      <span className="font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
