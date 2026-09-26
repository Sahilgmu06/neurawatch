import getSystemMetrics from "../services/systemMetrics.js";
import Telemetry from "../models/Telemetry.js";

export const getCurrentMetrics = async (req, res) => {
  try {
    const metrics = await getSystemMetrics();

    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("Current metrics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to collect current system metrics",
    });
  }
};

export const getHistoricalMetrics = async (req, res) => {
  try {
    const { range = "24h" } = req.query;

    const rangeMap = {
      "1h": 60 * 60 * 1000,
      "6h": 6 * 60 * 60 * 1000,
      "12h": 12 * 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };

    const duration = rangeMap[range] || rangeMap["24h"];

    const startTime = new Date(Date.now() - duration);

    const metrics = await Telemetry.find({
      timestamp: {
        $gte: startTime,
      },
    })
      .sort({ timestamp: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      range,
      count: metrics.length,
      data: metrics,
    });
  } catch (error) {
    console.error("Historical metrics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch historical metrics",
    });
  }
};
export const getServerStatus = async (req, res) => {
  try {
    const metrics = await getSystemMetrics();

    const cpuUsage = metrics.cpu.usage;
    const memoryUsage = metrics.memory.usage;
    const diskUsage = metrics.disk.usage;

    let status = "Healthy";

    if (
      cpuUsage > 85 ||
      memoryUsage > 80 ||
      diskUsage > 90
    ) {
      status = "Critical";
    } else if (
      cpuUsage > 70 ||
      memoryUsage > 70 ||
      diskUsage > 80
    ) {
      status = "Warning";
    }

    return res.status(200).json({
      success: true,
      data: {
        status,
        uptime: metrics.uptime,
        timestamp: metrics.timestamp,
        cpu: cpuUsage,
        memory: memoryUsage,
        disk: diskUsage,
      },
    });
  } catch (error) {
    console.error("Server status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve server status",
    });
  }
};