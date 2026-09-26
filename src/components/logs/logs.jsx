import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3,
  Database,
  Filter,
  Info,
  Server,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import "./Logs.css";
import { api } from "../../services/api";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    let cancelled = false;

    const loadLogs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.getMonitoringLogs();

        if (!cancelled) {
          setLogs(response?.data || []);
        }
      } catch (requestError) {
        if (!cancelled) {
          console.error("Monitoring logs loading failed:", requestError);
          setError("Unable to load monitoring logs.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadLogs();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredLogs = useMemo(() => {
    if (filter === "ALL") {
      return logs;
    }

    return logs.filter((log) => log.type === filter);
  }, [logs, filter]);

  const alertCount = logs.filter(
    (log) => log.type === "ALERT"
  ).length;

  const eventCount = logs.filter(
    (log) => log.type === "SERVER_EVENT"
  ).length;

  const violationCount = logs.filter(
    (log) => log.type === "THRESHOLD_VIOLATION"
  ).length;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return "Unknown time";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return "Unknown time";
    }

    return date.toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getTypeLabel = (type) => {
    if (type === "THRESHOLD_VIOLATION") {
      return "Threshold Violation";
    }

    if (type === "SERVER_EVENT") {
      return "Server Event";
    }

    if (type === "ALERT") {
      return "Alert";
    }

    return type || "Unknown";
  };

  const getTypeIcon = (type) => {
    if (type === "THRESHOLD_VIOLATION") {
      return <ShieldAlert size={16} />;
    }

    if (type === "SERVER_EVENT") {
      return <Server size={16} />;
    }

    if (type === "ALERT") {
      return <Bell size={16} />;
    }

    return <Info size={16} />;
  };

  const getSeverityIcon = (severity) => {
    if (severity === "CRITICAL") {
      return <XCircle size={15} />;
    }

    if (severity === "WARNING") {
      return <AlertTriangle size={15} />;
    }

    return <CheckCircle2 size={15} />;
  };

  const getResourceLabel = (resource) => {
    if (resource === "MEMORY") {
      return "Memory";
    }

    if (resource === "CPU") {
      return "CPU";
    }

    if (resource === "DISK") {
      return "Disk";
    }

    if (resource === "NETWORK") {
      return "Network";
    }

    if (resource === "SERVER") {
      return "Server";
    }

    return resource || "System";
  };

  return (
    <div className="logs-page">
      {/* PAGE HEADER */}

      <section className="logs-header">
        <div>
          <div className="logs-eyebrow">
            <Database size={13} />
            MONITORING EVENT HISTORY
          </div>

          <h1>Logs &amp; Event History</h1>

          <p>
            Review alerts, server events and resource
            threshold violations recorded by NeuraWatch.
          </p>
        </div>

        <div className="logs-live">
          <span />
          LIVE LOG STREAM
        </div>
      </section>

      {/* SUMMARY CARDS */}

      <section className="logs-summary-grid">
        <article className="logs-summary-card">
          <div className="logs-summary-icon">
            <Bell size={18} />
          </div>

          <div>
            <span>ALERT HISTORY</span>

            <strong>{alertCount}</strong>

            <small>
              Recorded alert events
            </small>
          </div>
        </article>

        <article className="logs-summary-card">
          <div className="logs-summary-icon">
            <Server size={18} />
          </div>

          <div>
            <span>SERVER EVENTS</span>

            <strong>{eventCount}</strong>

            <small>
              Server activity events
            </small>
          </div>
        </article>

        <article className="logs-summary-card">
          <div className="logs-summary-icon">
            <ShieldAlert size={18} />
          </div>

          <div>
            <span>THRESHOLD VIOLATIONS</span>

            <strong>{violationCount}</strong>

            <small>
              Resource limit violations
            </small>
          </div>
        </article>

        <article className="logs-summary-card">
          <div className="logs-summary-icon">
            <Database size={18} />
          </div>

          <div>
            <span>TOTAL RECORDS</span>

            <strong>{logs.length}</strong>

            <small>
              Latest monitoring records
            </small>
          </div>
        </article>
      </section>

      {/* LOG PANEL */}

      <section className="logs-panel">
        <div className="logs-panel-header">
          <div>
            <span>EVENT STREAM</span>

            <h2>Monitoring Logs</h2>
          </div>

          <div className="logs-filter-wrapper">
            <Filter size={15} />

            <select
              className="logs-filter"
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              aria-label="Filter monitoring logs"
            >
              <option value="ALL">
                All Events
              </option>

              <option value="ALERT">
                Alerts
              </option>

              <option value="SERVER_EVENT">
                Server Events
              </option>

              <option value="THRESHOLD_VIOLATION">
                Threshold Violations
              </option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="logs-state logs-error">
            {error}
          </div>
        ) : loading ? (
          <div className="logs-state">
            Loading monitoring logs...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="logs-state">
            No monitoring events found.
          </div>
        ) : (
          <div className="logs-table-wrapper">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>TIME</th>
                  <th>EVENT TYPE</th>
                  <th>RESOURCE</th>
                  <th>SEVERITY</th>
                  <th>MESSAGE</th>
                  <th>VALUE</th>
                  <th>THRESHOLD</th>
                </tr>
              </thead>

              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr
                    key={
                      log._id ||
                      `${log.timestamp}-${log.type}-${index}`
                    }
                  >
                    <td>
                      <div className="logs-time">
                        <Clock3 size={14} />

                        {formatTimestamp(
                          log.timestamp
                        )}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`logs-type logs-type-${(
                          log.type || "unknown"
                        ).toLowerCase()}`}
                      >
                        {getTypeIcon(log.type)}

                        {getTypeLabel(log.type)}
                      </span>
                    </td>

                    <td>
                      <span className="logs-resource">
                        {getResourceLabel(
                          log.resource
                        )}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`logs-severity logs-severity-${(
                          log.severity || "info"
                        ).toLowerCase()}`}
                      >
                        {getSeverityIcon(
                          log.severity
                        )}

                        {log.severity || "INFO"}
                      </span>
                    </td>

                    <td>
                      <span className="logs-message">
                        {log.message ||
                          "No message available"}
                      </span>
                    </td>

                    <td>
                      <span className="logs-value">
                        {typeof log.value === "number"
                          ? `${log.value}%`
                          : log.value ?? "--"}
                      </span>
                    </td>

                    <td>
                      <span className="logs-threshold">
                        {typeof log.threshold ===
                        "number"
                          ? `${log.threshold}%`
                          : log.threshold ?? "--"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Logs;