const formulario = document.querySelector("#agregar-gasto");
const gasto = document.querySelector("#gastos ul");

eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", preguntaPresupuesto);
}

function preguntaPresupuesto() {
  const presupuestoUsuario = prompt("Cual es tu presupuesto");

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }
}
