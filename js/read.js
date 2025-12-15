"use strict";

function textoCorto(texto, max) {
    if (!texto) return "";
    return texto.length > max ? texto.slice(0, max) + "..." : texto;
}

function clasePrioridad(p) {
    if (p === "Alta") return "prio-alta";
    if (p === "Media") return "prio-media";
    return "prio-baja";
}

function claseEstado(e) {
    if (e === "completada") return "estado-completada";
    if (e === "vencida") return "estado-vencida";
    return "estado-pendiente";
}

function aplicarFiltros() {
    const texto = document.getElementById("busqueda").value.toLowerCase().trim();
    const materiaFiltro = document.getElementById("filtroMateria").value.toLowerCase().trim();
    const prioridadFiltro = document.getElementById("filtroPrioridad").value;

    return tareas.filter(t => {
        const coincideTexto =
            t.titulo.toLowerCase().includes(texto) ||
            t.descripcion.toLowerCase().includes(texto) ||
            t.materia.toLowerCase().includes(texto);

        const coincideMateria =
            !materiaFiltro || t.materia.toLowerCase().includes(materiaFiltro);

        const coincidePrioridad =
            !prioridadFiltro || t.prioridad === prioridadFiltro;

        return coincideTexto && coincideMateria && coincidePrioridad;
    });
}

function crearCard(tarea) {
    const estado = obtenerEstado(tarea);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="card-title">${tarea.titulo}</div>

        <div class="chips">
            <span class="chip ${clasePrioridad(tarea.prioridad)}">${tarea.prioridad}</span>
            <span class="chip">${tarea.materia}</span>
            <span class="chip ${claseEstado(estado)}">${estado}</span>
        </div>

        <div class="card-desc" id="desc_${tarea.id}">
            ${textoCorto(tarea.descripcion, 120)}
        </div>

        <button type="button" class="ver-mas"
            data-action="vermas" data-id="${tarea.id}">
            Ver más
        </button>

        <div class="card-actions">
            <button type="button" class="btn-small btn-completar"
                data-action="completar" data-id="${tarea.id}">
                Completar
            </button>

            <button type="button" class="btn-small btn-editar"
                data-action="editar" data-id="${tarea.id}">
                Editar
            </button>

            <button type="button" class="btn-small btn-eliminar"
                data-action="eliminar" data-id="${tarea.id}">
                Eliminar
            </button>
        </div>
    `;

    if (estado === "completada") {
        const btn = card.querySelector(".btn-completar");
        if (btn) btn.style.display = "none";
    }

    return card;
}

function renderTareas(quickEstado) {
    const colPendiente = document.getElementById("colPendiente");
    const colCompletada = document.getElementById("colCompletada");
    const colVencida = document.getElementById("colVencida");

    colPendiente.innerHTML = "";
    colCompletada.innerHTML = "";
    colVencida.innerHTML = "";

    let cP = 0, cC = 0, cV = 0;

    const lista = aplicarFiltros();

    lista.forEach(tarea => {
        const estado = obtenerEstado(tarea);

        if (estado === "pendiente") cP++;
        else if (estado === "completada") cC++;
        else cV++;

        if (quickEstado && estado !== quickEstado) return;

        const card = crearCard(tarea);

        if (estado === "pendiente") colPendiente.appendChild(card);
        else if (estado === "completada") colCompletada.appendChild(card);
        else colVencida.appendChild(card);
    });

    document.getElementById("countPendiente").textContent = `(${cP})`;
    document.getElementById("countCompletada").textContent = `(${cC})`;
    document.getElementById("countVencida").textContent = `(${cV})`;
}