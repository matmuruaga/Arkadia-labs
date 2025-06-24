// /api/contact.ts (para Vercel)

import type { NextApiRequest, NextApiResponse } from 'next';

// Define el tipo de datos que esperamos del frontend
interface ContactRequestBody {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  mainChallenge: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { fullName, email, companyName, companySize, mainChallenge } = req.body as ContactRequestBody;

    // Obtener credenciales de las variables de entorno (¡nunca del frontend!)
    const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
    const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
    const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

    if (!AC_URL || !AC_KEY || !LIST_ID) {
      throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
    }
    
    // 1. Sincronizar (crear o actualizar) el contacto
    const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email: email,
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
        // Si falla la sincronización, lanzamos un error con detalles
        const errorData = await syncResponse.json();
        throw new Error(`Error al sincronizar el contacto: ${JSON.stringify(errorData)}`);
    }

    const { contact } = await syncResponse.json();

    // 2. Añadir el contacto a la lista
    const addToListResponse = await fetch(`${AC_URL}/api/3/contactLists`, {
        method: 'POST',
        headers: {
            'Api-Token': AC_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contactList: {
                list: LIST_ID,
                contact: contact.id,
                status: 1, // 1 para 'Suscrito'
            },
        }),
    });

    // --- MEJORA AÑADIDA ---
    // Verificamos si la segunda llamada a la API (añadir a la lista) fue exitosa.
    if (!addToListResponse.ok) {
        // Si no fue exitosa, registramos el error en el servidor para poder depurarlo.
        // No detenemos el proceso porque el contacto ya se creó, lo cual es lo más importante.
        console.error(`El contacto con ID ${contact.id} se creó, pero falló al añadirlo a la lista ${LIST_ID}.`);
    }

    res.status(200).json({ message: 'Contacto procesado con éxito.' });

  } catch (error: any) {
    console.error("Error en /api/contact:", error);
    res.status(500).json({ message: error.message || 'Error interno del servidor.' });
  }
}