import express from "express";

import { getApmStatus } from "../controllers/apmController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/status", protect, getApmStatus);

export default router;