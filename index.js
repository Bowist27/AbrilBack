const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Recommended CORS configuration
const corsOptions = {
  // Replace '*' with your exact frontend domain
  origin: process.env.FRONTEND_URL || "https://front.romytony.uk/", 
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Additional security middleware
app.disable('x-powered-by'); // Hide Express server information
app.use(express.json({
  limit: '10kb' // Prevent large payload attacks
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === 'production' ? {} : err.message 
  });
});

// Login route with basic error handling
app.post("/login", (req, res) => {
  try {
    console.log("Login attempt from frontend");
    res.json({ message: "Successfully reached backend" });
  } catch (error) {
    res.status(500).json({ message: "Login process failed" });
  }
});

// Start server with error handling
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});