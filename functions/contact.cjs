/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async (req, res) => {
  // --- MANEJO DE CORS ---
  // Esta sección es crucial para permitir las peticiones desde tu entorno de desarrollo.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Api-Token');

  // Si la petición es de tipo OPTIONS (la comprobación de CORS), respondemos con éxito inmediatamente.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- LÓGICA DE LA API (solo para POST) ---
  if (req.method === 'POST') {
    try {
      const { fullName, email, companyName, companySize, mainChallenge } = req.body;

      const AC_URL = process.env.ACTIVECAMPAIGN_API_URL;
      const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
      const LIST_ID = process.env.ACTIVECAMPAIGN_LIST_ID;

      if (!AC_URL || !AC_KEY || !LIST_ID) {
        throw new Error("Las variables de entorno de ActiveCampaign no están configuradas.");
      }
      
      // 1. Sincronizar (crear o actualizar) el contacto
      const syncResponse = await fetch(`${AC_URL}/api/3/contact/sync`, {
        method: 'POST',
        headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            email,
            firstName: fullName.split(' ')[0],
            lastName: fullName.split(' ').slice(1).join(' '),
            fieldValues: [
              // Asegúrate de que estos IDs coincidan con los de tu cuenta de ActiveCampaign
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

      // 2. Añadir el contacto a la lista
      await fetch(`${AC_URL}/api/3/contactLists`, {
          method: 'POST',
          headers: { 'Api-Token': AC_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({
              contactList: { list: LIST_ID, contact: contact.id, status: 1 },
          }),
      });

      return res.status(200).json({ message: 'Contacto procesado con éxito.' });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor.';
      console.error("Error en /api/contact:", error);
      return res.status(500).json({ message: errorMessage });
    }
  }

  res.setHeader('Allow', ['POST', 'OPTIONS']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
};