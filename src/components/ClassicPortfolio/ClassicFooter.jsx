import React from 'react';
import { ArrowUp, Heart, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Icons';
import { sounds } from '../../audio/soundEngine';
import { personalInfo } from '../../data/portfolioData';
import { downloadResumePDF } from '../../utils/downloadResume';

export default function ClassicFooter({ onOpen3DLab, onOpenResume }) {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <div className="footer__brand-name">{personalInfo.name}</div>
              <p className="footer__brand-desc">
                Embedded Firmware Engineer specializing in ARM Cortex-M microcontrollers, FreeRTOS deterministic kernels, and industrial/automotive protocol architecture.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer__heading">Navigation</h4>
              <ul className="footer__links">
                <li>
                  <a href="#about" className="footer__link" onClick={() => sounds.playClick()}>
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#skills" className="footer__link" onClick={() => sounds.playClick()}>
                    Technical Expertise
                  </a>
                </li>
                <li>
                  <a href="#projects" className="footer__link" onClick={() => sounds.playClick()}>
                    Engineering Portfolio
                  </a>
                </li>
                <li>
                  <a href="#experience" className="footer__link" onClick={() => sounds.playClick()}>
                    Career & Experience
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      sounds.playBootChime();
                      onOpen3DLab();
                    }}
                    className="footer__link flex items-center gap-1.5"
                    style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0 }}
                  >
                    <Cpu size={14} /> 3D Hardware Lab
                  </button>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="footer__heading">Connect</h4>
              <ul className="footer__links">
                <li>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                    onClick={() => sounds.playClick()}
                  >
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                    onClick={() => sounds.playClick()}
                  >
                    GitHub Repositories
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="footer__link"
                    onClick={() => sounds.playClick()}
                  >
                    Direct Email
                  </a>
                </li>
                <li>
                  <a
                    href="/CVNAVEENKARANRS.pdf"
                    download="CVNAVEENKARANRS.pdf"
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault();
                      sounds.playClick();
                      downloadResumePDF();
                    }}
                  >
                    Download Resume (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__bottom">
            <div className="footer__copyright">
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </div>

            <div className="footer__socials" style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
                onClick={() => sounds.playClick()}
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="GitHub"
                onClick={() => sounds.playClick()}
              >
                <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top is-visible"
        id="back-to-top"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
