'use client';

export default function Dashboard() {
  const fhirJson = `{
  "resourceType": "Patient",
  "id": "10002849201",
  "identifier": [
    {
      "system": "https://fhir.kemkes.go.id/id/nik",
      "value": "3171052809920003"
    },
    {
      "system": "http://sys-ids.rs-sehat.id/mrn",
      "value": "RM-00-28-50"
    }
  ],
  "name": [{"use": "official", "text": "BAMBANG WIJAYA KUSUMA"}],
  "gender": "male",
  "birthDate": "1992-09-28",
  "telecom": [{"system": "phone", "value": "+6281288997766"}],
  "address": [{"line": ["Jl. Rasuna Said Kav. B-12"], "city": "Jakarta Selatan", "postalCode": "12940"}]
}`;

  return (
    <div className="bg-gradient-to-br from-cyan-50/70 via-sky-50/40 to-[#faf8ff] min-h-screen text-[#131b2e] antialiased relative overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Ambient blobs */}
      <div className="fixed -top-40 -left-20 w-[550px] h-[550px] bg-cyan-200/30 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed top-1/3 -right-20 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed -bottom-40 left-1/3 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 z-40 bg-white/80 backdrop-blur-xl border-r border-[#bcc9c6]/40 shadow-lg flex flex-col justify-between p-4 hidden lg:flex">
        <div>
          <div className="flex items-center gap-3 px-3 py-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00685f] to-[#008378] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>local_hospital</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[1.125rem] font-extrabold text-[#131b2e] tracking-tight leading-tight">RS Sehat Nusantara</span>
              <span className="text-[0.75rem] text-[#6d7a77] flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                SIMRS FHIR v4.2 • Online
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">space_dashboard</span>
              <span>Dashboard Pelayanan</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#00685f]/10 text-[#00685f] font-bold shadow-sm ring-1 ring-[#00685f]/25 text-[0.875rem]" href="#">
              <span className="material-symbols-outlined text-[#00685f]" style={{ fontVariationSettings: "'FILL' 1" }}>clinical_notes</span>
              <span>Rawat Jalan / Poliklinik</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">emergency</span>
              <span>IGD &amp; Triase CITO</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">hotel</span>
              <span>Rawat Inap &amp; Bed</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">prescriptions</span>
              <span>Farmasi &amp; E-Resep</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">biotech</span>
              <span>Laboratorium &amp; Radiologi</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#3d4947] hover:bg-[#e2e7ff]/60 hover:text-[#00685f] transition-all duration-200 text-[0.875rem] font-semibold" href="#">
              <span className="material-symbols-outlined text-[#6d7a77]">sync_saved_locally</span>
              <span>SATUSEHAT FHIR Console</span>
            </a>
          </nav>
        </div>

        <div className="space-y-4 pt-3 border-t border-[#bcc9c6]/30">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ba0035] to-rose-500 text-white text-[0.875rem] font-semibold shadow-md hover:shadow-lg transition-all duration-200" type="button">
            <span className="material-symbols-outlined text-[0.875rem]">warning</span>
            <span>Pendaftaran Pasien CITO</span>
          </button>
          <div className="space-y-1">
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#3d4947] hover:bg-[#e2e7ff]/50 hover:text-[#00685f] transition-colors text-[0.75rem]" href="#">
              <span className="material-symbols-outlined text-[#6d7a77] text-[1rem]">settings</span>
              <span>Pengaturan SIMRS</span>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#3d4947] hover:bg-[#e2e7ff]/50 hover:text-[#00685f] transition-colors text-[0.75rem]" href="#">
              <span className="material-symbols-outlined text-[#6d7a77] text-[1rem]">contact_support</span>
              <span>Pusat Bantuan Satusehat</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 w-full z-30 bg-white/70 backdrop-blur-md border-b border-[#bcc9c6]/30 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3 w-full">
            <div className="flex items-center gap-6">
              <div className="relative w-72">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#6d7a77]">search</span>
                <input className="w-full pl-10 pr-4 py-2 text-[0.875rem] rounded-xl bg-white/65 border border-[#bcc9c6]/45 placeholder:text-[#6d7a77] focus:outline-none focus:bg-white/95 focus:border-[#00685f] transition-all" placeholder="Cari Rekam Medis, NIK, atau Nama..." type="text" />
              </div>
              <nav className="hidden xl:flex items-center gap-6">
                <a className="text-[#00685f] font-bold border-b-2 border-[#00685f] pb-1 text-[0.875rem]" href="#">Poliklinik Utama</a>
                <a className="text-[#3d4947] hover:text-[#131b2e] transition-colors text-[0.875rem]" href="#">IGD Terpadu</a>
                <a className="text-[#3d4947] hover:text-[#131b2e] transition-colors text-[0.875rem]" href="#">Depo Farmasi Central</a>
                <a className="text-[#3d4947] hover:text-[#131b2e] transition-colors text-[0.875rem]" href="#">SATUSEHAT Gateway</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#bcc9c6]/40 bg-white/60 text-[#131b2e] text-[0.75rem] font-semibold hover:bg-white transition-colors" type="button">
                <span className="material-symbols-outlined text-[#00685f] text-[1rem]">campaign</span>
                <span>Panggil Antrean Berikutnya</span>
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00685f] to-[#008378] text-white text-[0.75rem] font-semibold shadow-md shadow-[#00685f]/35 transition-all" type="button">
                <span className="material-symbols-outlined text-[0.875rem] animate-spin">sync</span>
                <span>Sinkronisasi FHIR</span>
              </button>
              <div className="h-6 w-[1px] bg-[#bcc9c6]/40 mx-1"></div>
              <button className="p-2 rounded-xl text-[#6d7a77] hover:text-[#00685f] hover:bg-[#00685f]/5 transition-colors relative" title="Notifikasi Pelayanan">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba0035] rounded-full"></span>
              </button>
              <button className="p-2 rounded-xl hover:bg-[#00685f]/5 transition-colors" title="Koneksi SATUSEHAT Live">
                <span className="material-symbols-outlined text-emerald-600">wifi_tethering</span>
              </button>
              <div className="flex items-center gap-2 pl-2 border-l border-[#bcc9c6]/40">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00685f] to-[#006398] flex items-center justify-center text-white font-bold text-[0.75rem] ring-2 ring-[#00685f]/20">AD</div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[0.75rem] font-semibold text-[#131b2e] leading-tight">dr. Adrian, Sp.PD</span>
                  <span className="text-[0.6875rem] text-[#6d7a77]">Dokter Penanggung Jawab</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">

          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl p-6 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
            <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-[#89f5e7]/20 to-transparent pointer-events-none"></div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-[1.5rem] font-bold text-[#131b2e] tracking-tight">
                  Registrasi &amp; Demografi Pasien Baru
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.6875rem] font-bold bg-[#00685f]/10 text-[#00685f] border border-[#00685f]/20 ring-1 ring-[#00685f]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00685f] animate-pulse inline-block"></span>
                  FHIR Resource: Patient
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold bg-sky-50 text-[#006398] border border-[#006398]/20">
                  <span className="material-symbols-outlined text-[0.75rem]">verified_user</span>
                  Terhubung SATUSEHAT Kemenkes RI
                </span>
              </div>
              <p className="text-[0.875rem] text-[#3d4947]">
                Formulir Standar Kemenkes RI &amp; Rekam Medis Elektronik (RME) terintegrasi Master Patient Index (MPI) nasional.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/80 shadow-sm flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#00685f]">
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <div>
                  <div className="text-[0.6875rem] font-bold text-[#6d7a77] uppercase tracking-wide">Nomor Rekam Medis Baru</div>
                  <div className="text-[1.125rem] font-bold text-[#00685f] tracking-wide">RM-00-28-50</div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left: Form */}
            <div className="lg:col-span-8 space-y-6">

              {/* Section A */}
              <div className="rounded-2xl p-6 md:p-8 space-y-6 border border-white/80" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
                <div className="flex items-center justify-between pb-4 border-b border-[#bcc9c6]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00685f]/10 text-[#00685f] flex items-center justify-center font-bold">A</div>
                    <div>
                      <h2 className="text-[1.125rem] font-bold text-[#131b2e]">Identitas Pasien &amp; Verifikasi Kependudukan</h2>
                      <p className="text-[0.75rem] text-[#3d4947]">Sinkronisasi data identitas legal berdasarkan NIK e-KTP.</p>
                    </div>
                  </div>
                  <span className="text-[0.6875rem] font-bold px-2.5 py-1 bg-[#eaedff] text-[#6d7a77] rounded-lg">Wajib Diisi</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* NIK */}
                  <div className="md:col-span-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                        Nomor Induk Kependudukan (NIK 16 Digit) <span className="text-[#ba0035]">*</span>
                      </label>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-300 text-teal-800 text-[0.6875rem] font-bold" style={{ boxShadow: '0 0 12px rgba(20,184,166,0.25)' }}>
                        <span className="material-symbols-outlined text-[0.75rem] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <span>NIK Valid (Terverifikasi Dukcapil)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                        <span className="material-symbols-outlined">fingerprint</span>
                      </div>
                      <input className="w-full pl-11 pr-32 py-2.5 text-[0.875rem] tracking-wider rounded-xl font-mono font-semibold text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} maxLength={16} type="text" defaultValue="3171052809920003" />
                      <div className="absolute inset-y-0 right-1.5 flex items-center">
                        <button className="px-3 py-1.5 rounded-lg bg-[#e2e7ff]/80 hover:bg-[#eaedff] text-[#3d4947] text-[0.6875rem] font-semibold flex items-center gap-1 transition-colors" type="button">
                          <span className="material-symbols-outlined text-[0.75rem]">refresh</span>
                          Cek Ulang
                        </button>
                      </div>
                    </div>
                    <p className="text-[0.75rem] text-[#6d7a77]">Identitas terpetakan otomatis ke sistem master kependudukan Kemendagri &amp; SATUSEHAT.</p>
                  </div>

                  {/* Nama */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                      Nama Lengkap (Sesuai KTP tanpa gelar) <span className="text-[#ba0035]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                      <input className="w-full pl-11 pr-4 py-2.5 text-[0.875rem] rounded-xl uppercase text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} type="text" defaultValue="BAMBANG WIJAYA KUSUMA" />
                    </div>
                  </div>

                  {/* Tempat Lahir */}
                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                      Tempat Lahir <span className="text-[#ba0035]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                        <span className="material-symbols-outlined">location_city</span>
                      </div>
                      <input className="w-full pl-11 pr-4 py-2.5 text-[0.875rem] rounded-xl text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} type="text" defaultValue="Jakarta" />
                    </div>
                  </div>

                  {/* Tanggal Lahir */}
                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                      Tanggal Lahir <span className="text-[#ba0035]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                        <span className="material-symbols-outlined">calendar_month</span>
                      </div>
                      <input className="w-full pl-11 pr-4 py-2.5 text-[0.875rem] rounded-xl text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} type="date" defaultValue="1992-09-28" />
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                      Jenis Kelamin <span className="text-[#ba0035]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#00685f]/50 bg-[#00685f]/5 cursor-pointer ring-1 ring-[#00685f]/30">
                        <input className="w-4 h-4 text-[#00685f] focus:ring-[#00685f]" name="gender" type="radio" defaultChecked value="male" />
                        <span className="text-[0.75rem] font-semibold text-[#00685f] flex items-center gap-1.5">
                          <span className="material-symbols-outlined">male</span>
                          Laki-laki
                        </span>
                      </label>
                      <label className="flex items-center gap-3 p-2.5 rounded-xl border border-[#bcc9c6]/40 bg-white/40 hover:bg-white cursor-pointer transition-colors">
                        <input className="w-4 h-4 text-[#00685f] focus:ring-[#00685f]" name="gender" type="radio" value="female" />
                        <span className="text-[0.75rem] font-semibold text-[#3d4947] flex items-center gap-1.5">
                          <span className="material-symbols-outlined">female</span>
                          Perempuan
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* No RM */}
                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Alokasi No. Rekam Medis (Auto-Generated)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00685f]">
                        <span className="material-symbols-outlined">tag</span>
                      </div>
                      <input className="w-full pl-11 pr-24 py-2.5 text-[0.875rem] rounded-xl bg-teal-50/60 border border-[#00685f]/30 text-[#00685f] font-bold tracking-wider" readOnly type="text" value="RM-00-28-50" />
                      <div className="absolute inset-y-0 right-2 flex items-center">
                        <span className="text-[0.6875rem] font-bold text-[#00685f] px-2 py-0.5 rounded bg-[#00685f]/10">Terkunci</span>
                      </div>
                    </div>
                  </div>

                  {/* Telepon */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">
                      Nomor WhatsApp / Kontak Telepon Pasien <span className="text-[#ba0035]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6d7a77]">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <input className="w-full pl-11 pr-4 py-2.5 text-[0.875rem] rounded-xl text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} type="tel" placeholder="Contoh: 081234567890" defaultValue="+6281288997766" />
                    </div>
                    <p className="text-[0.75rem] text-[#6d7a77]">Digunakan untuk konfirmasi antrean klinik, notifikasi e-resep farmasi, dan portal SATUSEHAT.</p>
                  </div>
                </div>
              </div>

              {/* Section B */}
              <div className="rounded-2xl p-6 md:p-8 space-y-6" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
                <div className="flex items-center justify-between pb-4 border-b border-[#bcc9c6]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#006398]/10 text-[#006398] flex items-center justify-center font-bold">B</div>
                    <div>
                      <h2 className="text-[1.125rem] font-bold text-[#131b2e]">Alamat Domisili Kependudukan</h2>
                      <p className="text-[0.75rem] text-[#3d4947]">Sesuai data kependudukan wilayah administratif Kemendagri.</p>
                    </div>
                  </div>
                  <button className="text-[0.6875rem] font-bold text-[#00685f] hover:underline flex items-center gap-1" type="button">
                    <span className="material-symbols-outlined text-[0.75rem]">content_copy</span>
                    Sesuai Alamat KTP
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Alamat Lengkap <span className="text-[#ba0035]">*</span></label>
                    <textarea className="w-full p-3.5 text-[0.875rem] rounded-xl text-[#131b2e] resize-none focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} rows={2} defaultValue="Jl. Rasuna Said Kav. B-12, RT 004 / RW 002, Karet Kuningan"></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Provinsi <span className="text-[#ba0035]">*</span></label>
                    <div className="relative">
                      <select className="w-full py-2.5 px-3.5 text-[0.875rem] rounded-xl text-[#131b2e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }}>
                        <option value="31">DKI JAKARTA</option>
                        <option value="32">JAWA BARAT</option>
                        <option value="33">JAWA TENGAH</option>
                        <option value="35">JAWA TIMUR</option>
                        <option value="36">BANTEN</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6d7a77]">
                        <span className="material-symbols-outlined text-[1rem]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Kota / Kabupaten <span className="text-[#ba0035]">*</span></label>
                    <div className="relative">
                      <select className="w-full py-2.5 px-3.5 text-[0.875rem] rounded-xl text-[#131b2e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }}>
                        <option value="3171">KOTA ADM. JAKARTA SELATAN</option>
                        <option value="3172">KOTA ADM. JAKARTA PUSAT</option>
                        <option value="3173">KOTA ADM. JAKARTA BARAT</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6d7a77]">
                        <span className="material-symbols-outlined text-[1rem]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Kecamatan <span className="text-[#ba0035]">*</span></label>
                    <div className="relative">
                      <select className="w-full py-2.5 px-3.5 text-[0.875rem] rounded-xl text-[#131b2e] appearance-none focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }}>
                        <option value="317105">SETIABUDI</option>
                        <option value="317106">TEBET</option>
                        <option value="317107">MAMPANG PRAPATAN</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#6d7a77]">
                        <span className="material-symbols-outlined text-[1rem]">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Kelurahan <span className="text-[#ba0035]">*</span></label>
                      <input className="w-full py-2.5 px-3 text-[0.875rem] rounded-xl text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} type="text" defaultValue="Karet Kuningan" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[0.875rem] font-semibold text-[#131b2e]">Kode Pos <span className="text-[#ba0035]">*</span></label>
                      <input className="w-full py-2.5 px-3 text-[0.875rem] rounded-xl text-[#131b2e] font-mono focus:outline-none focus:ring-2 focus:ring-[#00685f]/30 transition-all" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(188,201,198,0.45)' }} maxLength={5} type="text" defaultValue="12940" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
                <div className="flex items-center gap-2 text-[#6d7a77] text-[0.75rem]">
                  <span className="material-symbols-outlined text-[#00685f]">lock</span>
                  <span>Data terenkripsi TLS 1.3 &amp; mematuhi UU PDP No. 27/2022.</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 rounded-xl border border-[#bcc9c6]/60 bg-white/70 hover:bg-white text-[#131b2e] text-[0.875rem] font-semibold transition-all" type="button">
                    Batal
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00685f] to-[#008378] text-white text-[0.875rem] font-semibold hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center gap-2" style={{ boxShadow: '0 4px 20px -2px rgba(0,104,95,0.35)' }} type="button">
                    <span className="material-symbols-outlined">how_to_reg</span>
                    <span>Simpan &amp; Terbitkan No. RM</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: FHIR Inspector */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl p-6 space-y-5 sticky top-24" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.85)', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.05)' }}>
                <div className="flex items-center justify-between pb-3 border-b border-[#bcc9c6]/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-[#00685f] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[1rem]">data_object</span>
                    </div>
                    <div>
                      <h3 className="text-[1.125rem] font-bold text-[#131b2e]">Preview Identitas SATUSEHAT</h3>
                      <span className="text-[0.6875rem] text-[#6d7a77]">FHIR R4 Patient Spec JSON</span>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#bcc9c6]/30 text-[#3d4947] hover:text-[#00685f] transition-all shadow-sm" type="button" title="Salin JSON Payload">
                    <span className="material-symbols-outlined text-[1rem]">copy_all</span>
                  </button>
                </div>

                <div className="space-y-3 bg-[#f2f3ff]/60 rounded-xl p-3.5 border border-[#bcc9c6]/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6875rem] font-bold text-[#6d7a77]">Status IHS ID (National):</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6875rem] font-bold bg-emerald-100/70 text-emerald-800 border border-emerald-300/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                      IHS Match (10002849201)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6875rem] font-bold text-[#6d7a77]">Target Endpoint:</span>
                    <span className="text-[0.6875rem] font-mono text-[#00685f] font-semibold">/fhir-r4/v1/Patient</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.6875rem] font-bold text-[#6d7a77]">Profil Validasi:</span>
                    <span className="text-[0.6875rem] font-mono text-[#131b2e]">kemenkes.id/fhir/Patient</span>
                  </div>
                </div>

                {/* JSON code box - using dangerouslySetInnerHTML to avoid JSX curly brace issues */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 text-slate-100 shadow-inner text-xs font-mono">
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-800/90 border-b border-slate-700/50">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                      <span className="text-[11px] text-slate-400 ml-2 font-mono">patient-resource.json</span>
                    </div>
                    <span className="text-[10px] text-teal-400 tracking-wider">LIVE MAPPING</span>
                  </div>
                  <pre className="p-3.5 overflow-x-auto text-[11px] leading-relaxed max-h-72 text-slate-200 whitespace-pre-wrap">
                    {fhirJson}
                  </pre>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[0.6875rem] font-bold text-[#6d7a77] block">Status Integritas Schema</span>
                  <div className="space-y-1.5 text-[0.75rem]">
                    {[
                      { label: 'NIK 16 Digit Format', status: 'Valid' },
                      { label: 'FHIR ISO 8601 BirthDate', status: 'Sesuai' },
                      { label: 'Kode Wilayah Kemendagri', status: 'Terdaftar' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-[#3d4947]">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-emerald-600 text-[1rem]">check</span>
                          {item.label}
                        </span>
                        <span className="text-[0.6875rem] font-bold text-emerald-700">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#bcc9c6]/30">
                  <button className="w-full py-2 px-3 rounded-xl bg-[#e2e7ff]/60 hover:bg-[#eaedff] text-[#00685f] text-[0.75rem] font-semibold transition-colors flex items-center justify-center gap-1.5" type="button">
                    <span className="material-symbols-outlined text-[1rem]">open_in_new</span>
                    Buka SATUSEHAT Testbed Inspector
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      <aside aria-live="polite" className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100" id="success-toast" style={{ display: 'none' }}>
        <div className="px-5 py-3.5 rounded-2xl border border-emerald-200/80 shadow-2xl flex items-center gap-3.5 ring-1 ring-emerald-500/20 max-w-md" style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(20px)' }}>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
          </div>
          <div className="space-y-0.5">
            <p className="text-[0.75rem] font-semibold text-[#131b2e]">Data Pasien Berhasil Disimpan</p>
            <p className="text-[0.75rem] text-[#6d7a77]">Terpetakan ke SATUSEHAT Patient (IHS: 10002849201)</p>
          </div>
          <button className="text-[#6d7a77] hover:text-[#131b2e] p-1 rounded-lg transition-colors ml-2" type="button">
            <span className="material-symbols-outlined text-[1rem]">close</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
