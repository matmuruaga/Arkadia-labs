/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = (req, res) => {
  // Manejamos CORS directamente aquí para esta prueba
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Respondemos a la petición preflight de CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Respondemos a la petición POST
  if (req.method === 'POST') {
    // Si la petición es POST, simplemente devolvemos un mensaje de éxito
    // y los datos que recibimos, para confirmar que todo llegó bien.
    return res.status(200).json({
      message: "¡La función de prueba en Vercel funciona!",
      dataReceived: req.body,
    });
  }

  // Para cualquier otro método (como GET), devolvemos el error 405
  res.setHeader('Allow', ['POST', 'OPTIONS']);
  res.status(405).json({ error: `El método ${req.method} no está permitido.` });
};