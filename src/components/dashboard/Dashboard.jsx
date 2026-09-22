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
  Zap,
} from "lucide-react";

import "./Dashboard.css";

const resourceCards = [
  {
    label: "CPU UTILIZATION",
    value: "42.8",
    unit: "%",
    status: "NORMAL",
    trend: "+3.2%",
    trendType: "up",
    icon: Cpu,
  },
  {
    label: "MEMORY USAGE",
    value: "68.4",
    unit: "%",
    status: "NORMAL",
    trend: "+1.8%",
    trendType: "up",
    icon: MemoryStick,
  },
  {
    label: "GPU UTILIZATION",
    value: "31.2",
    unit: "%",
    status: "NORMAL",
    trend: "-4.6%",
    trendType: "down",
    icon: Zap,
  },
  {
    label: "NETWORK THROUGHPUT",
    value: "1.8",
    unit: "GB/s",
    status: "ACTIVE",
    trend: "+8.4%",
    trendType: "up",
    icon: Network,
  },
];

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

function Dashboard() {
  return (
    <div className="dashboard">
      {/* ========================================
          PAGE HEADER
          ======================================== */}

      <section className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <Activity size={13} strokeWidth={2} />
            LIVE INFRASTRUCTURE MONITORING
          </div>

          <h1>System Overview</h1>

          <p>
            Monitor your AI/ML infrastructure and
            pipeline performance in real time.
          </p>
        </div>

        <div className="dashboard-header-status">
          <span className="dashboard-status-dot" />
          <span>MONITORING ACTIVE</span>
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
                <strong>{resource.value}</strong>

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
                  {resource.trendType === "down" ? (
                    <ArrowDownRight size={13} />
                  ) : (
                    <ArrowUpRight size={13} />
                  )}

                  {resource.trend}
                </span>

                <span className="resource-period">
                  vs last 5 min
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

              <h2>Resource Utilization</h2>
            </div>

            <div className="panel-live-indicator">
              <span />
              LIVE
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
                  d="M0 155 C55 138, 70 170, 115 142 S170 118, 210 135 S270 110, 315 126 S370 150, 415 116 S470 92, 520 112 S580 83, 625 102 S670 78, 700 91 L700 260 L0 260 Z"
                />

                <path
                  className="chart-line chart-line-primary"
                  d="M0 155 C55 138, 70 170, 115 142 S170 118, 210 135 S270 110, 315 126 S370 150, 415 116 S470 92, 520 112 S580 83, 625 102 S670 78, 700 91"
                />

                <path
                  className="chart-area-fill chart-area-fill-secondary"
                  d="M0 194 C55 184, 80 205, 125 180 S180 165, 225 182 S280 160, 330 174 S385 186, 430 160 S485 148, 530 165 S585 138, 635 153 S675 132, 700 145 L700 260 L0 260 Z"
                />

                <path
                  className="chart-line chart-line-secondary"
                  d="M0 194 C55 184, 80 205, 125 180 S180 165, 225 182 S280 160, 330 174 S385 186, 430 160 S485 148, 530 165 S585 138, 635 153 S675 132, 700 145"
                />

                <circle
                  className="chart-point-primary"
                  cx="700"
                  cy="91"
                  r="4"
                />

                <circle
                  className="chart-point-secondary"
                  cx="700"
                  cy="145"
                  r="4"
                />
              </svg>

              <div className="chart-x-axis">
                <span>12:00</span>
                <span>12:05</span>
                <span>12:10</span>
                <span>12:15</span>
                <span>12:20</span>
                <span>12:25</span>
                <span>12:30</span>
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
              Updated 3 sec ago
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
                <strong>98</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="health-score-info">
              <strong>Excellent</strong>

              <span>
                All monitored systems are operating
                within normal parameters.
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
                <span>4 instances active</span>
              </div>

              <b>99%</b>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <Database size={15} />
              </div>

              <div>
                <strong>Storage</strong>
                <span>1.8 TB available</span>
              </div>

              <b>96%</b>
            </div>

            <div className="health-item">
              <div className="health-item-icon">
                <Network size={15} />
              </div>

              <div>
                <strong>Network</strong>
                <span>Low latency detected</span>
              </div>

              <b>98%</b>
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

                <strong>{pipeline.name}</strong>
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
          Monitoring interval: 3 seconds
        </span>

        <span>
          <HardDrive size={12} />
          Data source: System telemetry
        </span>
      </div>
    </div>
  );
}

export default Dashboard;