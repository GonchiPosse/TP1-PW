document.addEventListener("DOMContentLoaded", function () {
    // Función para obtener alumnos del localStorage
    function obtenerAlumnos() {
        let alumnos = localStorage.getItem("alumnos");
        if (alumnos) {
            return JSON.parse(alumnos);
        } else {
            return [];
        }
    }

    // Función para guardar alumnos en localStorage
    function guardarAlumnos(alumnos) {
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
    }

    // Mostrar alumnos en la tabla
    function mostrarAlumnos() {
        const alumnos = obtenerAlumnos();
        const tbody = document.getElementById("alumnoTableBody");
        tbody.innerHTML = ''; // Limpiar la tabla
        alumnos.forEach(alumno => {
            let tr = document.createElement("tr");
            tr.innerHTML = '<td>${alumno.legajo}</td><td>${alumno.nombre}</td><td>${alumno.apellido}</td>';
            tbody.appendChild(tr);
        });
    }

    // Buscar alumnos
    document.getElementById("searchInput")?.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const alumnos = obtenerAlumnos();
        const tbody = document.getElementById("alumnoTableBody");
        tbody.innerHTML = ''; // Limpiar la tabla
        alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(searchText) || alumno.apellido.toLowerCase().includes(searchText))
            .forEach(alumno => {
                let tr = document.createElement("tr");
                tr.innerHTML = '<td>${alumno.legajo}</td><td>${alumno.nombre}</td><td>${alumno.apellido}</td>';
                tbody.appendChild(tr);
            });
    });

    // Procesar formulario de alta de alumno
    document.getElementById("alumnoForm")?.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;

        if (nombre && apellido) {
            const alumnos = obtenerAlumnos();
            const legajo = alumnos.length + 1; // Generar legajo único
            const nuevoAlumno = { legajo, nombre, apellido };
            alumnos.push(nuevoAlumno);
            guardarAlumnos(alumnos);
            alert("Alumno agregado con éxito");
            window.location.href = "alumnos.html"; // Redirigir a la lista
        }
    });

    // Mostrar alumnos si estamos en la página de alumnos
    if (document.getElementById("alumnoTableBody")) {
        mostrarAlumnos();
    }
});