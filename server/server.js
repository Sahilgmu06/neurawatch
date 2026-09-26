import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import telemetryRoutes from "./routes/telemetryRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import apmRoutes from "./routes/apmRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import startTelemetryScheduler from "./services/telemetryScheduler.js";
import getSystemMetrics from "./services/systemMetrics.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "NeuraWatch backend is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/metrics", telemetryRoutes);
app.use("/api/server", serverRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/apm", apmRoutes);
app.use("/api/analytics", analyticsRoutes);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const startRealtimeMonitoring = () => {
  setInterval(async () => {
    try {
      const metrics = await getSystemMetrics();
      io.emit("metrics:update", metrics);
    } catch (error) {
      console.error(
        "Real-time monitoring error:",
        error.message
      );
    }
  }, 5000);
};

const startServer = async () => {
  await connectDB();

  startTelemetryScheduler();
  startRealtimeMonitoring();

  server.listen(PORT, "0.0.0.0", () => {
    console.log(
      `NeuraWatch backend running on port ${PORT}`
    );
    console.log(
      `CORS/Socket.IO frontend origin: ${FRONTEND_URL}`
    );
    console.log(
      "Socket.IO real-time monitoring started"
    );
  });
};

startServer();