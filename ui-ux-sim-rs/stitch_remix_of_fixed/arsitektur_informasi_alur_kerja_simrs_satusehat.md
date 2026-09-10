# Arsitektur Informasi & Spesifikasi Alur Kerja SIMRS Terintegrasi SATUSEHAT

## 1. Ikhtisar Sistem & Peran Pengguna (RBAC)
Sistem Informasi Manajemen Rumah Sakit (SIMRS) ini dirancang untuk alur pelayanan rawat jalan poliklinik terpadu yang mematuhi standar interoperabilitas **Kemenkes SATUSEHAT (HL7 FHIR R4)**.

Sistem membagi aksesibilitas pengguna secara ketat menjadi dua peran utama:
1. **Admin / Resepsionis (Front-Office & Administrasi)**
   - Akses: Login & Sesi Loket, Dashboard Admin, Registrasi Pasien Baru (FHIR `Patient`), Master Data Pasien, Pendaftaran Kunjungan & Tiket Poliklinik (FHIR `Encounter`), Monitoring Antrian Loket & Poliklinik.
   - Pembatasan: Tidak memiliki akses ke rekam medis klinis, pemeriksaan tanda vital, pencatatan SOAP, maupun penegakan diagnosis dokter.
2. **Dokter / Perawat Poliklinik (Klinis & Medical EMR)**
   - Akses: Login & Otentikasi SIP/STR, Dashboard Poli Spesifik (DPJP), Antrian Ruang Periksa, Rekam Medis Elektronik (RME), Pemeriksaan Tanda Vital (FHIR `Observation`), Penegakan Diagnosis ICD-10 (FHIR `Condition`), Rangkuman SOAP & Riwayat Pasien.
   - Pembatasan: Tidak mengelola administrasi loket umum atau pengeditan data kependudukan Dukcapil.

---

## 2. Struktur Informasi Navigasi (Sitemap & Shell Layout)

```
SIMRS SATUSEHAT
│
├── [Global Topbar]
│   ├── Identitas Rumah Sakit (RS Sehat Nusantara / Logo Kemenkes)
│   ├── Tanggal & Jam Operasional Real-time
│   ├── Kolom Pencarian Universal (No. RM / NIK / Nama Pasien)
│   ├── Status Sinkronisasi SATUSEHAT (Badge: Data Siap Dipetakan / Live 200 OK)
│   ├── Notifikasi Sistem & Hasil Lab Cito
│   └── User Profile & Switcher Role (dr. Arya Wijaya / Resepsionis)
│
├── [Sidebar Kiri - Navigasi Berbasis Role]
│   │
│   ├── MENU UTAMA SIMRS (Administratif)
│   │   ├── Dashboard Admin & Resepsionis (Ringkasan KPI Loket, Kunjungan, Kapasitas)
│   │   ├── Registrasi & Demografi Pasien (Form validasi NIK 16 digit, FHIR Patient)
│   │   ├── Data Pasien Terdaftar (Master database EMPI, riwayat kunjungan)
│   │   ├── Pendaftaran Kunjungan (Encounter Rawat Jalan AMB, alokasi DPJP)
│   │   └── Manajemen Antrian Poliklinik (Display antrian, pemanggilan pasien, signage)
│   │
│   ├── LAYANAN MEDIS & FHIR (Klinis)
│   │   ├── Dashboard Dokter & Perawat Poli (Antrian per DPJP, ringkasan periksa)
│   │   ├── Rekam Medis & Tanda Vital (Form LOINC Observation, grafik hemodinamik)
│   │   ├── Diagnosis (Pencarian ICD-10 WHO, mapping FHIR Condition)
│   │   └── Ringkasan Klinis Pasien (SOAP, riwayat alergi & riwayat kunjungan lampau)
│   │
│   └── PENGATURAN & KEAMANAN
│       └── Matriks Hak Akses (RBAC demonstration & audit trail log)
```

---

## 3. Matriks Alur Data Pasien & Pemetaan Standar HL7 FHIR SATUSEHAT

| Tahapan Pelayanan | Layar SIMRS Terkait | Peran Pengguna | Standard / Resource SATUSEHAT | Parameter Data Kunci |
| :--- | :--- | :--- | :--- | :--- |
| **1. Otentikasi Petugas** | `Login SIMRS & Autentikasi Role` | Seluruh Staf | Kemenkes Auth Bridge | ID Petugas, SIP/STR, Enkripsi TLS 1.3, Workstation ID |
| **2. Pendaftaran Pasien Baru** | `Registrasi & Demografi Pasien` | Admin / Loket | **FHIR `Patient`** | NIK 16-digit (Dukcapil validator), Nama KTP, Tgl Lahir, Gender, No RM Otomatis |
| **3. Master Directory** | `Data Pasien Terdaftar` | Admin & Nakes | EMPI Master Index | Pencarian NIK/RM, status validasi IHS ID (Indonesia Health Services) |
| **4. Kedatangan & Alokasi Poli** | `Pendaftaran Kunjungan` | Admin / Resepsionis | **FHIR `Encounter`** | Class: `AMB` (Ambulatory Rawat Jalan), Poliklinik, DPJP, Status: `Arrived` |
| **5. Manajemen Antrian** | `Manajemen Antrian Poliklinik` | Perawat / Adm | Modul Antrian SIMRS | Nomor antrian (cth: A-018), Panggilan Audio PA, Status antrian |
| **6. Triage & Vital Signs** | `Dashboard Dokter` & `Rekam Medis` | Perawat / Dokter | **FHIR `Observation`** | Tekanan Darah (LOINC 8480-6 / 8462-4), Nadi (8867-4), Suhu (8310-5), SpO2 |
| **7. Pemeriksaan & Diagnosis** | `Rekam Medis & Diagnosis` | Dokter DPJP | **FHIR `Condition`** | ICD-10 Diagnosis Primer/Sekunder, Clinical status: Active, Verification: Confirmed |

---

## 4. Inventaris Layar Prioritas yang Telah Tersedia pada Canvas
Semua layar prioritas telah selesai diimplementasikan dengan visual design system yang seragam (`Klinik Nasional SATUSEHAT`):
1. `Login SIMRS & Autentikasi Role`
2. `Dashboard Admin & Resepsionis`
3. `Dashboard Dokter & Perawat Poli`
4. `Data Pasien Terdaftar` (Patient List)
5. `Registrasi & Demografi Pasien (FHIR Patient)`
6. `Pendaftaran Kunjungan (FHIR Encounter)`
7. `Manajemen Antrian Poliklinik` (Queue System)
8. `Rekam Medis: Tanda Vital & Diagnosis` (Clinical EMR)
