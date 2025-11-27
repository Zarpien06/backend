const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();

// ---------------------------
// CONFIGURACIONES
// ---------------------------
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = "https://frontend-5max.onrender.com";

// Middleware seguridad
app.use(helmet());

// Middleware CORS
app.use(cors({ origin: FRONTEND_URL }));

// Middleware para parsear JSON
app.use(express.json());

// Limite de peticiones (5 por segundo por IP)
const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: { success: false, message: "Demasiadas solicitudes. Intenta más tarde." }
});
app.use(limiter);

// Logger mejorado
app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`\x1b[36m[${time}]\x1b[0m \x1b[33m${req.method}\x1b[0m ${req.url}`);
  next();
});

// ---------------------------
// RUTAS
// ---------------------------

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ success: true, message: "API EduMultiPro conectada exitosamente 🎉" });
});

// Ruta status
app.get("/status", (req, res) => {
  res.json({ success: true, data: { status: "ok", timestamp: Date.now() } });
});

// Ruta info de EduMultiPro
app.get("/info", (req, res) => {
  res.json({
    success: true,
    data: {
      name: "EduMultiPro",
      version: "1.0.0",
      description: "API oficial para la plataforma EduMultiPro",
      author: "Tu Nombre o Equipo",
    },
  });
});

// Datos simulados de usuarios
const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@edumultipro.com" },
  { id: 2, nombre: "Luis", email: "luis@edumultipro.com" },
];

// Listar usuarios
app.get("/users", (req, res) => {
  res.json({ success: true, data: usuarios });
});

// Crear usuario
app.post("/users", (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    return res.status(400).json({
      success: false,
      message: "Faltan campos: nombre y email son requeridos."
    });
  }

  const nuevoUsuario = { id: usuarios.length + 1, nombre, email };
  usuarios.push(nuevoUsuario);

  res.status(201).json({ success: true, data: nuevoUsuario, message: "Usuario creado correctamente ✅" });
});

// ---------------------------
// MANEJO DE ERRORES
// ---------------------------

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Ruta no encontrada" });
});

// Errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

// ---------------------------
// INICIO DEL SERVIDOR
// ---------------------------
app.listen(PORT, () => {
  console.log(`\x1b[32mServidor EduMultiPro funcionando en puerto ${PORT} 🚀\x1b[0m`);
});

