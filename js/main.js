"use strict";

let quickFiltroEstado = "";

const fecha = document.getElementById("fecha");
const materia = document.getElementById("materia");
const prioridad = document.getElementById("prioridad");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const editIdInput = document.getElementById("editId");
const mensaje = document.getElementById("mensaje");

function abrirModal(modo, tarea) {
  const modal = document.getElementById("modal");
  const tituloModal = document.getElementById("modalTitulo");
  const form = document.getElementById("formTarea");

  mensaje.textContent = "";

  if (modo === "editar" && tarea) {
    tituloModal.textContent = "Editar tarea";
    editIdInput.value = String(tarea.id);
    fecha.value = tarea.fechaEntrega || "";
    materia.value = tarea.materia || "";
    prioridad.value = tarea.prioridad || "";
    titulo.value = tarea.titulo || "";
    descripcion.value = tarea.descripcion || "";
  } else {
    tituloModal.textContent = "Nueva tarea";
    editIdInput.value = "";
    form.reset();
  }

  modal.classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("modal").classList.add("hidden");
  mensaje.textContent = "";
}

function validarCampos(datos) {
  if (!datos.fechaEntrega) return "La fecha es obligatoria.";
  if (!datos.materia) return "La materia es obligatoria.";
  if (!datos.prioridad) return "La prioridad es obligatoria.";
  if (!datos.titulo) return "El título es obligatorio.";
  if (!datos.descripcion) return "La descripción es obligatoria.";
  return "";
}

document.addEventListener("DOMContentLoaded", function () {
  cargarTareas();
  renderTareas("");

  const btnAbrirModal = document.getElementById("btnAbrirModal");
  const btnAbrirModalMobile = document.getElementById("btnAbrirModalMobile");

  if (btnAbrirModal) btnAbrirModal.addEventListener("click", () => abrirModal("crear"));
  if (btnAbrirModalMobile) btnAbrirModalMobile.addEventListener("click", () => abrirModal("crear"));

  const btnCerrar = document.getElementById("btnCerrarModal");
  const btnCancelar = document.getElementById("btnCancelar");
  if (btnCerrar) btnCerrar.addEventListener("click", cerrarModal);
  if (btnCancelar) btnCancelar.addEventListener("click", cerrarModal);

  const busqueda = document.getElementById("busqueda");
  const filtroPrioridad = document.getElementById("filtroPrioridad");
  const filtroMateria = document.getElementById("filtroMateria");
  const ordenar = document.getElementById("ordenar");

  if (busqueda) busqueda.addEventListener("input", () => renderTareas(quickFiltroEstado));
  if (filtroPrioridad) filtroPrioridad.addEventListener("change", () => renderTareas(quickFiltroEstado));
  if (filtroMateria) filtroMateria.addEventListener("input", () => renderTareas(quickFiltroEstado));
  if (ordenar) ordenar.addEventListener("change", () => renderTareas(quickFiltroEstado));

  document.querySelectorAll("[data-quick]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const estado = this.dataset.quick;
      const activo = this.classList.toggle("activo");
      quickFiltroEstado = activo ? estado : "";
      renderTareas(quickFiltroEstado);
    });
  });

  const form = document.getElementById("formTarea");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const datos = {
        fechaEntrega: fecha.value.trim(),
        materia: materia.value.trim(),
        prioridad: prioridad.value.trim(),
        titulo: titulo.value.trim(),
        descripcion: descripcion.value.trim(),
      };

      const error = validarCampos(datos);
      if (error) {
        mensaje.textContent = error;
        return;
      }

      if (editIdInput.value) {
        actualizarTarea(editIdInput.value, datos);
      } else {
        crearTarea({
          id: generarId(),
          ...datos,
          completada: false,
        });
      }

      cerrarModal();
      renderTareas(quickFiltroEstado);
    });
  }
});

document.addEventListener("click", function (e) {
  const btnAccion = e.target.closest("button[data-action]");
  if (btnAccion) {
    const accion = btnAccion.dataset.action;
    const id = btnAccion.dataset.id;

    if (accion === "vermas") {
      const desc = document.getElementById("desc_" + id);
      if (!desc) return;
      desc.classList.toggle("expandida");
      btnAccion.textContent = desc.classList.contains("expandida") ? "Ver menos" : "Ver más";
      return;
    }

    if (accion === "editar") {
      const tarea = tareas.find((t) => String(t.id) === String(id));
      if (tarea) abrirModal("editar", tarea);
      return;
    }

    if (accion === "eliminar") {
      if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
      eliminarTarea(id);
      renderTareas(quickFiltroEstado);
      return;
    }

    if (accion === "completar") {
      marcarCompletada(id);
      renderTareas(quickFiltroEstado);
      return;
    }
  }

  const btnCol = e.target.closest(".column-header .btn.icon");
  if (btnCol) {
    const columna = btnCol.closest(".column");
    if (!columna) return;
    const body = columna.querySelector(".column-body");
    if (!body) return;
    body.classList.toggle("hidden");
  }
});
