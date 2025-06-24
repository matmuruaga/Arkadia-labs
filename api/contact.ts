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
  // El manejo de CORS ahora está en vercel.json, ya no es necesario aquí.
  // Procedemos directamente a la lógica de la API.

  if (req.method === 'POST') {
    try {
      const { fullName, email, companyName, companySize, mainChallenge } = req.body as ContactRequestBody;
      const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
      const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
      const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

      if (!AC_URL || !AC_KEY || !LIST_ID) {
        throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
      }
      
      const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, { /* ... tu lógica de fetch ... */ });
      if (!syncResponse.ok) { throw new Error('Error al sincronizar contacto.'); }

      const { contact } = await syncResponse.json();

      await fetch(`${AC_URL}/api/3/contactLists`, { /* ... tu lógica de fetch ... */ });

      return res.status(200).json({ message: 'Contacto procesado con éxito.' });

    } catch (error: any) {
      console.error("Error en /api/contact:", error);
      return res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    }
  }

  // Si no es POST, devolvemos un error
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}