# 📋 TaskMaster – Sistema de Gestión de Tareas 

Proyecto académico desarrollado con **HTML, CSS y JavaScript**, que implementa un sistema de gestión de tareas con un CRUD completo (Crear, Leer, Editar y Eliminar), utilizando **JSON** y **localStorage** para la persistencia de datos.

<img width="1365" height="680" alt="image" src="https://github.com/user-attachments/assets/33c60224-06fc-4d2e-9a18-204f944a9973" />

---

### 📄 Descripción de los archivos

- **index.html**  
  Contiene la estructura principal de la aplicación (menú, columnas, tarjetas y formulario).

- **estilos.css**  
  Contiene todo el diseño visual del sistema (colores, tarjetas, botones y diseño responsive).

- **data.js**  
  Maneja la carga y guardado de las tareas usando `localStorage`.

- **create.js**  
  Se encarga de crear nuevas tareas.

- **read.js**  
  Se encarga de mostrar las tareas en forma de tarjetas.

- **update.js**  
  Permite editar tareas existentes y marcarlas como completadas.

- **delete.js**  
  Permite eliminar tareas del sistema.

- **main.js**  
  Controla el formulario, los filtros, el modal y los eventos generales de la aplicación.

---

## 📦 Estructura del JSON

Las tareas se almacenan como un **arreglo de objetos JSON** dentro del `localStorage`.

### 📌 Ejemplo de una tarea guardada

```json
[
  {
    "id": "1700000000000",
    "fechaEntrega": "2025-10-20",
    "materia": "Matemáticas",
    "prioridad": "Alta",
    "titulo": "Resolver guía",
    "descripcion": "Completar los ejercicios del capítulo 3",
    "completada": false
  }
]
```

<img width="368" height="167" alt="image" src="https://github.com/user-attachments/assets/0184942c-5827-44c6-953c-8a99bf6db0f1" />


## ▶️ Cómo arrancar la aplicación

Esta aplicación **NO necesita instalación**, **NO necesita servidor** y **NO usa bases de datos externas**.  
Funciona directamente desde el navegador web.

---

## 💻 Ejecutar la app localmente (en tu computadora)

1. Entra al repositorio del proyecto en GitHub:
   
https://github.com/YandellCM/SistemaTareas/

2. Descarga el proyecto usando el botón **Code → Download ZIP**  
   o clónalo si usas Git.

3. Descomprime la carpeta (si descargaste el ZIP).

4. Abre la carpeta del proyecto en tu computadora.

5. Busca el archivo llamado **index.html**.

6. Haz **doble clic** sobre `index.html`.

7. El navegador se abrirá automáticamente y la aplicación comenzará a funcionar.

✔️ Las tareas se guardan automáticamente en el navegador usando **localStorage**.

---

## 🌐 Ejecutar la app desde GitHub Pages

GitHub Pages permite usar la aplicación directamente desde internet, sin descargar nada.

### Pasos para activarlo:

1. Entra al repositorio:
   
   https://github.com/YandellCM/SistemaTareas/

2. Haz clic en la pestaña **Settings**.

3. En el menú de la izquierda, selecciona **Pages**.

4. En la sección **Source**, selecciona:
   - **Branch:** `main`
   - **Folder:** `/root`

5. Guarda los cambios.

GitHub generará automáticamente un enlace público como este:

https://yandellcm.github.io/SistemaTareas/

6. Abre ese enlace en el navegador y la aplicación funcionará igual que en local.

---

## 📌 Nota importante

- Las tareas se guardan en el navegador del usuario.
- Si se borra el almacenamiento del navegador, las tareas se eliminan.
- Cada navegador mantiene sus propios datos.



