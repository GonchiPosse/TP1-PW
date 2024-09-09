const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON en los requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio (Overview.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Overview.html'));
});

// Ruta para obtener los alumnos
app.get('/api/alumnos', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'students.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo de alumnos' });
        }
        const students = JSON.parse(data || '[]');
        res.json(students);
    });
});

// Ruta para agregar un nuevo alumno
app.post('/api/alumnos', (req, res) => {
    const newStudent = {
        legajo: Math.floor(Math.random() * 10000),
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };

    const filePath = path.join(__dirname, 'data', 'students.json');

    // Leer los alumnos existentes y agregar el nuevo
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Error al leer el archivo de alumnos' });
        }

        const students = JSON.parse(data || '[]');
        students.push(newStudent);

        // Guardar la lista actualizada en el archivo JSON
        fs.writeFile(filePath, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al guardar el nuevo alumno' });
            }
            res.status(201).json({ message: 'Alumno agregado con éxito', student: newStudent });
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
