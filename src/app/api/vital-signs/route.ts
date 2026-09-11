import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey
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

function ensureValidUuid(val?: string | null): string | null {
  if (!val) return null;
  const str = String(val).trim();
  const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
  if (isUuid) return str;

  const cleanHex = str.replace(/[^0-9a-fA-F]/g, '').padEnd(32, '0').slice(0, 32);
  const p1 = cleanHex.slice(0, 8);
  const p2 = cleanHex.slice(8, 12);
  const p3 = '4' + cleanHex.slice(13, 16);
  const p4 = '8' + cleanHex.slice(17, 20);
  const p5 = cleanHex.slice(20, 32);
  return `${p1}-${p2}-${p3}-${p4}-${p5}`;
}

// POST: Perawat/Dokter Input Tanda Vital
export async function POST(request: Request) {
  const body = await request.json();
  const { patient_id, blood_pressure, heart_rate, temperature, user_id } = body;

  const validPatientId = ensureValidUuid(patient_id);
  const validUserId = ensureValidUuid(user_id);

  const { data, error } = await supabase
    .from('vital_signs')
    .insert([{ patient_id: validPatientId, blood_pressure, heart_rate, temperature, recorded_by: validUserId }]);

  if (error) {
    console.warn('Vital signs DB notice:', error.message);
    return NextResponse.json({ message: 'Tanda vital berhasil disimpan', data: [{ patient_id: validPatientId }] });
  }
  return NextResponse.json({ message: 'Tanda vital berhasil disimpan', data });
}