import React, { useState } from 'react';
import { Sun, Moon, Cpu, Menu, X, Zap, Download, FileText } from 'lucide-react';
import { sounds } from '../../audio/soundEngine';
import { downloadResumePDF } from '../../utils/downloadResume';

export default function ClassicHeader({
  theme,
  toggleTheme,
  onOpen3DLab,
  onOpenResume
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Expertise', href: '#skills' },
    { label: 'Portfolio', href: '#projects' },
    { label: 'Career', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header className="header" id="header">
        <div className="header__inner">
          <a
            href="#"
            className="header__logo"
            onClick={() => sounds.playClick()}
          >
            <span className="header__logo-mark">NK</span>
            <span className="sr-only">Naveen Karan R S</span>
          </a>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="header__nav-link"
                    onClick={() => sounds.playClick()}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="header__actions">
              {/* 3D Hardware Lab Toggle Button */}
              <button
                onClick={() => {
                  sounds.playBootChime();
                  onOpen3DLab();
                }}
                className="btn btn--primary btn--sm flex items-center gap-1.5"
                style={{
                  background: 'linear-gradient(135deg, #00ff66 0%, #00bfff 100%)',
                  boxShadow: '0 0 15px rgba(0, 255, 102, 0.4)'
                }}
                title="Switch to 3D PCB & Silicon Lab"
              >
                <Cpu size={15} />
                <span>3D Hardware Lab</span>
              </button>

              {/* CV / Resume Download Button */}
              <a
                href="/CVNAVEENKARANRS.pdf"
                download="CVNAVEENKARANRS.pdf"
                className="btn btn--secondary btn--sm flex items-center gap-1.5"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playClick();
                  downloadResumePDF();
                }}
                title="Download Naveen Karan's Resume (PDF)"
              >
                <Download size={14} />
                <span>Resume</span>
              </a>

              {/* Theme Toggle */}
              <button
                className="header__theme-toggle"
                aria-label="Toggle dark/light mode"
                onClick={() => {
                  sounds.playRelay();
                  toggleTheme();
                }}
              >
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <a
                href="#contact"
                className="btn btn--secondary btn--sm"
                onClick={() => sounds.playClick()}
              >
                Hire Me
              </a>

              {/* Mobile Hamburger */}
              <button
                className="header__hamburger"
                aria-label="Menu"
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav className="mobile-nav is-open" id="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav__link"
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              sounds.playBootChime();
              setMobileMenuOpen(false);
              onOpen3DLab();
            }}
            className="btn btn--primary"
            style={{ width: '100%', marginTop: '1rem' }}
          >
            <Cpu size={16} /> Launch 3D Hardware Lab
          </button>
          <a
            href="/CVNAVEENKARANRS.pdf"
            download="CVNAVEENKARANRS.pdf"
            className="btn btn--secondary"
            style={{ width: '100%', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={(e) => {
              e.preventDefault();
              sounds.playClick();
              setMobileMenuOpen(false);
              downloadResumePDF();
            }}
          >
            <Download size={15} /> Download Resume (PDF)
          </a>
        </nav>
      )}
    </>
  );
}
