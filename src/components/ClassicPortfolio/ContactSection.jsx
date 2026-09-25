import React from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import { sounds } from '../../audio/soundEngine';
import { personalInfo } from '../../data/portfolioData';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="container container--narrow">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">06. Get in Touch</div>
          <h2 className="section-title">Let's Build Something Together</h2>
          <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Seeking an entry-level Embedded/Firmware Engineer role in the semiconductor and hardware industry. Open to discussing firmware architectures, IoT deployments, and hardware collaborations.
          </p>
        </div>

        <div
          className="card hover-glow"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: 'var(--space-8)',
            background: 'var(--bg-card)',
            border: '1px solid rgba(0, 255, 102, 0.25)',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
          }}
        >
          {/* Direct Channels Grid */}
          <div
            className="contact__channels"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-4)'
            }}
          >
            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}?subject=Firmware%20Engineering%20Opportunity`}
              className="contact__channel hover-lift"
              onClick={() => sounds.playClick()}
              style={{
                padding: 'var(--space-5)',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="contact__channel-icon" style={{ background: 'rgba(0, 255, 102, 0.12)', color: 'var(--accent-primary)' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Direct Email
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {personalInfo.email}
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone}`}
              className="contact__channel hover-lift"
              onClick={() => sounds.playClick()}
              style={{
                padding: 'var(--space-5)',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="contact__channel-icon" style={{ background: 'rgba(0, 191, 255, 0.12)', color: 'var(--accent-tertiary)' }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Direct Phone
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {personalInfo.phone}
                </span>
              </div>
            </a>

            {/* Location */}
            <div
              className="contact__channel hover-lift"
              style={{
                cursor: 'default',
                padding: 'var(--space-5)',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="contact__channel-icon" style={{ background: 'rgba(212, 175, 55, 0.12)', color: 'var(--accent-secondary)' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Location
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__channel hover-lift"
              onClick={() => sounds.playClick()}
              style={{
                padding: 'var(--space-5)',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="contact__channel-icon" style={{ background: 'rgba(14, 165, 233, 0.12)', color: '#38bdf8' }}>
                <LinkedinIcon size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  LinkedIn Profile
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  in/{personalInfo.linkedinHandle}
                </span>
              </div>
            </a>
          </div>

          {/* Quick Connect Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-6)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <a
              href={`mailto:${personalInfo.email}?subject=Firmware%20Engineering%20Opportunity`}
              className="btn btn--primary btn--md flex items-center gap-2"
              onClick={() => sounds.playClick()}
            >
              <Mail size={16} /> Send Email Directly
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--md flex items-center gap-2"
              onClick={() => sounds.playClick()}
            >
              <LinkedinIcon size={16} /> Connect on LinkedIn
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary btn--md flex items-center gap-2"
              onClick={() => sounds.playClick()}
            >
              <GithubIcon size={16} /> GitHub Repositories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
