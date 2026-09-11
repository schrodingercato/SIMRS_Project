'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar, TopBar, useCurrentUser } from '../../components';

function RekamMedisDokterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userProfile } = useCurrentUser();

  const pName = searchParams.get('name') || 'Budi Santoso';
  const pRm = searchParams.get('rm') || 'RM-2025-08942';
  const pNik = searchParams.get('nik') || '3171851203890061';
  const pAge = searchParams.get('age') || '35 Thn';
  const pGender = searchParams.get('gender') || 'L';
  const pAsuransi = searchParams.get('asuransi') || 'BPJS Kesehatan';

  // Patient Context State
  const [patient] = useState({
    id: searchParams.get('id') || '1',
    name: pName,
    rm: pRm,
    nik: pNik,
    age: `${pAge} (${pGender})`,
    asuransi: pAsuransi,
    alergi: pName.toLowerCase().includes('budi') ? 'PENISILIN' : null,
    poliklinik: 'Poli Penyakit Dalam',
  });

  // Anamnesis State
  const [keluhan, setKeluhan] = useState('Pusing berputar, leher terasa kaku sejak 3 hari yang lalu. Kadang mual.');
  const [rps, setRps] = useState('Pasien mengeluhkan pusing hilang timbul, diperberat saat beraktivitas.');

  // Diagnosa ICD-10 State
  const [icdCode, setIcdCode] = useState('I10');
  const [icdDesc, setIcdDesc] = useState('Essential (primary) hypertension');
  const [diagType, setDiagType] = useState('Utama');

  // E-Resep State
  const [resepItems, setResepItems] = useState([
    { nama: 'Amlodipine 10mg', dosis: '1x1 Tab', jumlah: '30 Tab', aturan: 'Sesudah Makan' },
    { nama: 'Paracetamol 500mg', dosis: '3x1 Tab (prn)', jumlah: '10 Tab', aturan: 'Bila Pusing/Nyeri' },
  ]);

  const [newObat, setNewObat] = useState({ nama: 'Metformin 500mg', dosis: '2x1 Tab', jumlah: '30 Tab', aturan: 'Saat Makan' });

  // Action States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleAddObat = () => {
    if (newObat.nama) {
      setResepItems([...resepItems, newObat]);
      setNewObat({ nama: '', dosis: '1x1', jumlah: '10', aturan: 'Sesudah Makan' });
    }
  };

  const handleRemoveObat = (idx: number) => {
    setResepItems(resepItems.filter((_, i) => i !== idx));
  };

  const handleSaveRME = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      // Call API diagnoses
      const res = await fetch('/api/diagnoses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patient.id,
          icd10_code: icdCode,
          description: icdDesc,
          doctor_id: userProfile.nip || 'DOC-01',
          role: userProfile.roleId || 'dpjp',
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Gagal menyimpan diagnosa RME.');

      setToast({
        type: 'success',
        text: `Rekam Medis Elektronik (RME) Berhasil Disimpan & Disinkronkan ke SATUSEHAT Condition Resource!`,
      });
    } catch (err: any) {
      setToast({ type: 'error', text: err.message || 'Terjadi kesalahan saat menyimpan RME.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/dokter" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Top Bar Navigation back */}
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/dashboard/dokter')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#bcc9c6]/40 text-[0.8rem] font-bold text-[#3d4947] hover:text-[#00685f] shadow-sm transition-all">
              <span className="material-symbols-outlined text-[1rem]">arrow_back</span>
              Kembali ke Antrean Dokter DPJP
            </button>
            <div className="flex items-center gap-2 text-[0.75rem] font-bold text-[#00685f]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sesi RME Aktif • SATUSEHAT Condition FHIR R4 Ready
            </div>
          </div>

          {/* Patient Banner */}
          <div className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-extrabold shadow-lg"
                style={{ background: 'linear-gradient(135deg, #006194, #00685f)' }}>
                {patient.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-[1.35rem] font-extrabold text-[#131b2e]">{patient.name}</h1>
                  <span className="font-mono text-[0.85rem] font-extrabold text-[#006194] bg-[#006194]/10 px-2.5 py-0.5 rounded-lg">{patient.rm}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-blue-600">{patient.asuransi}</span>
                  {patient.alergi && (
                    <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-amber-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[0.8rem]">warning</span>
                      ALERGI: {patient.alergi}
                    </span>
                  )}
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-1">
                  NIK: <span className="font-mono">{patient.nik}</span> • Umur: {patient.age} • Poli: {patient.poliklinik}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#eaedff]/60 p-3 rounded-xl border border-[#bcc9c6]/30 text-[0.75rem]">
              <div>
                <span className="text-[#6d7a77] block">TTV Terakhir:</span>
                <span className="font-bold text-[#131b2e]">TD: 135/85 mmHg • HR: 92 bpm • Temp: 37.8 °C</span>
              </div>
            </div>
          </div>

          {toast && (
            <div className={`p-4 rounded-xl text-[0.85rem] font-bold flex items-center gap-2 shadow-md ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              <span className="material-symbols-outlined text-[1.2rem]">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
              {toast.text}
            </div>
          )}

          {/* RME Editor Form */}
          <form onSubmit={handleSaveRME} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Section 1: Anamnesis */}
              <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <h2 className="text-[1.05rem] font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#bcc9c6]/20 pb-3">
                  <span className="material-symbols-outlined text-[#006194]">clinical_notes</span>
                  1. Anamnesis (S &amp; O - SOAP)
                </h2>
                <div>
                  <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Keluhan Utama (Chief Complaint)</label>
                  <textarea rows={2} value={keluhan} onChange={(e) => setKeluhan(e.target.value)} required
                    className="w-full p-3 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                    style={{ background: 'rgba(234,237,255,0.4)' }} />
                </div>
                <div>
                  <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Riwayat Penyakit Sekarang (RPS)</label>
                  <textarea rows={2} value={rps} onChange={(e) => setRps(e.target.value)}
                    className="w-full p-3 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                    style={{ background: 'rgba(234,237,255,0.4)' }} />
                </div>
              </div>

              {/* Section 2: Diagnosa ICD-10 */}
              <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <h2 className="text-[1.05rem] font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#bcc9c6]/20 pb-3">
                  <span className="material-symbols-outlined text-[#006194]">medical_information</span>
                  2. Diagnosis Klinis &amp; Kode ICD-10 (Assessment - A)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Kode ICD-10 <span className="text-red-500">*</span></label>
                    <input type="text" value={icdCode} onChange={(e) => setIcdCode(e.target.value)} required
                      placeholder="Contoh: I10"
                      className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] font-mono font-bold border border-[#bcc9c6]/50 focus:outline-none"
                      style={{ background: 'rgba(234,237,255,0.4)' }} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Deskripsi Diagnosa (Display)</label>
                    <input type="text" value={icdDesc} onChange={(e) => setIcdDesc(e.target.value)} required
                      placeholder="Essential (primary) hypertension"
                      className="w-full px-3.5 py-2 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none"
                      style={{ background: 'rgba(234,237,255,0.4)' }} />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  {['I10 - Hipertensi Primer', 'E11.9 - DM Tipe 2', 'K30 - Dispepsia', 'J06.9 - ISPA'].map(d => (
                    <button key={d} type="button" onClick={() => {
                      const parts = d.split(' - ');
                      setIcdCode(parts[0]);
                      setIcdDesc(parts[1]);
                    }} className="px-2.5 py-1 rounded-lg text-[0.7rem] font-semibold text-[#006194] bg-[#006194]/10 hover:bg-[#006194]/20 transition-colors">
                      + {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: E-Resep Elektronik */}
              <div className="rounded-2xl p-6 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <h2 className="text-[1.05rem] font-extrabold text-[#131b2e] flex items-center gap-2 border-b border-[#bcc9c6]/20 pb-3">
                  <span className="material-symbols-outlined text-[#006194]">prescriptions</span>
                  3. Peresepan Obat Elektronik (E-Resep - Plan P)
                </h2>

                <div className="space-y-2">
                  {resepItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-[#bcc9c6]/30 bg-white flex items-center justify-between">
                      <div>
                        <div className="text-[0.85rem] font-bold text-[#131b2e]">{item.nama}</div>
                        <div className="text-[0.75rem] text-[#6d7a77]">Dosis: {item.dosis} • Jml: {item.jumlah} • Aturan: {item.aturan}</div>
                      </div>
                      <button type="button" onClick={() => handleRemoveObat(idx)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50">
                        <span className="material-symbols-outlined text-[1rem]">delete</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Obat Form */}
                <div className="p-3 rounded-xl bg-[#eaedff]/40 border border-[#bcc9c6]/30 space-y-3">
                  <div className="text-[0.75rem] font-bold text-[#131b2e]">Tambah Obat Baru ke E-Resep</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input type="text" placeholder="Nama Obat" value={newObat.nama}
                      onChange={(e) => setNewObat({ ...newObat, nama: e.target.value })}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40" />
                    <input type="text" placeholder="Dosis (e.g. 1x1)" value={newObat.dosis}
                      onChange={(e) => setNewObat({ ...newObat, dosis: e.target.value })}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40" />
                    <input type="text" placeholder="Jumlah" value={newObat.jumlah}
                      onChange={(e) => setNewObat({ ...newObat, jumlah: e.target.value })}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] border border-[#bcc9c6]/40" />
                    <button type="button" onClick={handleAddObat}
                      className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white bg-[#006194]">
                      + Tambah Obat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel Actions */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e]">Aksi Finalisasi RME</h3>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-[0.9rem] flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01]"
                  style={{ background: 'linear-gradient(135deg, #006194, #00685f)', boxShadow: '0 4px 16px rgba(0,97,148,0.35)' }}>
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined text-[1.1rem] animate-spin">sync</span>
                      Menyimpan RME &amp; Sync SATUSEHAT...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[1.1rem]">task_alt</span>
                      Simpan Rekam Medis &amp; Sync FHIR
                    </>
                  )}
                </button>

                <button type="button" onClick={() => window.print()}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#bcc9c6]/40 font-bold text-[0.8rem] text-[#3d4947] hover:bg-white flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[1rem]">print</span>
                  Cetak Lembar Resume Medis (PDF)
                </button>

                <div className="pt-3 border-t border-[#bcc9c6]/20 space-y-2 text-[0.7rem] text-[#6d7a77]">
                  <div className="font-bold uppercase tracking-wider text-[#131b2e]">SATUSEHAT FHIR Resource Mapping</div>
                  <div className="flex justify-between"><span>Encounter:</span> <b className="text-emerald-700">ENC-20250324-0017</b></div>
                  <div className="flex justify-between"><span>Condition:</span> <b className="text-emerald-700">ICD-10 {icdCode}</b></div>
                  <div className="flex justify-between"><span>MedicationRequest:</span> <b className="text-emerald-700">{resepItems.length} Prescriptions</b></div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default function RekamMedisDokterPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat Rekam Medis Pasien...</div>}>
      <RekamMedisDokterContent />
    </Suspense>
  );
}
