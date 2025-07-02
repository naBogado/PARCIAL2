//funcion de backend para ocultar api key
export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}`
  );
  const data = await response.json();
  res.status(200).json(data);
}
