// /api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactRequestBody {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  mainChallenge: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- ESTA SECCIÓN DE CORS ES LA MÁS IMPORTANTE ---
  // Debe estar al principio de la función.
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Api-Token');

  // Si la petición es de tipo OPTIONS (preflight), respondemos con éxito inmediatamente.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // El resto de la lógica solo se ejecuta para peticiones POST
  if (req.method === 'POST') {
    try {
      const { fullName, email, companyName, companySize, mainChallenge } = req.body as ContactRequestBody;
      const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
      const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
      const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

      if (!AC_URL || !AC_KEY || !LIST_ID) {
        throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
      }
      
      const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, { /* ... */ });
      if (!syncResponse.ok) { throw new Error('Error al sincronizar contacto.'); }

      const { contact } = await syncResponse.json();

      await fetch(`${AC_URL}/api/3/contactLists`, { /* ... */ });

      return res.status(200).json({ message: 'Contacto procesado con éxito.' });
    } catch (error: any) {
      console.error("Error en /api/contact:", error);
      return res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    }
  }

  res.setHeader('Allow', ['POST', 'OPTIONS']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}