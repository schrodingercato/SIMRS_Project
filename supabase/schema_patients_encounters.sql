-- ========================================================
-- SCHEMA UNTUK FITUR REGISTRASI PASIEN & ENCOUNTER
-- ========================================================

-- 1. Tabel Pasien (Demografi & FHIR Patient)
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nik VARCHAR(16) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'unknown')),
    address TEXT NOT NULL,
    fhir_data JSONB, -- Standar penyimpanan FHIR
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Encounter (Kunjungan Pasien & FHIR Encounter)
CREATE TABLE IF NOT EXISTS public.encounters (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID, -- Referensi ke user/dokter, dapat berupa UUID atau string (tergantung implementasi Auth)
    polyclinic VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Planned', 'Arrived', 'In-progress', 'Finished')),
    arrival_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fhir_data JSONB, -- Standar penyimpanan FHIR
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encounters ENABLE ROW LEVEL SECURITY;

-- Policy untuk Patients:
-- Semua role (admin, resepsionis, dokter, perawat) bisa read
CREATE POLICY "Enable read access for patients"
ON public.patients FOR SELECT USING (true);

-- Hanya admin/resepsionis yang bisa insert
CREATE POLICY "Enable insert for admin and resepsionis on patients"
ON public.patients FOR INSERT
WITH CHECK (
    auth.jwt()->>'role' IN ('admin', 'resepsionis')
);

-- Policy untuk Encounters:
-- Semua role (admin, resepsionis, dokter, perawat) bisa read
CREATE POLICY "Enable read access for encounters"
ON public.encounters FOR SELECT USING (true);

-- Hanya admin/resepsionis yang bisa mendaftarkan kunjungan (insert)
CREATE POLICY "Enable insert for admin and resepsionis on encounters"
ON public.encounters FOR INSERT
WITH CHECK (
    auth.jwt()->>'role' IN ('admin', 'resepsionis')
);

-- Hanya dokter/perawat atau admin yang bisa update status kunjungan
CREATE POLICY "Enable update for encounters"
ON public.encounters FOR UPDATE
USING (
    auth.jwt()->>'role' IN ('admin', 'resepsionis', 'dokter', 'perawat')
);
