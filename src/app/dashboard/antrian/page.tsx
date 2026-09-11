'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, playDingDongBell } from '../components';

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  'Finished': { bg: '#dcfce7', text: '#16a34a', label: 'Finished (Selesai)' },
  'In-progress': { bg: '#dbeafe', text: '#006398', label: 'In-progress (Periksa)' },
  'Arrived': { bg: '#fef9c3', text: '#e57c00', label: 'Arrived (Tiba)' },
  'Planned': { bg: '#f3f4f6', text: '#6d7a77', label: 'Planned (Rencana)' },
};

export default function AntrianPage() {
  const router = useRouter();

  const [antrianList, setAntrianList] = useState([
    { no: 'A-016', name: 'Siti Rahmawati', rm: 'RM-2025-08413', nik: '3201••••••••', age: '38 Thn', gender: 'Perempuan', estimasi: '08:15 WIB', durasi: '12 menit', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Finished', active: false },
    { no: 'A-017', name: 'Nurul Mayasari', rm: 'RM-2025-08413', nik: '3273••••••••', age: '42 Thn', gender: 'Perempuan', estimasi: '08:30 WIB', durasi: '8m (Sedang Berlangsung)', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'In-progress', active: true },
    { no: 'A-018', name: 'Budi Santoso', rm: 'RM-2025-08942', nik: '3171••••••••', age: '55 Thn', gender: 'Laki-laki', estimasi: '08:45 WIB', durasi: 'Siap Masuk Poli', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Arrived', active: false },
    { no: 'A-019', name: 'Ahmad Fauzi', rm: 'RM-2025-08939', nik: '3204••••••••', age: '30 Thn', gender: 'Laki-laki', estimasi: '09:00 WIB', durasi: 'Ruang Tunggu Poli', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Arrived', active: false },
    { no: 'A-020', name: 'Dewi Wulandari', rm: 'RM-2025-08415', nik: '3271••••••••', age: '29 Thn', gender: 'Perempuan', estimasi: '09:15 WIB', durasi: 'Pendaftaran Online Mobile', dokter: 'dr. Hendra Wijaya, Sp.PD', ruang: 'R. 1A Poli Penyakit Dalam', status: 'Planned', active: false },
  ]);

  const [activeIdx, setActiveIdx] = useState(1);
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [showMonitorModal, setShowMonitorModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const activePatient = antrianList[activeIdx] || antrianList[0];

  const handlePanggilSuara = () => {
    playDingDongBell();
    setToast(`[AUDIO PA SYSTEM] Memanggil Antrean ${activePatient.no} atas nama ${activePatient.name} ke ${activePatient.ruang}...`);
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateStatus = (no: string, newStatus: string) => {
    setAntrianList(prev => prev.map(a => a.no === no ? { ...a, status: newStatus } : a));
    if (newStatus === 'In-progress') {
      playDingDongBell();
      setToast(`Pasien ${no} dimulai pemeriksaannya.`);
    } else if (newStatus === 'Finished') {
      setToast(`Encounter pasien ${no} selesai.`);
    }
    setTimeout(() => setToast(null), 3000);
  };

  const handleNextPatient = () => {
    // Finish current, move next
    if (activeIdx < antrianList.length - 1) {
      const nextIdx = activeIdx + 1;
      setAntrianList(prev => prev.map((a, i) => {
        if (i === activeIdx) return { ...a, status: 'Finished', active: false };
        if (i === nextIdx) return { ...a, status: 'In-progress', active: true };
        return a;
      }));
      setActiveIdx(nextIdx);
      playDingDongBell();
      setToast(`Menutup encounter ${activePatient.no} & memanggil antrean berikutnya (${antrianList[nextIdx].no}).`);
    } else {
      setToast('Semua antrean pada shift ini telah selesai.');
    }
    setTimeout(() => setToast(null), 3000);
  };

  const filteredAntrian = antrianList.filter(a => {
    if (filterStatus === 'Semua Status') return true;
    return a.status === filterStatus;
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
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
              <button onClick={() => router.push('/dashboard/pendaftaran')}
                className="px-4 py-2 rounded-xl text-[0.8rem] font-bold text-white shadow-md flex items-center gap-1.5"
                style={{ background: 'linear-gradient(90deg, #00685f, #008378)' }}>
                <span className="material-symbols-outlined text-[1rem]">add_card</span>
                Daftar Antrian Baru
              </button>
            </div>
          </div>

          {toast && (
            <div className="p-3.5 rounded-xl text-[0.85rem] font-bold bg-[#00685f]/10 text-[#00685f] border border-[#00685f]/30 flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[1.2rem]">volume_up</span>
              {toast}
            </div>
          )}

          {/* Poli Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { label: 'Semua Poli', count: null },
              { label: 'Poli Penyakit Dalam (dr. Hendra Wijaya, Sp.PD)', count: 12, active: true },
              { label: 'Poli Anak (dr. Siti Aminah, Sp.A)', count: 6 },
              { label: 'Poli Gigi (drg. Ratna Dewi)', count: 4 },
            ].map(tab => (
              <button key={tab.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[0.8rem] font-semibold whitespace-nowrap transition-all ${tab.active ? 'text-white shadow-md' : 'text-[#3d4947] hover:bg-white/60 border border-[#bcc9c6]/30'}`}
                style={tab.active ? { background: 'linear-gradient(90deg, #00685f, #008378)' } : { background: 'rgba(255,255,255,0.6)' }}>
                {tab.count && <span className="material-symbols-outlined text-[0.875rem]">clinical_notes</span>}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Patient Card */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.08)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-[0.75rem] font-bold text-[#6d7a77] uppercase tracking-wider">Ruang Periksa 1A • Poli Penyakit Dalam</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-blue-600 animate-pulse">
                        {activePatient.status === 'In-progress' ? 'SEDANG DIPERIKSA (IN-PROGRESS)' : activePatient.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-center px-6 py-4 rounded-2xl text-white flex-shrink-0 w-full sm:w-auto" style={{ background: 'linear-gradient(135deg, #00685f, #008378)', boxShadow: '0 8px 24px rgba(0,104,95,0.3)' }}>
                    <div className="text-[0.65rem] font-bold uppercase tracking-widest opacity-80 mb-1">ANTRIAN SEDANG DILAYANI</div>
                    <div className="text-[4rem] font-black tracking-tight leading-none">{activePatient.no}</div>
                    <div className="text-[0.65rem] opacity-70 mt-1">Encounter #ENC-20250324-0017</div>
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="text-[0.7rem] text-[#6d7a77] font-semibold uppercase tracking-wider">Nama Pasien</div>
                    <div className="text-[1.5rem] font-extrabold text-[#131b2e]">{activePatient.name}</div>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <span className="font-mono text-[0.8rem] font-bold text-[#006398]">{activePatient.rm}</span>
                      <span className="text-[0.8rem] text-[#6d7a77]">{activePatient.age} • {activePatient.gender}</span>
                    </div>
                    <div className="text-[0.8rem] text-[#3d4947]">
                      <span className="text-[#6d7a77]">DPJP:</span> <span className="font-bold">{activePatient.dokter}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#bcc9c6]/20">
                  <button onClick={handlePanggilSuara}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[0.8rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all bg-white/70">
                    <span className="material-symbols-outlined text-[1rem] text-[#006398]">campaign</span>
                    Panggil Ulang Suara
                  </button>
                  <button onClick={() => playDingDongBell()}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[0.8rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all bg-white/70">
                    <span className="material-symbols-outlined text-[1rem] text-amber-600">notifications_active</span>
                    Bel Ding-Dong
                  </button>
                  <button onClick={() => {
                    if (activeIdx < antrianList.length - 1) setActiveIdx(activeIdx + 1);
                  }} className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[0.8rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white transition-all bg-white/70">
                    <span className="material-symbols-outlined text-[1rem]">skip_next</span>
                    Lewati (Skip)
                  </button>
                  <button onClick={handleNextPatient}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[0.85rem] font-bold text-white shadow-md transition-transform hover:scale-[1.01]"
                    style={{ background: 'linear-gradient(90deg, #00685f, #008378)' }}>
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
                    <span className="text-[0.75rem] text-[#6d7a77]">Terintegrasi SatuSehat Encounter</span>
                  </div>
                  <div className="flex gap-2">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.7)' }}>
                      <option value="Semua Status">Semua Status</option>
                      <option value="Arrived">Arrived</option>
                      <option value="In-progress">In-progress</option>
                      <option value="Planned">Planned</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[0.8rem]">
                    <thead>
                      <tr className="border-b border-[#bcc9c6]/20 bg-[#eaedff]/50">
                        {['NO. ANTRIAN', 'IDENTITAS PASIEN', 'ESTIMASI / WAKTU', 'DOKTER PEMERIKSA', 'STATUS ENCOUNTER', 'AKSI TINDAKAN'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAntrian.map((a, i) => {
                        const sc = statusConfig[a.status];
                        return (
                          <tr key={a.no} className={`border-b border-[#bcc9c6]/10 transition-colors ${a.active ? 'bg-blue-50/60 font-semibold' : 'hover:bg-[#eaedff]/20'}`}>
                            <td className="px-4 py-3">
                              <span className={`font-black text-[1rem] ${a.active ? 'text-[#006398]' : 'text-[#131b2e]'}`}>{a.no}</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className={`font-bold ${a.active ? 'text-[#006398]' : 'text-[#131b2e]'}`}>{a.name}</div>
                              <div className="text-[0.7rem] text-[#6d7a77]">No. RM: {a.rm}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-semibold text-[#131b2e]">{a.estimasi}</div>
                              <div className="text-[0.7rem] text-[#6d7a77]">{a.durasi}</div>
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
                                <div className="flex gap-1.5">
                                  <button onClick={() => {
                                    playDingDongBell();
                                    setToast(`Memanggil ${a.name} (${a.no})...`);
                                  }} className="px-2.5 py-1.5 rounded-lg text-[0.7rem] font-semibold border border-[#bcc9c6]/40 hover:bg-white text-[#131b2e]">
                                    Panggil
                                  </button>
                                  <button onClick={() => {
                                    setActiveIdx(i);
                                    handleUpdateStatus(a.no, 'In-progress');
                                  }} className="px-2.5 py-1.5 rounded-lg text-[0.7rem] font-bold text-white bg-[#00685f]">
                                    Mulai Periksa
                                  </button>
                                </div>
                              )}
                              {a.status === 'In-progress' && (
                                <button onClick={() => handleUpdateStatus(a.no, 'Finished')}
                                  className="px-2.5 py-1.5 rounded-lg text-[0.7rem] font-bold text-white bg-emerald-600">
                                  Selesaikan
                                </button>
                              )}
                              {a.status === 'Finished' && <span className="text-[0.7rem] text-[#6d7a77] italic">Selesai</span>}
                              {a.status === 'Planned' && <span className="text-[0.7rem] text-[#6d7a77] italic">Terjadwal</span>}
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
              <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Display Monitor Antrean</h3>

                <button onClick={() => setShowMonitorModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#bcc9c6]/40 hover:bg-white font-bold text-[0.8rem] text-[#131b2e] flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[1.1rem] text-[#006398]">monitor</span>
                  Buka Tampilan Monitor Fullscreen
                </button>

                <button onClick={() => {
                  playDingDongBell();
                  setToast('Uji coba suara speaker bel ding-dong berhasil!');
                  setTimeout(() => setToast(null), 3000);
                }} className="w-full py-2.5 px-3 rounded-xl font-bold text-[0.8rem] text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(90deg, #006398, #0284c7)' }}>
                  <span className="material-symbols-outlined text-[1.1rem]">volume_up</span>
                  Uji Audio Speaker Bell
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Monitor Display Modal */}
      {showMonitorModal && (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white p-8 flex flex-col justify-between animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[2.5rem] text-emerald-400">local_hospital</span>
              <div>
                <h2 className="text-[1.5rem] font-black">MONITOR ANTREAN POLIKLINIK UTAMA</h2>
                <p className="text-[0.85rem] text-slate-400">RS Sehat Nusantara • Korridor Lantai 2</p>
              </div>
            </div>
            <button onClick={() => setShowMonitorModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-white text-[0.85rem] font-bold">
              Tutup Display (ESC)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00685f] to-[#004d46] text-center space-y-4 shadow-2xl">
              <div className="text-[1.2rem] font-extrabold uppercase tracking-widest text-emerald-300">NOMOR ANTREAN DILAYANI</div>
              <div className="text-[9rem] font-black leading-none tracking-tight text-white">{activePatient.no}</div>
              <div className="text-[1.75rem] font-bold text-slate-100">{activePatient.name}</div>
              <div className="text-[1.1rem] text-emerald-200">{activePatient.ruang}</div>
            </div>

            <div className="space-y-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
              <h3 className="text-[1.2rem] font-extrabold text-slate-300">ANTREAN BERIKUTNYA</h3>
              <div className="space-y-3">
                {antrianList.filter(a => a.status === 'Arrived').map(a => (
                  <div key={a.no} className="p-4 rounded-2xl bg-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[1.5rem] font-black text-amber-400">{a.no}</div>
                      <div className="text-[1rem] font-bold text-white">{a.name}</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[0.75rem] font-bold bg-amber-500/20 text-amber-300">
                      MENUNGGU LOKET
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex justify-between text-[0.85rem] text-slate-400">
            <span>RUNNING TEXT: Harap membawa Kartu BPJS &amp; KTP saat dipanggil ke ruang periksa.</span>
            <span className="text-emerald-400 font-bold">● LIVE FHIR GATEWAY ONLINE</span>
          </div>
        </div>
      )}
    </div>
  );
}
