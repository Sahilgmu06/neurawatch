import {
  Activity,
  BarChart3,
  Cpu,
  FileClock,
  Gauge,
  LogOut,
  Menu,
  Network,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";

import { useState } from "react";

import "./AppShell.css";

import Dashboard from "../dashboard/Dashboard";
import Resources from "../resources/Resources";
import Analytics from "../analytics/Analytics";
import NetworkPage from "../network/Network";
import Logs from "../logs/Logs";

function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activePage, setActivePage] = useState("overview");

  const navigationItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Gauge,
    },
    {
      id: "resources",
      label: "Resources",
      icon: Cpu,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      id: "network",
      label: "Network",
      icon: Network,
    },
    {
      id: "logs",
      label: "Logs & Events",
      icon: FileClock,
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "resources":
        return <Resources />;

      case "analytics":
        return <Analytics />;

      case "network":
        return <NetworkPage />;

      case "logs":
        return <Logs />;

      case "overview":
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activePage) {
      case "resources":
        return "Resource Monitoring";

      case "analytics":
        return "Analytics";

      case "network":
        return "Network";

      case "logs":
        return "Logs & Events";

      case "overview":
      default:
        return "System Overview";
    }
  };

  return (
    <div className="shell">

      {/* ========================================
          SIDEBAR
          ======================================== */}

      <aside
        className={`shell-sidebar ${
          sidebarOpen ? "shell-sidebar-open" : ""
        }`}
      >

        <div className="sidebar-header">

          <div className="shell-brand">

            <span className="shell-brand-icon">
              <Activity
                size={19}
                strokeWidth={2.3}
              />
            </span>

            <div className="shell-brand-text">
              <span>NEURAWATCH</span>
              <small>AI INFRASTRUCTURE</small>
            </div>

          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>

        </div>


        {/* ========================================
            NAVIGATION
            ======================================== */}

        <nav className="shell-navigation">

          <div className="navigation-section-label">
            MONITORING
          </div>

          {navigationItems.map((item) => {

            const Icon = item.icon;

            const isActive =
              activePage === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`navigation-item ${
                  isActive
                    ? "navigation-item-active"
                    : ""
                }`}
                onClick={() =>
                  handleNavigation(item.id)
                }
              >

                <Icon
                  size={18}
                  strokeWidth={1.8}
                />

                <span>
                  {item.label}
                </span>

                {isActive && (
                  <span className="navigation-active-indicator" />
                )}

              </button>
            );
          })}


          <div className="navigation-section-label navigation-section-spaced">
            SYSTEM
          </div>


          <button
            type="button"
            className="navigation-item"
          >

            <Settings
              size={18}
              strokeWidth={1.8}
            />

            <span>
              Settings
            </span>

          </button>

        </nav>


        {/* ========================================
            SIDEBAR BOTTOM
            ======================================== */}

        <div className="sidebar-bottom">

          <div className="system-status-card">

            <div className="system-status-header">

              <span className="system-status-dot" />

              <span>
                SYSTEM STATUS
              </span>

            </div>

            <strong>
              All systems operational
            </strong>

            <div className="system-status-meta">

              <span>
                UPTIME
              </span>

              <span>
                99.98%
              </span>

            </div>

          </div>


          <div className="sidebar-admin">

            <div className="admin-avatar">
              A
            </div>

            <div className="admin-info">

              <strong>
                Administrator
              </strong>

              <span>
                System Admin
              </span>

            </div>

            <button
              type="button"
              className="logout-button"
              aria-label="Logout"
            >

              <LogOut
                size={17}
                strokeWidth={1.8}
              />

            </button>

          </div>

        </div>

      </aside>


      {/* ========================================
          MOBILE OVERLAY
          ======================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="shell-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
          aria-label="Close navigation overlay"
        />
      )}


      {/* ========================================
          MAIN AREA
          ======================================== */}

      <div className="shell-main">

        {/* ========================================
            TOP BAR
            ======================================== */}

        <header className="shell-topbar">

          <div className="topbar-left">

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
              aria-label="Open navigation"
            >
              <Menu size={20} />
            </button>


            <div className="topbar-page">

              <span>
                COMMAND CENTER
              </span>

              <strong>
                {getPageTitle()}
              </strong>

            </div>

          </div>


          <div className="topbar-right">

            <div className="topbar-live">

              <span className="topbar-live-dot" />

              <span>
                LIVE
              </span>

            </div>


            <div className="topbar-divider" />


            <div className="topbar-security">

              <ShieldCheck
                size={16}
                strokeWidth={1.8}
              />

              <span>
                Secure
              </span>

            </div>

          </div>

        </header>


        {/* ========================================
            PAGE CONTENT
            ======================================== */}

        <main className="shell-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default AppShell;