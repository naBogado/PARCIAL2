import { FILTERS } from "../src/config";

export default async function handler(req, res) {
  const { filtro, valor } = req.query;

  const apiKey = process.env.CAT_API_KEY;
  let url = `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=${apiKey}`;

  if (filtro === FILTERS.RAZA) {
    url = `https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${valor}&limit=10&api_key=${apiKey}`;
  } else if (filtro === FILTERS.ORDE) {
    url = `https://api.thecatapi.com/v1/images/search?has_breeds=1&order=${valor}&limit=10&api_key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos de la API" });
  }
}
