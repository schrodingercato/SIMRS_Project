import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Ambil Tanda Vital Pasien
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');

  const { data, error } = await supabase
    .from('vital_signs')
    .select('*')
    .eq('patient_id', patientId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST: Perawat/Dokter Input Tanda Vital
export async function POST(request: Request) {
  const body = await request.json();
  const { patient_id, blood_pressure, heart_rate, temperature, user_id } = body;

  const { data, error } = await supabase
    .from('vital_signs')
    .insert([{ patient_id, blood_pressure, heart_rate, temperature, recorded_by: user_id }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Tanda vital berhasil disimpan', data });
}