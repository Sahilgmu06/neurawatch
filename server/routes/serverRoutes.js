import express from "express";

import {
  getServerStatus,
} from "../controllers/telemetryController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/status", protect, getServerStatus);

export default router;