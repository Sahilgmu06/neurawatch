import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Thermometer,
  Zap,
} from "lucide-react";

import { useEffect, useState } from "react";

import "./Resources.css";

const initialMetrics = [
  {
    label: "CPU UTILIZATION",
    value: 42.8,
    unit: "%",
    status: "NORMAL",
    trend: "+3.2%",
    trendType: "up",
    icon: Cpu,
    description: "8 logical cores",
  },
  {
    label: "MEMORY USAGE",
    value: 68.4,
    unit: "%",
    status: "NORMAL",
    trend: "+1.8%",
    trendType: "up",
    icon: MemoryStick,
    description: "21.9 GB / 32 GB",
  },
  {
    label: "GPU UTILIZATION",
    value: 31.2,
    unit: "%",
    status: "NORMAL",
    trend: "-4.6%",
    trendType: "down",
    icon: Zap,
    description: "NVIDIA RTX 4090",
  },
  {
    label: "DISK USAGE",
    value: 54.7,
    unit: "%",
    status: "NORMAL",
    trend: "+0.7%",
    trendType: "up",
    icon: HardDrive,
    description: "438 GB / 800 GB",
  },
];

const initialSystemDetails = [
  {
    label: "CPU TEMPERATURE",
    value: "57°C",
    status: "NORMAL",
    icon: Thermometer,
  },
  {
    label: "MEMORY AVAILABLE",
    value: "10.1 GB",
    status: "NORMAL",
    icon: MemoryStick,
  },
  {
    label: "DISK I/O",
    value: "142 MB/s",
    status: "ACTIVE",
    icon: HardDrive,
  },
  {
    label: "NETWORK",
    value: "1.8 GB/s",
    status: "ACTIVE",
    icon: Network,
  },
];

function randomVariation(value, amount = 2) {
  const variation =
    (Math.random() * amount * 2) - amount;

  return Math.min(
    99.9,
    Math.max(
      0,
      Number((value + variation).toFixed(1))
    )
  );
}

function Resources() {
  const [metrics, setMetrics] =
    useState(initialMetrics);

  const [systemDetails, setSystemDetails] =
    useState(initialSystemDetails);

  const [lastUpdated, setLastUpdated] =
    useState("3 seconds ago");

  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setMetrics((currentMetrics) =>
        currentMetrics.map((metric) => {
          const nextValue = randomVariation(
            metric.value,
            metric.label === "MEMORY USAGE"
              ? 1.2
              : 2.2
          );

          const difference =
            nextValue - metric.value;

          const trendType =
            difference >= 0 ? "up" : "down";

          const trend =
            `${difference >= 0 ? "+" : ""}${difference.toFixed(1)}%`;

          return {
            ...metric,
            value: nextValue,
            trend,
            trendType,
          };
        })
      );

      setSystemDetails((currentDetails) =>
        currentDetails.map((detail) => {
          if (
            detail.label ===
            "CPU TEMPERATURE"
          ) {
            const temperature =
              Math.round(
                54 + Math.random() * 8
              );

            return {
              ...detail,
              value: `${temperature}°C`,
            };
          }

          if (
            detail.label ===
            "MEMORY AVAILABLE"
          ) {
            const memory =
              (
                9.5 +
                Math.random() * 1.2
              ).toFixed(1);

            return {
              ...detail,
              value: `${memory} GB`,
            };
          }

          if (
            detail.label ===
            "DISK I/O"
          ) {
            const disk =
              Math.round(
                125 + Math.random() * 40
              );

            return {
              ...detail,
              value: `${disk} MB/s`,
            };
          }

          if (
            detail.label ===
            "NETWORK"
          ) {
            const network =
              (
                1.5 +
                Math.random() * 0.7
              ).toFixed(1);

            return {
              ...detail,
              value: `${network} GB/s`,
            };
          }

          return detail;
        })
      );

      setLastUpdated("just now");
    }, 3000);

    return () =>
      clearInterval(telemetryInterval);
  }, []);

  useEffect(() => {
    if (lastUpdated !== "just now") {
      return;
    }

    const updateTimer = setTimeout(() => {
      setLastUpdated("3 seconds ago");
    }, 3000);

    return () =>
      clearTimeout(updateTimer);
  }, [lastUpdated]);

  const cpuMetric =
    metrics.find(
      (metric) =>
        metric.label === "CPU UTILIZATION"
    );

  const memoryMetric =
    metrics.find(
      (metric) =>
        metric.label === "MEMORY USAGE"
    );

  const gpuMetric =
    metrics.find(
      (metric) =>
        metric.label === "GPU UTILIZATION"
    );

  const diskMetric =
    metrics.find(
      (metric) =>
        metric.label === "DISK USAGE"
    );

  return (
    <div className="resources-page">

      {/* ========================================
          PAGE HEADER
          ======================================== */}

      <section className="resources-header">

        <div>

          <div className="resources-eyebrow">
            <Activity size={13} />
            INFRASTRUCTURE TELEMETRY
          </div>

          <h1>
            Resource Monitoring
          </h1>

          <p>
            Inspect system resources and infrastructure
            utilization across your AI/ML environment.
          </p>

        </div>

        <div className="resources-live">

          <span className="resources-live-dot" />

          LIVE TELEMETRY

        </div>

      </section>


      {/* ========================================
          RESOURCE METRICS
          ======================================== */}

      <section className="resources-metric-grid">

        {metrics.map((metric) => {

          const Icon = metric.icon;

          return (
            <article
              className="resources-metric-card"
              key={metric.label}
            >

              <div className="resources-metric-top">

                <div className="resources-metric-icon">
                  <Icon size={18} />
                </div>

                <span className="resources-metric-status">

                  <i />

                  {metric.status}

                </span>

              </div>


              <span className="resources-metric-label">
                {metric.label}
              </span>


              <div className="resources-metric-value">

                <strong>
                  {metric.value.toFixed(1)}
                </strong>

                <span>
                  {metric.unit}
                </span>

              </div>


              <div className="resources-metric-bottom">

                <span
                  className={
                    metric.trendType === "down"
                      ? "resource-positive"
                      : "resource-trend"
                  }
                >

                  {metric.trendType === "down" ? (
                    <ArrowDownRight size={13} />
                  ) : (
                    <ArrowUpRight size={13} />
                  )}

                  {metric.trend}

                </span>

                <span>
                  {metric.description}
                </span>

              </div>

            </article>
          );
        })}

      </section>


      {/* ========================================
          UTILIZATION MONITOR
          ======================================== */}

      <section className="resources-content-grid">

        <article className="resources-panel utilization-monitor">

          <div className="resources-panel-header">

            <div>

              <span className="resources-panel-kicker">
                REAL-TIME TELEMETRY
              </span>

              <h2>
                System Utilization
              </h2>

            </div>

            <div className="resources-time">
              Last 30 minutes
            </div>

          </div>


          <div className="resources-chart">

            <div className="resources-y-axis">

              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>

            </div>


            <div className="resources-chart-area">

              <div className="resources-grid-line grid-top" />
              <div className="resources-grid-line grid-25" />
              <div className="resources-grid-line grid-50" />
              <div className="resources-grid-line grid-75" />
              <div className="resources-grid-line grid-bottom" />


              <svg
                viewBox="0 0 800 300"
                preserveAspectRatio="none"
                className="resources-svg"
              >

                <defs>

                  <linearGradient
                    id="resourcesCpuFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopOpacity="0.22"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />

                  </linearGradient>


                  <linearGradient
                    id="resourcesMemoryFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopOpacity="0.16"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>


                <path
                  className="resources-area resources-area-cpu"
                  d="M0 180 C35 164 55 175 82 158 S130 143 165 155 S215 132 248 145 S290 126 330 138 S375 158 415 129 S465 112 505 128 S550 103 590 117 S635 94 675 108 S725 85 760 98 S785 88 800 92 L800 300 L0 300 Z"
                />

                <path
                  className="resources-line resources-line-cpu"
                  d="M0 180 C35 164 55 175 82 158 S130 143 165 155 S215 132 248 145 S290 126 330 138 S375 158 415 129 S465 112 505 128 S550 103 590 117 S635 94 675 108 S725 85 760 98 S785 88 800 92"
                />


                <path
                  className="resources-area resources-area-memory"
                  d="M0 218 C45 208 65 220 105 204 S155 191 198 205 S245 180 285 193 S330 201 370 185 S420 171 460 183 S510 164 550 175 S600 153 640 166 S690 147 730 157 S770 140 800 148 L800 300 L0 300 Z"
                />

                <path
                  className="resources-line resources-line-memory"
                  d="M0 218 C45 208 65 220 105 204 S155 191 198 205 S245 180 285 193 S330 201 370 185 S420 171 460 183 S510 164 550 175 S600 153 640 166 S690 147 730 157 S770 140 800 148"
                />


                <circle
                  className="resources-point-cpu"
                  cx="800"
                  cy="92"
                  r="4"
                />

                <circle
                  className="resources-point-memory"
                  cx="800"
                  cy="148"
                  r="4"
                />

              </svg>


              <div className="resources-x-axis">

                <span>18:00</span>
                <span>18:05</span>
                <span>18:10</span>
                <span>18:15</span>
                <span>18:20</span>
                <span>18:25</span>
                <span>18:30</span>

              </div>

            </div>

          </div>


          <div className="resources-chart-footer">

            <div className="resources-legend">

              <span>
                <i className="resources-legend-cpu" />
                CPU
              </span>

              <span>
                <i className="resources-legend-memory" />
                Memory
              </span>

            </div>

            <span className="resources-updated">
              Updated {lastUpdated}
            </span>

          </div>

        </article>


        {/* ========================================
            RESOURCE DISTRIBUTION
            ======================================== */}

        <article className="resources-panel distribution-panel">

          <div className="resources-panel-header">

            <div>

              <span className="resources-panel-kicker">
                CAPACITY
              </span>

              <h2>
                Resource Distribution
              </h2>

            </div>

          </div>


          <div className="distribution-list">

            <div className="distribution-item">

              <div className="distribution-info">

                <span>
                  CPU
                </span>

                <strong>
                  {cpuMetric?.value.toFixed(1)}%
                </strong>

              </div>

              <div className="distribution-track">

                <span
                  className="distribution-cpu"
                  style={{
                    width: `${cpuMetric?.value || 0}%`,
                  }}
                />

              </div>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">

                <span>
                  Memory
                </span>

                <strong>
                  {memoryMetric?.value.toFixed(1)}%
                </strong>

              </div>

              <div className="distribution-track">

                <span
                  className="distribution-memory"
                  style={{
                    width: `${memoryMetric?.value || 0}%`,
                  }}
                />

              </div>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">

                <span>
                  GPU
                </span>

                <strong>
                  {gpuMetric?.value.toFixed(1)}%
                </strong>

              </div>

              <div className="distribution-track">

                <span
                  className="distribution-gpu"
                  style={{
                    width: `${gpuMetric?.value || 0}%`,
                  }}
                />

              </div>

            </div>


            <div className="distribution-item">

              <div className="distribution-info">

                <span>
                  Disk
                </span>

                <strong>
                  {diskMetric?.value.toFixed(1)}%
                </strong>

              </div>

              <div className="distribution-track">

                <span
                  className="distribution-disk"
                  style={{
                    width: `${diskMetric?.value || 0}%`,
                  }}
                />

              </div>

            </div>

          </div>


          <div className="distribution-summary">

            <div>

              <Server size={16} />

              <span>
                Active compute nodes
              </span>

            </div>

            <strong>
              04
            </strong>

          </div>

        </article>

      </section>


      {/* ========================================
          SYSTEM DETAILS
          ======================================== */}

      <section className="resources-panel details-panel">

        <div className="resources-panel-header">

          <div>

            <span className="resources-panel-kicker">
              SYSTEM TELEMETRY
            </span>

            <h2>
              Infrastructure Details
            </h2>

          </div>


          <div className="details-status">

            <span />

            All systems operational

          </div>

        </div>


        <div className="system-details-grid">

          {systemDetails.map((detail) => {

            const Icon = detail.icon;

            return (
              <div
                className="system-detail"
                key={detail.label}
              >

                <div className="system-detail-icon">
                  <Icon size={16} />
                </div>


                <div className="system-detail-content">

                  <span>
                    {detail.label}
                  </span>

                  <strong>
                    {detail.value}
                  </strong>

                </div>


                <div className="system-detail-status">

                  <i />

                  {detail.status}

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* ========================================
          FOOTER
          ======================================== */}

      <div className="resources-footer">

        <span>

          <Database size={12} />

          Telemetry source:
          system agent

        </span>


        <span>

          <Activity size={12} />

          Collection interval:
          3 seconds

        </span>

      </div>

    </div>
  );
}

export default Resources;