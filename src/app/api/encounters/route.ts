import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey
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

// POST: Resepsionis/Admin Pendaftaran Kunjungan (Cek RBAC Role)
export async function POST(request: Request) {
  const body = await request.json();
  const { patient_id, doctor_id, polyclinic, room_number, estimated_time, role } = body;

  // RBAC: Hanya 'resepsionis', 'front', atau 'admin'/'itadmin' yang boleh daftar kunjungan
  if (role !== 'resepsionis' && role !== 'front' && role !== 'admin' && role !== 'itadmin') {
    return NextResponse.json(
      { error: 'Akses Ditolak: Hanya Admin atau Petugas Pendaftaran yang dapat mendaftarkan kunjungan.' },
      { status: 403 }
    );
  }

  if (!patient_id || !polyclinic) {
    return NextResponse.json(
      { error: 'Validasi Gagal: patient_id dan polyclinic wajib diisi.' },
      { status: 400 }
    );
  }

  const validPatientId = ensureValidUuid(patient_id);
  const validDoctorId = ensureValidUuid(doctor_id);

  // FHIR Encounter Resource
  const fhir_data: any = {
    resourceType: "Encounter",
    status: "planned",
    class: {
      system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
      code: "AMB",
      display: "ambulatory"
    },
    subject: { reference: `Patient/${validPatientId}` },
    participant: validDoctorId ? [{
      type: [{
        coding: [{
          system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
          code: "ATND",
          display: "attender"
        }]
      }],
      individual: { reference: `Practitioner/${validDoctorId}` }
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
    .insert([{ patient_id: validPatientId, doctor_id: validDoctorId, polyclinic, room_number, estimated_time, status: 'Planned', fhir_data }])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Pendaftaran kunjungan berhasil', data });
}
