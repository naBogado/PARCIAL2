import { traerDatos } from "./getData";
import { cat_facts_api, generarUrlImagen } from "./config";
import "./facts.css";
import { mensajeError } from "./errorMessage";

const $genFactBtn = document.getElementById("genFact");
const $factCont = document.querySelector(".fact-container");
const $loader1 = document.querySelector(".loader1");
const $loader2 = document.querySelector(".loader2");
const $imgCont = document.querySelector(".img");
const $genImageBtn = document.querySelector("#genImage");
const $textareaText = document.getElementById("text-inp");
const $errorCont1 = document.querySelector(".err-msg1");
const $errorCont2 = document.querySelector(".err-msg2");

//Funcionalidad de los botones
$genFactBtn.addEventListener("click", cargarFactYMostrar);

$genImageBtn.addEventListener("click", () => {
  const texto = $textareaText.value;
  generarImagenyMostrar(texto);
});

//Mostrar una imagen cuando carga la pagina asi no está tan vacía
document.addEventListener("DOMContentLoaded", async () => {
  const imagen = await traerDatos("/api/data.js");
  const article = document.createElement("article");
  article.innerHTML = `
        <img src="${imagen[0].url}" alt="${imagen[0].id}" />
    `;
  $factCont.appendChild(article);
});

function llenarFactContainer(imag, fact) {
  $factCont.innerHTML = "";
  const article = document.createElement("article");
  article.innerHTML = `
        <h3>${fact.data}</h3>
        <img src="${imag[0].url}" alt="${imag[0].id}" />
    `;
  $factCont.appendChild(article);
}

async function cargarFactYMostrar() {
  try {
    $loader1.classList.remove("hidden"); //Mostrar loader
    $factCont.innerHTML = "";
    //desestructurizo el objeto que me trae
    const { fact, imag } = await crearFact();
    llenarFactContainer(imag, fact);
  } catch (error) {
    mensajeError($errorCont1);
    console.error("Error al traer datos", error);
  } finally {
    $loader1.classList.add("hidden"); //Esconder loader una vez llegan los datos
  }
}

//Genera el fact junto con la imagen
async function crearFact() {
  const imag = await traerDatos("/api/data.js");
  const fact = await traerDatos(cat_facts_api);
  return { imag, fact };
}

//Genera url y la añade al html
async function generarImagenyMostrar(texto) {
  try {
    $imgCont.innerHTML = "";
    $loader2.classList.remove("hidden"); //Mostrar loader
    const imagUrl = await generarUrlImagen(texto); //me trae link de una imagen
    $imgCont.innerHTML = `
    <img src="${imagUrl}" alt="Cat image generated">
    `;
  } catch (error) {
    mensajeError($errorCont2);
    console.error("Error al traer datos", error);
  } finally {
    $loader2.classList.add("hidden"); //Esconder loader una vez llegan los datos
  }
}
