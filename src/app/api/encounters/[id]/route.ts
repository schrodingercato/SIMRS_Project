import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// PUT: Update Kunjungan (Cek RBAC Role)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { status, room_number, estimated_time, role } = body;

  // RBAC: Admin, resepsionis, dokter, perawat bisa update status/kunjungan
  const allowedRoles = ['admin', 'resepsionis', 'dokter', 'perawat'];
  if (!allowedRoles.includes(role)) {
    return NextResponse.json(
      { error: 'Akses Ditolak: Anda tidak memiliki akses untuk update status kunjungan.' },
      { status: 403 }
    );
  }

  const validStatuses = ['Planned', 'Arrived', 'In-progress', 'Finished'];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json(
      { error: 'Validasi Gagal: Status tidak valid.' },
      { status: 400 }
    );
  }

  // Update field dan status di dalam fhir_data
  const { data: existing, error: fetchError } = await supabase
    .from('encounters')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 400 });

  const fhir_data = existing.fhir_data || {};
  if (status) fhir_data.status = status.toLowerCase(); // FHIR standard uses lowercase
  
  if (room_number) {
    if (!fhir_data.location) fhir_data.location = [{}];
    if (!fhir_data.location[0].location) fhir_data.location[0].location = {};
    const basePoly = existing.polyclinic || '';
    fhir_data.location[0].location.display = basePoly + (room_number ? ` - ${room_number}` : '');
  }

  if (estimated_time) {
    if (!fhir_data.period) fhir_data.period = {};
    fhir_data.period.start = estimated_time;
  }

  const updateFields: Record<string, unknown> = { fhir_data };
  if (status) updateFields.status = status;
  if (room_number) updateFields.room_number = room_number;
  if (estimated_time) updateFields.estimated_time = estimated_time;

  const { data, error } = await supabase
    .from('encounters')
    .update(updateFields)
    .eq('id', id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Status kunjungan berhasil diupdate', data });
}
