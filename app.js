document.addEventListener("DOMContentLoaded", function () {
    let rowsPerPage = 5; // Número de alumnos por página por defecto
    let currentPage = 1;   // Página actual

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

    // Función para cambiar la cantidad de filas por página
    function cambiarFilasPorPagina() {
        const select = document.getElementById("filasPorPagina");
        rowsPerPage = parseInt(select.value); // Cambia el valor de filas por página
        currentPage = 1;  // Reseteamos a la primera página para evitar errores
        mostrarAlumnos(); // Llamamos a mostrar alumnos con el nuevo valor
    }

    // Función para mostrar los botones de paginación
    function mostrarPaginacion(totalAlumnos) {
        const totalPages = Math.ceil(totalAlumnos / rowsPerPage);
        const paginacionDiv = document.getElementById("paginacion");
        paginacionDiv.innerHTML = ''; // Limpiar la paginación

        for (let i = 1; i <= totalPages; i++) {
            let button = document.createElement("button");
            button.innerText = i;
            button.classList.add("page-btn");
            if (i === currentPage) {
                button.classList.add("active");
            }
            button.addEventListener("click", function () {
                currentPage = i;
                mostrarAlumnos();
            });
            paginacionDiv.appendChild(button);
        }
    }

    // Mostrar alumnos en la tabla con paginación
    function mostrarAlumnos() {
        const alumnos = obtenerAlumnos();
        const tbody = document.getElementById("alumnoTableBody");
        tbody.innerHTML = ''; // Limpiar la tabla

        // Calcular el rango de alumnos para mostrar
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const alumnosPagina = alumnos.slice(start, end);

        alumnosPagina.forEach(alumno => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${alumno.legajo}</td><td>${alumno.nombre}</td><td>${alumno.apellido}</td>`;
            tbody.appendChild(tr);
        });

        // Actualizar botones de paginación
        mostrarPaginacion(alumnos.length);
    }

    // Buscar alumnos y aplicar paginación
    document.getElementById("searchInput")?.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        const alumnos = obtenerAlumnos();
        const tbody = document.getElementById("alumnoTableBody");
        tbody.innerHTML = ''; // Limpiar la tabla
        const alumnosFiltrados = alumnos.filter(alumno => 
            alumno.nombre.toLowerCase().includes(searchText) || alumno.apellido.toLowerCase().includes(searchText)
        );

        // Calcular el rango de alumnos para mostrar en búsqueda
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const alumnosPagina = alumnosFiltrados.slice(start, end);

        alumnosPagina.forEach(alumno => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${alumno.legajo}</td><td>${alumno.nombre}</td><td>${alumno.apellido}</td>`;
            tbody.appendChild(tr);
        });

        // Actualizar paginación de búsqueda
        mostrarPaginacion(alumnosFiltrados.length);
    });

    // Procesar formulario de alta de alumno
    document.getElementById("alumnoForm")?.addEventListener("submit", function (e) {
        e.preventDefault();  // Evitar que el formulario haga un submit normal y recargue la página
        
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();

        if (nombre && apellido) {
            const alumnos = obtenerAlumnos();
            const legajo = alumnos.length + 1; // Generar legajo único
            const nuevoAlumno = { legajo, nombre, apellido };
            alumnos.push(nuevoAlumno);
            guardarAlumnos(alumnos);

            alert("Alumno agregado con éxito");

            // Resetear a la primera página y mostrar los alumnos
            currentPage = 1;
            mostrarAlumnos();

            // Limpiar campos del formulario
            document.getElementById("nombre").value = '';
            document.getElementById("apellido").value = '';
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });

    // Mostrar alumnos si estamos en la página de alumnos
    if (document.getElementById("alumnoTableBody")) {
        mostrarAlumnos();
    }

    // Hacer que la función esté disponible globalmente
    window.cambiarFilasPorPagina = cambiarFilasPorPagina;
});