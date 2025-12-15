"use strict";

function actualizarTarea(id, datos) {
    for (let i = 0; i < tareas.length; i++) {
        if (String(tareas[i].id) === String(id)) {
            tareas[i] = { ...tareas[i], ...datos };
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
