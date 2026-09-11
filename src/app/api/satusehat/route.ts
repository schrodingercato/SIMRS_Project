import { NextResponse } from 'next/server';

// SATUSEHAT Endpoints according to Kemenkes RI Specification
const ENDPOINTS = {
  sandbox: {
    authUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
    baseUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1',
  },
  production: {
    authUrl: 'https://api-satusehat.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
    baseUrl: 'https://api-satusehat.dto.kemkes.go.id/fhir-r4/v1',
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { env = 'sandbox', organization_id, client_id, client_secret } = body;

    if (!client_id || !client_secret) {
      return NextResponse.json(
        { error: 'Client ID dan Client Secret wajib diisi.' },
        { status: 400 }
      );
    }

    const config = env === 'production' ? ENDPOINTS.production : ENDPOINTS.sandbox;

    // Send OAuth2 Auth Request to Kemenkes SATUSEHAT API
    const authFormData = new URLSearchParams();
    authFormData.append('client_id', client_id);
    authFormData.append('client_secret', client_secret);

    const authRes = await fetch(config.authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: authFormData.toString(),
    });

    const authData = await authRes.json();

    if (!authRes.ok || !authData.access_token) {
      return NextResponse.json(
        {
          error: authData.issue?.[0]?.details?.text || authData.message || 'Autentikasi ke SATUSEHAT Gagal. Periksa Client ID & Client Secret.',
          raw: authData,
        },
        { status: authRes.status || 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Autentikasi OAuth2 SATUSEHAT Platform (${env.toUpperCase()}) Berhasil!`,
      environment: env,
      organization_id: organization_id || '100026850',
      token_type: authData.token_type || 'Bearer',
      expires_in: authData.expires_in || 3600,
      issued_at: new Date().toISOString(),
      access_token_masked: authData.access_token.slice(0, 10) + '...' + authData.access_token.slice(-10),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan jaringan saat menghubungkan ke SATUSEHAT.' },
      { status: 500 }
    );
  }
}
