import React, { useState, useEffect } from 'react';
import {
  Activity,
  Terminal,
  Cpu,
  Layers,
  Zap,
  Filter,
  RefreshCw,
  Send,
  Database,
  BarChart3,
  Sliders
} from 'lucide-react';
import { sounds } from '../audio/soundEngine';

const INITIAL_CAN_PACKETS = [
  { id: '0x010', name: 'AMB_QOS_PRIORITY', dlc: 8, data: '02 FF 40 1A 00 00 12 34', time: '12:04.102', status: 'ACK_OK' },
  { id: '0x2A0', name: 'ICU_VITALS_STREAM', dlc: 8, data: '4A 62 24 E0 18 01 FE 00', time: '12:04.125', status: 'ACK_OK' },
  { id: '0x1F4', name: 'DRIVER_PERCLOS_FATIGUE', dlc: 8, data: '12 78 35 00 AA 11 04 22', time: '12:04.150', status: 'ACK_OK' },
  { id: '0x305', name: 'MODBUS_PACKAGE_QC', dlc: 8, data: '01 03 00 10 00 02 C5 CE', time: '12:04.182', status: 'ACK_OK' },
  { id: '0x050', name: 'STM32_HEARTBEAT', dlc: 4, data: 'A5 5A 01 00', time: '12:04.200', status: 'ACK_OK' }
];

export default function TelemetryDashboard() {
  const [canPackets, setCanPackets] = useState(INITIAL_CAN_PACKETS);
  const [filterId, setFilterId] = useState('ALL');
  const [uartLogs, setUartLogs] = useState([
    '[UART1_115200] FreeRTOS Kernel v10.5 running, tick rate = 1000Hz',
    '[UART1_115200] ADC1 DMA buffer transfer complete. Channel 0 (ECG): 2048, Temp: 36.8C',
    '[UART1_115200] MQTT TLS handshake successful to broker.hivemq.com:8883',
    '[UART1_115200] CAN mailbox 0 transmitted packet ID: 0x010 (Emergency Ambulance Priority Level 1)',
    '[UART1_115200] Edge AI camera PERCLOS metric = 24% (Driver state: Focused/Alert)'
  ]);
  const [customCanId, setCustomCanId] = useState('0x120');
  const [customCanData, setCustomCanData] = useState('DE AD BE EF 01 02 03 04');
  const [baudRate, setBaudRate] = useState('115200');

  // Real-time CAN bus traffic simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const ids = [
        { id: '0x2A0', name: 'ICU_VITALS_STREAM', dlc: 8, data: () => `${Math.floor(70 + Math.random() * 15).toString(16).toUpperCase()} 62 24 E0 18 01 FE 00` },
        { id: '0x1F4', name: 'DRIVER_PERCLOS_FATIGUE', dlc: 8, data: () => `12 ${Math.floor(20 + Math.random() * 60).toString(16).toUpperCase()} 35 00 AA 11 04 22` },
        { id: '0x010', name: 'AMB_QOS_PRIORITY', dlc: 8, data: () => `02 FF ${Math.floor(30 + Math.random() * 30).toString(16).toUpperCase()} 1A 00 00 12 34` },
        { id: '0x305', name: 'MODBUS_PACKAGE_QC', dlc: 8, data: () => `01 03 00 10 00 02 C5 ${Math.floor(100 + Math.random() * 50).toString(16).toUpperCase()}` }
      ];

      const chosen = ids[Math.floor(Math.random() * ids.length)];
      const d = new Date();
      const timeStr = `${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;

      const newPacket = {
        id: chosen.id,
        name: chosen.name,
        dlc: chosen.dlc,
        data: chosen.data(),
        time: timeStr,
        status: 'ACK_OK'
      };

      setCanPackets((prev) => [newPacket, ...prev.slice(0, 14)]);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleSendCan = (e) => {
    e.preventDefault();
    sounds.playRelay();
    const d = new Date();
    const timeStr = `${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}`;

    const newPacket = {
      id: customCanId.toUpperCase(),
      name: 'USER_INJECTED_FRAME',
      dlc: 8,
      data: customCanData.toUpperCase(),
      time: timeStr,
      status: 'TRANSMITTED'
    };

    setCanPackets((prev) => [newPacket, ...prev.slice(0, 14)]);
    setUartLogs((prev) => [`[CAN_TX] Injected frame ${newPacket.id} into CAN-FD bus successfully`, ...prev.slice(0, 10)]);
  };

  const filteredPackets = filterId === 'ALL' ? canPackets : canPackets.filter((p) => p.id === filterId);

  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-6 bg-[#070a10] text-slate-200 font-mono space-y-6">
      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs tracking-wider uppercase font-bold">
            <Activity size={15} /> Real-Time Telemetry & Systems Health
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide mt-1">
            CAN Bus, FreeRTOS Scheduler & Memory Matrix
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CAN-FD BUS SPEED: 500 kbps</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-xs">
            TICK RATE: 1000 Hz
          </div>
        </div>
      </div>

      {/* Grid: CAN Bus Stream & FreeRTOS Task Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CAN Bus Frame Analyzer (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                CAN Bus Packet Analyzer (ISO 11898)
              </h2>
            </div>

            {/* Filter by Frame ID */}
            <div className="flex items-center gap-2 text-xs">
              <Filter size={13} className="text-slate-400" />
              <select
                value={filterId}
                onChange={(e) => setFilterId(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs outline-none cursor-pointer"
              >
                <option value="ALL">All Message IDs</option>
                <option value="0x010">0x010 (Smart Ambulance)</option>
                <option value="0x2A0">0x2A0 (IoMT ICU)</option>
                <option value="0x1F4">0x1F4 (Edge AI Vehicle)</option>
                <option value="0x305">0x305 (MODBUS Conveyor)</option>
              </select>
            </div>
          </div>

          {/* Packet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-2">TIME</th>
                  <th className="py-2 px-2">FRAME ID</th>
                  <th className="py-2 px-2">DESCRIPTOR</th>
                  <th className="py-2 px-2">DLC</th>
                  <th className="py-2 px-2">PAYLOAD (HEX)</th>
                  <th className="py-2 px-2 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredPackets.map((pkt, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2 px-2 text-slate-400">{pkt.time}</td>
                    <td className="py-2 px-2 font-bold text-emerald-400">{pkt.id}</td>
                    <td className="py-2 px-2 text-slate-300 text-[11px]">{pkt.name}</td>
                    <td className="py-2 px-2 text-slate-400">{pkt.dlc}</td>
                    <td className="py-2 px-2 text-cyan-300 tracking-wider font-semibold">{pkt.data}</td>
                    <td className="py-2 px-2 text-right">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                        {pkt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Injected CAN Frame Console */}
          <form onSubmit={handleSendCan} className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">INJECT:</span>
            <input
              type="text"
              value={customCanId}
              onChange={(e) => setCustomCanId(e.target.value)}
              placeholder="CAN ID (0x...)"
              className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-emerald-400 font-mono outline-none"
            />
            <input
              type="text"
              value={customCanData}
              onChange={(e) => setCustomCanData(e.target.value)}
              placeholder="8 Bytes Hex Data"
              className="flex-1 min-w-[200px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-cyan-300 font-mono outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all"
            >
              <Send size={12} /> TX Frame
            </button>
          </form>
        </div>

        {/* Right: FreeRTOS Task Manager (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Cpu size={16} className="text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                FreeRTOS v10.5 Task Table
              </h2>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
              SCHEDULER: RUNNING
            </span>
          </div>

          {/* Task Entries */}
          <div className="space-y-3">
            {[
              { name: 'vTaskBiosensors', pri: 4, state: 'Running', cpu: 26, stack: '512 B' },
              { name: 'vTaskCANHandler', pri: 3, state: 'Ready', cpu: 18, stack: '384 B' },
              { name: 'vTaskDSPFilter', pri: 3, state: 'Blocked', cpu: 22, stack: '768 B' },
              { name: 'vTaskTelemetry', pri: 2, state: 'Ready', cpu: 12, stack: '512 B' },
              { name: 'prvIdleTask', pri: 0, state: 'Ready', cpu: 22, stack: '128 B' }
            ].map((task, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {task.name}
                  </span>
                  <span className="text-slate-400 text-[11px]">Pri: {task.pri} | {task.state}</span>
                </div>
                {/* CPU Bar */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{ width: `${task.cpu * 3}%` }}
                    />
                  </div>
                  <span>{task.cpu}% CPU</span>
                </div>
              </div>
            ))}
          </div>

          {/* Silicon Memory Allocation */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>SRAM (192 KB total):</span>
              <span className="text-emerald-400 font-bold">48.2 KB used (25.1%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '25.1%' }} />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>Flash ROM (1024 KB):</span>
              <span className="text-cyan-400 font-bold">142 KB firmware (13.8%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: '13.8%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: UART Live Monitor & Peripheral Registers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* UART Console (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-emerald-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                USART1 Serial Terminal (Direct Hardware Stream)
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">BAUD:</span>
              <select
                value={baudRate}
                onChange={(e) => setBaudRate(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-300 rounded px-2 py-1 text-xs outline-none"
              >
                <option value="9600">9600</option>
                <option value="115200">115200</option>
                <option value="921600">921600</option>
              </select>
            </div>
          </div>

          <div className="h-44 overflow-y-auto bg-black/60 rounded-lg p-3 font-mono text-xs text-emerald-400/90 space-y-1.5 scrollbar-thin border border-slate-900">
            {uartLogs.map((line, idx) => (
              <div key={idx} className="leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Hardware Registers (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800/80 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Memory-Mapped Register State
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">STM32F407</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { reg: 'RCC->CR', addr: '0x40023800', val: '0x03056483', desc: 'HSE ON, PLL ON, PLL Ready' },
              { reg: 'GPIOA->MODER', addr: '0x40020000', val: '0xA8000000', desc: 'PA9/PA10 AF7 USART1' },
              { reg: 'NVIC->ISER[0]', addr: '0xE000E100', val: '0x00003000', desc: 'TIM2 & USART1 IRQs Active' },
              { reg: 'CAN1->MSR', addr: '0x40006404', val: '0x0000000C', desc: 'Normal Mode, TX/RX OK' },
              { reg: 'FLASH->ACR', addr: '0x40023C00', val: '0x00000705', desc: '5 Wait States, ART Enabled' }
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div>
                  <div className="font-bold text-slate-200">{r.reg}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{r.addr} - {r.desc}</div>
                </div>
                <div className="font-mono font-bold text-amber-400 text-xs">
                  {r.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
