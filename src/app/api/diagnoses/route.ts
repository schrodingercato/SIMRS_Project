import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

  const { data, error } = await supabase
    .from('diagnoses')
    .insert([{ patient_id, icd10_code, description, doctor_id }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Diagnosa berhasil disimpan', data });
}