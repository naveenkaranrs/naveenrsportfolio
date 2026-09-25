import React from 'react';
import { Phone, Mail, MapPin, Cpu, Award, Briefcase, Zap, Download, FileText } from 'lucide-react';
import { LinkedinIcon } from '../Icons';
import { sounds } from '../../audio/soundEngine';
import { personalInfo } from '../../data/portfolioData';
import profileImg from '../../assets/profile.jpg';
import { downloadResumePDF } from '../../utils/downloadResume';

export default function AboutSection({ onOpenResume }) {
  return (
    <section id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-label">01. About Me</div>
          <h2 className="section-title">Embedded Firmware Developer</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p style={{ marginBottom: 'var(--space-4)', lineHeight: 1.7 }}>
              I am a final-year Electronics and Communication Engineering (ECE) student at Kalasalingam Academy of Research and Education, specializing in bare-metal embedded firmware, real-time operating systems (FreeRTOS, QNX), and low-level peripheral architecture.
            </p>
            <p style={{ marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>
              With 3+ years of hands-on freelance and practical embedded engineering experience, I have designed and deployed <strong>25+ embedded and IoT prototypes</strong> across industrial automation, medical IoMT, and smart automotive transportation. I am driven by deep-tech challenges in hardware-software co-design, deterministic latency optimization, and semiconductor bring-up.
            </p>

            <div className="about__info-cards">
              {/* Phone */}
              <div className="about__info-card hover-lift">
                <div className="about__info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="about__info-label">Phone</div>
                  <div className="about__info-value">
                    <a href={`tel:${personalInfo.phone}`} onClick={() => sounds.playClick()}>
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="about__info-card hover-lift">
                <div className="about__info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="about__info-label">Email</div>
                  <div className="about__info-value">
                    <a href={`mailto:${personalInfo.email}`} onClick={() => sounds.playClick()}>
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="about__info-card hover-lift">
                <div className="about__info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="about__info-label">Location</div>
                  <div className="about__info-value">{personalInfo.location}</div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="about__info-card hover-lift">
                <div className="about__info-icon">
                  <LinkedinIcon size={18} />
                </div>
                <div>
                  <div className="about__info-label">LinkedIn</div>
                  <div className="about__info-value">
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sounds.playClick()}
                    >
                      {personalInfo.linkedinHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Resume & CV Action Buttons */}
            <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <a
                href="/CVNAVEENKARANRS.pdf"
                download="CVNAVEENKARANRS.pdf"
                className="btn btn--primary btn--md flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playClick();
                  downloadResumePDF();
                }}
                title="Download Naveen Karan's Resume (PDF)"
              >
                <Download size={16} /> Download Resume (PDF)
              </a>
              <a
                href="#experience"
                className="btn btn--secondary btn--md flex items-center gap-2"
                onClick={() => sounds.playClick()}
                title="View Career & Experience"
              >
                <Briefcase size={16} /> View Experience
              </a>
            </div>
          </div>

          {/* Profile Emblem & Stat Cards */}
          <div className="about__photo-wrapper">
            <div className="about__photo-glow"></div>

            <div
              className="about__photo"
              style={{
                width: '280px',
                height: '320px',
                borderRadius: '24px',
                border: '3px solid var(--accent-primary)',
                boxShadow: '0 0 30px rgba(0, 255, 102, 0.35)',
                position: 'relative',
                overflow: 'hidden',
                background: '#0d121c'
              }}
            >
              <img
                src={profileImg}
                alt={personalInfo.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  display: 'block'
                }}
              />
            </div>

            <div className="about__stats">
              <a
                href="#projects"
                className="stat-card card card--flat hover-lift"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => sounds.playClick()}
                title="View 25+ IoT & Embedded Projects"
              >
                <div className="stat-card__value" style={{ color: 'var(--accent-primary)' }}>
                  25+
                </div>
                <div className="stat-card__label">IoT & Embedded Projects</div>
              </a>

              <a
                href="#skills"
                className="stat-card card card--flat hover-lift"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => sounds.playClick()}
                title="View 5+ Core Technologies Mastered"
              >
                <div className="stat-card__value" style={{ color: 'var(--accent-tertiary)' }}>
                  5+
                </div>
                <div className="stat-card__label">Core Technologies Mastered</div>
              </a>

              <a
                href="#experience"
                className="stat-card card card--flat hover-lift"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => sounds.playClick()}
                title="View 3+ Years Practical Embedded Experience"
              >
                <div className="stat-card__value" style={{ color: 'var(--accent-secondary)' }}>
                  3+
                </div>
                <div className="stat-card__label">Years Practical Embedded Experience</div>
              </a>

              <a
                href="#achievements-section"
                className="stat-card card card--flat hover-lift"
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => sounds.playClick()}
                title="View 15+ Hackathons"
              >
                <div className="stat-card__value" style={{ color: '#00e5ff' }}>
                  15+
                </div>
                <div className="stat-card__label">Hackathons</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
