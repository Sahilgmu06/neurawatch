import {
  Activity,
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { useState } from "react";

import "./Auth.css";
import { api } from "../services/api";
import auth from "../services/auth";

function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin) {
      if (!name.trim()) {
        setError("Please enter the administrator name.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (password.length < 6) {
        setError(
          "Password must contain at least 6 characters."
        );
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const response = await api.login({
          email: email.trim(),
          password,
        });

        if (!response?.token) {
          throw new Error(
            "Login succeeded but no authentication token was received."
          );
        }

        auth.setToken(response.token);

        onLogin();
      } else {
        await api.register({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        setMode("login");

        setName("");
        setPassword("");
        setConfirmPassword("");

        setError(
          "Administrator account created. Please sign in."
        );
      }
    } catch (requestError) {
      console.error("Authentication failed:", requestError);

      setError(
        requestError?.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
              <Activity
                size={21}
                strokeWidth={2.2}
              />
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
            onSubmit={handleSubmit}
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
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter administrator name"
                    autoComplete="name"
                    required
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
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@neurawatch.local"
                  autoComplete="email"
                  required
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
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter secure password"
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                  required
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
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Confirm secure password"
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? isLogin
                    ? "Authenticating..."
                    : "Creating account..."
                  : isLogin
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
              onClick={() => {
                setError("");

                setMode(
                  isLogin ? "register" : "login"
                );
              }}
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
            NeuraWatch provides administrators with a
            unified command center for AI/ML
            infrastructure telemetry, resource
            utilization and system health.
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