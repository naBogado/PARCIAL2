//FUNCION PARA HACER FETCH EN LA API QUE RECIBA (PUBLICA)
export async function traerDatos(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error: ", err);
  }
}
