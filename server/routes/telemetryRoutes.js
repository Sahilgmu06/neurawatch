import express from "express";

import {
  getCurrentMetrics,
  getHistoricalMetrics,
} from "../controllers/telemetryController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/current", protect, getCurrentMetrics);

router.get("/history", protect, getHistoricalMetrics);

export default router;