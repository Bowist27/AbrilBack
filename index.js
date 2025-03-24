const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Specific CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // List of allowed origins
    const allowedOrigins = [
      'https://front.romytony.uk',
      'https://backabril.romytony.uk'
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Specific OPTIONS handler for all routes
app.options('*', cors(corsOptions));

app.use(express.json({
  limit: '10kb' // Prevent large payload attacks
}));

// Logging middleware to help diagnose CORS issues
app.use((req, res, next) => {
  console.log('Incoming request:');
  console.log('Origin:', req.get('origin'));
  console.log('Host:', req.get('host'));
  next();
});

app.post("/login", (req, res) => {
  console.log("Login attempt received");
  res.set('Access-Control-Allow-Origin', 'https://front.romytony.uk');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.json({ message: "Successfully reached backend" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('CORS Error:', err);
  res.status(403).json({ 
    message: "CORS error", 
    error: err.message 
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});