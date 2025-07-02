import { traerDatos } from "./getData";
import {
  all_breeds_data,
  cat_data_api,
  FILTERS,
  filtrarBusqueda,
} from "./config";
import "./index.css";

const $dataCont = document.querySelector(".data");
const $genBtn = document.querySelectorAll(".genBtn");
const $loader = document.querySelector(".loader");
const $breedSelect = document.getElementById("breed");
const $orderSelect = document.getElementById("order");

function llenarContainer(data) {
  $dataCont.innerHTML = "";
  data.forEach((el) => {
    const article = document.createElement("article");
    article.innerHTML = `
                <img src="${el.url}" alt="${el.id}" />
                <div class="info">
                  <h3>${el.breeds[0].name}</h3>
                  <p><b>Origin:</b> ${el.breeds[0].origin}, ${el.breeds[0].country_code}</p>
                  <p><b>Temperament: </b> ${el.breeds[0].temperament}</p>
                  <p><b>Life span: </b>${el.breeds[0].life_span} years</p>
                  <p>${el.breeds[0].description}</p>
                  <p>&rarr; More info <a href="${el.breeds[0].wikipedia_url} " target="_blank">here</a></p>
                </div>
                `;
    $dataCont.appendChild(article);
  });
}

async function cargarDatosYMostrar(url = cat_data_api) {
  //con este parametro cat_data_api va a ser la url default / si le paso otra usa la nueva
  try {
    $loader.classList.remove("hidden"); //Mostrar loader
    $dataCont.innerHTML = "";
    const data = await traerDatos(url);
    llenarContainer(data);
  } catch (error) {
    console.error("Error al traer datos", error);
  } finally {
    $loader.classList.add("hidden"); //Esconder loader una vez llegan los datos
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarFiltroRaza();
  cargarDatosYMostrar();
}); //DOMContentLoaded ejecuta el codigo cuando el DOM esta listo

//forEach porque son 2 botones dentro de $genBtn
$genBtn.forEach((btn) => {
  btn.addEventListener("click", cargarDatosYMostrar);
});

//Cargar filter
async function cargarFiltroRaza() {
  try {
    const data = await traerDatos(all_breeds_data);
    console.log(data);

    data.forEach((raza) => {
      const opt = document.createElement("option");
      opt.value = raza.id;
      opt.textContent = raza.name;
      $breedSelect.appendChild(opt);
    });
  } catch (error) {
    console.error("Error al cargar razas:", error);
  }
}

//funcion del filter
async function filtrar(filtro, value) {
  const url = filtrarBusqueda(filtro, value);
  console.log(url);
  cargarDatosYMostrar(url);
}

$breedSelect.addEventListener("change", (event) => {
  const val = event.target.value;
  filtrar(FILTERS.RAZA, val);
});
$orderSelect.addEventListener("change", (event) => {
  const val = event.target.value;
  filtrar(FILTERS.ORDE, val);
});
