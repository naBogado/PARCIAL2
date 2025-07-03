export default async function handler(req, res) {
  const apiKey = process.env.CAT_API_KEY;
  const baseUrl = `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&order=RAND&api_key=${apiKey}`;

  const params = new URLSearchParams(req.query);
  params.append("api_key", apiKey);

  const fullUrl = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
}
