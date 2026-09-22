import {
  Activity,
  Globe,
  Network as NetworkIcon,
  Server,
  ShieldCheck,
} from "lucide-react";

import "./Network.css";

function Network() {
  return (
    <div className="network-page">

      {/* PAGE HEADER */}

      <section className="network-header">

        <div>

          <div className="network-eyebrow">
            <NetworkIcon size={13} />
            INFRASTRUCTURE NETWORK
          </div>

          <h1>Network</h1>

          <p>
            Monitor network connectivity and infrastructure
            communication across monitored systems.
          </p>

        </div>

        <div className="network-live">
          <span />
          NETWORK ONLINE
        </div>

      </section>


      {/* NETWORK SUMMARY */}

      <section className="network-grid">

        <article className="network-card">

          <div className="network-card-icon">
            <Globe size={18} />
          </div>

          <span>NETWORK STATUS</span>

          <strong>98%</strong>

          <small>
            <Activity size={12} />
            Stable connectivity
          </small>

        </article>


        <article className="network-card">

          <div className="network-card-icon">
            <Server size={18} />
          </div>

          <span>ACTIVE NODES</span>

          <strong>04</strong>

          <small>
            All compute nodes connected
          </small>

        </article>


        <article className="network-card">

          <div className="network-card-icon">
            <ShieldCheck size={18} />
          </div>

          <span>SECURE CONNECTIONS</span>

          <strong>100%</strong>

          <small>
            Protected infrastructure
          </small>

        </article>

      </section>


      {/* NETWORK TOPOLOGY */}

      <section className="network-panel">

        <div className="network-panel-header">

          <div>
            <span>NETWORK TELEMETRY</span>

            <h2>Infrastructure Connectivity</h2>
          </div>

          <div className="network-status">
            <span />
            All connections operational
          </div>

        </div>


        <div className="network-topology">

          <div className="network-node network-node-main">

            <div className="network-node-icon">
              <NetworkIcon size={20} />
            </div>

            <strong>NEURAWATCH</strong>

            <span>Monitoring Core</span>

          </div>


          <div className="network-connection connection-one" />
          <div className="network-connection connection-two" />
          <div className="network-connection connection-three" />
          <div className="network-connection connection-four" />


          <div className="network-node network-node-one">

            <Server size={17} />

            <strong>Compute 01</strong>

            <span>ONLINE</span>

          </div>


          <div className="network-node network-node-two">

            <Server size={17} />

            <strong>Compute 02</strong>

            <span>ONLINE</span>

          </div>


          <div className="network-node network-node-three">

            <Server size={17} />

            <strong>Compute 03</strong>

            <span>ONLINE</span>

          </div>


          <div className="network-node network-node-four">

            <Server size={17} />

            <strong>Storage</strong>

            <span>ONLINE</span>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Network;