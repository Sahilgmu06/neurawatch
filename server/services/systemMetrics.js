import si from "systeminformation";

const getSystemMetrics = async () => {
  const [
    cpuLoad,
    memory,
    disk,
    networkStats,
    time,
  ] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.time(),
  ]);

  const primaryDisk = disk[0] || {};
  const primaryNetwork = networkStats[0] || {};

  return {
    timestamp: new Date().toISOString(),

    cpu: {
      usage: Number(cpuLoad.currentLoad.toFixed(2)),
      cores: cpuLoad.cpus?.length || 0,
    },

    memory: {
      usage: Number(
        ((memory.used / memory.total) * 100).toFixed(2)
      ),
      total: memory.total,
      used: memory.used,
      available: memory.available,
    },

    disk: {
      usage: Number(primaryDisk.use?.toFixed(2) || 0),
      total: primaryDisk.size || 0,
      used: primaryDisk.used || 0,
      available:
        (primaryDisk.size || 0) -
        (primaryDisk.used || 0),
    },

    network: {
      interface: primaryNetwork.iface || "unknown",
      rxBytes: primaryNetwork.rx_bytes || 0,
      txBytes: primaryNetwork.tx_bytes || 0,
    },

    uptime: time.uptime,
  };
};

export default getSystemMetrics;