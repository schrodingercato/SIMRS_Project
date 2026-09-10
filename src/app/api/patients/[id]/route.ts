import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Ambil Detail Pasien
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// PUT: Update Data Pasien (Cek RBAC Role)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { full_name, dob, gender, address, role } = body;

  // RBAC: Hanya 'resepsionis' atau 'admin' yang boleh update demografi
  if (role !== 'resepsionis' && role !== 'admin') {
    return NextResponse.json(
      { error: 'Akses Ditolak: Hanya Admin atau Resepsionis yang dapat mengupdate data pasien.' },
      { status: 403 }
    );
  }

  // Ambil existing fhir_data untuk di-update
  const { data: existing, error: fetchError } = await supabase
    .from('patients')
    .select('fhir_data')
    .eq('id', params.id)
    .single();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 400 });

  const fhir_data = existing.fhir_data || {};
  if (full_name) fhir_data.name = [{ use: "official", text: full_name }];
  if (gender) fhir_data.gender = gender;
  if (dob) fhir_data.birthDate = dob;
  if (address) fhir_data.address = [{ text: address }];

  const { data, error } = await supabase
    .from('patients')
    .update({ full_name, dob, gender, address, fhir_data })
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Data pasien berhasil diupdate', data });
}
