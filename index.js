const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// More comprehensive CORS configuration
const corsOptions = {
  origin: [
    "https://www.front.romytony.uk",
    "https://asd.romytony.uk",
    "http://localhost:5173"  // Add local development URL if needed
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware with more explicit configuration
app.use(cors(corsOptions));

// Specific OPTIONS handler for all routes
app.options('*', cors(corsOptions));

app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.path} from origin: ${req.get('origin')}`);
  next();
});

app.post("/login", (req, res) => {
  console.log("Login attempt:", req.body);
  res.json({ 
    message: "Login received successfully",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: err.message 
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});