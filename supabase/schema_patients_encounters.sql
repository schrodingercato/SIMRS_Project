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
    phone VARCHAR(50),
    marital_status VARCHAR(50),
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
    room_number VARCHAR(50),
    estimated_time TIMESTAMP WITH TIME ZONE,
    fhir_data JSONB, -- Standar penyimpanan FHIR
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encounters ENABLE ROW LEVEL SECURITY;

-- Policy untuk Patients:
DROP POLICY IF EXISTS "Enable read access for patients" ON public.patients;
CREATE POLICY "Enable read access for patients" ON public.patients FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for admin and resepsionis on patients" ON public.patients;
DROP POLICY IF EXISTS "Enable insert for patients" ON public.patients;
CREATE POLICY "Enable insert for patients" ON public.patients FOR INSERT WITH CHECK (true);

-- Policy untuk Encounters:
DROP POLICY IF EXISTS "Enable read access for encounters" ON public.encounters;
CREATE POLICY "Enable read access for encounters" ON public.encounters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for admin and resepsionis on encounters" ON public.encounters;
DROP POLICY IF EXISTS "Enable insert for encounters" ON public.encounters;
CREATE POLICY "Enable insert for encounters" ON public.encounters FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for encounters" ON public.encounters;
CREATE POLICY "Enable update for encounters" ON public.encounters FOR UPDATE USING (true);
