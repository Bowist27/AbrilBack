const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware específico para OPTIONS
app.options('*', cors());

// Configuración CORS más explícita
app.use(cors({
  origin: "https://www.front.romytony.uk", // Especifica el origen exacto en vez de "*"
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());

app.post("/login", (req, res) => {
  console.log("Se hizo clic en el botón de Iniciar sesión desde el frontend");
  res.json({ message: "Tilin si llego a backend" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});