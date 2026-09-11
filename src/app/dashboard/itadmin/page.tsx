'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, TopBar, useCurrentUser } from '../components';

export default function ITAdminDashboard() {
  const router = useRouter();
  const { userProfile } = useCurrentUser();

  const [pingStatus, setPingStatus] = useState<string | null>(null);
  const [testingPing, setTestingPing] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const handlePingBridge = () => {
    setTestingPing(true);
    setPingStatus(null);
    setTimeout(() => {
      setPingStatus('✓ SATUSEHAT Bridge Online — HTTP 200 OK (Latency: 34ms • SSL Certificate Valid • OAuth2 Token Refreshed)');
      setTestingPing(false);
    }, 800);
  };

  const staffAccounts = [
    { email: 'dokter@sehatnusantara.id', name: 'dr. Adrian Wijaya, Sp.PD', role: 'Dokter Spesialis (dpjp)', nip: '198805202021021004', unit: 'Poli Penyakit Dalam', status: 'ACTIVE', lastLogin: '10 mnt lalu' },
    { email: 'perawat@sehatnusantara.id', name: 'Ns. Sari Indah, S.Kep', role: 'Perawat Tim (nurse)', nip: '199203152019032001', unit: 'Rawat Inap & Triase', status: 'ACTIVE', lastLogin: '18 mnt lalu' },
    { email: 'apoteker@sehatnusantara.id', name: 'Apt. Riska Amalia, S.Farm', role: 'Apoteker (pharma)', nip: '199507202021032003', unit: 'Depo Farmasi Central', status: 'ACTIVE', lastLogin: '45 mnt lalu' },
    { email: 'resepsionis@sehatnusantara.id', name: 'Budi Santoso, A.Md.RMK', role: 'Loket Pendaftaran (front)', nip: '199801012020011002', unit: 'Loket Admisi & RM', status: 'ACTIVE', lastLogin: '2 mnt lalu' },
    { email: 'itadmin@sehatnusantara.id', name: 'Rizki Admin IT', role: 'Administrator IT (itadmin)', nip: '199204102018021001', unit: 'Departemen IT & SIMRS', status: 'ACTIVE', lastLogin: 'Sedang Aktif' },
  ];

  const fhirEndpoints = [
    { resource: 'Patient Resource', path: '/r4/Patient', count: '1,428', status: '200 OK', latency: '32ms' },
    { resource: 'Encounter Resource', path: '/r4/Encounter', count: '892', status: '200 OK', latency: '41ms' },
    { resource: 'Condition Resource (Diagnosa)', path: '/r4/Condition', count: '620', status: '200 OK', latency: '28ms' },
    { resource: 'MedicationRequest (E-Resep)', path: '/r4/MedicationRequest', count: '410', status: '200 OK', latency: '35ms' },
    { resource: 'Observation Resource (TTV)', path: '/r4/Observation', count: '1,120', status: '200 OK', latency: '39ms' },
  ];

  const handleOpenAudit = (staff: any) => {
    setSelectedStaff(staff);
    setShowAuditModal(true);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, rgba(200,242,240,0.4) 0%, rgba(240,249,255,0.3) 50%, #faf8ff 100%)' }}>
      <Sidebar active="/dashboard/itadmin" />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Header Banner */}
          <div className="rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1e1b4b, #4338ca)' }}>
                <span className="material-symbols-outlined text-[2rem]">shield_person</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[1.35rem] font-extrabold text-[#131b2e]">Dashboard Administrator IT &amp; Infrastructure</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold text-white bg-purple-700">SYSTEM ADMIN</span>
                </div>
                <div className="text-[0.75rem] text-[#6d7a77] mt-0.5">
                  Admin: <span className="font-semibold text-[#131b2e]">{userProfile.name}</span> (NIP: {userProfile.nip}) • Unit: {userProfile.unit}
                </div>
              </div>
            </div>
            <button onClick={handlePingBridge} disabled={testingPing}
              className="px-4 py-2 rounded-xl text-white font-bold text-[0.8rem] shadow-md flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all">
              <span className="material-symbols-outlined text-[1rem] animate-pulse">cable</span>
              {testingPing ? 'Testing Ping...' : 'Uji Koneksi Bridge SATUSEHAT'}
            </button>
          </div>

          {pingStatus && (
            <div className="p-3.5 rounded-xl text-[0.8rem] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 animate-in fade-in">
              <span className="material-symbols-outlined text-[1.1rem]">task_alt</span>
              {pingStatus}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'System Uptime', value: '99.98%', sub: 'Node server JKT-HLTH-04', icon: 'dns', color: '#16a34a' },
              { label: 'SATUSEHAT Latency', value: '36 ms', sub: 'FHIR API Production R4', icon: 'speed', color: '#4338ca' },
              { label: 'Database Connections', value: '18 / 100', sub: 'Storage: 14.2 GB used', icon: 'database', color: '#00685f' },
              { label: 'Sesi Staf Aktif', value: '5 Akun', sub: 'RBAC Role Enforced', icon: 'badge', color: '#4f46e5' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.7rem] text-[#6d7a77] font-semibold">{s.label}</span>
                  <span className="material-symbols-outlined text-[1.2rem]" style={{ color: s.color }}>{s.icon}</span>
                </div>
                <div className="text-[1.85rem] font-extrabold text-[#131b2e]">{s.value}</div>
                <div className="text-[0.65rem] text-[#6d7a77] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SATUSEHAT Endpoint Health Monitor */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-[1.1rem] font-extrabold text-[#131b2e]">Status Endpoint SATUSEHAT FHIR R4</h2>
                    <p className="text-[0.75rem] text-[#6d7a77]">Monitoring Realtime API Kemenkes RI</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold text-emerald-800 bg-emerald-100">ALL GREEN 200 OK</span>
                </div>

                <div className="space-y-2.5">
                  {fhirEndpoints.map(ep => (
                    <div key={ep.resource} className="p-3 rounded-xl border border-[#bcc9c6]/20 bg-white/70 flex items-center justify-between">
                      <div>
                        <div className="text-[0.8rem] font-bold text-[#131b2e]">{ep.resource}</div>
                        <div className="text-[0.65rem] text-[#6d7a77] font-mono">{ep.path}</div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded text-[0.65rem] font-bold text-emerald-800 bg-emerald-100 mr-2">{ep.status}</span>
                        <span className="text-[0.7rem] text-[#6d7a77] font-mono">{ep.latency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
                <h2 className="text-[1.1rem] font-extrabold text-[#131b2e] mb-1">Live Audit Logs System &amp; Auth</h2>
                <p className="text-[0.75rem] text-[#6d7a77] mb-4">Catatan Aktivitas Keamanan Sesi Pengguna</p>

                <div className="space-y-2 text-[0.75rem] font-mono">
                  {[
                    { time: '10:48:22', event: 'AUTH_SUCCESS', desc: 'Login user: dokter@sehatnusantara.id (Role: dpjp)', level: 'INFO' },
                    { time: '10:45:04', event: 'FHIR_SYNC', desc: 'Encounter #ENC-88219 synced to SATUSEHAT API', level: 'SUCCESS' },
                    { time: '10:40:50', event: 'AUTH_SUCCESS', desc: 'Login user: perawat@sehatnusantara.id (Role: nurse)', level: 'INFO' },
                    { time: '10:32:11', event: 'RLS_EVAL', desc: 'Row Level Security policy passed for patients table', level: 'INFO' },
                  ].map((log, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#eaedff]/40 border border-[#bcc9c6]/20 flex items-center justify-between">
                      <div>
                        <span className="text-[#6d7a77] mr-2">[{log.time}]</span>
                        <span className="font-bold text-[#131b2e]">{log.event}:</span>
                        <span className="text-[#3d4947] ml-1">{log.desc}</span>
                      </div>
                      <span className="text-[0.6rem] font-bold text-emerald-700">{log.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* User Account Matrix Table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
            <div className="p-5 border-b border-[#bcc9c6]/20 flex items-center justify-between">
              <div>
                <h2 className="text-[1rem] font-bold text-[#131b2e]">Matriks Akun Staf &amp; Hak Akses Role (RBAC)</h2>
                <p className="text-[0.75rem] text-[#6d7a77]">Daftar 5 Akun Demo Terdaftar di Supabase Authentication</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-[0.8rem]">
                <thead>
                  <tr className="border-b border-[#bcc9c6]/20 bg-[#eaedff]/50">
                    {['EMAIL STAF', 'NAMA PEGAWAI', 'NIP', 'PENUGASAN ROLE', 'UNIT KERJA', 'STATUS SESI', 'AKSI LOG'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[0.65rem] font-extrabold text-[#6d7a77] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {staffAccounts.map(s => (
                    <tr key={s.email} className="border-b border-[#bcc9c6]/10 hover:bg-[#eaedff]/30 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-700">{s.email}</td>
                      <td className="px-4 py-3 font-bold text-[#131b2e]">{s.name}</td>
                      <td className="px-4 py-3 font-mono text-[0.75rem] text-[#3d4947]">{s.nip}</td>
                      <td className="px-4 py-3 font-semibold text-[#00685f]">{s.role}</td>
                      <td className="px-4 py-3 text-[#3d4947]">{s.unit}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[0.65rem] font-bold text-emerald-800 bg-emerald-100">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => handleOpenAudit(s)}
                          className="px-2.5 py-1 rounded-lg text-[0.7rem] font-bold text-indigo-700 border border-indigo-200 hover:bg-indigo-50">
                          Audit Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Staff Audit Log Modal */}
      {showAuditModal && selectedStaff && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div>
                <h3 className="text-[1.1rem] font-extrabold text-[#131b2e]">Audit Sesi Staf: {selectedStaff.name}</h3>
                <p className="text-[0.75rem] text-[#6d7a77]">Email: {selectedStaff.email} • NIP: {selectedStaff.nip}</p>
              </div>
              <button onClick={() => setShowAuditModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 text-[0.75rem] font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[#6d7a77]">Terakhir Login: <b className="text-slate-800">{selectedStaff.lastLogin}</b></div>
                <div className="text-[#6d7a77]">IP Address: <b className="text-slate-800">182.253.44.102 (Surabaya, ID)</b></div>
                <div className="text-[#6d7a77]">User-Agent: <b className="text-slate-800">Mozilla/5.0 (Windows NT 10.0) Chrome/128.0</b></div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-1.5">
                <div className="font-extrabold text-indigo-900">RIWAYAT TRANS AKSI TERAKHIR:</div>
                <div className="text-slate-700">• 10:48:02 - Query `patients` table (Row Level Security Check Passed)</div>
                <div className="text-slate-700">• 10:42:15 - Issued SATUSEHAT Token via Service Account</div>
                <div className="text-slate-700">• 10:35:00 - Session Refreshed (JWT Token Valid 3600s)</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 rounded-xl bg-[#1e1b4b] text-white font-bold text-[0.8rem]">
                Tutup Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
