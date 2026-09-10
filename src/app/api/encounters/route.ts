import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Ambil Data Kunjungan (Encounter)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patientId');
  const doctorId = searchParams.get('doctorId');

  let query = supabase.from('encounters').select('*, patients(*)');

  if (patientId) query = query.eq('patient_id', patientId);
  if (doctorId) query = query.eq('doctor_id', doctorId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST: Resepsionis/Admin Pendaftaran Kunjungan (Cek RBAC Role)
export async function POST(request: Request) {
  const body = await request.json();
  const { patient_id, doctor_id, polyclinic, room_number, estimated_time, role } = body;

  // RBAC: Hanya 'resepsionis' atau 'admin' yang boleh daftar kunjungan
  if (role !== 'resepsionis' && role !== 'admin') {
    return NextResponse.json(
      { error: 'Akses Ditolak: Hanya Admin atau Resepsionis yang dapat mendaftarkan kunjungan.' },
      { status: 403 }
    );
  }

  if (!patient_id || !polyclinic) {
    return NextResponse.json(
      { error: 'Validasi Gagal: patient_id dan polyclinic wajib diisi.' },
      { status: 400 }
    );
  }

  // FHIR Encounter Resource
  const fhir_data: any = {
    resourceType: "Encounter",
    status: "planned",
    class: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: "AMB",
      display: "ambulatory"
    },
    subject: { reference: `Patient/${patient_id}` },
    participant: doctor_id ? [{
      type: [{
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
          code: "ATND",
          display: "attender"
        }]
      }],
      individual: { reference: `Practitioner/${doctor_id}` }
    }] : [],
    location: [{
      location: { display: polyclinic + (room_number ? ` - ${room_number}` : '') }
    }]
  };

  if (estimated_time) {
    fhir_data.period = { start: estimated_time };
  }

  const { data, error } = await supabase
    .from('encounters')
    .insert([{ patient_id, doctor_id, polyclinic, room_number, estimated_time, status: 'Planned', fhir_data }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Pendaftaran kunjungan berhasil', data });
}
