import React from 'react';
import { Award, Trophy, Zap, Radio, CheckCircle2 } from 'lucide-react';
import { achievementsData } from '../../data/portfolioData';

export default function AchievementsSection() {
  return (
    <section id="achievements-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-header" style={{ marginTop: 'var(--space-8)' }}>
          <div className="section-label">05. Recognition</div>
          <h2 className="section-title">Impact & Engineering Milestones</h2>
        </div>

        {/* Highlighted Research & System Deployments */}
        <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: '1.25rem', color: '#fff' }}>
          Key Technical Benchmarks
        </h3>

        <div className="publications__grid" style={{ marginBottom: 'var(--space-12)' }}>
          <div className="publication-card card card--flat hover-lift">
            <div className="publication-card__type" style={{ color: 'var(--accent-primary)' }}>
              Healthcare System Deployment (2025)
            </div>
            <h4 className="publication-card__title">
              "IoMT Real-Time Multi-Parameter ICU Patient Monitoring System"
            </h4>
            <p className="publication-card__desc">
              Achieved 96% real-time vital detection accuracy using STM32 DMA streaming and FreeRTOS deterministic task scheduling under rigorous clinical benchmark constraints.
            </p>
          </div>

          <div className="publication-card card card--flat hover-lift">
            <div className="publication-card__type" style={{ color: 'var(--accent-tertiary)' }}>
              Emergency V2I Infrastructure (2025)
            </div>
            <h4 className="publication-card__title">
              "Priority-Based Smart Ambulance–Hospital Communication Framework"
            </h4>
            <p className="publication-card__desc">
              Engineered a dynamic QoS prioritization algorithm combined with active RFID preemption, cutting emergency data packet latency by 40% and intersection wait times by 65%.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: '1.25rem', color: '#fff' }}>
          Leadership & Achievements
        </h3>

        <div className="achievements__grid">
          <div className="achievement-card card card--flat hover-lift">
            <div className="achievement-card__icon">🏆</div>
            <div>
              <h4 className="achievement-card__title">20+ Freelance Projects</h4>
              <p className="achievement-card__desc">
                Delivered full-stack embedded hardware & IoT solutions for agriculture, healthcare, and industrial telemetry.
              </p>
            </div>
          </div>

          <div className="achievement-card card card--flat hover-lift">
            <div className="achievement-card__icon">🥇</div>
            <div>
              <h4 className="achievement-card__title">15+ Hackathons & Sprints</h4>
              <p className="achievement-card__desc">
                Competitive rapid prototyping and hardware bring-up under time-pressured environments.
              </p>
            </div>
          </div>

          <div className="achievement-card card card--flat hover-lift">
            <div className="achievement-card__icon">🎤</div>
            <div>
              <h4 className="achievement-card__title">Technical Workshop Lead</h4>
              <p className="achievement-card__desc">
                Trained 50+ engineers in bare-metal microcontroller registers, FreeRTOS, and sensor interfacing.
              </p>
            </div>
          </div>

          <div className="achievement-card card card--flat hover-lift">
            <div className="achievement-card__icon">⚡</div>
            <div>
              <h4 className="achievement-card__title">ACM SIGBED KARE</h4>
              <p className="achievement-card__desc">
                R&D Technician conducting microcontroller benchmarking and real-time scheduling research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
