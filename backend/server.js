import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leads.routes.js";

dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.VITE_APP_BASE_URL];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
connectDB();

app.use("/api/leads", leadRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
