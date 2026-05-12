import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { helloRouter } from "./routes/hello.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS — allow frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api", helloRouter);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});
