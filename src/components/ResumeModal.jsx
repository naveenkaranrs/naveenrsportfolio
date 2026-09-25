import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Eye,
  FileCheck
} from 'lucide-react';
import { sounds } from '../audio/soundEngine';
import {
  personalInfo,
  skillsData,
  experienceData,
  projectsData,
  certificationsData,
  achievementsData
} from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' or 'ats'

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handleCopyText = () => {
    sounds.playClick();
    const resumeText = `
${personalInfo.name}
${personalInfo.title}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github} | Portfolio: ${personalInfo.portfolioUrl}

PROFESSIONAL SUMMARY
${personalInfo.summary}

TECHNICAL SKILLS
- Programming: Embedded C, C, C++, Python
- Microcontrollers: ARM Cortex-M, STM32, AVR, ESP32, Bare-Metal, DMA, Timers, PWM, ADC
- Communication Protocols: UART, SPI, I2C, CAN, USB, MODBUS, MQTT
- RTOS: FreeRTOS, QNX Neutrino RTOS, Embedded Linux
- Tools: STM32CubeIDE, QNX Momentics, Keil, PlatformIO, VS Code, Git, Proteus, KiCad
- Debugging: GDB, JTAG, SWD, Oscilloscope, Logic Analyzer

EXPERIENCE
${experienceData.map(e => `${e.role} | ${e.organization} (${e.period})\n${e.highlights.join('\n')}`).join('\n\n')}

TECHNICAL PROJECTS
${projectsData.map(p => `${p.title} (${p.year})\nTech: ${p.techStack.join(', ')}\nSummary: ${p.summary}`).join('\n\n')}

EDUCATION
${personalInfo.education.degree} | ${personalInfo.education.institution} (${personalInfo.education.period})
CGPA: ${personalInfo.education.cgpa}

Higher Secondary Certificate | Palaniappa Hr Sec School (2021 – 2023)
CGPA: 7.5
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md select-none animate-fade-in">
      <div
        className="relative w-full max-w-5xl bg-[#0c1018] border border-emerald-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-mono"
        style={{ height: '90vh', minHeight: '620px', width: '95vw', maxWidth: '1080px' }}
      >
        {/* Modal Controls Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2">
          {/* Title & View Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider hidden sm:flex">
              <FileCheck size={16} /> Naveen Karan R S — CV
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('pdf');
                }}
                className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                  viewMode === 'pdf'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={13} />
                <span>Original PDF</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setViewMode('ats');
                }}
                className={`px-3 py-1 rounded-md transition-all font-semibold flex items-center gap-1.5 ${
                  viewMode === 'ats'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye size={13} />
                <span>Interactive ATS</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Direct PDF Download */}
            <a
              href="/CVNAVEENKARANRS.pdf"
              download="CVNAVEENKARANRS.pdf"
              onClick={() => sounds.playClick()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
              title="Download official CV (PDF)"
            >
              <Download size={13} />
              <span className="hidden sm:inline">DOWNLOAD</span> CV
            </a>

            {/* Open in New Tab */}
            <a
              href="/CVNAVEENKARANRS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-all"
              title="Open PDF in new tab"
            >
              <ExternalLink size={13} />
              <span>POP OUT</span>
            </a>

            {viewMode === 'ats' && (
              <>
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-all"
                  title="Copy resume text"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span className="hidden sm:inline">{copied ? 'COPIED' : 'COPY'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs border border-slate-800 transition-all"
                  title="Print resume"
                >
                  <Printer size={13} />
                  <span className="hidden sm:inline">PRINT</span>
                </button>
              </>
            )}

            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF Embedded View */}
        {viewMode === 'pdf' ? (
          <div
            className="w-full bg-[#1e2430] flex flex-col relative overflow-hidden"
            style={{ flex: 1, height: 'calc(100% - 60px)', minHeight: '550px' }}
          >
            <iframe
              src="/CVNAVEENKARANRS.pdf#toolbar=1&navpanes=0&scrollbar=1"
              title="Official CV Naveen Karan R S"
              className="w-full border-0 bg-white"
              style={{ flex: 1, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        ) : (
          /* Printable / ATS Resume Document View */
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-900 font-sans print:p-0">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
              {personalInfo.name}
            </h1>
            <p className="text-sm font-semibold text-emerald-800 tracking-wide mt-0.5">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
              <span>{personalInfo.email}</span>
              <span>•</span>
              <span>{personalInfo.phone}</span>
              <span>•</span>
              <span>linkedin.com/in/{personalInfo.linkedinHandle}</span>
              <span>•</span>
              <span>github.com/{personalInfo.githubHandle}</span>
            </div>
          </div>

          {/* Section: Summary */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>

          {/* Section: Technical Skills */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1 text-slate-800">
              <p><strong>Programming Languages:</strong> C, C++, Embedded C, Python</p>
              <p><strong>Microcontrollers & Architecture:</strong> ARM Cortex-M, STM32, AVR, ESP32, Bare-Metal Programming, Register-Level Programming, Memory-Mapped I/O, DMA, Interrupts, Timers, PWM, ADC, GPIO</p>
              <p><strong>Communication Protocols:</strong> UART, SPI, I2C, CAN, USB, MODBUS, MQTT</p>
              <p><strong>RTOS & Systems:</strong> FreeRTOS, QNX Neutrino RTOS, Interrupt Handling (ISR), Task Scheduling, Semaphores, Embedded Linux, Low-Power Design</p>
              <p><strong>Development Tools:</strong> STM32CubeIDE, QNX Momentics, Keil, PlatformIO, VS Code, Git, GitHub, MATLAB, Proteus, KiCad</p>
              <p><strong>Debugging & Validation:</strong> GDB (breakpoints, watchpoints), JTAG, SWD, Oscilloscope, Logic Analyzer, Serial Debugging, Hardware Bring-Up, System-Level Testing</p>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Experience
            </h2>
            <div className="space-y-3">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.role} | {exp.organization}</span>
                    <span className="text-slate-600 font-normal">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside mt-1 text-slate-700 space-y-0.5">
                    {exp.highlights.map((h, hi) => (
                      <li key={hi}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Projects */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Technical Projects
            </h2>
            <div className="space-y-3">
              {projectsData.map((p, idx) => (
                <div key={idx} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{p.title}</span>
                    <span className="text-slate-600 font-normal">{p.year}</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-mono font-medium">
                    Tech Stack: {p.techStack.join(', ')}
                  </div>
                  <p className="mt-0.5 text-slate-700">{p.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Education
            </h2>
            <div className="mb-2">
              <div className="flex justify-between text-xs font-bold text-slate-900">
                <span>{personalInfo.education.degree} | {personalInfo.education.institution}</span>
                <span className="text-slate-600 font-normal">{personalInfo.education.period}</span>
              </div>
              <div className="text-xs text-slate-700">CGPA: {personalInfo.education.cgpa}</div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-900">
                <span>Higher Secondary Certificate | Palaniappa Hr Sec School</span>
                <span className="text-slate-600 font-normal">2021 – 2023</span>
              </div>
              <div className="text-xs text-slate-700">CGPA: 7.5</div>
            </div>
          </div>

          {/* Section: Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
              {certificationsData.map((c, idx) => (
                <li key={idx}>
                  <strong>{c.title}</strong> — {c.issuer}
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
