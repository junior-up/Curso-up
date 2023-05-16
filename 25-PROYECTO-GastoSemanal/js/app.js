//variable

const formulario = document.querySelector("#agregar-gasto");
const gasto = document.querySelector("#gastos ul");

//class

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gasto = [];
  }

  nuevoGasto(gasto) {
    this.gasto = [...this.gasto, gasto];
  }
}
class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;
  }

  agregarAlerta(mensaje, tipo) {
    const div = document.createElement("div");
    div.classList.add("text-center", "alert");
    if (tipo === "error") {
      div.classList.add("alert-danger");
    } else {
      div.classList.add("alert-success");
    }
    div.textContent = mensaje;
    document.querySelector(".primario").insertBefore(div, formulario);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  agregarGastoLista(gasto) {
    gasto.forEach((gastos) => {
      const { cantidad, nombre, id } = gasto;
      //crear li
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.ad = id;

      //digital el HTML del gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> ${cantidad}</span>
      `;
      // boton de borrar
      
    });
  }
}

//instance
const ui = new UI();
//Events
eventListener();
function eventListener() {
  document.addEventListener("DOMContentLoaded", preguntaPresupuesto);

  formulario.addEventListener("submit", agregarGasto);
}

let presupuesto;

//function

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

  //instance
  presupuesto = new Presupuesto(presupuestoUsuario);

  ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();

  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);

  if (nombre === "" || cantidad === "") {
    ui.agregarAlerta("No Se Puede Dejar Ningun Campo Vacio", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.agregarAlerta("Cantidad No Valida", "error");
    return;
  }

  const gastos = { nombre, cantidad, id: Date.now() };
  presupuesto.nuevoGasto(gastos);

  //imprimir los gatos
  const { gasto } = presupuesto;
  ui.agregarGastoLista(gasto);

  //mensaje de formulario llenado correctamente
  ui.agregarAlerta("Correcto");

  //reset el formulario
  setTimeout(() => {
    formulario.reset();
  }, 3000);
}
