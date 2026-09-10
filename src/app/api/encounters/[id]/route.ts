import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// PUT: Update Status Kunjungan (Cek RBAC Role)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { status, role } = body;

  // RBAC: Admin, resepsionis, dokter, perawat bisa update status
  const allowedRoles = ['admin', 'resepsionis', 'dokter', 'perawat'];
  if (!allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: 'Akses Ditolak: Anda tidak memiliki akses untuk update status kunjungan.' },
      { status: 403 }
    );
  }

  const validStatuses = ['Planned', 'Arrived', 'In-progress', 'Finished'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json(
      { error: 'Validasi Gagal: Status tidak valid.' },
      { status: 400 }
    );
  }

  // Update status biasa dan status di dalam fhir_data
  const { data: existing, error: fetchError } = await supabase
    .from('encounters')
    .select('fhir_data')
    .eq('id', params.id)
    .single();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 400 });

  const fhir_data = existing.fhir_data || {};
  fhir_data.status = status.toLowerCase(); // FHIR standard uses lowercase

  const { data, error } = await supabase
    .from('encounters')
    .update({ status, fhir_data })
    .eq('id', params.id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Status kunjungan berhasil diupdate', data });
}
