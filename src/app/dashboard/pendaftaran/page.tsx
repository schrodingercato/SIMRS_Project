'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, useCurrentUser } from '../components';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function PendaftaranDashboard() {
  const router = useRouter();
  const { userProfile } = useCurrentUser();

  // Form State
  const [formData, setFormData] = useState({
    nik: '',
    full_name: '',
    dob: '',
    gender: 'male',
    address: '',
    phone: '',
    marital_status: 'Single',
    polyclinic: 'Poli Penyakit Dalam',
    penjamin: 'BPJS Kesehatan',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(true);

  // Fetch registered patients from API
  const fetchPatients = async () => {
    setLoadingPatients(true);
    try {
      const res = await fetch('/api/patients');
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setPatients(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoadingPatients(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // 1. Submit to /api/patients
      const resPatient = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nik: formData.nik,
          full_name: formData.full_name,
          dob: formData.dob,
          gender: formData.gender,
          address: formData.address,
          phone: formData.phone,
          marital_status: formData.marital_status,
          role: userProfile.roleId || 'front',
        }),
      });

      const jsonPatient = await resPatient.json();

      if (!resPatient.ok) {
        throw new Error(jsonPatient.error || 'Gagal meragistrasi demografi pasien.');
      }

      const createdPatient = jsonPatient.data?.[0];

      // 2. Submit encounter if patient created
      if (createdPatient?.id) {
        await fetch('/api/encounters', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patient_id: createdPatient.id,
            polyclinic: formData.polyclinic,
            role: userProfile.roleId || 'front',
          }),
        });
      }

      setMessage({
        type: 'success',
        text: `Registrasi Pasien & Encounter Berhasil! NIK: ${formData.nik} • ${formData.full_name}`,
      });

      // Reset form
      setFormData({
        nik: '',
        full_name: '',
        dob: '',
        gender: 'male',
        address: '',
        phone: '',
        marital_status: 'Single',
        polyclinic: 'Poli Penyakit Dalam',
        penjamin: 'BPJS Kesehatan',
      });

      fetchPatients();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Terjadi kesalahan saat registrasi.' });
    } finally {
      setLoading(false);
    }
  };

  const defaultMockPatients = [
    { id: '1', nik: '3171851203890061', full_name: 'Hendra Kurniawan', dob: '1979-03-12', gender: 'male', address: 'Jl. Melati No. 45, Jakarta', created_at: new Date().toISOString() },
    { id: '2', nik: '3204126507920063', full_name: 'Siti Sarah Marlina', dob: '1993-07-25', gender: 'female', address: 'Jl. Mawar Gg. 3, Bandung', created_at: new Date().toISOString() },
    { id: '3', nik: '3172081404550002', full_name: 'Djoko Wahyudi', dob: '1955-08-14', gender: 'male', address: 'Jl. Sudirman No. 12, Surabaya', created_at: new Date().toISOString() },
  ];

  const displayPatients = patients.length > 0 ? patients : defaultMockPatients;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/pendaftaran" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Header Banner */}
          <div className="rounded-2xl p-5 flex items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #00685f, #008378)' }}>
                <span className="material-symbols-outlined text-[2rem]">assignment_ind</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[1.35rem] font-extrabold text-[#131b2e]">Dashboard Loket Pendaftaran &amp; Admisi Pasien</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-[#00685f]">LOKET ADMISI</span>
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">
                  Petugas: <span className="font-semibold text-[#131b2e]">{userProfile.name}</span> (NIP: {userProfile.nip}) • Unit: {userProfile.unit}
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-[0.75rem] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              Bridging Dukcapil &amp; BPJS v.2.4 Active
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Registrasi Pasien', value: displayPatients.length.toString(), sub: 'Pasien Terdaftar Sesi Ini', icon: 'groups', color: '#00685f' },
              { label: 'Antrean Loket Aktif', value: '18', sub: 'Rata-rata waktu: 4.2 menit', icon: 'hourglass_top', color: '#e57c00', warn: true },
              { label: 'Tiket Encounter FHIR', value: '142', sub: 'Terhubung SATUSEHAT R4', icon: 'task_alt', color: '#16a34a' },
              { label: 'Verifikasi BPJS Sukses', value: '98.4%', sub: 'Bridging VClaim Valid', icon: 'verified_user', color: '#006398' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.7rem] text-[#6d7a77] font-semibold">{s.label}</span>
                  <span className="material-symbols-outlined text-[1.2rem]" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="text-[1.85rem] font-extrabold" style={{ color: s.warn ? '#e57c00' : '#131b2e' }}>{s.value}</div>
                <div className="text-[0.65rem] text-[#6d7a77] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Registration Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#bcc9c6]/20">
                  <div>
                    <h2 className="text-[1.1rem] font-extrabold text-[#131b2e] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00685f]">person_add</span>
                      Form Registrasi Pasien Baru &amp; Encounter
                    </h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Input data demografi pasien untuk generate Nomor RM &amp; payload SATUSEHAT Patient</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-[0.7rem] font-mono font-bold bg-[#00685f]/10 text-[#00685f]">
                    API Backend Live
                  </span>
                </div>

                {message && (
                  <div className={`p-3 rounded-xl mb-4 text-[0.8rem] font-semibold flex items-center gap-2 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    <span className="material-symbols-outlined text-[1.1rem]">{message.type === 'success' ? 'check_circle' : 'error'}</span>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* NIK */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">
                        NIK Pasien (16 Digit KTP) <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required maxLength={16}
                        placeholder="Contoh: 3171012304900001"
                        value={formData.nik}
                        onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    {/* Nama Lengkap */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">
                        Nama Lengkap Pasien <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required
                        placeholder="Nama sesuai KTP"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">
                        Tanggal Lahir <span className="text-red-500">*</span>
                      </label>
                      <input type="date" required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }} />
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Jenis Kelamin</label>
                      <select value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }}>
                        <option value="male">Laki-laki (Male)</option>
                        <option value="female">Perempuan (Female)</option>
                      </select>
                    </div>

                    {/* Poliklinik Tujuan */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Poliklinik Tujuan</label>
                      <select value={formData.polyclinic}
                        onChange={(e) => setFormData({ ...formData, polyclinic: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }}>
                        <option value="Poli Penyakit Dalam">Poli Penyakit Dalam (dr. Adrian, Sp.PD)</option>
                        <option value="Poli Anak">Poli Anak (dr. Siti Aminah, Sp.A)</option>
                        <option value="Poli Bedah Akut">Poli Bedah Akut (dr. Budi, Sp.B)</option>
                        <option value="IGD & Triase CITO">IGD &amp; Triase CITO</option>
                      </select>
                    </div>

                    {/* Penjamin / Cara Bayar */}
                    <div>
                      <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Penjamin / Payment</label>
                      <select value={formData.penjamin}
                        onChange={(e) => setFormData({ ...formData, penjamin: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                        style={{ background: 'rgba(234,237,255,0.4)' }}>
                        <option value="BPJS Kesehatan">BPJS Kesehatan (VClaim Bridged)</option>
                        <option value="Mandiri / Umum">Mandiri / Umum</option>
                        <option value="Asuransi Swasta">Asuransi Swasta / InHealth</option>
                      </select>
                    </div>
                  </div>

                  {/* Alamat */}
                  <div>
                    <label className="block text-[0.75rem] font-bold text-[#131b2e] mb-1">Alamat Domisili Pasien</label>
                    <input type="text"
                      placeholder="Jalan, No. Rumah, Kelurahan, Kecamatan"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-[0.85rem] border border-[#bcc9c6]/50 focus:outline-none focus:ring-2 focus:ring-[#00685f]"
                      style={{ background: 'rgba(234,237,255,0.4)' }} />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button type="submit" disabled={loading}
                      className="w-full py-3 px-4 rounded-xl text-white font-bold text-[0.9rem] flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                      style={{ background: 'linear-gradient(90deg, #00685f, #008378)', boxShadow: '0 4px 16px rgba(0,104,95,0.35)' }}>
                      {loading ? (
                        <>
                          <span className="material-symbols-outlined text-[1.2rem] animate-spin">sync</span>
                          Memproses Registrasi Pasien &amp; Sync FHIR...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[1.2rem]">add_card</span>
                          Simpan Registrasi &amp; Terbitkan No. Antrean
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Loket Control Panel & Dukcapil Check */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[1rem] font-bold text-[#131b2e] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00685f]">campaign</span>
                    Panggil Antrean Loket Aktif
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-[#00685f]">LOKET 1</span>
                </div>

                <div className="p-4 rounded-xl text-center text-white space-y-1" style={{ background: 'linear-gradient(135deg, #00685f, #006398)' }}>
                  <div className="text-[0.65rem] font-bold tracking-widest uppercase opacity-80">NOMOR ANTREAN SAAT INI</div>
                  <div className="text-[3.25rem] font-black tracking-tight leading-none">A-024</div>
                  <div className="text-[0.7rem] opacity-90">Pasien: Siti Aminah • BPJS Kesehatan</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="py-2.5 px-3 rounded-xl font-bold text-[0.75rem] text-[#00685f] border border-[#00685f]/30 hover:bg-[#00685f]/10 transition-colors flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[1rem]">volume_up</span>
                    Panggil Ulang
                  </button>
                  <button className="py-2.5 px-3 rounded-xl font-bold text-[0.75rem] text-white transition-all flex items-center justify-center gap-1 shadow-md"
                    style={{ background: 'linear-gradient(90deg, #00685f, #008378)' }}>
                    <span className="material-symbols-outlined text-[1rem]">skip_next</span>
                    Berikutnya (A-025)
                  </button>
                </div>
              </div>

              {/* Loket Status Grid */}
              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)' }}>
                <h3 className="text-[0.95rem] font-bold text-[#131b2e]">Status Loket Pendaftaran</h3>
                {[
                  { loket: 'Loket 1 - BPJS Kesehatan', petugas: userProfile.name, antrean: 'A-024', status: 'Melayani' },
                  { loket: 'Loket 2 - Umum & Swasta', petugas: 'Budi Santoso', antrean: 'B-011', status: 'Melayani' },
                  { loket: 'Loket 3 - CITO & Lansia', petugas: 'Ns. Ratna Dewi', antrean: 'C-005', status: 'Istirahat' },
                ].map(l => (
                  <div key={l.loket} className="flex items-center justify-between p-3 rounded-xl border border-[#bcc9c6]/20 bg-white/60">
                    <div>
                      <div className="text-[0.75rem] font-bold text-[#131b2e]">{l.loket}</div>
                      <div className="text-[0.65rem] text-[#6d7a77]">Petugas: {l.petugas}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[0.65rem] font-bold text-[#00685f]">{l.status}</div>
                      <div className="text-[0.8rem] font-mono font-bold text-[#131b2e]">{l.antrean}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registered Patients Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center justify-between p-5 border-b border-[#bcc9c6]/20">
              <div>
                <h2 className="text-[1rem] font-bold text-[#131b2e]">Daftar Pasien Terdaftar Sesi Ini</h2>
                <p className="text-[0.75rem] text-[#6d7a77]">Data dari Supabase Database `patients` Table</p>
              </div>
              <button onClick={fetchPatients} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[0.75rem] font-semibold text-[#00685f] border border-[#00685f]/30 hover:bg-[#00685f]/10">
                <span className="material-symbols-outlined text-[0.9rem]">refresh</span>
                Refresh Tabel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[0.8rem]">
                <thead>
                  <tr className="border-b border-[#bcc9c6]/20 bg-[#eaedff]/50">
                    {['NIK PASIEN', 'NAMA LENGKAP', 'TANGGAL LAHIR', 'GENDER', 'ALAMAT DOMISILI', 'STATUS BRIDGING FHIR', 'AKSI'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loadingPatients ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-[0.8rem] text-[#6d7a77]">
                        Memuat data pasien...
                      </td>
                    </tr>
                  ) : (
                    displayPatients.map(p => (
                      <tr key={p.id || p.nik} className="border-b border-[#bcc9c6]/10 hover:bg-[#eaedff]/30 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-[#00685f]">{p.nik}</td>
                        <td className="px-4 py-3 font-bold text-[#131b2e]">{p.full_name}</td>
                        <td className="px-4 py-3 text-[#3d4947]">{p.dob || '1990-01-01'}</td>
                        <td className="px-4 py-3 text-[#3d4947]">{p.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</td>
                        <td className="px-4 py-3 text-[#6d7a77] max-w-[200px] truncate">{p.address || '-'}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            FHIR Patient Synced
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => router.push('/dashboard/antrian')}
                            className="p-1.5 rounded-lg text-[#00685f] hover:bg-[#00685f]/10 transition-colors"
                            title="Buka Antrian">
                            <span className="material-symbols-outlined text-[1.1rem]">open_in_new</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
