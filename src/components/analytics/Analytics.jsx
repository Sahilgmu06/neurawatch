import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Cpu,
  Database,
  TrendingUp,
} from "lucide-react";

import "./Analytics.css";
import { api } from "../../services/api";

function Analytics() {
  const [range, setRange] = useState("daily");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.getAnalytics(range);

        if (!cancelled) {
          setAnalytics(response.data);
        }
      } catch (requestError) {
        if (!cancelled) {
          console.error("Analytics loading failed:", requestError);
          setError("Unable to load analytics data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [range]);

  const averages = analytics?.averages || {
    cpu: 0,
    memory: 0,
    disk: 0,
  };

  const chartPoints = useMemo(() => {
    const trends = analytics?.trends || [];

    if (trends.length === 0) {
      return {
        cpu: "",
        memory: "",
        labels: [],
      };
    }

    const visibleTrends =
      trends.length > 12 ? trends.slice(-12) : trends;

    const createPath = (key) => {
      if (visibleTrends.length === 1) {
        const value = Number(visibleTrends[0][key]) || 0;
        const y = 100 - Math.min(Math.max(value, 0), 100);
        return `0,${y}`;
      }

      return visibleTrends
        .map((item, index) => {
          const value = Number(item[key]) || 0;
          const x =
            (index / (visibleTrends.length - 1)) * 100;
          const y =
            100 - Math.min(Math.max(value, 0), 100);

          return `${x},${y}`;
        })
        .join(" ");
    };

    const formatLabel = (timestamp) => {
      const date = new Date(timestamp);

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return {
      cpu: createPath("cpu"),
      memory: createPath("memory"),
      labels: visibleTrends.map((item) =>
        formatLabel(item.timestamp)
      ),
    };
  }, [analytics]);

  const efficiency = useMemo(() => {
    const cpu = Number(averages.cpu) || 0;
    const memory = Number(averages.memory) || 0;
    const disk = Number(averages.disk) || 0;

    if (!analytics?.count) {
      return 0;
    }

    return Number(
      Math.max(
        0,
        100 - (cpu + memory + disk) / 3
      ).toFixed(1)
    );
  }, [analytics, averages]);

  const getPeriodLabel = () => {
    if (range === "weekly") {
      return "Last 7 days";
    }

    if (range === "monthly") {
      return "Last 30 days";
    }

    return "Last 24 hours";
  };

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

          <strong>
            {loading ? "--" : `${averages.cpu}%`}
          </strong>

          <small>
            <TrendingUp size={12} />
            {analytics?.count
              ? `${analytics.count} telemetry records`
              : "No telemetry data"}
          </small>
        </article>

        <article className="analytics-card">
          <div className="analytics-card-icon">
            <Database size={18} />
          </div>

          <span>MEMORY USAGE</span>

          <strong>
            {loading ? "--" : `${averages.memory}%`}
          </strong>

          <small>
            <Activity size={12} />
            {analytics?.count
              ? "Average utilization"
              : "No telemetry data"}
          </small>
        </article>

        <article className="analytics-card">
          <div className="analytics-card-icon">
            <BarChart3 size={18} />
          </div>

          <span>RESOURCE EFFICIENCY</span>

          <strong>
            {loading ? "--" : `${efficiency}%`}
          </strong>

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

          <select
            className="analytics-period"
            value={range}
            onChange={(event) =>
              setRange(event.target.value)
            }
            aria-label="Analytics time range"
          >
            <option value="daily">Last 24 hours</option>
            <option value="weekly">Last 7 days</option>
            <option value="monthly">Last 30 days</option>
          </select>
        </div>

        {error ? (
          <div className="analytics-state analytics-error">
            {error}
          </div>
        ) : loading ? (
          <div className="analytics-state">
            Loading analytics telemetry...
          </div>
        ) : analytics?.count === 0 ? (
          <div className="analytics-state">
            No telemetry data available for this period.
          </div>
        ) : (
          <>
            <div className="analytics-chart">
              <div className="analytics-chart-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg
                className="analytics-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-label="CPU and memory performance chart"
              >
                <polyline
                  className="analytics-svg-line analytics-svg-cpu"
                  points={chartPoints.cpu}
                />

                <polyline
                  className="analytics-svg-line analytics-svg-memory"
                  points={chartPoints.memory}
                />
              </svg>

              <div className="analytics-chart-labels">
                {chartPoints.labels.map((label, index) => (
                  <span key={`${label}-${index}`}>
                    {label}
                  </span>
                ))}
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
                {getPeriodLabel()}
              </span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Analytics;