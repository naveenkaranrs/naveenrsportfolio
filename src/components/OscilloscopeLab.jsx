import React, { useState, useEffect, useRef } from 'react';
import {
  Sliders,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Info,
  Radio,
  Cpu
} from 'lucide-react';
import { sounds } from '../audio/soundEngine';

export default function OscilloscopeLab() {
  const canvasRef = useRef(null);
  const [activeChannel, setActiveChannel] = useState('pwm'); // 'pwm', 'ecg', 'uart', 'spi', 'can'
  const [isRunning, setIsRunning] = useState(true);
  const [timeDiv, setTimeDiv] = useState(1); // multiplier
  const [voltsDiv, setVoltsDiv] = useState(1);

  // Channel-specific interactive parameters
  const [pwmDuty, setPwmDuty] = useState(65); // 65%
  const [pwmFreq, setPwmFreq] = useState(25); // 25 kHz
  const [ecgHeartRate, setEcgHeartRate] = useState(72); // 72 BPM
  const [uartByte, setUartByte] = useState('0xA5');

  // Animation loop ref
  const animRef = useRef(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderScope = () => {
      if (!canvas) return;
      const width = canvas.width;
      const height = canvas.height;

      // Dark oscilloscope CRT screen background
      ctx.fillStyle = '#050a08';
      ctx.fillRect(0, 0, width, height);

      // Graticule grid lines (divs)
      ctx.strokeStyle = 'rgba(0, 229, 153, 0.12)';
      ctx.lineWidth = 1;
      const gridCols = 10;
      const gridRows = 8;
      const stepX = width / gridCols;
      const stepY = height / gridRows;

      for (let x = 0; x <= width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshairs with tick marks
      ctx.strokeStyle = 'rgba(0, 229, 153, 0.3)';
      ctx.lineWidth = 1.5;
      const midY = height / 2;
      const midX = width / 2;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, height);
      ctx.stroke();

      // Render waveforms based on activeChannel
      if (isRunning) {
        phaseRef.current += 0.05 * timeDiv;
      }
      const phase = phaseRef.current;

      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;

      if (activeChannel === 'pwm') {
        // Channel 1: PWM Motor Waveform
        ctx.strokeStyle = '#00e599';
        ctx.shadowColor = '#00e599';
        ctx.beginPath();

        const period = (width / 5) / (pwmFreq / 10);
        const dutyWidth = (period * pwmDuty) / 100;
        const highY = midY - 60 * voltsDiv;
        const lowY = midY + 40 * voltsDiv;

        for (let x = 0; x < width; x++) {
          const modX = (x + phase * 60) % period;
          const y = modX < dutyWidth ? highY : lowY;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeChannel === 'ecg') {
        // Channel 2: IoMT ICU Patient ECG Waveform (P-Q-R-S-T)
        ctx.strokeStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.beginPath();

        const ecgPeriod = width / (ecgHeartRate / 35);
        for (let x = 0; x < width; x++) {
          const t = ((x + phase * 40) % ecgPeriod) / ecgPeriod;
          let y = midY;

          // P Wave
          if (t > 0.15 && t < 0.25) {
            y -= Math.sin((t - 0.15) * 10 * Math.PI) * 15 * voltsDiv;
          }
          // Q Dip
          else if (t > 0.32 && t < 0.35) {
            y += Math.sin((t - 0.32) * 33.3 * Math.PI) * 18 * voltsDiv;
          }
          // R Peak (Tall spike)
          else if (t >= 0.35 && t <= 0.42) {
            y -= Math.sin((t - 0.35) * 14.3 * Math.PI) * 110 * voltsDiv;
          }
          // S Dip
          else if (t > 0.42 && t < 0.46) {
            y += Math.sin((t - 0.42) * 25 * Math.PI) * 30 * voltsDiv;
          }
          // T Wave
          else if (t > 0.55 && t < 0.75) {
            y -= Math.sin((t - 0.55) * 5 * Math.PI) * 28 * voltsDiv;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeChannel === 'uart') {
        // Channel 3: UART 115200 8N1 Frame
        ctx.strokeStyle = '#ffb020';
        ctx.shadowColor = '#ffb020';
        ctx.beginPath();

        // 10 bits: Start(0), 8 Data bits (1,0,1,0,0,1,0,1), Stop(1)
        const bits = [0, 1, 0, 1, 0, 0, 1, 0, 1, 1];
        const bitWidth = width / 12;
        const highY = midY - 50 * voltsDiv;
        const lowY = midY + 50 * voltsDiv;

        for (let x = 0; x < width; x++) {
          const bitIdx = Math.floor(((x + phase * 30) % (bitWidth * bits.length)) / bitWidth);
          const val = bits[bitIdx] || 1;
          const y = val === 1 ? highY : lowY;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeChannel === 'spi') {
        // Channel 4: SPI Synchronous Clock (SCK) and Master Out Slave In (MOSI)
        // Draw SCK (Cyan)
        ctx.strokeStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.beginPath();
        const sckPeriod = 35 / timeDiv;
        for (let x = 0; x < width; x++) {
          const mod = (x + phase * 50) % sckPeriod;
          const y = mod < sckPeriod / 2 ? midY - 65 * voltsDiv : midY - 15 * voltsDiv;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Draw MOSI (Emerald)
        ctx.strokeStyle = '#00e599';
        ctx.shadowColor = '#00e599';
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const byteIdx = Math.floor((x + phase * 50) / (sckPeriod * 2));
          const val = byteIdx % 2 === 0 ? 1 : 0;
          const y = val ? midY + 20 * voltsDiv : midY + 70 * voltsDiv;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeChannel === 'can') {
        // Channel 5: CAN-FD Differential (CAN_H in Amber, CAN_L in Cyan)
        const canPeriod = 80 / timeDiv;

        // CAN_H
        ctx.strokeStyle = '#ffb020';
        ctx.shadowColor = '#ffb020';
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const isDominant = Math.sin((x + phase * 60) / 40) > 0;
          const y = isDominant ? midY - 50 * voltsDiv : midY - 10 * voltsDiv;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // CAN_L
        ctx.strokeStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const isDominant = Math.sin((x + phase * 60) / 40) > 0;
          const y = isDominant ? midY + 50 * voltsDiv : midY + 10 * voltsDiv;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(renderScope);
    };

    renderScope();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeChannel, isRunning, timeDiv, voltsDiv, pwmDuty, pwmFreq, ecgHeartRate]);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-6 bg-[#070a10] text-slate-200 font-mono space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs tracking-wider uppercase font-bold">
            <Sliders size={15} /> Mixed-Signal Verification Lab
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide mt-1">
            200MHz Digital Oscilloscope & Protocol Logic Analyzer
          </h1>
        </div>

        {/* Channels Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'pwm', label: 'CH1: PWM Motor', color: 'emerald' },
            { id: 'ecg', label: 'CH2: IoMT ECG', color: 'cyan' },
            { id: 'uart', label: 'CH3: UART 8N1', color: 'amber' },
            { id: 'spi', label: 'CH4: SPI Bus', color: 'sky' },
            { id: 'can', label: 'CH5: CAN-FD Diff', color: 'purple' }
          ].map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                sounds.playRelay();
                setActiveChannel(ch.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeChannel === ch.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Screen + Scope Hardware Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Oscilloscope Screen (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950/95 border border-slate-800/80 rounded-xl p-4 shadow-2xl flex flex-col items-center">
          {/* Bezel & Screen Glass */}
          <div className="relative w-full rounded-lg overflow-hidden border-2 border-emerald-500/30 shadow-[inset_0_0_20px_rgba(0,229,153,0.15)]">
            <canvas
              ref={canvasRef}
              width={800}
              height={420}
              className="w-full h-auto block bg-black"
            />

            {/* Oscilloscope HUD Telemetry Overlays */}
            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-emerald-500/30 text-[11px] text-emerald-400 flex items-center gap-3">
              <span>TRIG: AUTO</span>
              <span>TIME/DIV: {(100 * timeDiv).toFixed(0)} μs</span>
              <span>VOLTS/DIV: {(1.0 * voltsDiv).toFixed(1)} V</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded border border-emerald-500/30 text-[11px] text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE DSO SAMPLING (1 GS/s)</span>
            </div>
          </div>

          {/* Quick Hardware Buttons Under Bezel */}
          <div className="w-full flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playRelay();
                  setIsRunning(!isRunning);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isRunning
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isRunning ? <Pause size={14} /> : <Play size={14} />}
                {isRunning ? 'FREEZE / HOLD' : 'RUN ACQUISITION'}
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setTimeDiv(1);
                  setVoltsDiv(1);
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-xs hover:bg-slate-800"
              >
                <RotateCcw size={13} /> AUTO-SCALE
              </button>
            </div>

            {/* Timebase / Voltage Multipliers */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <span>TIME:</span>
                <button
                  onClick={() => setTimeDiv((prev) => Math.max(0.5, prev - 0.25))}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  -
                </button>
                <button
                  onClick={() => setTimeDiv((prev) => Math.min(3, prev + 0.25))}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-1">
                <span>VOLT:</span>
                <button
                  onClick={() => setVoltsDiv((prev) => Math.max(0.5, prev - 0.25))}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  -
                </button>
                <button
                  onClick={() => setVoltsDiv((prev) => Math.min(2.5, prev + 0.25))}
                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Signal Generator & Parameter Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-950/90 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Zap size={16} className="text-amber-400" /> Signal Generator & Math
            </h2>
          </div>

          {/* Conditional Control depending on channel */}
          {activeChannel === 'pwm' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Active STM32 Timer PWM Generator (TIM1_CH1 / Motor Driver):
              </div>

              {/* Duty Cycle Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">PWM Duty Cycle:</span>
                  <span className="font-bold text-emerald-400">{pwmDuty}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={pwmDuty}
                  onChange={(e) => setPwmDuty(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Frequency Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Switching Frequency:</span>
                  <span className="font-bold text-cyan-400">{pwmFreq} kHz</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={pwmFreq}
                  onChange={(e) => setPwmFreq(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Calculated Timing Metrics */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">T_PERIOD:</span>
                  <span className="font-mono text-slate-200">{(1000 / pwmFreq).toFixed(2)} μs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">T_HIGH (Active):</span>
                  <span className="font-mono text-emerald-400">{((1000 / pwmFreq) * (pwmDuty / 100)).toFixed(2)} μs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">V_RMS Output:</span>
                  <span className="font-mono text-amber-400">{(3.3 * Math.sqrt(pwmDuty / 100)).toFixed(2)} V</span>
                </div>
              </div>
            </div>
          )}

          {activeChannel === 'ecg' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                IoMT Biosensor Acquisition & Lead-II Cardiac Simulator:
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Simulated Heart Rate:</span>
                  <span className="font-bold text-cyan-400">{ecgHeartRate} BPM</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="140"
                  value={ecgHeartRate}
                  onChange={(e) => setEcgHeartRate(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">R-R Interval:</span>
                  <span className="font-mono text-slate-200">{Math.round((60 / ecgHeartRate) * 1000)} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">QRS Width:</span>
                  <span className="font-mono text-emerald-400">82 ms (Normal)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sampling Rate:</span>
                  <span className="font-mono text-cyan-400">500 Samples/sec (DMA)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Clinical Accuracy:</span>
                  <span className="font-mono text-emerald-400 font-bold">96% Real-Time</span>
                </div>
              </div>
            </div>
          )}

          {activeChannel === 'uart' && (
            <div className="space-y-4 text-xs">
              <div className="text-slate-400">
                UART Async Frame Analyzer (Start bit, 8 Data bits, 1 Stop bit):
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Config:</span>
                  <span className="text-amber-400 font-bold">115200 Baud, 8N1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bit Time:</span>
                  <span className="text-slate-200">8.68 μs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frame Duration:</span>
                  <span className="text-slate-200">86.8 μs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parity:</span>
                  <span className="text-emerald-400">None (CRC in App Layer)</span>
                </div>
              </div>
            </div>
          )}

          {activeChannel === 'spi' && (
            <div className="space-y-4 text-xs">
              <div className="text-slate-400">
                SPI High-Speed Synchronous Bus (Master Transmit @ 21MHz):
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Clock Polarity (CPOL):</span>
                  <span className="text-cyan-400">0 (Idle Low)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Clock Phase (CPHA):</span>
                  <span className="text-cyan-400">0 (Leading Edge)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">DMA Circular Stream:</span>
                  <span className="text-emerald-400 font-bold">DMA1_Stream4</span>
                </div>
              </div>
            </div>
          )}

          {activeChannel === 'can' && (
            <div className="space-y-4 text-xs">
              <div className="text-slate-400">
                ISO 11898 CAN-FD Physical Layer Differential Signaling:
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Recessive State:</span>
                  <span className="text-slate-200">CAN_H = 2.5V, CAN_L = 2.5V (Diff = 0V)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dominant State:</span>
                  <span className="text-amber-400">CAN_H = 3.5V, CAN_L = 1.5V (Diff = 2.0V)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bus Termination:</span>
                  <span className="text-emerald-400">120 Ω End-Point Resistor</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
