import type { VercelRequest, VercelResponse } from '@vercel/node';

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';
const BREVO_LIST_ID = 3; // "form_contact" list

interface ContactPayload {
  fullName: string;
  email: string;
  companyName: string;
  role?: string;
  companySize: string;
  mainChallenge: string;
  formulario: string;
  language?: string;
  source?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('BREVO_API_KEY is not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const body = req.body as ContactPayload;

  if (!body.email || !body.fullName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const brevoPayload = {
      email: body.email,
      attributes: {
        FIRSTNAME: body.fullName.split(' ')[0],
        LASTNAME: body.fullName.split(' ').slice(1).join(' ') || '',
        COMPANY: body.companyName || '',
        ROLE: body.role || '',
        COMPANY_SIZE: body.companySize || '',
        MESSAGE: body.mainChallenge || '',
        FORM_SOURCE: body.formulario || 'contact',
        LANGUAGE: body.language || 'en',
        SOURCE_URL: body.source || '',
      },
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    };

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(brevoPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Brevo API error:', response.status, errorData);

      // Contact already exists is not an error for us
      if (response.status === 400 && (errorData as { code?: string }).code === 'duplicate_parameter') {
        return res.status(200).json({ success: true, message: 'Contact updated' });
      }

      return res.status(response.status).json({
        error: 'Failed to create contact',
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
