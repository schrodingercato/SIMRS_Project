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
    const { action = 'auth', env = 'sandbox', organization_id, client_id, client_secret, resource_type, custom_payload } = body;

    if (!client_id || !client_secret) {
      return NextResponse.json(
        { error: 'Client ID dan Client Secret wajib diisi.' },
        { status: 400 }
      );
    }

    const config = env === 'production' ? ENDPOINTS.production : ENDPOINTS.sandbox;

    // 1. Send OAuth2 Auth Request to Kemenkes SATUSEHAT API
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

    const accessToken = authData.access_token;
    const orgId = organization_id || '7dc1ce03-b4a8-4636-997f-4c75a6ae6e00';

    // 2. If action is 'test_send' or 'send_fhir', send live FHIR payload to Kemenkes API Gateway
    if (action === 'test_send' || action === 'send_fhir') {
      const type = resource_type || 'Encounter';

      // Attempt to query Kemenkes Sandbox to find a real registered Patient IHS ID by NIK
      let patientIhsId = '100000030009';
      try {
        const patientSearchRes = await fetch(`${config.baseUrl}/Patient?identifier=https://fhir.kemkes.go.id/id/nik|3171012304900001`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        if (patientSearchRes.ok) {
          const patientSearchData = await patientSearchRes.json();
          if (patientSearchData.entry?.[0]?.resource?.id) {
            patientIhsId = patientSearchData.entry[0].resource.id;
          }
        }
      } catch (e) {
        console.warn('Patient IHS lookup fallback:', e);
      }

      // Format WIB ISO Date (e.g. 2026-09-11T13:26:45+07:00)
      const dateWib = new Date().toISOString().replace(/\.\d{3}Z$/, '+07:00');

      const defaultEncounterPayload = {
        resourceType: "Encounter",
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/encounter/${orgId}`,
            value: `ENC-${Date.now()}`
          }
        ],
        status: "arrived",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "AMB",
          display: "ambulatory"
        },
        subject: {
          reference: `Patient/${patientIhsId}`,
          display: "Ica Marlina"
        },
        period: {
          start: dateWib
        },
        location: [
          {
            location: {
              reference: "Location/10007174",
              display: "Poli Penyakit Dalam - Ruang 204"
            }
          }
        ],
        statusHistory: [
          {
            status: "arrived",
            period: {
              start: dateWib
            }
          }
        ],
        serviceProvider: {
          reference: `Organization/${orgId}`
        }
      };

      const defaultConditionPayload = {
        resourceType: "Condition",
        clinicalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: "active",
              display: "Active"
            }
          ]
        },
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/condition-category",
                code: "encounter-diagnosis",
                display: "Encounter Diagnosis"
              }
            ]
          }
        ],
        code: {
          coding: [
            {
              system: "http://hl7.org/fhir/sid/icd-10",
              code: "I10",
              display: "Essential (primary) hypertension"
            }
          ]
        },
        subject: {
          reference: `Patient/${patientIhsId}`,
          display: "Ica Marlina"
        },
        encounter: {
          reference: `Encounter/ENC-${Date.now()}`,
          display: "Kunjungan Rawat Jalan Poli Penyakit Dalam"
        }
      };

      const payload = custom_payload || (type === 'Condition' ? defaultConditionPayload : defaultEncounterPayload);

      const fhirRes = await fetch(`${config.baseUrl}/${type}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const fhirData = await fhirRes.json();

      return NextResponse.json({
        success: fhirRes.ok,
        message: fhirRes.ok 
          ? `SUCCESS! Transaksi FHIR ${type} Berhasil Dikirrim Ke Server Kemenkes SATUSEHAT (${env.toUpperCase()})!`
          : `Kemenkes API Response (${fhirRes.status}): ${fhirData.message || fhirData.issue?.[0]?.details?.text || 'Pengiriman FHIR selesai'}`,
        status: fhirRes.status,
        fhir_resource: type,
        kemenkes_response: fhirData,
        access_token_masked: accessToken.slice(0, 10) + '...' + accessToken.slice(-10),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Autentikasi OAuth2 SATUSEHAT Platform (${env.toUpperCase()}) Berhasil!`,
      environment: env,
      organization_id: orgId,
      token_type: authData.token_type || 'Bearer',
      expires_in: authData.expires_in || 3600,
      issued_at: new Date().toISOString(),
      access_token_masked: accessToken.slice(0, 10) + '...' + accessToken.slice(-10),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Terjadi kesalahan jaringan saat menghubungkan ke SATUSEHAT.' },
      { status: 500 }
    );
  }
}
