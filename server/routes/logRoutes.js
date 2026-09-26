import express from "express";

import {
  getMonitoringLogs,
} from "../controllers/logController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMonitoringLogs);

export default router;