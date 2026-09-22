import {
  Activity,
  BarChart3,
  Cpu,
  Database,
  TrendingUp,
} from "lucide-react";

import "./Analytics.css";

function Analytics() {
  return (
    <div className="analytics-page">

      {/* PAGE HEADER */}

      <section className="analytics-header">

        <div>
          <div className="analytics-eyebrow">
            <BarChart3 size={13} />
            PERFORMANCE ANALYTICS
          </div>

          <h1>Analytics</h1>

          <p>
            Analyze infrastructure performance and
            AI/ML resource utilization.
          </p>
        </div>

        <div className="analytics-live">
          <span />
          LIVE ANALYTICS
        </div>

      </section>


      {/* ANALYTIC CARDS */}

      <section className="analytics-grid">

        <article className="analytics-card">

          <div className="analytics-card-icon">
            <Cpu size={18} />
          </div>

          <span>AVERAGE CPU</span>

          <strong>42.8%</strong>

          <small>
            <TrendingUp size={12} />
            +3.2% from previous period
          </small>

        </article>


        <article className="analytics-card">

          <div className="analytics-card-icon">
            <Database size={18} />
          </div>

          <span>MEMORY USAGE</span>

          <strong>68.4%</strong>

          <small>
            <Activity size={12} />
            Stable utilization
          </small>

        </article>


        <article className="analytics-card">

          <div className="analytics-card-icon">
            <BarChart3 size={18} />
          </div>

          <span>RESOURCE EFFICIENCY</span>

          <strong>91.6%</strong>

          <small>
            Infrastructure performance
          </small>

        </article>

      </section>


      {/* PERFORMANCE PANEL */}

      <section className="analytics-panel">

        <div className="analytics-panel-header">

          <div>
            <span>PERFORMANCE TELEMETRY</span>
            <h2>Infrastructure Performance</h2>
          </div>

          <div className="analytics-period">
            Last 30 minutes
          </div>

        </div>


        <div className="analytics-chart">

          <div className="analytics-chart-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="analytics-chart-line analytics-line-one" />

          <div className="analytics-chart-line analytics-line-two" />

          <div className="analytics-chart-labels">
            <span>12:00</span>
            <span>12:05</span>
            <span>12:10</span>
            <span>12:15</span>
            <span>12:20</span>
            <span>12:25</span>
            <span>12:30</span>
          </div>

        </div>


        <div className="analytics-legend">

          <span>
            <i className="analytics-dot-cpu" />
            CPU
          </span>

          <span>
            <i className="analytics-dot-memory" />
            Memory
          </span>

          <span className="analytics-updated">
            Updated 3 seconds ago
          </span>

        </div>

      </section>

    </div>
  );
}

export default Analytics;