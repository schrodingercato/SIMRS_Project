const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eghorjrtbwyaxqgdmngr.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // harus pakai service role key

if (!supabaseServiceKey) {
  console.error('ERROR: Set SUPABASE_SERVICE_KEY environment variable first!');
  console.log('Cara: $env:SUPABASE_SERVICE_KEY="your-service-role-key" ; node supabase/seed_users.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const demoUsers = [
  { email: 'dokter@sehatnusantara.id',      password: 'Demo@1234', full_name: 'dr. Adrian Wijaya, Sp.PD', role: 'dpjp',    nip: '198805202021021004', unit: 'Poli Penyakit Dalam' },
  { email: 'perawat@sehatnusantara.id',     password: 'Demo@1234', full_name: 'Ns. Sari Indah, S.Kep',   role: 'nurse',   nip: '199203152019032001', unit: 'Rawat Inap Penyakit Dalam' },
  { email: 'apoteker@sehatnusantara.id',    password: 'Demo@1234', full_name: 'Apt. Riska Amalia, S.Farm', role: 'pharma', nip: '199507202021032003', unit: 'Depo Farmasi Sentral' },
  { email: 'resepsionis@sehatnusantara.id', password: 'Demo@1234', full_name: 'Budi Santoso, A.Md.RMK',  role: 'front',   nip: '199801012020011002', unit: 'Loket Admisi Pendaftaran' },
  { email: 'itadmin@sehatnusantara.id',     password: 'Demo@1234', full_name: 'Rizki Admin IT',          role: 'itadmin', nip: '199204102018021001', unit: 'Departemen IT & Rekam Medis' },
];

async function seedUsers() {
  console.log('🌱 Membuat akun demo SIMRS...\n');
  
  for (const user of demoUsers) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        full_name: user.full_name,
        role: user.role,
        nip: user.nip,
        unit: user.unit,
      }
    });

    if (error) {
      if (error.message.includes('already been registered')) {
        console.log(`⚠️  ${user.email} sudah ada, skip.`);
      } else {
        console.error(`❌ Gagal buat ${user.email}:`, error.message);
      }
    } else {
      console.log(`✅ Berhasil: [${user.role.toUpperCase()}] ${user.email}`);
    }
  }

  console.log('\n📋 AKUN DEMO SIMRS:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  demoUsers.forEach(u => {
    console.log(`${u.role.padEnd(10)} │ ${u.email.padEnd(36)} │ Demo@1234`);
  });
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

seedUsers();
