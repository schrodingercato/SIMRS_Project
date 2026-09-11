-- ============================================================
-- DEMO ACCOUNTS untuk SIMRS RS Sehat Nusantara
-- Jalankan script ini di Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/eghorjrtbwyaxqgdmngr/sql
-- ============================================================

-- Aktifkan UUID extension (biasanya sudah aktif)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Buat tabel profiles untuk menyimpan role per user
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('dpjp', 'nurse', 'pharma', 'front', 'itadmin')),
  nip TEXT,
  unit TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: user hanya bisa baca profile sendiri
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- Policy: allow insert during signup
CREATE POLICY "Allow profile creation"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================================
-- TRIGGER: otomatis buat profil saat user sign up
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
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- CATATAN: Buat akun demo via Supabase Auth (Authentication > Users > Add User)
-- atau via API. Script SQL tidak bisa langsung insert ke auth.users.
--
-- Akun Demo yang perlu dibuat:
-- ┌─────────────────────────────────────────────────────────────────────────────┐
-- │ ROLE       │ EMAIL                              │ PASSWORD      │ NAMA       │
-- ├────────────┼────────────────────────────────────┼───────────────┼────────────┤
-- │ dpjp       │ dokter@sehatnusantara.id           │ Demo@1234     │ dr. Adrian │
-- │ nurse      │ perawat@sehatnusantara.id          │ Demo@1234     │ Ns. Sari   │
-- │ pharma     │ apoteker@sehatnusantara.id         │ Demo@1234     │ Apt. Riska │
-- │ front      │ resepsionis@sehatnusantara.id      │ Demo@1234     │ Budi Admin │
-- │ itadmin    │ itadmin@sehatnusantara.id          │ Demo@1234     │ Admin IT   │
-- └─────────────────────────────────────────────────────────────────────────────┘
-- ============================================================
