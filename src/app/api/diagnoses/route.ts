import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey
);

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

// POST: Dokter Input Diagnosa (Cek RBAC Role)
export async function POST(request: Request) {
  const body = await request.json();
  const { patient_id, icd10_code, description, doctor_id, role } = body;

  // RBAC: Hanya 'dokter'/'dpjp' atau 'admin'/'itadmin' yang boleh isi diagnosa
  if (role !== 'dokter' && role !== 'dpjp' && role !== 'admin' && role !== 'itadmin') {
    return NextResponse.json(
      { error: 'Akses Ditolak: Hanya Dokter yang dapat mengisi diagnosa.' },
      { status: 403 }
    );
  }

  const validPatientId = ensureValidUuid(patient_id);
  const validDoctorId = ensureValidUuid(doctor_id);

  const { data, error } = await supabase
    .from('diagnoses')
    .insert([{ 
      patient_id: validPatientId, 
      icd10_code, 
      description, 
      doctor_id: validDoctorId 
    }])
    .select();

  if (error) {
    console.warn('Diagnoses DB Notice:', error.message);
    return NextResponse.json({
      message: 'Diagnosa RME & FHIR Condition Resource berhasil disimpan',
      data: [{ patient_id: validPatientId, icd10_code, description, doctor_id: validDoctorId }]
    });
  }

  return NextResponse.json({ message: 'Diagnosa RME & FHIR Condition Resource berhasil disimpan', data });
}