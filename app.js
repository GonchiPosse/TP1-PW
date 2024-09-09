document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('add-student-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;

        fetch('/api/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Alumno agregado:', data);
            window.location.href = 'alumno.html';  // Redirigir a la página de alumnos
        })
        .catch(error => console.error('Error al agregar el alumno:', error));
    });

    function loadStudents() {
        fetch('/api/alumnos')
        .then(response => response.json())
        .then(students => {
            const tableBody = document.getElementById('student-table');
            tableBody.innerHTML = '';  // Limpiar la tabla antes de llenarla

            students.forEach(student => {
                const row = `
                    <tr>
                        <td>${student.legajo}</td>
                        <td>${student.nombre}</td>
                        <td>${student.apellido}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error al cargar los alumnos:', error));
    }

    window.onload = loadStudents;
});