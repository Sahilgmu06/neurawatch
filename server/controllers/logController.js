import MonitoringLog from "../models/MonitoringLog.js";

export const getMonitoringLogs = async (req, res) => {
  try {
    const { type, severity, resource, limit = 100 } = req.query;

    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (severity) {
      filter.severity = severity;
    }

    if (resource) {
      filter.resource = resource;
    }

    const logs = await MonitoringLog.find(filter)
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .lean();

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Monitoring logs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve monitoring logs",
    });
  }
};