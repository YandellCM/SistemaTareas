"use strict";

function actualizarTarea(id, datos) {
    for (let i = 0; i < tareas.length; i++) {
        if (String(tareas[i].id) === String(id)) {
            tareas[i].fechaEntrega = datos.fechaEntrega;
            tareas[i].materia = datos.materia;
            tareas[i].prioridad = datos.prioridad;
            tareas[i].titulo = datos.titulo;
            tareas[i].descripcion = datos.descripcion;
            guardarTareas();
            return true;
        }
    }
    return false;
}

function marcarCompletada(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (String(tareas[i].id) === String(id)) {
            tareas[i].completada = true;
            guardarTareas();
            return true;
        }
    }
    return false;
}

