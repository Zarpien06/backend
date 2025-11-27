const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Logger básico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ message: "API EduMultiPro conectada exitosamente 🎉" });
});

// Ruta status
app.get("/status", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Ruta info
app.get("/info", (req, res) => {
  res.json({
    name: "EduMultiPro",
    version: "1.0.0",
    description: "API oficial para la plataforma EduMultiPro",
    author: "Tu Nombre o Equipo",
  });
});

// Datos simulados de usuarios
const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@edumultipro.com" },
  { id: 2, nombre: "Luis", email: "luis@edumultipro.com" },
];

// Listar usuarios
app.get("/users", (req, res) => {
  res.json(usuarios);
});

// Agregar usuario (POST)
app.post("/users", (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({ error: "Faltan campos: nombre y email son requeridos." });
  }
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor EduMultiPro funcionando en puerto ${port}`);
});
