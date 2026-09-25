import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, ArrowDown, FileText, Download, Send, Sparkles, ChevronDown } from 'lucide-react';
import { sounds } from '../../audio/soundEngine';
import { personalInfo } from '../../data/portfolioData';
import { downloadResumePDF } from '../../utils/downloadResume';

const TAGLINES = [
  "Embedded Firmware Engineer",
  "ARM Cortex-M & STM32 Specialist",
  "FreeRTOS & Real-Time Systems",
  "Automotive CAN & Edge IoT Architect"
];

const TERMINAL_LINES = [
  "$ ./nk_boot_sequence.sh --target=STM32F407",
  "[  0.000] RESET: Initializing ARM Cortex-M4 @ 168MHz",
  "[  0.042] MEMORY: Flash 1MB @ 0x08000000, SRAM 192KB OK",
  "[  0.110] FREERTOS: Kernel scheduler running (1000Hz)",
  "[  0.180] BUSES: CAN-FD, SPI (21MHz DMA), UART1, I2C1 READY",
  "[  0.250] ENGINEER: Naveen Karan R S [Firmware v2.4.0]",
  "[  0.310] METRICS: 96% IoMT Accuracy | 40% Faster V2I",
  "[  0.390] ALL SYSTEMS NOMINAL -> HARDWARE READY."
];

export default function HeroSection({ onOpen3DLab, onOpenResume }) {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [termLines, setTermLines] = useState([]);

  // Typewriter effect
  useEffect(() => {
    const fullText = TAGLINES[typewriterIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTypewriterIndex((prev) => (prev + 1) % TAGLINES.length);
      } else {
        const nextText = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typewriterIndex]);

  // Terminal line printer
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < TERMINAL_LINES.length) {
        const nextLine = TERMINAL_LINES[idx];
        if (nextLine) {
          setTermLines((prev) => [...prev, nextLine]);
        }
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="container hero__container">
        <div className="hero__gradient"></div>
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__greeting">Hello, I'm</div>
            <h1 className="hero__name">
              <span className="gradient-text-animated">{personalInfo.name}</span>
            </h1>
            <div className="hero__tagline">
              <span>{currentText}</span>
              <span className="typed-cursor">|</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)', maxWidth: '580px', lineHeight: 1.6 }}>
              Specializing in bare-metal register programming, deterministic FreeRTOS architectures, automotive CAN-FD bus communication, and high-reliability embedded firmware.
            </p>

            <div className="hero__ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <a
                href="#contact"
                className="btn btn--primary btn--lg"
                onClick={() => sounds.playClick()}
              >
                Let's Talk
              </a>

              <a
                href="/CVNAVEENKARANRS.pdf"
                download="CVNAVEENKARANRS.pdf"
                onClick={(e) => {
                  e.preventDefault();
                  sounds.playClick();
                  downloadResumePDF();
                }}
                className="btn btn--secondary btn--lg flex items-center gap-2"
                title="Download Naveen Karan's Resume (PDF)"
              >
                <Download size={18} /> Download Resume
              </a>

              <button
                onClick={() => {
                  sounds.playBootChime();
                  onOpen3DLab();
                }}
                className="btn btn--secondary btn--lg flex items-center gap-2"
                style={{
                  borderColor: 'var(--accent-primary)',
                  color: 'var(--accent-primary)'
                }}
              >
                <Cpu size={18} /> Launch 3D Hardware Lab
              </button>
            </div>
          </div>

          {/* Hero Terminal Window */}
          <div className="hero__terminal">
            <div className="terminal__header">
              <span className="terminal__dot" style={{ background: '#ff5f56' }}></span>
              <span className="terminal__dot" style={{ background: '#ffbd2e' }}></span>
              <span className="terminal__dot" style={{ background: '#27c93f' }}></span>
              <span className="terminal__title">nk_boot_sequence.sh</span>
            </div>
            <div className="terminal__body" id="terminal-body">
              {termLines.map((line, i) => (
                <div key={i} className="terminal__line" style={{ color: (line || '').startsWith('$') ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                  {line}
                </div>
              ))}
              <div className="terminal__line" style={{ color: 'var(--accent-primary)' }}>
                <span className="terminal__prompt">&gt;</span> <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        <a href="#about" className="hero__scroll-indicator" onClick={() => sounds.playClick()}>
          Scroll to explore
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
