import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eghorjrtbwyaxqgdmngr.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const demoUsers = [
  { email: 'dokter@sehatnusantara.id',      password: 'Demo@1234', role: 'dpjp',    full_name: 'dr. Adrian Wijaya, Sp.PD', nip: '198805202021021004', unit: 'Poli Penyakit Dalam' },
  { email: 'perawat@sehatnusantara.id',     password: 'Demo@1234', role: 'nurse',   full_name: 'Ns. Sari Indah, S.Kep', nip: '199203152019032001', unit: 'Rawat Inap Penyakit Dalam' },
  { email: 'apoteker@sehatnusantara.id',    password: 'Demo@1234', role: 'pharma',  full_name: 'Apt. Riska Amalia, S.Farm', nip: '199507202021032003', unit: 'Depo Farmasi Sentral' },
  { email: 'resepsionis@sehatnusantara.id', password: 'Demo@1234', role: 'front',   full_name: 'Budi Santoso, A.Md.RMK', nip: '199801012020011002', unit: 'Loket Admisi Pendaftaran' },
  { email: 'itadmin@sehatnusantara.id',     password: 'Demo@1234', role: 'itadmin', full_name: 'Rizki Admin IT', nip: '199204102018021001', unit: 'Departemen IT & Rekam Medis' },
];

async function seedAdmin() {
  console.log('🔄 Memulai proses admin (Bypass Limit & Bypass Konfirmasi Email)...');

  // 1. Ambil daftar semua user untuk dihapus (clean up akun error)
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('❌ Kunci Service Role salah atau tidak ada akses:', listError.message);
    return;
  }

  const emailsToClear = demoUsers.map(u => u.email);
  const badUsers = users.users.filter(u => u.email && emailsToClear.includes(u.email));

  for (const bu of badUsers) {
    await supabase.auth.admin.deleteUser(bu.id);
    console.log(`🗑️ Dihapus akun lama (yang error): ${bu.email}`);
  }

  // 2. Buat ulang dari awal dengan Admin API
  for (const u of demoUsers) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true, // AUTO CONFIRM (Bypass verifikasi email!)
      user_metadata: {
        role: u.role,
        full_name: u.full_name,
        nip: u.nip,
        unit: u.unit
      }
    });

    if (error) {
      console.error(`❌ Gagal buat ${u.email}:`, error.message);
    } else {
      console.log(`✅ Berhasil dibuat baru (Sempurna): ${u.email}`);
    }
  }

  console.log('\n🎉 SEMUA SELESAI! SILAKAN LOGIN DI WEB SEKARANG!');
}

seedAdmin();
