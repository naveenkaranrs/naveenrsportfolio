import React, { useState } from 'react';
import {
  Activity,
  Rocket,
  FileText,
  Zap,
  Cpu,
  Terminal,
  Radio
} from 'lucide-react';
import { sounds } from '../../audio/soundEngine';
import './AchievementsSection.css';

export default function AchievementsSection() {
  // Interactive toggle for roadmap checkboxes
  const [checkedRoadmap, setCheckedRoadmap] = useState({});

  const toggleRoadmapItem = (index) => {
    if (sounds?.playRelay) {
      sounds.playRelay();
    } else if (sounds?.playTerminalBlip) {
      sounds.playTerminalBlip();
    }
    setCheckedRoadmap((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 1. Engineering Metrics Dashboard — ONLY the 6 specified metrics, NO (Recommended), NO ✅
  const engineeringMetrics = [
    "25+ Projects Built",
    "7+ Microcontrollers Used",
    "10+ Workshop Conducted",
    "50+ Sensors Interfaced",
    "15+ Hackathons Participated",
    "20+ Prototype PCBs Tested"
  ];

  // 2. Firmware Mission Log — ONLY the 3 specified missions
  const missionLogs = [
    {
      id: "Mission #001",
      name: "Developed V2I Smart Ambulance Framework",
      status: "SUCCESS",
      statusClass: "mission-status--success",
      desc: "Priority-based RF preemption and dynamic QoS communication algorithm reducing emergency packet latency by 40%."
    },
    {
      id: "Mission #002",
      name: "ASTRA-GDS Satellite Digital Twin",
      status: "DEPLOYED",
      statusClass: "mission-status--deployed",
      desc: "Real-time satellite attitude estimation, orbital packet telemetry decoding, and ground station twin emulation."
    },
    {
      id: "Mission #003",
      name: "nasa Space Apps Challenge",
      status: "ACTIVE DEVELOPMENT",
      statusClass: "mission-status--active",
      desc: "Planetary payload sensor acquisition, aerospace fault telemetry logging, and mission-critical firmware bring-up."
    }
  ];

  // 3. Open Source & Research Tracker — ONLY the 4 specified contributions
  const researchItems = [
    "help for reserch paper published: 10+",
    "Embedded Research Papers Reviewed: 15+",
    "Technical Workshops Conducted: 7",
    "Documentation Written: 250+ Pages"
  ];

  // 4. "Future Missions" — ONLY the 6 specified roadmap objectives, NO extras
  const roadmapItems = [
    { title: "Linux Device Drivers", sub: "Kernel module bring-up, char/block drivers, memory-mapped I/O" },
    { title: "AUTOSAR Development", sub: "Classic & Adaptive AUTOSAR stacks for automotive Tier-1 ECUs" },
    { title: "FPGA Design (Verilog/VHDL)", sub: "Hardware accelerator synthesis, DSP pipelines, high-speed interfaces" },
    { title: "Satellite Onboard Computer", sub: "Radiation-tolerant fault-tolerant space flight architecture" },
    { title: "Semiconductor Firmware Engineer", sub: "Silicon validation, pre-silicon FPGA emulation, silicon bring-up" },
    { title: "ISRO / Space-Tech R&D", sub: "Advanced space propulsion telemetry, ground-link payloads, guidance systems" }
  ];

  return (
    <section id="achievements-section" style={{ paddingTop: 0 }}>
      <div className="container">
        {/* Section Header with exact established font styles */}
        <div className="section-header" style={{ marginTop: 'var(--space-8)' }}>
          <div className="section-label">05. Recognition</div>
          <h2 className="section-title">Impact & Engineering Milestones</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
            Real engineering statistics, deployed flight logs, research contributions, and strategic 2026–2030 silicon roadmap.
          </p>
        </div>

        {/* 2x2 Aerospace Command Center Grid */}
        <div className="mission-control-grid">
          {/* ============================================================== */}
          {/* 1. ENGINEERING METRICS DASHBOARD */}
          {/* ============================================================== */}
          <div className="mission-card">
            <div className="mission-card__terminal-bar">
              <div className="mission-card__terminal-dots">
                <span className="mission-card__dot mission-card__dot--red" />
                <span className="mission-card__dot mission-card__dot--yellow" />
                <span className="mission-card__dot mission-card__dot--green" />
              </div>
              <span className="mission-card__terminal-title">[SYS.METRICS] STATS // 01</span>
              <span className="mission-card__terminal-status">
                <span className="mission-card__status-beacon" />
                VERIFIED
              </span>
            </div>

            <div className="mission-card__body">
              <div className="mission-card__badge">
                <Activity size={13} />
                1. Engineering Metrics Dashboard
              </div>

              <h3 className="mission-card__heading">Real Engineering Statistics</h3>
              <p className="mission-card__subtext">
                Show real numbers instead of achievements.
              </p>

              <div className="mission-stats-list">
                {engineeringMetrics.map((item, idx) => (
                  <div key={idx} className="mission-stat-row">
                    <span className="mission-stat-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 2. FIRMWARE MISSION LOG */}
          {/* ============================================================== */}
          <div className="mission-card">
            <div className="mission-card__terminal-bar">
              <div className="mission-card__terminal-dots">
                <span className="mission-card__dot mission-card__dot--red" />
                <span className="mission-card__dot mission-card__dot--yellow" />
                <span className="mission-card__dot mission-card__dot--green" />
              </div>
              <span className="mission-card__terminal-title">[FLIGHT.LOG] OPS // 02</span>
              <span className="mission-card__terminal-status">
                <span className="mission-card__status-beacon mission-card__status-beacon--cyan" />
                LIVE_FEED
              </span>
            </div>

            <div className="mission-card__body">
              <div className="mission-card__badge mission-card__badge--tertiary">
                <Rocket size={13} />
                2. "Firmware Mission Log"
              </div>

              <h3 className="mission-card__heading">Firmware Mission Log</h3>
              <p className="mission-card__subtext">
                Gamify your experience. Matches your terminal/3D theme perfectly.
              </p>

              <div className="mission-log-list">
                {missionLogs.map((m, idx) => (
                  <div key={idx} className="mission-log-item">
                    <div className="mission-log-header">
                      <span className="mission-id">{m.id}</span>
                      <span className={`mission-status-pill ${m.statusClass}`}>
                        ● Status: {m.status}
                      </span>
                    </div>
                    <div className="mission-name">{m.name}</div>
                    <div className="mission-desc">{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3. OPEN SOURCE & RESEARCH TRACKER */}
          {/* ============================================================== */}
          <div className="mission-card">
            <div className="mission-card__terminal-bar">
              <div className="mission-card__terminal-dots">
                <span className="mission-card__dot mission-card__dot--red" />
                <span className="mission-card__dot mission-card__dot--yellow" />
                <span className="mission-card__dot mission-card__dot--green" />
              </div>
              <span className="mission-card__terminal-title">[RESEARCH.TRACKER] LOG // 03</span>
              <span className="mission-card__terminal-status">
                <span className="mission-card__status-beacon" />
                CREDENTIALS
              </span>
            </div>

            <div className="mission-card__body">
              <div className="mission-card__badge">
                <FileText size={13} />
                3. Open Source & Research Tracker
              </div>

              <h3 className="mission-card__heading">Knowledge Contributions</h3>
              <p className="mission-card__subtext">
                Show technical credibility.
              </p>

              <div className="mission-stats-list">
                {researchItems.map((item, idx) => (
                  <div key={idx} className="mission-stat-row">
                    <span className="mission-stat-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 4. "FUTURE MISSIONS" (2026-2030 MISSION ROADMAP) */}
          {/* ============================================================== */}
          <div className="mission-card">
            <div className="mission-card__terminal-bar">
              <div className="mission-card__terminal-dots">
                <span className="mission-card__dot mission-card__dot--red" />
                <span className="mission-card__dot mission-card__dot--yellow" />
                <span className="mission-card__dot mission-card__dot--green" />
              </div>
              <span className="mission-card__terminal-title">[ROADMAP] 2026-2030 // 04</span>
              <span className="mission-card__terminal-status">
                <span className="mission-card__status-beacon mission-card__status-beacon--amber" />
                TARGET_TRAJECTORY
              </span>
            </div>

            <div className="mission-card__body">
              <div className="mission-card__badge mission-card__badge--secondary">
                <Zap size={13} />
                4. "Future Missions"
              </div>

              <h3 className="mission-card__heading">2026-2030 Mission Roadmap</h3>
              <p className="mission-card__subtext">
                Strategic aerospace, semiconductor, and embedded firmware roadmap.
              </p>

              <div className="mission-roadmap-list">
                {roadmapItems.map((item, idx) => {
                  const isChecked = !!checkedRoadmap[idx];
                  return (
                    <div
                      key={idx}
                      className={`mission-roadmap-item ${isChecked ? 'is-checked' : ''}`}
                      onClick={() => toggleRoadmapItem(idx)}
                      title="Click to toggle objective status"
                    >
                      <span className="mission-roadmap-box">
                        {isChecked ? '☑' : '□'}
                      </span>
                      <div className="mission-roadmap-content">
                        <span className="mission-roadmap-text">{item.title}</span>
                        <span className="mission-roadmap-sub">{item.sub}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Command Center Philosophy Banner & Recommendation */}
        <div className="mission-philosophy-banner">
          <div className="mission-philosophy-header">
            <span className="mission-card__status-beacon" />
            <span className="mission-philosophy-tag">My Top Recommendation</span>
          </div>
          <h4 className="mission-philosophy-title">
            Embedded Systems Command Center Architecture 🚀
          </h4>
          <p className="mission-philosophy-quote">
            "This combination is much more unique than generic awards and makes your portfolio feel like a real embedded engineer's command center rather than a student portfolio. The aerospace + terminal theme of your site makes the 'Mission Log' and 'Roadmap' sections especially powerful."
          </p>
          <div className="mission-telemetry-strip">
            <div className="mission-telemetry-badge">
              <Cpu size={13} /> 25+ Projects Built
            </div>
            <div className="mission-telemetry-badge">
              <Terminal size={13} /> 50+ Sensors Interfaced
            </div>
            <div className="mission-telemetry-badge">
              <Radio size={13} /> 7 Microcontrollers Interfaced
            </div>
            <div className="mission-telemetry-badge">
              <Rocket size={13} /> 2026-2030 Aerospace Roadmap
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
