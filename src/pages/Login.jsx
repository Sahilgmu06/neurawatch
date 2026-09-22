import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Login form submitted:", {
      email,
      password,
    });
  };

  return (
    <main className="login-page">
      <div className="login-grid" />

      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />

      <section className="login-shell">
        {/* ========================================
            BRAND / VISUAL SIDE
            ======================================== */}

        <div className="login-brand-panel">
          <div className="brand-content">
            <div className="brand-mark">
              <span className="brand-mark-core">
                <Activity size={20} strokeWidth={2.4} />
              </span>

              <span className="brand-name">
                NEURAWATCH
              </span>
            </div>

            <div className="brand-heading">
              <span className="brand-kicker">
                AI INFRASTRUCTURE
              </span>

              <h1>
                Intelligence
                <br />
                <span>at a glance.</span>
              </h1>

              <p>
                Monitor the health and resource state of
                your AI infrastructure from one centralized
                command center.
              </p>
            </div>

            {/* ========================================
                TELEMETRY VISUAL
                ======================================== */}

            <div className="telemetry-visual">
              <div className="telemetry-header">
                <div>
                  <span className="telemetry-label">
                    TELEMETRY SIGNAL
                  </span>

                  <strong>
                    SYSTEM NOMINAL
                  </strong>
                </div>

                <div className="telemetry-live">
                  <span className="telemetry-live-dot" />
                  LIVE
                </div>
              </div>

              <div className="telemetry-chart">
                <div className="chart-line chart-line-one" />
                <div className="chart-line chart-line-two" />
                <div className="chart-line chart-line-three" />

                <div className="chart-bars">
                  <span style={{ height: "34%" }} />
                  <span style={{ height: "48%" }} />
                  <span style={{ height: "41%" }} />
                  <span style={{ height: "63%" }} />
                  <span style={{ height: "54%" }} />
                  <span style={{ height: "72%" }} />
                  <span style={{ height: "58%" }} />
                  <span style={{ height: "80%" }} />
                  <span style={{ height: "68%" }} />
                  <span style={{ height: "88%" }} />
                  <span style={{ height: "73%" }} />
                  <span style={{ height: "92%" }} />
                </div>
              </div>

              <div className="telemetry-footer">
                <span>CPU</span>
                <span>MEMORY</span>
                <span>NETWORK</span>
                <span>UPTIME</span>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            <span>NEURAWATCH</span>
            <span>AI INFRASTRUCTURE INTELLIGENCE</span>
          </div>
        </div>

        {/* ========================================
            LOGIN SIDE
            ======================================== */}

        <div className="login-form-panel">
          <div className="login-form-container">
            <div className="mobile-brand">
              <div className="brand-mark">
                <span className="brand-mark-core">
                  <Activity size={18} strokeWidth={2.4} />
                </span>

                <span className="brand-name">
                  NEURAWATCH
                </span>
              </div>
            </div>

            <div className="login-heading">
              <div className="login-eyebrow">
                ADMIN CONSOLE
              </div>

              <h2>
                Welcome back.
              </h2>

              <p>
                Sign in to access your infrastructure
                command center.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              {/* EMAIL */}

              <div className="form-field">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">
                  <Mail
                    className="input-icon"
                    size={18}
                    strokeWidth={1.8}
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="admin@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="form-field">
                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">
                  <LockKeyhole
                    className="input-icon"
                    size={18}
                    strokeWidth={1.8}
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        strokeWidth={1.8}
                      />
                    ) : (
                      <Eye
                        size={18}
                        strokeWidth={1.8}
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="login-submit"
              >
                <span>
                  Enter command center
                </span>

                <ArrowRight
                  size={18}
                  strokeWidth={2}
                />
              </button>
            </form>

            <div className="security-note">
              <ShieldCheck
                size={17}
                strokeWidth={1.8}
              />

              <span>
                Secure administrator access
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;