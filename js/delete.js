"use strict";

function eliminarTarea(id) {
    tareas = tareas.filter(t => String(t.id) !== String(id));
    guardarTareas();
}
