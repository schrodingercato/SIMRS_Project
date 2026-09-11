'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, useCurrentUser, playDingDongBell } from '../components';

export default function PerawatDashboard() {
  const router = useRouter();
  const { userProfile } = useCurrentUser();

  // Vital Signs Form State
  const [vitals, setVitals] = useState({
    patient_id: '1',
    patient_name: 'Budi Santoso (RM-2025-08942)',
    blood_pressure: '120/80',
    heart_rate: '82',
    temperature: '36.6',
    spo2: '98',
    pain_scale: '2',
    respiration_rate: '18',
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // SBAR Modal State
  const [showSbarModal, setShowSbarModal] = useState(false);
  const [selectedPatientSbar, setSelectedPatientSbar] = useState<any>(null);
  const [sbarNote, setSbarNote] = useState({
    situation: 'Pasien mengeluhkan pusing dan leher kaku.',
    background: 'Riwayat hipertensi stage 2 tidak teratur minum obat.',
    assessment: 'Tekanan darah 135/85 mmHg, SpO2 97%. Kondisi stabil.',
    recommendation: 'Lanjutkan observasi TTV per 4 jam, konsul DPJP untuk penyesuaian dosis Amlodipine.',
  });

  const mockTriagePatients = [
    { no: 'T-001', rm: 'RM-2025-08942', name: 'Budi Santoso', age: '35 Thn', triase: 'Kuning', td: '135/85', hr: '92 bpm', temp: '37.8 °C', spo2: '97%', status: 'Menunggu DPJP', cito: false },
    { no: 'T-002', rm: 'RM-2025-08939', name: 'Djoko Wahyudi', age: '69 Thn', triase: 'Merah (CITO)', td: '170/105', hr: '110 bpm', temp: '38.5 °C', spo2: '91%', status: 'Triase CITO IGD', cito: true },
    { no: 'T-003', rm: 'RM-2025-08415', name: 'Dewi Wulandari', age: '24 Thn', triase: 'Hijau', td: '115/75', hr: '76 bpm', temp: '36.5 °C', spo2: '99%', status: 'Observasi Bangsal', cito: false },
    { no: 'T-004', rm: 'RM-2025-08413', name: 'Siti Rahmawati', age: '38 Thn', triase: 'Hijau', td: '120/80', hr: '80 bpm', temp: '36.7 °C', spo2: '98%', status: 'Selesai TTV', cito: false },
  ];

  const handleSaveVitals = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await fetch('/api/vital-signs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: vitals.patient_id,
          blood_pressure: vitals.blood_pressure,
          heart_rate: vitals.heart_rate,
          temperature: vitals.temperature,
          user_id: userProfile.nip || 'PERAWAT-01',
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan TTV');

      setToast(`Tanda-Tanda Vital (TTV) berhasil disimpan & disinkronkan ke SATUSEHAT!`);
      setTimeout(() => setToast(null), 4000);
    } catch (err: any) {
      setToast(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSbar = (patient: any) => {
    setSelectedPatientSbar(patient);
    setShowSbarModal(true);
  };

  const handleSaveSbar = () => {
    setShowSbarModal(false);
    setToast(`Catatan SBAR Keperawatan untuk ${selectedPatientSbar?.name} berhasil disimpan ke Rekam Medis.`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/perawat" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Perawat Header */}
          <div className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #008378, #006194)' }}>
                <span className="material-symbols-outlined text-[2rem]">medical_services</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[1.35rem] font-extrabold text-[#131b2e]">Dashboard Asuhan Keperawatan &amp; Triase CITO</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-[#008378]">PERAWAT TIM</span>
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">
                  Perawat: <span className="font-semibold text-[#131b2e]">{userProfile.name}</span> (NIP: {userProfile.nip}) • Bangsal: {userProfile.unit}
                </div>
              </div>
            </div>
            <button onClick={() => {
              playDingDongBell();
              setToast('🔔 MEMANGGIL TIM TRIASE CITO IGD DARURAT!');
            }} className="px-4 py-2.5 rounded-xl text-white font-bold text-[0.8rem] shadow-md flex items-center gap-2"
              style={{ background: 'linear-gradient(90deg, #ba0035, #f43f5e)' }}>
              <span className="material-symbols-outlined text-[1rem]">emergency</span>
              Panggil Triase CITO
            </button>
          </div>

          {toast && (
            <div className="p-3.5 rounded-xl text-[0.8rem] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[1.1rem]">task_alt</span>
              {toast}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Pasien Menunggu TTV', value: '8', sub: 'Tanda-tanda vital belum diisi', icon: 'monitor_heart', color: '#e57c00', warn: true },
              { label: 'Rawat Inap Bangsal', value: '14', sub: '100% Tempat tidur terisi', icon: 'hotel', color: '#00685f' },
              { label: 'Skrining Triase Merah', value: '1 Pasien', sub: 'Djoko Wahyudi • SpO2 91%', icon: 'emergency', color: '#ba0035', warn: true },
              { label: 'TTV Terisi Hari Ini', value: '32', sub: 'Synced SATUSEHAT Observation', icon: 'task_alt', color: '#16a34a' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.7rem] text-[#6d7a77] font-semibold">{s.label}</span>
                  <span className="material-symbols-outlined text-[1.2rem]" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="text-[1.85rem] font-extrabold" style={{ color: s.warn ? '#ba0035' : '#131b2e' }}>{s.value}</div>
                <div className="text-[0.65rem] text-[#6d7a77] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* TTV Input Form */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#bcc9c6]/20">
                  <div>
                    <h2 className="text-[1.1rem] font-extrabold text-[#131b2e] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#008378]">vital_signs</span>
                      Input Tanda-Tanda Vital (TTV)
                    </h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Standard FHIR Observation Resource</p>
                  </div>
                </div>

                <form onSubmit={handleSaveVitals} className="space-y-3.5">
                  <div>
                    <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Pilih Pasien</label>
                    <select value={vitals.patient_name}
                      onChange={(e) => setVitals({ ...vitals, patient_name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                      style={{ background: 'rgba(234,237,255,0.4)' }}>
                      <option value="Budi Santoso (RM-2025-08942)">Budi Santoso (RM-2025-08942)</option>
                      <option value="Djoko Wahyudi (RM-2025-08939)">Djoko Wahyudi (RM-2025-08939 - CITO)</option>
                      <option value="Dewi Wulandari (RM-2025-08415)">Dewi Wulandari (RM-2025-08415)</option>
                      <option value="Siti Rahmawati (RM-2025-08413)">Siti Rahmawati (RM-2025-08413)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Tekanan Darah (mmHg)</label>
                      <input type="text" value={vitals.blood_pressure}
                        onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
                        placeholder="120/80" required
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Nadi / HR (bpm)</label>
                      <input type="number" value={vitals.heart_rate}
                        onChange={(e) => setVitals({ ...vitals, heart_rate: e.target.value })}
                        placeholder="80" required
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Suhu Tubuh (°C)</label>
                      <input type="text" value={vitals.temperature}
                        onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                        placeholder="36.5" required
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Saturasi O2 (%)</label>
                      <input type="number" value={vitals.spo2}
                        onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                        placeholder="98" required
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Respirasi (x/mnt)</label>
                      <input type="number" value={vitals.respiration_rate}
                        onChange={(e) => setVitals({ ...vitals, respiration_rate: e.target.value })}
                        placeholder="18"
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Skala Nyeri (0-10)</label>
                      <input type="number" value={vitals.pain_scale} min={0} max={10}
                        onChange={(e) => setVitals({ ...vitals, pain_scale: e.target.value })}
                        placeholder="0"
                        className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button type="submit" disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-[0.85rem] flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
                      style={{ background: 'linear-gradient(90deg, #008378, #00685f)' }}>
                      <span className="material-symbols-outlined text-[1.1rem]">save</span>
                      Simpan TTV &amp; Kirim ke Rekam Medis
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Triase & Monitoring Patients List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[1.1rem] font-extrabold text-[#131b2e]">Daftar Pasien Triase &amp; Asuhan Keperawatan</h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Pemantauan kondisi vital pasien di bangsal &amp; IGD</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-bold text-white bg-[#008378]">4 Pasien Aktif</span>
                </div>

                <div className="space-y-3">
                  {mockTriagePatients.map(p => (
                    <div key={p.no} className={`p-4 rounded-xl border transition-all ${p.cito ? 'bg-red-50/60 border-red-200' : 'bg-white/70 border-[#bcc9c6]/30'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-[#131b2e] text-[0.95rem]">{p.name}</span>
                          <span className="text-[0.75rem] text-[#006194] font-mono">{p.rm} • {p.age}</span>
                          {p.cito && <span className="px-2 py-0.5 rounded text-[0.6rem] font-bold text-white bg-[#ba0035] animate-pulse">CITO</span>}
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold ${p.triase.includes('Merah') ? 'bg-red-100 text-red-700' : p.triase === 'Kuning' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          Triase: {p.triase}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-[0.75rem] bg-[#eaedff]/40 p-2.5 rounded-lg mb-2">
                        <div><span className="text-[#6d7a77]">TD:</span> <span className="font-bold">{p.td}</span></div>
                        <div><span className="text-[#6d7a77]">Nadi:</span> <span className="font-bold">{p.hr}</span></div>
                        <div><span className="text-[#6d7a77]">Suhu:</span> <span className="font-bold">{p.temp}</span></div>
                        <div><span className="text-[#6d7a77]">SpO2:</span> <span className={`font-bold ${parseInt(p.spo2) < 95 ? 'text-red-600' : 'text-emerald-700'}`}>{p.spo2}</span></div>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[0.75rem]">
                        <span className="text-[#6d7a77]">Status: <span className="font-semibold text-[#131b2e]">{p.status}</span></span>
                        <div className="flex gap-2">
                          <button onClick={() => setVitals({ ...vitals, patient_name: `${p.name} (${p.rm})`, blood_pressure: p.td, heart_rate: p.hr.replace(' bpm',''), temperature: p.temp.replace(' °C',''), spo2: p.spo2.replace('%','') })}
                            className="px-2.5 py-1 rounded-lg text-[0.7rem] font-bold text-[#008378] border border-[#008378]/30 hover:bg-[#008378]/10">
                            Update TTV
                          </button>
                          <button onClick={() => handleOpenSbar(p)}
                            className="px-2.5 py-1 rounded-lg text-[0.7rem] font-bold text-white bg-[#008378] hover:bg-[#00685f]">
                            Catat SBAR
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* SBAR Nurse Notes Modal */}
      {showSbarModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <h3 className="text-[1.1rem] font-extrabold text-[#131b2e]">Catatan Perkembangan SBAR Perawat</h3>
                <p className="text-[0.75rem] text-[#6d7a77]">Pasien: {selectedPatientSbar?.name} ({selectedPatientSbar?.rm})</p>
              </div>
              <button onClick={() => setShowSbarModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[0.8rem]">
              <div>
                <label className="font-bold text-[#131b2e] block mb-1">Situation (S)</label>
                <input type="text" value={sbarNote.situation} onChange={(e) => setSbarNote({ ...sbarNote, situation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="font-bold text-[#131b2e] block mb-1">Background (B)</label>
                <input type="text" value={sbarNote.background} onChange={(e) => setSbarNote({ ...sbarNote, background: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="font-bold text-[#131b2e] block mb-1">Assessment (A)</label>
                <input type="text" value={sbarNote.assessment} onChange={(e) => setSbarNote({ ...sbarNote, assessment: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200" />
              </div>
              <div>
                <label className="font-bold text-[#131b2e] block mb-1">Recommendation (R)</label>
                <input type="text" value={sbarNote.recommendation} onChange={(e) => setSbarNote({ ...sbarNote, recommendation: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200" />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setShowSbarModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[0.8rem] font-semibold">
                Batal
              </button>
              <button onClick={handleSaveSbar}
                className="px-4 py-2 rounded-xl bg-[#008378] text-white font-bold text-[0.8rem]">
                Simpan Catatan SBAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
