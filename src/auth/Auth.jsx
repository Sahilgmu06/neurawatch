import { Activity, ArrowRight, LockKeyhole, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { useState } from "react";

import "./Auth.css";

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");

  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      {/* Background atmosphere */}
      <div className="auth-background">
        <div className="auth-orbit auth-orbit-one" />
        <div className="auth-orbit auth-orbit-two" />
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />

        <div className="auth-grid" />
      </div>

      {/* Main authentication card */}
      <main className="auth-container">
        <section className="auth-card">

          {/* Brand */}
          <div className="auth-brand">
            <div className="auth-brand-icon">
              <Activity size={21} strokeWidth={2.2} />
            </div>

            <div>
              <strong>NEURAWATCH</strong>
              <span>AI INFRASTRUCTURE</span>
            </div>
          </div>

          {/* Header */}
          <div className="auth-heading">
            <div className="auth-security-badge">
              <ShieldCheck size={14} />
              SECURE COMMAND ACCESS
            </div>

            <h1>
              {isLogin
                ? "Welcome back."
                : "Create administrator account."}
            </h1>

            <p>
              {isLogin
                ? "Sign in to access the NeuraWatch monitoring command center."
                : "Register an administrator account for secure system monitoring."}
            </p>
          </div>

          {/* Form */}
          <form
  className="auth-form"
  onSubmit={(event) => {
    event.preventDefault();

    if (isLogin) {
      onLogin();
    } else {
      setMode("login");
    }
  }}
>
            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="name">
                  ADMINISTRATOR NAME
                </label>

                <div className="auth-input-wrapper">
                  <UserPlus size={16} />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter administrator name"
                  />
                </div>
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="email">
                EMAIL ADDRESS
              </label>

              <div className="auth-input-wrapper">
                <Mail size={16} />

                <input
                  id="email"
                  type="email"
                  placeholder="admin@neurawatch.local"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password">
                PASSWORD
              </label>

              <div className="auth-input-wrapper">
                <LockKeyhole size={16} />

                <input
                  id="password"
                  type="password"
                  placeholder="Enter secure password"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="auth-field">
                <label htmlFor="confirm-password">
                  CONFIRM PASSWORD
                </label>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={16} />

                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm secure password"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
            >
              <span>
                {isLogin
                  ? "Access Command Center"
                  : "Create Administrator Account"}
              </span>

              <ArrowRight size={17} />
            </button>
          </form>

          {/* Mode switch */}
          <div className="auth-switch">
            <span>
              {isLogin
                ? "Don't have an administrator account?"
                : "Already have an administrator account?"}
            </span>

            <button
              type="button"
              onClick={() =>
                setMode(isLogin ? "register" : "login")
              }
            >
              {isLogin ? "Register" : "Sign in"}
            </button>
          </div>

          {/* Footer security information */}
          <div className="auth-footer">
            <span>
              <span className="auth-status-dot" />
              SYSTEM ONLINE
            </span>

            <span>
              JWT AUTHENTICATION
            </span>

            <span>
              ENCRYPTED ACCESS
            </span>
          </div>
        </section>

        {/* Side information */}
        <aside className="auth-side-panel">
          <div className="auth-side-kicker">
            REAL-TIME INTELLIGENCE
          </div>

          <h2>
            Monitor the infrastructure
            <span>behind every model.</span>
          </h2>

          <p>
            NeuraWatch provides administrators with a unified
            command center for AI/ML infrastructure telemetry,
            resource utilization and system health.
          </p>

          <div className="auth-side-status">
            <div className="auth-status-line">
              <span className="auth-status-icon">
                <Activity size={15} />
              </span>

              <div>
                <strong>Telemetry Engine</strong>
                <span>Ready for monitoring</span>
              </div>

              <i />
            </div>

            <div className="auth-status-line">
              <span className="auth-status-icon">
                <ShieldCheck size={15} />
              </span>

              <div>
                <strong>Security Layer</strong>
                <span>Protected environment</span>
              </div>

              <i />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default Auth;