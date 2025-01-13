const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Array de usuarios 
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Ruta para obtener un usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(u => u.nombre === req.params.nombre);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Ruta para crear un nuevo usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = req.body;
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Ruta para actualizar un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    const usuarioIndex = usuarios.findIndex(u => u.nombre === nombre);
    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...req.body };
        res.json(usuarios[usuarioIndex]);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Ruta para eliminar un usuario por nombre
app.delete('/usuarios/:nombre', (req, res) => {
    const { nombre } = req.params;
    usuarios = usuarios.filter(u => u.nombre !== nombre);
    res.json({ message: 'Usuario eliminado' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});