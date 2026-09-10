# SIMRS "Satu Sehat Ready" - MVP Phase

Sistem Informasi Manajemen Rumah Sakit (SIMRS) ini dirancang untuk siap terintegrasi dengan platform **Satu Sehat Kemenkes RI**. Sistem menggunakan standar internasional **HL7 FHIR** (Fast Healthcare Interoperability Resources) yang disimpan ke dalam kolom JSONB di database Supabase.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, TailwindCSS
- **Backend & Database**: Supabase (PostgreSQL + Auth) dengan Row Level Security (RLS)
- **UI/UX**: Desain premium kelas atas menggunakan referensi gaya 21st.dev (monochromatic slate + teal accents, Swiss typography) guna menghindari desain "AI Slop" atau default admin dashboard.

## Modul & FHIR Mapping (MVP)
Aplikasi dibatasi pada alur *Pendaftaran Rawat Jalan hingga Diagnosa Awal*:

1. **Registrasi & Demografi Pasien**
   - Wajib memvalidasi 16-digit NIK (syarat mutlak Satu Sehat).
   - Data esensial: Nama lengkap, Tanggal Lahir, Jenis Kelamin, dan Alamat.
   - **Target FHIR Resource**: `Patient`

2. **Pendaftaran Kunjungan (Encounter)**
   - Pilihan Poliklinik & Dokter Penanggung Jawab Pelayanan (DPJP).
   - Pencatatan waktu kedatangan & status (Planned, Arrived, In-progress, Finished).
   - **Target FHIR Resource**: `Encounter` (AMB / Ambulatory)

3. **Rekam Medis Elektronik (EMR) Dasar**
   - Tanda Vital (Tekanan Darah, Detak Jantung, Suhu Tubuh).
   - Diagnosa standar pengkodean ICD-10.
   - **Target FHIR Resource**: `Observation` (Tanda vital), `Condition` (Diagnosa)

## Role-Based Access Control (RBAC)
Sistem membatasi otorisasi menggunakan Supabase RLS:
- **Admin/Resepsionis**: Hanya dapat mengakses modul Registrasi dan Pendaftaran Kunjungan (Encounter).
- **Dokter/Perawat**: Hanya dapat melihat pasien yang terdaftar di polinya, dan memiliki hak akses ke modul EMR.

## GitHub Collaboration Pipeline (Git Flow)
**ATURAN MUTLAK**: Jangan pernah push langsung ke branch `main`.

1. **Update local repo:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Buat branch fitur baru:**
   ```bash
   git checkout -b feature/nama-fitur
   ```
3. **Commit & Push:**
   ```bash
   git add .
   git commit -m "feat: deskripsi perubahan"
   git push origin feature/nama-fitur
   ```
4. **Pull Request**: Buka GitHub dan lakukan *Compare & Pull Request*. Minta tim untuk Code Review sebelum di-merge ke `main`.
