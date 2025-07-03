//apis publicas
export const cat_facts_api = "https://meowfacts.herokuapp.com/";
export const all_breeds_data = "https://api.thecatapi.com/v1/breeds"; //links para traer todas las razas

//Enum para evitar strings
export const FILTERS = Object.freeze({
  RAZA: "RAZA",
  ORDE: "ORDEN",
});

//Genera url de imagen con texto
export function generarUrlImagen(text) {
  if (!text) {
    return "https://cataas.com/cat/says/i%C2%B4m%20a%20cute%20cat"; //esta raro por los espacios en blanco
  } else {
    return `https://cataas.com/cat/says/${text}`;
  }
}

//Crea objeto con los filtros para busqueda
export function filtrarBusqueda(filtro, value) {
  const filtros = {
    limit: 10,
    has_breeds: 1,
  };

  switch (filtro) {
    case FILTERS.RAZA:
      filtros.breed_ids = value;
      break;
    case FILTERS.ORDE:
      filtros.order = value;
      break;
  }

  return filtros;
}
