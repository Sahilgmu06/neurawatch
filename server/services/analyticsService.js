import Telemetry from "../models/Telemetry.js";

const getDuration = (range) => {
  const durations = {
    daily: 24 * 60 * 60 * 1000,
    weekly: 7 * 24 * 60 * 60 * 1000,
    monthly: 30 * 24 * 60 * 60 * 1000,
  };

  return durations[range] || durations.daily;
};

const getAnalytics = async (range = "daily") => {
  const duration = getDuration(range);

  const startTime = new Date(Date.now() - duration);

  const telemetry = await Telemetry.find({
    timestamp: {
      $gte: startTime,
    },
  })
    .sort({ timestamp: 1 })
    .lean();

  if (telemetry.length === 0) {
    return {
      range,
      count: 0,
      averages: {
        cpu: 0,
        memory: 0,
        disk: 0,
        networkRx: 0,
        networkTx: 0,
      },
      minimums: {
        cpu: 0,
        memory: 0,
        disk: 0,
      },
      maximums: {
        cpu: 0,
        memory: 0,
        disk: 0,
      },
      trends: [],
    };
  }

  const cpuValues = telemetry.map(
    (item) => item.cpu.usage
  );

  const memoryValues = telemetry.map(
    (item) => item.memory.usage
  );

  const diskValues = telemetry.map(
    (item) => item.disk.usage
  );

  const networkRxValues = telemetry.map(
    (item) => item.network.rxBytes
  );

  const networkTxValues = telemetry.map(
    (item) => item.network.txBytes
  );

  const average = (values) =>
    Number(
      (
        values.reduce((sum, value) => sum + value, 0) /
        values.length
      ).toFixed(2)
    );

  const minimum = (values) =>
    Number(Math.min(...values).toFixed(2));

  const maximum = (values) =>
    Number(Math.max(...values).toFixed(2));

  return {
    range,
    count: telemetry.length,

    averages: {
      cpu: average(cpuValues),
      memory: average(memoryValues),
      disk: average(diskValues),
      networkRx: average(networkRxValues),
      networkTx: average(networkTxValues),
    },

    minimums: {
      cpu: minimum(cpuValues),
      memory: minimum(memoryValues),
      disk: minimum(diskValues),
    },

    maximums: {
      cpu: maximum(cpuValues),
      memory: maximum(memoryValues),
      disk: maximum(diskValues),
    },

    trends: telemetry.map((item) => ({
      timestamp: item.timestamp,
      cpu: item.cpu.usage,
      memory: item.memory.usage,
      disk: item.disk.usage,
      networkRx: item.network.rxBytes,
      networkTx: item.network.txBytes,
    })),
  };
};

export default getAnalytics;