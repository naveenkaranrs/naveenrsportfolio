import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export default function EducationSection() {
  return (
    <section id="education" style={{ paddingTop: 0 }}>
      <div className="container container--narrow">
        <div className="section-label">Education</div>
        <h3 className="section-title">Academic Background</h3>

        <div className="education__content timeline">
          {/* Degree 1: Undergraduate */}
          <div className="timeline-item">
            <div className="timeline-item__dot"></div>
            <div className="timeline-item__date">2023 – 2027</div>
            <h4 className="timeline-item__title">Kalasalingam Academy of Research and Education (KARE)</h4>
            <div className="timeline-item__subtitle">B.Tech – Electronics and Communication Engineering</div>
            <div className="timeline-item__detail">
              Specialization: Embedded Firmware, Microcontrollers & Real-Time Operating Systems
            </div>
            <span className="badge badge--green timeline-item__badge" style={{ marginTop: '0.5rem' }}>
              8.0 CGPA
            </span>
          </div>

          {/* Degree 2: Higher Secondary */}
          <div className="timeline-item">
            <div className="timeline-item__dot"></div>
            <div className="timeline-item__date">2021 – 2023</div>
            <h4 className="timeline-item__title">Palaniappa Hr Sec School</h4>
            <div className="timeline-item__subtitle">Higher Secondary Certificate</div>
            <div className="timeline-item__detail">
              Completed higher secondary education with core focus on Mathematics, Physics, and Chemistry.
            </div>
            <span className="badge badge--green timeline-item__badge" style={{ marginTop: '0.5rem' }}>
              7.5 CGPA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
