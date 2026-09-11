import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Ambil Data Pasien
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nik = searchParams.get('nik');

  let query = supabase.from('patients').select('*');
  
  if (nik) {
    query = query.eq('nik', nik);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST: Resepsionis/Admin Input Pasien Baru (Cek RBAC Role)
export async function POST(request: Request) {
  const body = await request.json();
  const { nik, full_name, dob, gender, address, phone, marital_status, role } = body;

  // RBAC: Hanya 'resepsionis', 'front', atau 'admin'/'itadmin' yang boleh registrasi pasien
  if (role !== 'resepsionis' && role !== 'front' && role !== 'admin' && role !== 'itadmin') {
    return NextResponse.json(
      { error: 'Akses Ditolak: Hanya Admin atau Petugas Pendaftaran yang dapat registrasi pasien.' },
      { status: 403 }
    );
  }

  // Validasi manual NIK 16 digit (mengikuti pola tanpa Zod)
  if (!nik || nik.length !== 16 || !/^\d+$/.test(nik)) {
    return NextResponse.json(
      { error: 'Validasi Gagal: NIK harus berupa 16 digit angka.' },
      { status: 400 }
    );
  }

  // FHIR Patient Resource
  const fhir_data: any = {
    resourceType: "Patient",
    identifier: [{ system: "https://fhir.kemkes.go.id/id/nik", value: nik }],
    name: [{ use: "official", text: full_name }],
    gender: gender,
    birthDate: dob,
    address: [{ text: address }]
  };

  if (phone) {
    fhir_data.telecom = [{ system: "phone", value: phone, use: "mobile" }];
  }

  if (marital_status) {
    // Basic mapping for marital status
    fhir_data.maritalStatus = {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
        code: marital_status.charAt(0).toUpperCase(),
        display: marital_status
      }]
    };
  }

  const { data, error } = await supabase
    .from('patients')
    .insert([{ nik, full_name, dob, gender, address, phone, marital_status, fhir_data }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Registrasi demografi pasien berhasil', data });
}
