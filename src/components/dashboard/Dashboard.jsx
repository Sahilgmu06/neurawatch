import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  MemoryStick,
  Network,
  Server,
} from "lucide-react";

import socket from "../../services/socket";
import api from "../../services/api";

import "./Dashboard.css";

const pipelines = [
  {
    name: "Vision Classification",
    model: "ResNet-50",
    status: "RUNNING",
    execution: "00:18:42",
    progress: 74,
  },
  {
    name: "Language Processing",
    model: "Llama 3",
    status: "RUNNING",
    execution: "00:07:31",
    progress: 52,
  },
  {
    name: "Anomaly Detection",
    model: "AutoEncoder-v2",
    status: "IDLE",
    execution: "—",
    progress: 0,
  },
];

const MAX_CHART_POINTS = 12;

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [history, setHistory] = useState([]);

  /*
   * Load current metrics immediately when the dashboard opens.
   */
  useEffect(() => {
    let mounted = true;

    const loadCurrentMetrics = async () => {
      try {
        const response = await api.getCurrentMetrics();

        if (!mounted) return;

        const currentMetrics = response?.data || response;

        setMetrics(currentMetrics);
        setLastUpdated(new Date());

        setHistory((previous) => {
          const next = [
            ...previous,
            {
              timestamp:
                currentMetrics?.timestamp ||
                new Date().toISOString(),
              cpu: Number(
                currentMetrics?.cpu?.usage ?? 0
              ),
              memory: Number(
                currentMetrics?.memory?.usage ?? 0
              ),
            },
          ];

          return next.slice(-MAX_CHART_POINTS);
        });
      } catch (error) {
        console.error(
          "Failed to load current metrics:",
          error
        );
      }
    };

    loadCurrentMetrics();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Receive live metrics through Socket.IO.
   */
  useEffect(() => {
    const handleConnect = () => {
      setSocketConnected(true);
    };

    const handleDisconnect = () => {
      setSocketConnected(false);
    };

    const handleMetricsUpdate = (data) => {
      setMetrics(data);
      setLastUpdated(new Date());

      setHistory((previous) => {
        const next = [
          ...previous,
          {
            timestamp:
              data?.timestamp ||
              new Date().toISOString(),
            cpu: Number(data?.cpu?.usage ?? 0),
            memory: Number(
              data?.memory?.usage ?? 0
            ),
          },
        ];

        return next.slice(-MAX_CHART_POINTS);
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on(
      "metrics:update",
      handleMetricsUpdate
    );

    if (socket.connected) {
      setSocketConnected(true);
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off(
        "metrics:update",
        handleMetricsUpdate
      );
    };
  }, []);

  const cpuUsage = Number(
    metrics?.cpu?.usage ?? 0
  );

  const memoryUsage = Number(
    metrics?.memory?.usage ?? 0
  );

  const diskUsage = Number(
    metrics?.disk?.usage ?? 0
  );

  const networkRx = Number(
    metrics?.network?.rxBytes ?? 0
  );

  const networkTx = Number(
    metrics?.network?.txBytes ?? 0
  );

  const networkThroughput = (
    (networkRx + networkTx) /
    (1024 * 1024 * 1024)
  ).toFixed(2);

  const getResourceStatus = (
    value,
    warning,
    critical
  ) => {
    if (value > critical) return "CRITICAL";
    if (value > warning) return "WARNING";
    return "NORMAL";
  };

  const cpuStatus = getResourceStatus(
    cpuUsage,
    70,
    85
  );

  const memoryStatus = getResourceStatus(
    memoryUsage,
    70,
    80
  );

  const diskStatus = getResourceStatus(
    diskUsage,
    80,
    90
  );

  const resourceCards = [
    {
      label: "CPU UTILIZATION",
      value: cpuUsage.toFixed(1),
      unit: "%",
      status: cpuStatus,
      trend: "LIVE",
      trendType: "up",
      icon: Cpu,
    },
    {
      label: "MEMORY USAGE",
      value: memoryUsage.toFixed(1),
      unit: "%",
      status: memoryStatus,
      trend: "LIVE",
      trendType: "up",
      icon: MemoryStick,
    },
    {
      label: "DISK UTILIZATION",
      value: diskUsage.toFixed(1),
      unit: "%",
      status: diskStatus,
      trend: "LIVE",
      trendType: "up",
      icon: HardDrive,
    },
    {
      label: "NETWORK THROUGHPUT",
      value: networkThroughput,
      unit: "GB",
      status: socketConnected
        ? "ACTIVE"
        : "OFFLINE",
      trend: socketConnected
        ? "LIVE"
        : "OFFLINE",
      trendType: "up",
      icon: Network,
    },
  ];

  const systemHealth =
    cpuStatus === "CRITICAL" ||
    memoryStatus === "CRITICAL" ||
    diskStatus === "CRITICAL"
      ? "Critical"
      : cpuStatus === "WARNING" ||
        memoryStatus === "WARNING" ||
        diskStatus === "WARNING"
      ? "Warning"
      : "Healthy";

  const healthScore =
    systemHealth === "Critical"
      ? 60
      : systemHealth === "Warning"
      ? 80
      : 98;

  const chartData = useMemo(() => {
    if (history.length > 0) {
      return history;
    }

    return [
      {
        timestamp: new Date().toISOString(),
        cpu: cpuUsage,
        memory: memoryUsage,
      },
    ];
  }, [history, cpuUsage, memoryUsage]);

  const createChartPath = (key) => {
    if (chartData.length === 0) {
      return "";
    }

    const width = 700;
    const height = 260;

    if (chartData.length === 1) {
      const value = Math.max(
        0,
        Math.min(
          100,
          Number(chartData[0][key] || 0)
        )
      );

      const y =
        height - (value / 100) * height;

      return `M0 ${y} L${width} ${y}`;
    }

    return chartData
      .map((point, index) => {
        const value = Math.max(
          0,
          Math.min(
            100,
            Number(point[key] || 0)
          )
        );

        const x =
          (index / (chartData.length - 1)) *
          width;

        const y =
          height - (value / 100) * height;

        return `${
          index === 0 ? "M" : "L"
        } ${x} ${y}`;
      })
      .join(" ");
  };

  const createAreaPath = (key) => {
    if (chartData.length === 0) {
      return "";
    }

    const linePath = createChartPath(key);

    return `${linePath} L 700 260 L 0 260 Z`;
  };

  const cpuChartPath =
    createChartPath("cpu");

  const memoryChartPath =
    createChartPath("memory");

  const cpuAreaPath =
    createAreaPath("cpu");

  const memoryAreaPath =
    createAreaPath("memory");

  const chartLabels = useMemo(() => {
    if (chartData.length === 0) {
      return [];
    }

    return chartData.map((point) => {
      const date = new Date(
        point.timestamp
      );

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    });
  }, [chartData]);

  const latestPoint =
    chartData[chartData.length - 1];

  const latestCpu =
    Number(latestPoint?.cpu ?? 0);

  const latestMemory =
    Number(latestPoint?.memory ?? 0);

  const latestCpuY =
    260 -
    (Math.max(
      0,
      Math.min(100, latestCpu)
    ) /
      100) *
      260;

  const latestMemoryY =
    260 -
    (Math.max(
      0,
      Math.min(100, latestMemory)
    ) /
      100) *
      260;

  return (
    <div className="dashboard">
      {/* ========================================
          PAGE HEADER
          ======================================== */}

      <section className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <Activity
              size={13}
              strokeWidth={2}
            />

            LIVE INFRASTRUCTURE MONITORING
          </div>

          <h1>System Overview</h1>

          <p>
            Monitor your AI/ML infrastructure
            and pipeline performance in real
            time.
          </p>
        </div>

        <div className="dashboard-header-status">
          <span
            className={`dashboard-status-dot ${
              socketConnected
                ? ""
                : "dashboard-status-dot-offline"
            }`}
          />

          <span>
            {socketConnected
              ? "MONITORING ACTIVE"
              : "CONNECTING..."}
          </span>
        </div>
      </section>

      {/* ========================================
          RESOURCE CARDS
          ======================================== */}

      <section className="resource-grid">
        {resourceCards.map((resource) => {
          const Icon = resource.icon;

          return (
            <article
              className="resource-card"
              key={resource.label}
            >
              <div className="resource-card-top">
                <div className="resource-icon">
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                  />
                </div>

                <span className="resource-status">
                  <span />
                  {resource.status}
                </span>
              </div>

              <div className="resource-label">
                {resource.label}
              </div>

              <div className="resource-value">
                <strong>
                  {resource.value}
                </strong>

                <span>{resource.unit}</span>
              </div>

              <div className="resource-footer">
                <span
                  className={`resource-trend ${
                    resource.trendType === "down"
                      ? "resource-trend-down"
                      : ""
                  }`}
                >
                  {resource.trendType ===
                  "down" ? (
                    <ArrowDownRight
                      size={13}
                    />
                  ) : (
                    <ArrowUpRight
                      size={13}
                    />
                  )}

                  {resource.trend}
                </span>

                <span className="resource-period">
                  live telemetry
                </span>
              </div>
            </article>
          );
        })}
      </section>

      {/* ========================================
          MAIN ANALYTICS AREA
          ======================================== */}

      <section className="dashboard-main-grid">
        {/* Resource Utilization */}

        <article className="dashboard-panel utilization-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                PERFORMANCE
              </span>

              <h2>
                Resource Utilization
              </h2>
            </div>

            <div className="panel-live-indicator">
              <span />

              {socketConnected
                ? "LIVE"
                : "OFFLINE"}
            </div>
          </div>

          <div className="utilization-chart">
            <div className="chart-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-line line-1" />
              <div className="chart-grid-line line-2" />
              <div className="chart-grid-line line-3" />
              <div className="chart-grid-line line-4" />
              <div className="chart-grid-line line-5" />

              <svg
                className="chart-svg"
                viewBox="0 0 700 260"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="cpuGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />
                  </linearGradient>

                  <linearGradient
                    id="memoryGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopOpacity="0.15"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  className="chart-area-fill chart-area-fill-primary"
                  d={cpuAreaPath}
                />

                <path
                  className="chart-line chart-line-primary"
                  d={cpuChartPath}
                />

                <path
                  className="chart-area-fill chart-area-fill-secondary"
                  d={memoryAreaPath}
                />

                <path
                  className="chart-line chart-line-secondary"
                  d={memoryChartPath}
                />

                <circle
                  className="chart-point-primary"
                  cx="700"
                  cy={latestCpuY}
                  r="4"
                />

                <circle
                  className="chart-point-secondary"
                  cx="700"
                  cy={latestMemoryY}
                  r="4"
                />
              </svg>

              <div className="chart-x-axis">
                {chartLabels.length > 0 ? (
                  <>
                    <span>
                      {chartLabels[0]}
                    </span>

                    {chartLabels.length > 2 && (
                      <span>
                        {
                          chartLabels[
                            Math.floor(
                              chartLabels.length /
                                3
                            )
                          ]
                        }
                      </span>
                    )}

                    {chartLabels.length > 4 && (
                      <span>
                        {
                          chartLabels[
                            Math.floor(
                              (chartLabels.length *
                                2) /
                                3
                            )
                          ]
                        }
                      </span>
                    )}

                    <span>
                      {
                        chartLabels[
                          chartLabels.length - 1
                        ]
                      }
                    </span>
                  </>
                ) : (
                  <>
                    <span>--:--</span>
                    <span>--:--</span>
                    <span>--:--</span>
                    <span>--:--</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="chart-legend">
            <span>
              <i className="legend-dot legend-primary" />
              CPU
            </span>

            <span>
              <i className="legend-dot legend-secondary" />
              Memory
            </span>

            <span className="chart-update">
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString()}`
                : "Waiting for telemetry..."}
            </span>
          </div>
        </article>

        {/* System Health */}

        <article className="dashboard-panel health-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">
                INFRASTRUCTURE
              </span>

              <h2>System Health</h2>
            </div>

            <CheckCircle2
              className="health-check"
              size={19}
            />
          </div>

          <div className="health-score">
            <div className="health-score-ring">
              <div className="health-score-inner">
                <strong>
                  {healthScore}
                </strong>

                <span>/100</span>
              </div>
            </div>

            <div className="health-score-info">
              <strong>
                {systemHealth}
              </strong>

              <span>
                Current system status based on
                monitored resource
                thresholds.
              </span>
            </div>
          </div>

          <div className="health-list">
            <div className="health-item">
              <div className="health-item-icon">
                <Server size={15} />
              </div>

              <div>
                <strong>Compute</strong>

                <span>
                  CPU{" "}
                  {cpuUsage.toFixed(1)}%
                  usage
                </span>
              </div>

              <b>
                {cpuUsage.toFixed(0)}%
              </b>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <Database size={15} />
              </div>

              <div>
                <strong>Storage</strong>

                <span>
                  Disk{" "}
                  {diskUsage.toFixed(1)}%
                  used
                </span>
              </div>

              <b>
                {diskUsage.toFixed(0)}%
              </b>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <Network size={15} />
              </div>

              <div>
                <strong>Network</strong>

                <span>
                  {socketConnected
                    ? "Live telemetry received"
                    : "Waiting for telemetry"}
                </span>
              </div>

              <b>
                {socketConnected
                  ? "LIVE"
                  : "OFFLINE"}
              </b>
            </div>
          </div>
        </article>
      </section>

      {/* ========================================
          PIPELINES
          ======================================== */}

      <section className="dashboard-panel pipeline-panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">
              AI / ML EXECUTION
            </span>

            <h2>Active Pipelines</h2>
          </div>

          <div className="pipeline-count">
            <BrainCircuit size={15} />
            3 pipelines
          </div>
        </div>

        <div className="pipeline-table">
          <div className="pipeline-table-head">
            <span>PIPELINE</span>
            <span>MODEL</span>
            <span>STATUS</span>
            <span>EXECUTION</span>
            <span>PROGRESS</span>
          </div>

          {pipelines.map((pipeline) => (
            <div
              className="pipeline-row"
              key={pipeline.name}
            >
              <div className="pipeline-name">
                <div className="pipeline-icon">
                  <BrainCircuit size={15} />
                </div>

                <strong>
                  {pipeline.name}
                </strong>
              </div>

              <span className="pipeline-model">
                {pipeline.model}
              </span>

              <span
                className={`pipeline-status ${
                  pipeline.status === "IDLE"
                    ? "pipeline-status-idle"
                    : ""
                }`}
              >
                <i />

                {pipeline.status}
              </span>

              <span className="pipeline-execution">
                {pipeline.execution}
              </span>

              <div className="pipeline-progress">
                <div className="progress-track">
                  <span
                    style={{
                      width: `${pipeline.progress}%`,
                    }}
                  />
                </div>

                <b>
                  {pipeline.progress > 0
                    ? `${pipeline.progress}%`
                    : "—"}
                </b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================
          FOOTER METADATA
          ======================================== */}

      <div className="dashboard-footer">
        <span>
          <Gauge size={12} />
          Monitoring interval: 5 seconds
        </span>

        <span>
          <HardDrive size={12} />
          Data source: Live system telemetry
        </span>
      </div>
    </div>
  );
}

export default Dashboard;