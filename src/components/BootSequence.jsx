import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, CheckCircle2, ChevronRight, Zap, FastForward } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

const BOOT_LOGS = [
  { delay: 40, text: "[  0.000000] RESET_HANDLER: Initializing ARM Cortex-M4 Silicon Core..." },
  { delay: 90, text: "[  0.024100] RCC: External 8.000MHz HSE Crystal detected & locked." },
  { delay: 140, text: "[  0.051200] RCC_PLL_CONFIG: PLL_M=8, PLL_N=336, PLL_P=2 => SYSCLK = 168.00 MHz" },
  { delay: 190, text: "[  0.089400] FLASH_ACR: Latency set to 5 wait states. ART Accelerator enabled." },
  { delay: 240, text: "[  0.124000] MEM_MAPPED_IO: 1024KB Flash @ 0x08000000, 192KB SRAM @ 0x20000000" },
  { delay: 300, text: "[  0.180200] NVIC: Interrupt priority grouping set to 4 bits preemption, 0 subpriority." },
  { delay: 360, text: "[  0.221500] BUS_INIT: USART1 (115200 8N1) | SPI1 (21MHz DMA) | I2C1 (Fast 400kHz) OK" },
  { delay: 420, text: "[  0.280100] CAN_CONTROLLER: ISO 11898-1 CAN-FD Mailboxes 0-2 ready @ 500kbps." },
  { delay: 480, text: "[  0.340000] FREERTOS_V10: Allocating dynamic heap (configTOTAL_HEAP_SIZE = 48KB)..." },
  { delay: 540, text: "[  0.395000] FREERTOS_TASKS: Spawning [vTaskBiosensors:Pri4], [vTaskQoS:Pri3], [vTaskCAN:Pri3]" },
  { delay: 610, text: "[  0.460000] HARDWARE_BRINGUP: Naveen Karan R S [Embedded Firmware Engineer]" },
  { delay: 680, text: "[  0.510000] SYSTEM_READY: 96% IoMT Accuracy, 40% Faster Smart Ambulance V2I." },
  { delay: 750, text: "[  0.580000] ALL PERIPHERALS NOMINAL: Launching 3D Interactive PCB Hardware Space..." }
];

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < BOOT_LOGS.length) {
        const item = BOOT_LOGS[currentIdx];
        if (item) {
          setLogs((prev) => [...prev, item]);
          sounds.playTerminalBlip();
        }
        currentIdx++;
        setProgress(Math.min(100, Math.round((currentIdx / BOOT_LOGS.length) * 100)));
      } else {
        clearInterval(interval);
        sounds.playBootChime();
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 110);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        sounds.playBootChime();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05080e] p-4 text-emerald-400 font-mono select-none overflow-hidden">
      {/* CRT Scanline & Phosphor Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,153,0.06)_0%,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-25" />

      <div className="relative w-full max-w-3xl rounded-xl border border-emerald-500/40 bg-black/90 p-6 shadow-2xl backdrop-blur-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-3 text-xs tracking-widest text-emerald-300 font-bold flex items-center gap-1.5">
              <Cpu size={14} /> STM32 BARE-METAL BOOTLOADER v2.4
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playBootChime();
              onComplete();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-950/60 hover:bg-emerald-500/20 text-xs text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer"
          >
            <FastForward size={13} /> SKIP [SPACE / ESC]
          </button>
        </div>

        {/* Scrolling Log Stream */}
        <div className="h-72 overflow-y-auto space-y-1.5 text-xs text-emerald-300/90 pr-2 scrollbar-thin">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 leading-relaxed animate-fade-in">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <span>{log.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-emerald-400">
            <span className="animate-pulse">_</span>
          </div>
        </div>

        {/* Progress Bar & Footer */}
        <div className="mt-5 border-t border-emerald-500/30 pt-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Zap size={14} className="text-amber-400" /> SYSTEM INITIALIZATION
            </span>
            <span className="font-bold text-emerald-400">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-900 border border-emerald-500/30 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(0,229,153,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400">
            <span>TARGET: STM32F407VGT6 @ 168MHz</span>
            <span>ENGINEER: NAVEEN KARAN R S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
