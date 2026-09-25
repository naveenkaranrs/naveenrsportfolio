import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Layers,
  Activity,
  Sliders,
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  RotateCcw,
  FileDown,
  Mail,
  Zap,
  Radio,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { sounds } from '../audio/soundEngine';
import { downloadResumePDF } from '../utils/downloadResume';

export default function HUDNavbar({
  activeView,
  setActiveView,
  onOpenResume,
  onOpenContact,
  onReboot,
  onReturnToPortfolio
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [sysTime, setSysTime] = useState('');
  const [heapFree, setHeapFree] = useState(38.4);

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      setSysTime(d.toTimeString().split(' ')[0]);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    // Subtle heap jitter simulation
    const heapInterval = setInterval(() => {
      setHeapFree((38.4 + (Math.random() * 0.8 - 0.4)).toFixed(1));
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(heapInterval);
    };
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
    if (!next) sounds.playClick();
  };

  const navItems = [
    { id: 'pcb', label: '3D PCB Explorer', icon: Cpu, badge: 'Hardware' },
    { id: 'telemetry', label: 'CAN & RTOS Telemetry', icon: Activity, badge: 'Live Bus' },
    { id: 'oscilloscope', label: 'Oscilloscope & Protocol Lab', icon: Sliders, badge: 'Signals' },
    { id: 'cli', label: 'Firmware Terminal', icon: TerminalIcon, badge: 'CLI' }
  ];

  return (
    <header className="h-[65px] bg-[#070b12]/95 border-b border-slate-800/90 px-4 flex items-center justify-between z-40 select-none backdrop-blur-md sticky top-0">
      {/* Brand & Silicon Specs */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => {
            sounds.playClick();
            setActiveView('pcb');
          }}
          className="cursor-pointer flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(0,229,153,0.3)]">
            <Cpu size={18} />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wider text-slate-100 font-mono flex items-center gap-2">
              <span>NAVEEN KARAN R S</span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ARM CORTEX-M
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSCLK: 168MHz
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="hidden md:inline">HEAP: {heapFree}KB FREE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Navigation Tabs */}
      <nav className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playRelay();
                setActiveView(item.id);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(0,229,153,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-emerald-400' : ''} />
              <span className="hidden md:inline font-medium">{item.label}</span>
              <span className="md:hidden font-medium">{item.badge}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Action Tools & Resume Button */}
      <div className="flex items-center gap-2">
        {/* Return to Classic Portfolio */}
        {onReturnToPortfolio && (
          <button
            onClick={() => {
              sounds.playClick();
              onReturnToPortfolio();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold transition-all shadow-md"
            title="Return to Main Web Portfolio"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Main Portfolio</span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-lg text-xs font-mono transition-all border ${
            isMuted
              ? 'bg-slate-900 text-slate-500 border-slate-800'
              : 'bg-slate-900 text-emerald-400 border-emerald-500/30 hover:bg-slate-800'
          }`}
          title={isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {/* Reboot MCU */}
        <button
          onClick={() => {
            sounds.playRelay();
            onReboot();
          }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 text-xs font-mono transition-all"
          title="Reboot MCU and Run Boot Diagnostics"
        >
          <RotateCcw size={13} />
          <span>REBOOT</span>
        </button>

        {/* Download Resume Button */}
        <a
          href="/CVNAVEENKARANRS.pdf"
          download="CVNAVEENKARANRS.pdf"
          onClick={(e) => {
            e.preventDefault();
            sounds.playClick();
            downloadResumePDF();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono shadow-[0_0_15px_rgba(0,229,153,0.35)] transition-all cursor-pointer"
          title="Download Official Resume (PDF)"
        >
          <FileDown size={14} />
          <span className="hidden sm:inline">RESUME</span>
        </a>

        {/* Contact Handshake */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenContact();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-all"
        >
          <Mail size={14} />
          <span className="hidden sm:inline">CONTACT</span>
        </button>
      </div>
    </header>
  );
}
