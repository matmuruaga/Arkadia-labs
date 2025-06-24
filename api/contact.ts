// /api/contact.ts

// CAMBIO 1: Importamos los tipos correctos desde '@vercel/node'
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactRequestBody {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  mainChallenge: string;
}

// CAMBIO 2: Usamos VercelRequest y VercelResponse como los tipos para req y res
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- MANEJO DE CORS ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Api-Token');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- LÓGICA DE LA API (solo para POST) ---
  if (req.method === 'POST') {
    try {
      const { fullName, email, companyName, companySize, mainChallenge } = req.body as ContactRequestBody;

      const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
      const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
      const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

      if (!AC_URL || !AC_KEY || !LIST_ID) {
        throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
      }
      
      const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, {
        method: 'POST',
        headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            email,
            firstName: fullName.split(' ')[0],
            lastName: fullName.split(' ').slice(1).join(' '),
            fieldValues: [
              { field: '1', value: companyName },
              { field: '2', value: companySize },
              { field: '3', value: mainChallenge },
            ],
          },
        }),
      });
      
      if (!syncResponse.ok) {
          const errorData = await syncResponse.json();
          throw new Error(`Error al sincronizar el contacto: ${JSON.stringify(errorData)}`);
      }

      const { contact } = await syncResponse.json();

      await fetch(`${AC_URL}/api/3/contactLists`, {
          method: 'POST',
          headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
              contactList: { list: LIST_ID, contact: contact.id, status: 1 },
          }),
      });

      return res.status(200).json({ message: 'Contacto procesado con éxito.' });

    } catch (error: any) {
      console.error("Error en /api/contact:", error);
      return res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    }
  }

  res.setHeader('Allow', ['POST', 'OPTIONS']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}