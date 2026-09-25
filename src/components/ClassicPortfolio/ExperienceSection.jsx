import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experienceData } from '../../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-label">04. Career</div>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {experienceData.map((exp, idx) => (
            <div key={idx} className="experience__card card hover-lift">
              <div className="experience__header">
                <div
                  className="experience__logo"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 255, 102, 0.1)',
                    border: '1px solid rgba(0, 255, 102, 0.3)',
                    borderRadius: '12px',
                    color: 'var(--accent-primary)'
                  }}
                >
                  <Briefcase size={28} />
                </div>
                <div className="experience__details">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>{exp.role}</h3>
                  <h4 style={{ color: 'var(--accent-primary)', fontWeight: 500, fontSize: '1rem' }}>
                    {exp.organization}
                  </h4>
                </div>
              </div>

              <div className="experience__meta" style={{ marginTop: '0.75rem' }}>
                <span className="experience__meta-item flex items-center gap-1.5">
                  <Calendar size={15} />
                  {exp.period}
                </span>
                <span className="experience__meta-item flex items-center gap-1.5">
                  <MapPin size={15} />
                  {exp.location}
                </span>
              </div>

              <ul className="experience__list mt-4" style={{ marginTop: '1rem', lineHeight: 1.7 }}>
                {exp.highlights.map((h, hi) => (
                  <li key={hi} style={{ color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
