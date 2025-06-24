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
  if (req.method === 'POST') {
    try {
      const { fullName, email, companyName, companySize, mainChallenge } = req.body as ContactRequestBody;
      const AC_URL = process.env.ACTIVECAMPAIGN_API_URL; // Ejemplo: https://tuempresa.api-us1.com
      const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
      const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

      if (!AC_URL || !AC_KEY || !LIST_ID) {
        throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
      }

      // 1. Crear o actualizar el contacto
      const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, {
        method: "POST",
        headers: {
          "Api-Token": AC_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            email,
            firstName: fullName,
            fieldValues: [
              // Puedes mapear aquí los campos personalizados si tienes sus IDs
              // { field: "ID_CAMPO", value: companyName }
            ],
          },
        }),
      });

      if (!syncResponse.ok) {
        const error = await syncResponse.text();
        throw new Error('Error al sincronizar contacto: ' + error);
      }

      const { contact } = await syncResponse.json();

      // 2. Suscribirlo a una lista (opcional pero típico)
      await fetch(`${AC_URL}/api/3/contactLists`, {
        method: "POST",
        headers: {
          "Api-Token": AC_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactList: {
            list: LIST_ID,
            contact: contact.id,
            status: 1, // 1 = subscribe
          },
        }),
      });

      return res.status(200).json({ message: 'Contacto procesado con éxito.' });

    } catch (error: any) {
      console.error("Error en /api/contact:", error);
      return res.status(500).json({ message: error.message || 'Error interno del servidor.' });
    }
  }

  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
