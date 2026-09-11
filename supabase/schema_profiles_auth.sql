-- ============================================================
-- SETUP LENGKAP SIMRS: Tabel + Akun Demo
-- Jalankan di: https://supabase.com/dashboard/project/eghorjrtbwyaxqgdmngr/sql
-- ============================================================

-- Step 1: Aktifkan ekstensi
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Step 2: Buat tabel profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('dpjp', 'nurse', 'pharma', 'front', 'itadmin')),
  nip TEXT,
  unit TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Allow profile creation" ON public.profiles;
CREATE POLICY "Allow profile creation"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================
-- Step 3: Trigger otomatis buat profil saat user sign up
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, nip, unit)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Unknown'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'front'),
    COALESCE(NEW.raw_user_meta_data->>'nip', '-'),
    COALESCE(NEW.raw_user_meta_data->>'unit', 'Umum')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Step 4: Buat 5 akun demo langsung di auth.users & auth.identities
-- ============================================================

DO $$
DECLARE
  uid_dokter   UUID := gen_random_uuid();
  uid_perawat  UUID := gen_random_uuid();
  uid_apoteker UUID := gen_random_uuid();
  uid_resep    UUID := gen_random_uuid();
  uid_itadmin  UUID := gen_random_uuid();
  hashed_pw    TEXT := crypt('Demo@1234', gen_salt('bf'));
BEGIN

  -- Hapus dulu kalau sudah ada (cascade ke identities dan profiles)
  DELETE FROM auth.users WHERE email IN (
    'dokter@sehatnusantara.id',
    'perawat@sehatnusantara.id',
    'apoteker@sehatnusantara.id',
    'resepsionis@sehatnusantara.id',
    'itadmin@sehatnusantara.id'
  );

  -- 1. Dokter DPJP
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) 
  VALUES (uid_dokter, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'dokter@sehatnusantara.id', hashed_pw, now(), '{"role":"dpjp","full_name":"dr. Adrian Wijaya, Sp.PD","nip":"198805202021021004","unit":"Poli Penyakit Dalam"}'::jsonb, now(), now());
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, created_at, updated_at) 
  VALUES (gen_random_uuid(), uid_dokter, uid_dokter::text, format('{"sub":"%s","email":"%s"}', uid_dokter::text, 'dokter@sehatnusantara.id')::jsonb, 'email', now(), now());

  -- 2. Perawat
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) 
  VALUES (uid_perawat, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'perawat@sehatnusantara.id', hashed_pw, now(), '{"role":"nurse","full_name":"Ns. Sari Indah, S.Kep","nip":"199203152019032001","unit":"Rawat Inap Penyakit Dalam"}'::jsonb, now(), now());
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, created_at, updated_at) 
  VALUES (gen_random_uuid(), uid_perawat, uid_perawat::text, format('{"sub":"%s","email":"%s"}', uid_perawat::text, 'perawat@sehatnusantara.id')::jsonb, 'email', now(), now());

  -- 3. Apoteker
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) 
  VALUES (uid_apoteker, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'apoteker@sehatnusantara.id', hashed_pw, now(), '{"role":"pharma","full_name":"Apt. Riska Amalia, S.Farm","nip":"199507202021032003","unit":"Depo Farmasi Sentral"}'::jsonb, now(), now());
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, created_at, updated_at) 
  VALUES (gen_random_uuid(), uid_apoteker, uid_apoteker::text, format('{"sub":"%s","email":"%s"}', uid_apoteker::text, 'apoteker@sehatnusantara.id')::jsonb, 'email', now(), now());

  -- 4. Resepsionis
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) 
  VALUES (uid_resep, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'resepsionis@sehatnusantara.id', hashed_pw, now(), '{"role":"front","full_name":"Budi Santoso, A.Md.RMK","nip":"199801012020011002","unit":"Loket Admisi Pendaftaran"}'::jsonb, now(), now());
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, created_at, updated_at) 
  VALUES (gen_random_uuid(), uid_resep, uid_resep::text, format('{"sub":"%s","email":"%s"}', uid_resep::text, 'resepsionis@sehatnusantara.id')::jsonb, 'email', now(), now());

  -- 5. IT Admin
  INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_user_meta_data, created_at, updated_at) 
  VALUES (uid_itadmin, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'itadmin@sehatnusantara.id', hashed_pw, now(), '{"role":"itadmin","full_name":"Rizki Admin IT","nip":"199204102018021001","unit":"Departemen IT & Rekam Medis"}'::jsonb, now(), now());
  
  INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, created_at, updated_at) 
  VALUES (gen_random_uuid(), uid_itadmin, uid_itadmin::text, format('{"sub":"%s","email":"%s"}', uid_itadmin::text, 'itadmin@sehatnusantara.id')::jsonb, 'email', now(), now());

END $$;
