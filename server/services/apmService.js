import getSystemMetrics from "./systemMetrics.js";

const getApmMetrics = async () => {
  const startTime = Date.now();

  try {
    const metrics = await getSystemMetrics();

    const responseTime = Date.now() - startTime;

    let status = "Healthy";

    if (
      metrics.cpu.usage > 85 ||
      metrics.memory.usage > 80 ||
      metrics.disk.usage > 90
    ) {
      status = "Critical";
    } else if (
      metrics.cpu.usage > 70 ||
      metrics.memory.usage > 70 ||
      metrics.disk.usage > 80
    ) {
      status = "Warning";
    }

    return {
      status,
      responseTime,
      serverAvailability: true,
      uptimePercentage: 100,
      timestamp: metrics.timestamp,
    };
  } catch (error) {
    console.error("APM monitoring error:", error);

    return {
      status: "Critical",
      responseTime: null,
      serverAvailability: false,
      uptimePercentage: 0,
      timestamp: new Date().toISOString(),
    };
  }
};

export default getApmMetrics;