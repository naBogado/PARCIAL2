//Funcion para mostrar mensaje cuando hay error en el fetch
export function mensajeError(container) {
  container.innerHTML = "";
  const mssg = document.createElement("h4");
  mssg.innerText = "Error loading data. Try again.";
  container.appendChild(mssg);
}
