"use strict";

let quickFiltroEstado = "";

function abrirModal(modo, tarea) {
    const modal = document.getElementById("modal");
    const tituloModal = document.getElementById("modalTitulo");
    const mensaje = document.getElementById("mensaje");
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

const fecha = document.getElementById("fecha");
const materia = document.getElementById("materia");
const prioridad = document.getElementById("prioridad");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const editIdInput = document.getElementById("editId");
const mensaje = document.getElementById("mensaje");

document.addEventListener("DOMContentLoaded", function () {

    cargarTareas();
    renderTareas("");

    document.getElementById("btnAbrirModal").addEventListener("click", () => abrirModal("crear"));
    document.getElementById("btnCerrarModal").addEventListener("click", cerrarModal);
    document.getElementById("btnCancelar").addEventListener("click", cerrarModal);

    document.getElementById("busqueda").addEventListener("input", () => renderTareas(quickFiltroEstado));
    document.getElementById("filtroPrioridad").addEventListener("change", () => renderTareas(quickFiltroEstado));
    document.getElementById("filtroMateria").addEventListener("input", () => renderTareas(quickFiltroEstado));
    document.getElementById("ordenar").addEventListener("change", () => renderTareas(quickFiltroEstado));

    document.getElementById("formTarea").addEventListener("submit", function (e) {
        e.preventDefault();

        const datos = {
            fechaEntrega: fecha.value.trim(),
            materia: materia.value.trim(),
            prioridad: prioridad.value.trim(),
            titulo: titulo.value.trim(),
            descripcion: descripcion.value.trim()
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
                completada: false
            });
        }

        cerrarModal();
        renderTareas(quickFiltroEstado);
    });
});

document.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;

    const accion = btn.dataset.action;
    const id = btn.dataset.id;

    if (accion === "vermas") {
        const desc = document.getElementById("desc_" + id);
        if (!desc) return;

        desc.classList.toggle("expandida");
        btn.textContent = desc.classList.contains("expandida") ? "Ver menos" : "Ver más";
    }

    if (accion === "editar") {
        const tarea = tareas.find(t => String(t.id) === String(id));
        if (tarea) abrirModal("editar", tarea);
    }

    if (accion === "eliminar") {
        if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
        eliminarTarea(id);
        renderTareas(quickFiltroEstado);
    }

    if (accion === "completar") {
        marcarCompletada(id);
        renderTareas(quickFiltroEstado);
    }
});

document.addEventListener("click", function (e) {
    const btn = e.target.closest(".column-header .btn.icon");
    if (!btn) return;

    const columna = btn.closest(".column");
    if (!columna) return;

    const body = columna.querySelector(".column-body");
    if (!body) return;

    body.classList.toggle("hidden");
});