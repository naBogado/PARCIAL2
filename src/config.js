import { CAT_IMAGES_BACKEND } from "./config";
//apis publicas
export const cat_facts_api = "https://meowfacts.herokuapp.com/";
export const cat_images_api = `${CAT_IMAGES_BACKEND}`;
export const cat_data_api = `${CAT_IMAGES_BACKEND}`;
export const CAT_IMAGES_BACKEND = "/api/data";

export const all_breeds_data = "https://api.thecatapi.com/v1/breeds"; //links para traer todas las razas

//Enum para evitar strings
export const FILTERS = Object.freeze({
  RAZA: "RAZA",
  ORDE: "ORDEN",
});

export function generarUrlImagen(text) {
  if (!text) {
    return "https://cataas.com/cat/says/i%C2%B4m%20a%20cute%20cat"; //esta raro por los espacios en blanco
  } else {
    return `https://cataas.com/cat/says/${text}`;
  }
}
//Genera los links para busquedas con filtros
export function filtrarBusqueda(filtro, value) {
  let nuevaURL = `${CAT_IMAGES_BACKEND}`;
  switch (filtro) {
    case FILTERS.RAZA: {
      nuevaURL = `
      ${CAT_IMAGES_BACKEND}?has_breeds=1&limit=10&breeds_ids=${value}`;
      return nuevaURL;
    }
    case FILTERS.ORDE: {
      nuevaURL = `
      ${CAT_IMAGES_BACKEND}?has_breeds=1&limit=10&order=${value}`;
      return nuevaURL;
    }
    default:
      return nuevaURL;
  }
}
