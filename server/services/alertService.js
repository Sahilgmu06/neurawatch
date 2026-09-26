import MonitoringLog from "../models/MonitoringLog.js";

const evaluateAlerts = async (metrics) => {
  const alerts = [];

  const evaluateMetric = ({
    resource,
    value,
    threshold,
  }) => {
    if (value > threshold) {
      alerts.push({
        type: "THRESHOLD_VIOLATION",
        severity: "CRITICAL",
        resource,
        message: `${resource} usage exceeded ${threshold}%`,
        value,
        threshold,
      });
    }
  };

  evaluateMetric({
    resource: "CPU",
    value: metrics.cpu.usage,
    threshold: 85,
  });

  evaluateMetric({
    resource: "MEMORY",
    value: metrics.memory.usage,
    threshold: 80,
  });

  evaluateMetric({
    resource: "DISK",
    value: metrics.disk.usage,
    threshold: 90,
  });

  for (const alert of alerts) {
    await MonitoringLog.create(alert);
  }

  return alerts;
};

export default evaluateAlerts;