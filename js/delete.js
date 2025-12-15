"use strict";

function eliminarTarea(id) {
    const nuevas = [];
    for (let i = 0; i < tareas.length; i++) {
        console.log(tareas[i]);
        if (tareas[i].id !== id) nuevas.unshift(tareas[i]);
    }
    tareas = nuevas;
    guardarTareas();
}

