import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, CornerDownLeft, Sparkles } from 'lucide-react';
import { sounds } from '../audio/soundEngine';
import { personalInfo, skillsData, projectsData, experienceData, certificationsData } from '../data/portfolioData';
import { downloadResumePDF } from '../utils/downloadResume';

export default function TerminalCLI({ onOpenResume, onReboot }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `ARM Cortex-M Embedded CLI v2.4.0-RELEASE (GCC 12.3.1)
Target: STM32F407VGT6 @ 168MHz | FreeRTOS v10.5
Type "help" to list available firmware commands.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    sounds.playTerminalBlip();

    const newHistory = [...history, { type: 'input', text: `naveen@stm32:~$ ${cmdStr}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  about           - Display engineer background, education & objectives
  skills          - Full breakdown of bare-metal, RTOS, protocols & tools
  projects        - Major engineering projects (IoMT, Smart Ambulance, CAN AI)
  freelance       - Summary of 20+ freelance IoT projects delivered
  experience      - Work history (ACM SIGBED, Kaashiv, HYBIX)
  certifications  - Official credentials (Microchip Univ, QNX, FreeRTOS)
  contact         - Email, phone, LinkedIn & GitHub links
  resume / cv     - Download official printable PDF resume (CVNAVEENKARANRS.pdf)
  test_hardware   - Run peripheral loopback sanity tests
  reboot          - Trigger bare-metal MCU restart & boot diagnostics
  clear           - Clear terminal window`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `${personalInfo.name} - ${personalInfo.title}
------------------------------------------------------------------
${personalInfo.summary}

Education 1: ${personalInfo.education.degree} - ${personalInfo.education.institution} (${personalInfo.education.period}) [CGPA: ${personalInfo.education.cgpa}]
Education 2: Higher Secondary Certificate - Palaniappa Hr Sec School (2021 – 2023) [CGPA: 7.5]`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `TECHNICAL SKILLS MATRIX:
[1] Languages: Embedded C, C, C++, Python
[2] Architecture: ARM Cortex-M (M0/M3/M4), STM32, AVR, ESP32, Bare-Metal, DMA, Timers, NVIC Interrupts
[3] Protocols: CAN / CAN-FD, UART/USART, SPI (21MHz+), I2C, MODBUS RS-485, MQTT, USB
[4] RTOS & Systems: FreeRTOS, QNX Neutrino RTOS, Embedded Linux, Low-Power Modes
[5] Debugging & Lab: GDB, SWD/JTAG, Logic Analyzer (Saleae), Oscilloscope, Hardware Bring-Up`
        });
        break;

      case 'projects':
        const projSummary = projectsData.map((p, idx) => 
          `[${idx + 1}] ${p.title} (${p.year})
     Role: ${p.role}
     Stack: ${p.techStack.join(', ')}
     Key Metric: ${p.metrics[0].label}: ${p.metrics[0].value} (${p.metrics[0].desc})`
        ).join('\n\n');
        newHistory.push({ type: 'output', text: projSummary });
        break;

      case 'freelance':
        newHistory.push({
          type: 'output',
          text: `FREELANCE & RAPID PROTOTYPING ACHIEVEMENTS:
• Delivered 20+ freelance embedded/IoT projects since 2024 across industrial automation, agriculture, and healthcare.
• Participated in 15+ hackathons and technical symposiums.
• Conducted technical workshop on Next-Gen Embedded Systems & IoT for 50+ engineers.`
        });
        break;

      case 'experience':
        const expStr = experienceData.map(e => 
          `• ${e.role} @ ${e.organization} (${e.period})
    ${e.highlights[0]}`
        ).join('\n\n');
        newHistory.push({ type: 'output', text: expStr });
        break;

      case 'certifications':
        const certStr = certificationsData.map(c => 
          `• ${c.title} - ${c.issuer} [${c.badge}]`
        ).join('\n');
        newHistory.push({ type: 'output', text: certStr });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `DIRECT CONTACT DETAILS:
Email:    ${personalInfo.email}
Phone:    ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub:   ${personalInfo.github}
Portfolio:${personalInfo.portfolioUrl}`
        });
        break;

      case 'resume':
      case 'cv':
        newHistory.push({ type: 'output', text: 'Initiating direct download of official resume (CVNAVEENKARANRS.pdf)...' });
        downloadResumePDF();
        break;

      case 'test_hardware':
        newHistory.push({
          type: 'output',
          text: `RUNNING SILICON SELF-TEST...
[PASS] Flash CRC-32 Checksum valid (0x9F42B10C)
[PASS] SRAM Read/Write bit pattern verify (0xAA55AA55) OK
[PASS] USART1 Loopback transmission verified @ 115200 baud
[PASS] CAN-FD Mailbox loopback OK (Arbitration latency: 1.1us)
[PASS] ADC1 12-bit calibration OK (Offset error < 2 LSB)
RESULT: 100% HARDWARE HEALTHY`
        });
        break;

      case 'reboot':
        newHistory.push({ type: 'output', text: 'Restarting processor core via NVIC_SystemReset()...' });
        setHistory(newHistory);
        setTimeout(() => {
          onReboot();
        }, 600);
        return;

      case 'clear':
        setHistory([]);
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${trimmed}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full h-full overflow-y-auto p-4 md:p-6 bg-[#05080e] text-emerald-400 font-mono flex flex-col justify-between"
      style={{ minHeight: 'calc(100vh - 65px)' }}
    >
      <div className="space-y-4 max-w-4xl mx-auto w-full">
        {/* CLI Header Banner */}
        <div className="border border-emerald-500/30 rounded-xl p-4 bg-black/60 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-emerald-400" />
            <span className="text-xs uppercase font-bold text-slate-100 tracking-wider">
              STM32 Interactive Firmware Shell (UART1 Console)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>SESSION: ACTIVE</span>
          </div>
        </div>

        {/* Console Outputs */}
        <div className="space-y-3 text-xs leading-relaxed">
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'system' && (
                <pre className="text-emerald-300/80 bg-slate-950/70 p-3 rounded-lg border border-slate-900 whitespace-pre-wrap">
                  {item.text}
                </pre>
              )}
              {item.type === 'input' && (
                <div className="text-cyan-300 font-bold flex items-center gap-2">
                  <span className="text-emerald-400">&gt;</span>
                  {item.text}
                </div>
              )}
              {item.type === 'output' && (
                <pre className="text-slate-200 bg-slate-950/40 p-2.5 rounded border border-slate-900 whitespace-pre-wrap font-mono">
                  {item.text}
                </pre>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 bg-red-950/20 p-2 rounded border border-red-500/30">
                  {item.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Form Bar */}
      <form onSubmit={onSubmit} className="max-w-4xl mx-auto w-full mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-sm">naveen@stm32:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type 'help', 'skills', 'projects', 'resume'..."
          className="flex-1 bg-transparent text-slate-100 font-mono text-sm outline-none placeholder-slate-600"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs flex items-center gap-1.5 transition-all"
        >
          <CornerDownLeft size={13} /> Run
        </button>
      </form>
    </div>
  );
}
