import { traerDatos } from "./getData";
import { all_breeds_data, FILTERS, filtrarBusqueda } from "./config";
import "./index.css";
import { mensajeError } from "./errorMessage";

const $dataCont = document.querySelector(".data");
const $genBtn = document.querySelectorAll(".genBtn");
const $loader = document.querySelector(".loader");
const $breedSelect = document.getElementById("breed");
const $orderSelect = document.getElementById("order");
const $errorCont = document.querySelector(".err-msg");

document.addEventListener("DOMContentLoaded", () => {
  cargarFiltroRaza();
  cargarDatosYMostrar("/api/data?");
}); //DOMContentLoaded ejecuta el codigo cuando el DOM esta listo

//forEach porque son 2 botones dentro de $genBtn
$genBtn.forEach((btn) => {
  btn.addEventListener("click", () => cargarDatosYMostrar("/api/data?"));
});

//Funcionalidad de los filtros
$breedSelect.addEventListener("change", (event) => {
  const val = event.target.value;
  const filtros = filtrarBusqueda(FILTERS.RAZA, val);
  const queryString = new URLSearchParams(filtros).toString();
  const url = `/api/data.js?${queryString}`;

  cargarDatosYMostrar(url);
});
$orderSelect.addEventListener("change", (event) => {
  const val = event.target.value;
  const filtros = filtrarBusqueda(FILTERS.ORDE, val);
  console.log(filtros);
  const queryString = new URLSearchParams(filtros).toString();
  console.log(queryString);

  const url = `/api/data.js?${queryString}`;

  console.log(url);

  cargarDatosYMostrar(url);
});

//crear articles para la info
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
        <p id="info">&rarr; More info <a href="${el.breeds[0].wikipedia_url} " target="_blank">here</a></p>
      </div>
      `;
    $dataCont.appendChild(article);
  });
}

//trae datos, y los muestra en el index
async function cargarDatosYMostrar(url = "/api/data.js") {
  //con este parametro /api/data va a ser la url default / si le paso otra usa la nueva
  try {
    $errorCont.classList.add("hidden");
    $errorCont.innerHTML = "";
    $loader.classList.remove("hidden"); //Mostrar loader
    $dataCont.innerHTML = "";
    const data = await traerDatos(url);
    console.log(data);

    llenarContainer(data);
  } catch (error) {
    $errorCont.classList.remove("hidden");
    mensajeError($errorCont);
    console.error("Error al traer datos", error);
  } finally {
    $loader.classList.add("hidden"); //Esconder loader una vez llegan los datos
  }
}

//Cargar filter
async function cargarFiltroRaza() {
  try {
    const data = await traerDatos(all_breeds_data);

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
