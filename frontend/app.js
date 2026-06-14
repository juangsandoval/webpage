// Cambia esta URL por la URL real de tu backend en Render.
// Ejemplo:
// const API_URL = "https://suma-backend.onrender.com/api/sumar";

const API_URL = "https://TU-SERVICIO-EN-RENDER.onrender.com/api/sumar";

const formulario = document.getElementById("formulario");
const resultadoDiv = document.getElementById("resultado");

formulario.addEventListener("submit", async function (evento) {
  evento.preventDefault();

  const numero1 = document.getElementById("numero1").value;
  const numero2 = document.getElementById("numero2").value;

  resultadoDiv.textContent = "Calculando...";

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        a: numero1,
        b: numero2
      })
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      resultadoDiv.textContent = datos.error || "Ocurrió un error";
      return;
    }

    resultadoDiv.textContent = `Resultado: ${datos.resultado}`;

  } catch (error) {
    console.error(error);
    resultadoDiv.textContent = "No se pudo conectar con el backend";
  }
});
