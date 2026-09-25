import React from 'react';
import { Cpu, Award, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { certificationsData } from '../../data/portfolioData';

const TECHNICAL_SKILLS = [
  { name: 'Embedded C & Register Drivers', percent: 96 },
  { name: 'ARM Cortex-M (M0/M3/M4)', percent: 94 },
  { name: 'STM32 (F4/F1/L4) & DMA', percent: 95 },
  { name: 'FreeRTOS & QNX Neutrino RTOS', percent: 92 },
  { name: 'CAN / CAN-FD Automotive Bus', percent: 90 },
  { name: 'UART, SPI & I2C Protocols', percent: 95 },
  { name: 'MODBUS RTU & Industrial Automation', percent: 88 },
  { name: 'Logic Analyzer & Oscilloscope Bring-Up', percent: 92 },
  { name: 'Python for Edge AI & OpenCV', percent: 85 }
];

const BADGES = [
  'ARM Cortex-M',
  'STM32CubeIDE',
  'FreeRTOS',
  'QNX Neutrino',
  'Embedded C',
  'CAN-FD',
  'SPI DMA',
  'I2C FastMode',
  'UART RingBuffer',
  'MODBUS RS-485',
  'MISRA-C',
  'GDB & SWD',
  'Saleae Logic',
  'MQTT',
  'PlatformIO',
  'KiCad PCB'
];

export default function SkillsSection() {
  return (
    <section id="skills">
      <div className="container">
        <div className="section-header">
          <div className="section-label">02. Expertise</div>
          <h2 className="section-title">Technical & Systems Mastery</h2>
        </div>

        <div className="skills__grid">
          {/* Left Column: Progress Bars & Tech Badges */}
          <div className="skills__technical">
            <h3 style={{ marginBottom: 'var(--space-6)', fontSize: '1.25rem', fontWeight: 600 }}>
              Technical Proficiencies
            </h3>

            <div className="skills__bars" id="skills-bars">
              {TECHNICAL_SKILLS.map((skill, idx) => (
                <div key={idx} className="skill-bar">
                  <div className="skill-bar__header">
                    <span className="skill-bar__name">{skill.name}</span>
                    <span className="skill-bar__percent">{skill.percent}%</span>
                  </div>
                  <div className="skill-bar__track">
                    <div
                      className="skill-bar__fill"
                      style={{
                        width: `${skill.percent}%`,
                        background: 'linear-gradient(90deg, #00ff66, #00bfff)'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="skills__tech-tags" style={{ marginTop: 'var(--space-8)' }}>
              {BADGES.map((b, i) => (
                <span key={i} className="badge">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Seminars, Workshops & Official Certifications */}
          <div className="skills__certifications">
            <h3 style={{ marginBottom: 'var(--space-6)', fontSize: '1.25rem', fontWeight: 600 }}>
              Workshops & Seminars
            </h3>

            <div className="certifications__list">
              <div className="cert-item hover-lift">
                <div className="cert-item__icon">
                  <BookOpen size={20} />
                </div>
                <div className="cert-item__name">
                  Next-Gen Embedded Systems & IoT Development
                  <br />
                  <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>
                    Conducted Hands-on Workshop for 50+ Undergraduate Engineers
                  </span>
                </div>
                <div className="cert-item__date">Instructor</div>
              </div>

              <div className="cert-item hover-lift">
                <div className="cert-item__icon">
                  <Cpu size={20} />
                </div>
                <div className="cert-item__name">
                  ARM Cortex-M Architecture & Deterministic RTOS
                  <br />
                  <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>
                    ACM SIGBED Student Chapter, KARE
                  </span>
                </div>
                <div className="cert-item__date">R&D Lead</div>
              </div>
            </div>

            <h3 style={{ marginBottom: 'var(--space-6)', marginTop: 'var(--space-8)', fontSize: '1.25rem', fontWeight: 600 }}>
              Official Certifications
            </h3>

            <div className="certifications__list">
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="cert-item hover-lift">
                  <div className="cert-item__icon">
                    <Award size={20} style={{ color: 'var(--accent-secondary)' }} />
                  </div>
                  <div className="cert-item__name">
                    {cert.title}
                    <br />
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)' }}>
                      {cert.issuer} • {cert.badge}
                    </span>
                  </div>
                  <div className="cert-item__date" style={{ color: 'var(--accent-primary)' }}>
                    Verified
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
