'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, useCurrentUser } from '../components';

export default function FarmasiDashboard() {
  const router = useRouter();
  const { userProfile } = useCurrentUser();

  const [dbPatients, setDbPatients] = useState<any[]>([]);

  const defaultMockResep = [
    { id: 'R-101', noRm: 'RM-2025-08942', patientName: 'Budi Santoso', doctor: 'dr. Adrian Wijaya, Sp.PD', obat: 'Paracetamol 500mg #X (3x1), Amoxicillin 500mg #XV (3x1 p.c)', status: 'Menunggu Racik', alert: 'Alergi Penisilin (Cek Ulang!)' },
    { id: 'R-102', noRm: 'RM-2025-08939', patientName: 'Ahmad Fauzi', doctor: 'dr. Adrian Wijaya, Sp.PD', obat: 'Omeprazole 20mg #X (2x1 a.c), Sucralfate Syr #I (3x1 C)', status: 'Sedang Diracik', alert: null },
    { id: 'R-103', noRm: 'RM-2025-08415', patientName: 'Dewi Wulandari', doctor: 'dr. Siti Aminah, Sp.A', obat: 'Cefadroxil Syr #I (3x1 CTH), Paracetamol Syr #I (prn)', status: 'Siap Ambil', alert: null },
    { id: 'R-104', noRm: 'RM-2025-08413', patientName: 'Siti Rahmawati', doctor: 'dr. Hendra Wijaya, Sp.PD', obat: 'Amlodipine 10mg #XXX (1x1), Metformin 500mg #LX (2x1)', status: 'Selesai', alert: null },
  ];

  const fetchPatients = async () => {
    try {
      const res = await fetch('/api/patients');
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        const mapped = json.data.map((p: any, index: number) => ({
          id: `R-20${index + 1}`,
          noRm: `RM-2026-${(p.nik || '00000').slice(-5)}`,
          patientName: p.full_name,
          doctor: 'dr. Adrian Wijaya, Sp.PD',
          obat: 'Amlodipine 10mg #XXX (1x1), Paracetamol 500mg #X (3x1)',
          status: 'Menunggu Racik',
          alert: null,
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

  const fullResepList = dbPatients.length > 0 ? [...dbPatients, ...defaultMockResep] : defaultMockResep;

  const [resepList, setResepList] = useState<any[]>(fullResepList);

  useEffect(() => {
    setResepList(fullResepList);
  }, [dbPatients]);

  const [toast, setToast] = useState<string | null>(null);
  const [showEtiketModal, setShowEtiketModal] = useState(false);
  const [activeEtiket, setActiveEtiket] = useState<any>(null);

  const [inventory, setInventory] = useState([
    { code: 'OBT-001', name: 'Paracetamol 500mg Tab', category: 'Analgetik', stock: 1240, unit: 'Tablet', exp: '2026-11-20', status: 'Aman' },
    { code: 'OBT-002', name: 'Amoxicillin 500mg Cap', category: 'Antibiotik', stock: 42, unit: 'Kapsul', exp: '2025-04-10', status: 'Kritis' },
    { code: 'OBT-003', name: 'Omeprazole 20mg Cap', category: 'Gastrolapan', stock: 520, unit: 'Kapsul', exp: '2026-08-15', status: 'Aman' },
    { code: 'OBT-004', name: 'Amlodipine 10mg Tab', category: 'Kardiologi', stock: 18, unit: 'Tablet', exp: '2025-02-28', status: 'Kritis' },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setResepList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    const item = resepList.find(r => r.id === id);
    if (newStatus === 'Siap Ambil' && item) {
      setActiveEtiket(item);
      setShowEtiketModal(true);
    } else {
      setToast(`Status E-Resep ${id} berhasil diperbarui menjadi: ${newStatus}`);
      setTimeout(() => setToast(null), 3500);
    }
  };

  const handleRestock = (code: string) => {
    setInventory(prev => prev.map(i => i.code === code ? { ...i, stock: i.stock + 100, status: 'Aman' } : i));
    setToast(`Restock 100 unit untuk ${code} berhasil!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/farmasi" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Header Banner */}
          <div className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #00685f)' }}>
                <span className="material-symbols-outlined text-[2rem]">prescriptions</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[1.35rem] font-extrabold text-[#131b2e]">Dashboard Depo Farmasi &amp; Pelayanan E-Resep</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-indigo-600">APOTEKER CENTRAL</span>
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">
                  Apoteker: <span className="font-semibold text-[#131b2e]">{userProfile.name}</span> (NIP: {userProfile.nip}) • Unit: {userProfile.unit}
                </div>
              </div>
            </div>
            <button onClick={fetchPatients} className="px-3.5 py-2.5 rounded-xl border border-indigo-200 text-indigo-700 font-bold text-[0.8rem] hover:bg-indigo-50 flex items-center gap-1">
              <span className="material-symbols-outlined text-[1rem]">refresh</span>
              Refresh E-Resep Realtime
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
              { label: 'E-Resep Masuk Realtime', value: resepList.length.toString(), sub: 'Dari Poliklinik & IGD', icon: 'description', color: '#4f46e5' },
              { label: 'Sedang Diracik Depo', value: resepList.filter(r=>r.status==='Sedang Diracik').length.toString(), sub: 'Waktu racik ~8 menit', icon: 'hourglass_top', color: '#e57c00', warn: true },
              { label: 'Siap Diserahkan', value: resepList.filter(r=>r.status==='Siap Ambil').length.toString(), sub: 'Siap panggil di Loket Farmasi', icon: 'task_alt', color: '#16a34a' },
              { label: 'Stok Obat Kritis', value: inventory.filter(i=>i.status==='Kritis').length.toString() + ' Item', sub: 'Perlu restock segera', icon: 'warning', color: '#ba0035', warn: true },
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
            {/* E-Resep Queue List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[1.1rem] font-extrabold text-[#131b2e]">Antrean E-Resep Elektronik Dokter</h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Pemrosesan Dispensing &amp; Skrining Obat Depo Farmasi</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-bold text-white bg-indigo-600">Terintegrasi RME</span>
                </div>

                <div className="space-y-3">
                  {resepList.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border border-[#bcc9c6]/30 bg-white/80 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-700 text-[0.9rem]">{r.id}</span>
                          <span className="font-extrabold text-[#131b2e] text-[0.95rem]">{r.patientName}</span>
                          <span className="text-[0.75rem] text-[#6d7a77]">({r.noRm})</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold ${r.status === 'Menunggu Racik' ? 'bg-amber-100 text-amber-800' : r.status === 'Sedang Diracik' ? 'bg-blue-100 text-blue-800' : r.status === 'Siap Ambil' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700'}`}>
                          {r.status}
                        </span>
                      </div>

                      <div className="text-[0.75rem] text-[#6d7a77] mb-1">
                        Preskriptor: <span className="font-semibold text-[#131b2e]">{r.doctor}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#eaedff]/40 text-[0.8rem] font-mono text-[#131b2e] mb-2">
                        {r.obat}
                      </div>

                      {r.alert && (
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[0.75rem] font-bold mb-2 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[1rem]">warning</span>
                          {r.alert}
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-1">
                        {r.status === 'Menunggu Racik' && (
                          <button onClick={() => handleUpdateStatus(r.id, 'Sedang Diracik')}
                            className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[0.875rem]">science</span>
                            Mulai Racik &amp; Skrining
                          </button>
                        )}
                        {r.status === 'Sedang Diracik' && (
                          <button onClick={() => handleUpdateStatus(r.id, 'Siap Ambil')}
                            className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[0.875rem]">print</span>
                            Selesai Racik &amp; Cetak Etiket
                          </button>
                        )}
                        {r.status === 'Siap Ambil' && (
                          <button onClick={() => handleUpdateStatus(r.id, 'Selesai')}
                            className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold text-white bg-gray-800 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[0.875rem]">check_circle</span>
                            Penyerahan Obat (Selesai)
                          </button>
                        )}
                        {r.status === 'Selesai' && (
                          <span className="text-[0.75rem] text-emerald-700 font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[0.9rem]">task_alt</span>
                            Telah Diserahkan Pasien
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory Control */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h3 className="text-[1rem] font-bold text-[#131b2e] flex items-center gap-2">
                  <span className="material-symbols-outlined text-indigo-600">inventory_2</span>
                  Stok Obat Depo Central
                </h3>

                <div className="space-y-2">
                  {inventory.map(item => (
                    <div key={item.code} className="p-3 rounded-xl border border-[#bcc9c6]/20 bg-white/60">
                      <div className="flex items-center justify-between">
                        <span className="text-[0.8rem] font-bold text-[#131b2e]">{item.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[0.6rem] font-bold ${item.status === 'Kritis' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'}`}>
                            {item.status}
                          </span>
                          {item.status === 'Kritis' && (
                            <button onClick={() => handleRestock(item.code)}
                              className="px-2 py-0.5 rounded text-[0.65rem] font-bold bg-indigo-600 text-white hover:bg-indigo-700">
                              + Restock
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-[0.7rem] text-[#6d7a77] mt-1">
                        <span>Stok: <b className="text-[#131b2e]">{item.stock} {item.unit}</b></span>
                        <span>Exp: {item.exp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Etiket Obat Modal */}
      {showEtiketModal && activeEtiket && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[1.5rem]">print</span>
                <h3 className="text-[1.1rem] font-extrabold text-[#131b2e]">Pratinjau Etiket Obat Farmasi</h3>
              </div>
              <button onClick={() => setShowEtiketModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Etiket Preview Box */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/50 space-y-2 text-[0.8rem]">
              <div className="font-extrabold text-center text-indigo-900 border-b border-indigo-200 pb-1">
                INSTALASI FARMASI RS SEHAT NUSANTARA
              </div>
              <div className="flex justify-between font-mono text-[0.75rem]">
                <span>No: {activeEtiket.id}</span>
                <span>Tgl: {new Date().toLocaleDateString('id-ID')}</span>
              </div>
              <div className="font-bold text-[#131b2e]">Pasien: {activeEtiket.patientName} ({activeEtiket.noRm})</div>
              <div className="p-2.5 rounded-xl bg-white border border-indigo-200 font-mono font-bold text-indigo-900 text-[0.85rem]">
                {activeEtiket.obat}
              </div>
              <div className="text-[0.7rem] text-slate-500 italic text-center">
                Apoteker: {userProfile.name} • SIPA: 19950720/SIPA/2021
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setShowEtiketModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-[0.8rem] font-semibold">
                Batal
              </button>
              <button onClick={() => {
                setShowEtiketModal(false);
                setToast(`Etiket obat ${activeEtiket.id} berhasil dicetak! Resep siap diserahkan.`);
                setTimeout(() => setToast(null), 3500);
              }} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-[0.8rem] flex items-center gap-1">
                <span className="material-symbols-outlined text-[1rem]">print</span>
                Cetak Etiket Stiker
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
