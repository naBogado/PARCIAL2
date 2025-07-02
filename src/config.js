//apis publicas, cambiar links
export const cat_facts_api = "https://meowfacts.herokuapp.com/";
export const cat_images_api =
  "https://api.thecatapi.com/v1/images/search?limit=1&order=RAND&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDMX";
export const cat_data_api =
  "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDMX";

export const all_breeds_data = "https://api.thecatapi.com/v1/breeds"; //links para traer todas las razas

export const FILTERS = Object.freeze({
  RAZA: "RAZA",
  ORDE: "ORDEN",
  LIMI: "LIMITE",
  IMAG: "IMAGENES",
});

export function filtrarBusqueda(filtro, value) {
  let nuevaURL =
    "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDMX";
  switch (filtro) {
    case FILTERS.RAZA: {
      nuevaURL = `https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${value}&limit=10&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDMX`;
      return nuevaURL;
    }
    case FILTERS.ORDE: {
      nuevaURL = `https://api.thecatapi.com/v1/images/search?has_breeds=1&order=${value}&limit=10&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDMX`;
      return nuevaURL;
    }
    //para mostrar solo imagenes -> cambiaria los articles
    case FILTERS.IMAG: {
      nuevaURL = `https://api.thecatapi.com/v1/images/search?has_breeds=0&limit=10&api_key=live_qpTsUtmtUZRa6s50Lo0unW0hpzk0PmP4R1xTaaUyYyNTGLSBeIv18oRJt4F5YDM`;
    }
    default:
      return nuevaURL;
  }
}
