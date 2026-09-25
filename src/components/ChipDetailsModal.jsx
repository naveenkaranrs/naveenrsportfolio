import React, { useState } from 'react';
import {
  X,
  Cpu,
  Award,
  Briefcase,
  Layers,
  CheckCircle2,
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Wrench
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { sounds } from '../audio/soundEngine';
import {
  personalInfo,
  skillsData,
  experienceData,
  certificationsData,
  freelanceProjectsData,
  achievementsData
} from '../data/portfolioData';

export default function ChipDetailsModal({ componentId, onClose, onOpenResume }) {
  const [copiedField, setCopiedField] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  if (!componentId) return null;

  const copyToClipboard = (text, field) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    sounds.playBootChime();
    setFormSent(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#090d15] border border-emerald-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200 font-mono">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Cpu size={18} />
            </div>
            <div>
              <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono">
                HARDWARE INSPECTION // {componentId.toUpperCase()}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {componentId === 'chip-mcu' && 'Core Firmware Engine & Architect'}
                {componentId === 'chip-freelance' && '20+ Freelance IoT Projects & Hackathons'}
                {componentId === 'chip-debug-lab' && 'Hardware Bring-Up & Validation Lab'}
                {componentId === 'chip-experience-certs' && 'Experience & Official Certifications'}
                {componentId === 'chip-contact' && 'Direct Transmission / Contact'}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          {/* 1. CENTRAL MCU (ABOUT NAVEEN & ARCHITECTURE) */}
          {componentId === 'chip-mcu' && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-emerald-400">{personalInfo.name}</h3>
                    <p className="text-xs text-slate-300">{personalInfo.title}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                    CGPA: {personalInfo.education.cgpa}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {personalInfo.summary}
                </p>
                <div className="text-[11px] text-slate-400 pt-1 flex items-center justify-between">
                  <span>{personalInfo.education.degree}</span>
                  <span className="text-cyan-400 font-bold">{personalInfo.education.institution}</span>
                </div>
              </div>

              {/* Skills Deep Dive */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Wrench size={14} className="text-emerald-400" />
                  Silicon & Architectural Mastery
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillsData.architecture.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200">{item.name}</span>
                        <span className="text-emerald-400 font-bold">{item.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${item.level}%` }} />
                      </div>
                      <div className="text-[10px] text-slate-500">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Protocols */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Layers size={14} className="text-cyan-400" />
                  Hardware Protocols & Buses
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {skillsData.protocols.map((p, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 text-xs">
                      <div className="font-bold text-cyan-300">{p.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. 20+ FREELANCE IoT & HACKATHONS */}
          {componentId === 'chip-freelance' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-amber-400 font-bold flex items-center gap-2">
                  <Award size={15} /> 20+ Freelance Client Prototypes Delivered
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Since 2024, developed end-to-end commercial embedded and IoT systems for clients across precision agriculture, industrial monitoring, fleet logistics, and biomedical devices.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {freelanceProjectsData.map((fp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="font-bold text-slate-100 text-xs">{fp.title}</div>
                    <div className="text-emerald-400 text-[11px] font-mono">{fp.tech}</div>
                    <div className="text-[10px] text-slate-500">{fp.client}</div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-black/60 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200">Hackathons & Leadership:</div>
                <ul className="space-y-1.5 text-xs text-slate-400 list-disc list-inside">
                  {achievementsData.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 3. HARDWARE BRING-UP & DEBUGGING LAB */}
          {componentId === 'chip-debug-lab' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-xs text-cyan-400 font-bold flex items-center gap-2">
                  <ShieldCheck size={16} /> Silicon Validation & Lab Equipment Competence
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Experienced with hardware bring-up from first power-rail verification to complex protocol bus arbitration analysis, timing jitter optimization, and in-circuit emulation.
                </p>
              </div>

              <div className="space-y-3">
                {skillsData.debugging.map((dbg, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-100 text-xs">{dbg.name}</div>
                      <div className="text-[11px] text-slate-400">{dbg.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                      {dbg.level}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. EXPERIENCE & CERTIFICATIONS */}
          {componentId === 'chip-experience-certs' && (
            <div className="space-y-6">
              {/* Experience */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase size={14} className="text-emerald-400" /> Professional Experience
                </h4>
                <div className="space-y-3">
                  {experienceData.map((exp, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-slate-100 text-xs">{exp.role}</span>
                        <span className="text-[11px] text-emerald-400 font-mono">{exp.period}</span>
                      </div>
                      <div className="text-[11px] text-cyan-300">{exp.organization} • {exp.location}</div>
                      <ul className="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
                        {exp.highlights.map((h, hi) => (
                          <li key={hi}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Award size={14} className="text-amber-400" /> Official Microchip & RTOS Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certificationsData.map((c, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-slate-200 text-xs leading-snug">{c.title}</span>
                      </div>
                      <div className="text-[11px] text-amber-400">{c.issuer}</div>
                      <div className="text-[10px] text-slate-500">{c.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. CONTACT & DIRECT TRANSMISSION */}
          {componentId === 'chip-contact' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail size={16} className="text-emerald-400" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Email Address</div>
                      <div className="text-xs text-slate-200 font-bold">{personalInfo.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email, 'email')}
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Phone size={16} className="text-cyan-400" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Direct Mobile</div>
                      <div className="text-xs text-slate-200 font-bold">{personalInfo.phone}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon size={16} className="text-sky-400" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">LinkedIn Profile</div>
                      <div className="text-xs text-slate-200 font-bold">{personalInfo.linkedinHandle}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400" />
                </a>

                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon size={16} className="text-slate-200" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">GitHub Repository</div>
                      <div className="text-xs text-slate-200 font-bold">{personalInfo.githubHandle}</div>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400" />
                </a>
              </div>

              {/* Direct Quick Transmission Message Form */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <Send size={14} /> Send Firmware Opportunity / Message
                </div>

                {formSent ? (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 size={16} />
                    <span>Hardware packet acknowledged! Thank you for reaching out.</span>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name / Recruiter Company"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="p-2 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-emerald-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="p-2 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-emerald-500"
                      />
                    </div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Transmission payload / project inquiry / role details..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Send size={13} /> Transmit Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
