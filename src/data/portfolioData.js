// Naveen Karan R S - Comprehensive Portfolio Data & Engineering Specifications

export const personalInfo = {
  name: "NAVEEN KARAN R S",
  title: "Embedded Firmware Engineer | ARM Cortex-M Specialist",
  tagline: "Bridging bare-metal silicon, real-time operating systems, and intelligent edge nodes.",
  email: "naveenrs2005@gmail.com",
  phone: "+91 7373373721",
  linkedin: "https://www.linkedin.com/in/naveenkaran2005",
  linkedinHandle: "naveenkaran2005",
  github: "https://github.com/naveenkaranrs",
  githubHandle: "naveenkaranrs",
  portfolioUrl: "https://naveenkaranportfolio.netlify.app/",
  targetRole: "Entry-Level Embedded/Firmware Engineer in the Semiconductor Industry",
  location: "Tamil Nadu, India",
  education: {
    degree: "B.Tech – Electronics and Communication Engineering",
    institution: "Kalasalingam Academy of Research and Education (KARE)",
    period: "2023 – 2027",
    cgpa: "8.0 / 10.0"
  },
  educationHistory: [
    {
      period: "2023 – 2027",
      institution: "Kalasalingam Academy of Research and Education (KARE)",
      degree: "B.Tech – Electronics and Communication Engineering",
      cgpa: "8.0 CGPA",
      detail: "Specialization in Bare-Metal Firmware, ARM Cortex-M architecture, and Real-Time Systems."
    },
    {
      period: "2021 – 2023",
      institution: "Palaniappa Hr Sec School",
      degree: "Higher Secondary Certificate",
      cgpa: "7.5 CGPA",
      detail: "Completed higher secondary curriculum with rigorous coursework in Mathematics, Physics & Chemistry."
    }
  ],
  summary: `Final-year Electronics and Communication Engineering student with 2+ years of hands-on freelance experience designing, developing, and testing embedded firmware applications. Delivered 20+ freelance embedded/IoT projects since 2024 and led firmware development for real-time monitoring and industrial automation systems, including an IoMT ICU monitoring system (96% real-time accuracy) and a priority-based smart ambulance communication framework (40% faster emergency data delivery). Skilled in bare-metal programming, RTOS (FreeRTOS, QNX), communication protocols (UART/SPI/I2C/CAN), and hardware-software integration. Seeking an entry-level Embedded/Firmware Engineer role in the semiconductor industry.`
};

export const skillsData = {
  programming: [
    { name: "Embedded C", level: 95, desc: "MISRA-C patterns, bit manipulation, volatile pointers, register drivers" },
    { name: "C", level: 92, desc: "Data structures, memory management, pointers, low-overhead algorithms" },
    { name: "C++", level: 85, desc: "OOP for embedded, templates, RAII, HAL abstraction layers" },
    { name: "Python", level: 88, desc: "Hardware automation, serial test scripts, Edge AI, OpenCV/DeepFace" }
  ],
  architecture: [
    { name: "ARM Cortex-M (M0/M3/M4)", level: 94, desc: "NVIC interrupt prioritization, SysTick, memory mapping, MPU" },
    { name: "STM32 (F4/F1/L4)", level: 95, desc: "STM32CubeIDE, HAL & LL drivers, DMA multi-channel, RCC clocks" },
    { name: "ESP32 (Xtensa / RISC-V)", level: 92, desc: "ESP-IDF, FreeRTOS dual-core, WiFi/BLE stack, deep-sleep modes" },
    { name: "AVR (ATmega328P/2560)", level: 90, desc: "Bare-metal AVR-GCC, direct DDR/PORT register manipulation" },
    { name: "Bare-Metal & Registers", level: 96, desc: "Zero-overhead register access, memory-mapped I/O, custom startup code" },
    { name: "DMA & Timers", level: 90, desc: "Direct Memory Access circular buffer, Advanced Timers (TIM1 PWM, Input Capture)" },
    { name: "Interrupt Handling (ISR)", level: 94, desc: "Sub-microsecond latency, critical sections, deferred ISR handling" },
    { name: "ADC & PWM", level: 92, desc: "Multi-channel scan mode, DMA transfer, dead-time insertion for motor drivers" }
  ],
  protocols: [
    { name: "CAN / CAN-FD", level: 90, desc: "Controller Area Network frame arbitration, filtering, automotive bus" },
    { name: "UART / USART", level: 96, desc: "Circular ring buffer, DMA streaming, baud rate generation, framing error handling" },
    { name: "SPI", level: 94, desc: "Full-duplex master/slave, high-speed 21MHz+, DMA transmit, chip select timing" },
    { name: "I2C", level: 93, desc: "Standard/Fast Mode (400kHz), multi-slave addressing, clock stretching" },
    { name: "MODBUS RTU / TCP", level: 88, desc: "RS-485 differential signaling, CRC-16 calculation, industrial PLCs" },
    { name: "MQTT", level: 92, desc: "QoS 0/1/2, payload optimization, lightweight pub/sub for edge IoT" },
    { name: "USB", level: 82, desc: "USB CDC Virtual COM port, HID device stack" }
  ],
  rtos: [
    { name: "FreeRTOS", level: 95, desc: "Preemptive priority scheduling, queues, binary/counting semaphores, mutexes, event groups" },
    { name: "QNX Neutrino RTOS", level: 85, desc: "Microkernel architecture, message passing (IPC), POSIX threads, real-time determinism" },
    { name: "Embedded Linux", level: 80, desc: "Kernel module basics, device tree overlays, GPIO sysfs, cross-compilation" },
    { name: "Low-Power Design", level: 88, desc: "Sleep/Stop/Standby modes, tickless idle, dynamic voltage frequency scaling" },
    { name: "Firmware Architecture", level: 92, desc: "Layered HAL/BSP architecture, state machines, non-blocking asynchronous event loops" }
  ],
  tools: [
    { name: "STM32CubeIDE", level: 95 },
    { name: "Keil MDK-ARM", level: 88 },
    { name: "PlatformIO / VS Code", level: 94 },
    { name: "QNX Momentics", level: 84 },
    { name: "KiCad & Proteus", level: 88 },
    { name: "Git & GitHub", level: 92 },
    { name: "MATLAB / Simulink", level: 82 }
  ],
  debugging: [
    { name: "GDB Debugging", level: 90, desc: "Breakpoints, watchpoints, stack frame backtraces, register inspection" },
    { name: "SWD & JTAG", level: 92, desc: "ST-LINK/V2, J-Link, memory dumping, core halt/run control" },
    { name: "Logic Analyzer", level: 95, desc: "Protocol decoding (Saleae/PulseView) for SPI, I2C, UART, CAN" },
    { name: "Hardware Bring-Up", level: 94, desc: "Power-rail verification, clock validation, smoke test, peripheral sanity checks" }
  ]
};

export const projectsData = [
  // --- INDUSTRIAL & AUTOMOTIVE ---
  {
    id: "proj-conveyor-ai",
    chipRef: "modbus-header",
    category: "industrial-automotive",
    badge: "Industrial Automation",
    image: "/projects/conveyor.jpg",
    title: "Embedded AI Conveyor System for Automated Package Quality Control",
    year: "Jan 2026",
    role: "Industrial Firmware Lead",
    summary: "Industry 4.0 automated sorting conveyor driven by STM32 bare-metal motor control, MODBUS RS-485 sensors, and optical edge classification.",
    overview: `High-throughput package inspection and sorting requires deterministic hardware actuation synchronized with optical edge inspection. This system integrates high-precision hardware timers on STM32 to control variable-speed stepper conveyors, interrogates industrial proximity and barcode sensors over MODBUS RS-485, and actuates pneumatic diversion pistons within a 15ms window upon defect detection.`,
    challenge: `Industrial sorting conveyor lines suffer from latency jitter between optical barcode recognition and mechanical actuation, causing missed diverts or parcel jams. The challenge was achieving deterministic sub-millisecond coordination across STM32 timer capture registers, MODBUS RS-485 bus nodes, and high-speed solenoid valves while streaming live OEE telemetry.`,
    impact: `Achieved continuous sorting throughput of 120 packages/minute with 98.4% automated defect rejection accuracy and actuator jitter reduced to < 0.8 ms, dramatically reducing manual inspection overhead and line blockages.`,
    keyFeatures: [
      "Deterministic stepper motor PWM ramp generation with S-curve acceleration",
      "MODBUS RTU RS-485 multidrop network interfacing industrial optical & weight sensors",
      "Real-time pneumatic solenoid ejection synchronized with timer capture registers",
      "ESP32 telemetry bridge streaming OEE (Overall Equipment Effectiveness) via WebSockets",
      "Sub-millisecond jitter guarantee (< 0.8 ms) across all industrial actuators"
    ],
    systemFlow: "Conveyor Load Cell & Barcode Scanner → STM32 Motor Controller & MODBUS Master → Defect Flag Evaluation → High-Speed Pneumatic Ejection → ESP32 Telemetry Gateway → Factory Dashboard",
    techStack: ["STM32", "ESP32", "MODBUS RTU", "Embedded C", "RS-485", "WebSockets", "Industrial Actuators"],
    metrics: [
      { label: "Throughput", value: "120 Pkg/min", desc: "Continuous automated sorting rate" },
      { label: "Pneumatic Timing", value: "15 ms", desc: "Solenoid actuator rejection accuracy" },
      { label: "Modbus Jitter", value: "< 0.8 ms", desc: "Deterministic RS-485 cycle time" },
      { label: "Defect Detection", value: "98.4%", desc: "Barcode and dimension defect rejection" }
    ],
    architecture: `Industrial factory automation pipeline:
1. STM32 configured with hardware timers for high-torque stepper/conveyor motor PWM control with acceleration s-curves.
2. MODBUS RTU RS-485 bus interfacing optical sensors, load cells, and proximity switches.
3. High-speed pneumatic piston actuation synced via external hardware timer interrupts to reject defective parcels into diversion chutes.
4. ESP32 gateway streams OEE (Overall Equipment Effectiveness) telemetry to web dashboards via WebSockets.`,
    simType: "conveyor-qc",
    simDefaults: {
      conveyorSpeed: "1.2 m/s",
      sortedCount: 1420,
      defectCount: 38,
      pistonPressure: "6.2 Bar"
    },
    codeSnippet: `// MODBUS Master Query & Pneumatic Ejector Routine
void Execute_Sorting_Decision(Package_t *pkg) {
    if (pkg->isDefective) {
        uint32_t delay_ticks = Calculate_Travel_Time_Ticks(pkg->position, EJECTOR_POSITION);
        // Arm high-precision hardware timer compare output
        __HAL_TIM_SET_COMPARE(&htim2, TIM_CHANNEL_1, delay_ticks);
        HAL_TIM_OC_Start_IT(&htim2, TIM_CHANNEL_1);
    }
}`
  },
  {
    id: "proj-edge-ai-vehicle",
    chipRef: "can-transceiver",
    category: "industrial-automotive",
    badge: "Automotive Safety",
    image: "/projects/driver_ai.jpg",
    title: "Edge AI Driver Emotion Recognition & Adaptive Vehicle Control System",
    year: "Jan 2026",
    role: "Firmware & Embedded AI Engineer",
    summary: "Safety-critical automotive prototype combining computer vision on edge hardware with STM32 CAN-bus motor throttling to eliminate drowsy/impaired driving accidents.",
    overview: `Driver fatigue and impairment are leading causes of vehicular collisions. This automotive safety platform couples an edge computer vision engine (PERCLOS and emotion estimation) with an automotive-grade STM32 MCU over an ISO 11898 standard CAN-bus. If fatigue or distraction is validated across a temporal window, the STM32 automatically overrides electronic throttle control and initiates safety warnings.`,
    challenge: `Processing heavy facial landmark models on edge hardware without inducing frame drops, and translating neural inference confidence scores into deterministic, safe CAN-bus brake and throttle arbitration frames without triggering false positives during rapid driver head movement.`,
    impact: `Delivered 28 FPS real-time edge facial monitoring with sub-2.1% false-positive rate and guaranteed 1.2 ms CAN arbitration response to throttle back vehicle speed safely under critical drowsiness conditions.`,
    keyFeatures: [
      "High-speed 500 kbps CAN-bus arbitration and fault-tolerant packet framing",
      "Edge AI face tracking computing PERCLOS (percentage eye closure) at 28 FPS",
      "Adaptive electronic throttle override smoothly decelerating vehicle to safe crawl",
      "Audible cabin piezo frequency chirps and instrument cluster warning displays",
      "Hardware watchdog fail-safe restoring driver manual control upon recovery"
    ],
    systemFlow: "In-Cabin Edge Camera → AI Feature Extraction (PERCLOS / Emotion) → CAN Frame Broadcast (0x010 High-Priority) → STM32 Throttle Controller → PWM Motor Throttling + Buzzer Warning",
    techStack: ["STM32F4", "ESP32-CAM", "Edge AI", "CAN Protocol", "Embedded C", "Python", "DeepFace", "OpenCV"],
    metrics: [
      { label: "CAN Latency", value: "1.2 ms", desc: "Emotion trigger to electronic throttle override" },
      { label: "Inference Rate", value: "28 FPS", desc: "Real-time edge facial feature detection" },
      { label: "Speed Cutback", value: "Adaptive", desc: "40% to 100% throttling depending on fatigue severity" },
      { label: "False Positive", value: "< 2.1%", desc: "Multi-frame temporal verification window" }
    ],
    architecture: `Automotive safety loop integration:
1. Edge AI unit performs real-time driver face tracking, PERCLOS (percentage eye closure), and emotion state classification.
2. Transmits authenticated safety arbitration frames over ISO 11898 standard CAN-bus at 500 kbps.
3. STM32 CAN controller receives emergency speed limit broadcast, smoothly ramps down PWM duty cycle to motor drivers, and triggers audible cabin alarms.
4. Fail-safe watchdog ensures immediate return to driver manual control upon state normalization.`,
    simType: "driver-emotion",
    simDefaults: {
      driverState: "Drowsy (PERCLOS 78%)",
      targetSpeed: 35,
      actualSpeed: 75,
      brakeApplied: true
    },
    codeSnippet: `// CAN RX Callback for Electronic Throttle Intervention
void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan) {
    CAN_RxHeaderTypeDef RxHeader;
    uint8_t RxData[8];
    HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO0, &RxHeader, RxData);
    
    if (RxHeader.StdId == CAN_ID_DRIVER_SAFETY) {
        uint8_t fatigue_index = RxData[0];
        if (fatigue_index > FATIGUE_THRESHOLD_CRITICAL) {
            Engage_Autonomous_Speed_Limiter(SPEED_SAFE_KMH_30);
            Trigger_Cabin_Piezo_Buzzer(PATTERN_PULSE_RAPID);
        }
    }
}`
  },
  {
    id: "proj-furnace-iiot",
    chipRef: "nucleo-f103",
    category: "industrial-automotive",
    badge: "IIoT & Automation",
    image: "/projects/furnace.jpg",
    title: "Real-Time Closed-Loop Control System for Industrial Furnaces",
    subtitle: "Real-Time Temperature Regulation, Local Jitter Control & Cloud Visualization",
    year: "Oct 2025",
    role: "Embedded Systems & Firmware Engineer",
    summary: "A fully implemented real-time furnace automation system integrating STM32, ESP32/NodeMCU, DHT11, Embedded C, and cloud connectivity to deliver accurate temperature regulation, remote visualization, and real-time alerts.",
    overview: `Industrial furnaces require precise, stable, and continuous temperature control for safe and efficient operation.
Traditional setups face challenges such as:
• ⚡ Real-time control (local jitter < 5–10 ms)
• ☁️ Cloud updates within 1–5 seconds
• 🔧 Automated cooling via fan control
• 📊 Live dashboard with historical trends
• 🔌 Scalable, low-cost industrial automation`,
    challenge: `Maintaining microsecond-deterministic closed-loop PID thermal regulation on an STM32 microcontroller while simultaneously handling bi-directional cloud telemetry and MQTT connection retries without blocking core safety loops.`,
    impact: `Decoupled hard real-time control from networking via a high-speed UART bridge, locking local control jitter under 8 ms while streaming live thermal graphs and instant spike alerts to an industrial IoT cloud dashboard.`,
    keyFeatures: [
      "Real-time temperature & humidity acquisition using DHT11",
      "Closed-loop control using STM32 NUCLEO-F103RB",
      "Automatic fan activation based on threshold",
      "ESP32/NodeMCU-based cloud communication (MQTT / Firebase / Blynk / ThingSpeak)",
      "Remote dashboard with live values, fan status, history plots, and temperature spike alerts",
      "High-speed UART communication between STM32 ↔ ESP32",
      "Modular and industry-ready architecture"
    ],
    systemFlow: "DHT11 Sensor → STM32 NUCLEO-F103RB (PID & Hysteresis Controller) → Automated Fan Relay + UART Frame → ESP32/NodeMCU → MQTT / Cloud → Remote Industrial Dashboard",
    techStack: ["STM32 NUCLEO-F103RB", "ESP32", "DHT11", "Embedded C", "UART Bridge", "MQTT", "Closed-Loop Control"],
    metrics: [
      { label: "Local Jitter", value: "< 8 ms", desc: "Deterministic closed-loop control loop" },
      { label: "Cloud Sync", value: "1–3 s", desc: "Telemetry update to live IoT dashboard" },
      { label: "Temp Stability", value: "±0.5°C", desc: "Closed-loop setpoint regulation" },
      { label: "Fan Response", value: "< 15 ms", desc: "Automated cooling relay actuation" }
    ],
    architecture: `Modular Industrial Automation Pipeline:
1. Hard Real-Time STM32 Node: The STM32 NUCLEO-F103RB runs a deterministic bare-metal loop reading calibrated DHT11 sensors, executing digital filtering, and enforcing thermal safety interlocks.
2. Automated Relay Fan Actuator: Solid-state relay directly managed by STM32 GPIO engages auxiliary exhaust fans whenever furnace chamber temperature exceeds the safety threshold.
3. High-Speed UART Protocol: Structured binary frame transmission from STM32 to ESP32 co-processor at 115200 baud with CRC verification.
4. Cloud & Visualization Gateway: ESP32 dispatches MQTT/Firebase streams powering real-time web dashboards, trend plots, and push alerts for anomalous temperature spikes.`,
    simType: "furnace-sim",
    simDefaults: {
      temperature: 58.5,
      threshold: 65.0,
      fanActive: false,
      jitterMs: 4.8
    },
    codeSnippet: `// STM32 Closed-Loop Furnace Temperature Controller
void Process_Furnace_Thermal_Loop(float current_temp, float threshold) {
    if (current_temp >= threshold) {
        // Exceeded setpoint: Engage forced-air cooling fan
        HAL_GPIO_WritePin(FAN_RELAY_GPIO_Port, FAN_RELAY_Pin, GPIO_PIN_SET);
        g_furnace.fan_state = 1;
    } else if (current_temp <= (threshold - HYSTERESIS_MARGIN)) {
        // Safe temperature reached: Disengage fan
        HAL_GPIO_WritePin(FAN_RELAY_GPIO_Port, FAN_RELAY_Pin, GPIO_PIN_RESET);
        g_furnace.fan_state = 0;
    }
    
    // Transmit UART frame to ESP32 Gateway (Jitter < 8ms)
    Send_Telemetry_Frame_UART(&huart2, current_temp, g_furnace.fan_state);
}`
  },

  // --- IOMT & HEALTHCARE ---
  {
    id: "proj-iomt-icu",
    chipRef: "esp32",
    category: "iomt-healthcare",
    badge: "Medical Embedded",
    image: "/projects/icu_monitor.jpg",
    title: "IoMT-Based Real-Time Multi-Parameter ICU Patient Monitoring System",
    year: "Oct 2025",
    role: "Lead Firmware & Edge Architect",
    summary: "High-reliability embedded system for continuous ICU vital telemetry achieving 96% real-time accuracy under critical timing constraints.",
    overview: `Continuous vital monitoring in intensive care units demands absolute uptime, ultra-low latency, and reliable noise rejection against patient motion artifacts.
This system deploys an STM32 Cortex-M4 dedicated to hard real-time biosignal acquisition (ECG, SpO2, NIBP, Body Temp) at 500Hz with DMA streaming, filtered on-chip with FIR algorithms, and bridged via high-speed UART to an ESP32 co-processor for TLS-secured MQTT hospital cloud integration.`,
    challenge: `Simultaneously capturing 500 Hz multi-channel ADC streams, executing FIR digital filters, and performing R-peak detection in real time without CPU lockup or missing telemetry intervals during sudden arrhythmia episodes.`,
    impact: `Validated 96% vital sign accuracy compared against clinical monitors, with < 25 ms end-to-end telemetry latency and zero task starvation over 72-hour continuous stress testing.`,
    keyFeatures: [
      "Hardware DMA streaming from multi-channel 12-bit ADC at 500Hz",
      "On-chip real-time FIR bandpass filtering & Pan-Tompkins R-peak detection",
      "Dual-core MCU architecture isolating hard real-time sensing from network stack",
      "Preemptive FreeRTOS scheduler preventing task starvation under high telemetry loads",
      "Hardware watchdog (IWDG) and brown-out reset for 100% medical-grade fail-safety"
    ],
    systemFlow: "Biosensors (ECG, SpO2, Temp) → STM32F4 (DMA ADC + FIR DSP) → FreeRTOS Vitals Queue → Inter-MCU UART → ESP32 (TLS MQTT) → Hospital ICU Monitoring Station",
    techStack: ["STM32F4", "ESP32", "FreeRTOS", "MQTT", "UART/I2C", "IoMT Biosensors", "Edge Monitoring"],
    metrics: [
      { label: "Accuracy", value: "96%", desc: "Real-time vital detection vs clinical benchmark" },
      { label: "Latency", value: "< 25ms", desc: "Sensor acquisition to cloud MQTT broker" },
      { label: "Uptime", value: "99.98%", desc: "Continuous operation with zero task starvation" },
      { label: "RTOS Tasks", value: "5 Preemptive", desc: "Sensing, DSP Filter, Alert, Network, Display" }
    ],
    architecture: `Designed a dual-core/dual-MCU architecture:
1. STM32 Cortex-M4 dedicated to hard real-time biosignal acquisition (ECG, SpO2, NIBP, Body Temp) via SPI & I2C at 500Hz with DMA streaming.
2. Digital signal filtering on-chip (bandpass & moving average) executing inside a deterministic FreeRTOS task.
3. ESP32 co-processor managing TLS-secured MQTT transmission, WebSockets, and emergency buzzer/relay alerts.
4. Watchdog timer (IWDG) and brown-out detection configured for 100% fail-safe ICU hospital deployment.`,
    simType: "icu-patient",
    simDefaults: {
      heartRate: 74,
      spO2: 98,
      temperature: 36.8,
      alarmThreshold: 110
    },
    codeSnippet: `// FreeRTOS Task: Biosignal Acquisition & Peak Detection
void vTaskECGProcessor(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    const TickType_t xFrequency = pdMS_TO_TICKS(2); // 500Hz sampling
    
    for(;;) {
        uint16_t raw_adc = ADC_DMA_Buffer[ADC_CHANNEL_ECG];
        float filtered_signal = FIR_Filter_Process(&ecgFilter, raw_adc);
        
        if (Detect_R_Peak(filtered_signal)) {
            uint32_t current_rr = Calculate_RR_Interval();
            xQueueSend(xHeartRateQueue, &current_rr, 0);
        }
        vTaskDelayUntil(&xLastWakeTime, xFrequency);
    }
}`
  },
  {
    id: "proj-ambulance-dcn",
    chipRef: "rfid-gateway",
    category: "iomt-healthcare",
    badge: "V2I & Healthcare",
    image: "/projects/ambulance.jpg",
    title: "DCN-Enabled Priority-Based Smart Ambulance–Hospital Communication Framework",
    year: "Aug 2025",
    role: "Embedded Systems Developer",
    summary: "Emergency vehicle-to-infrastructure (V2I) communication framework delivering 40% faster emergency telemetry and autonomous traffic signal preemption.",
    overview: `Traffic congestion causes lethal delays during critical patient transit.
This framework implements an active Dedicated Short-Range Communication (DSRC) / active RFID beaconing system combined with dynamic Quality of Service (QoS) scheduling. When an emergency vehicle approaches within 300 meters of an intersection, traffic controllers automatically trigger a 'Green Wave' corridor while continuous vital telemetry streams directly to the receiving hospital trauma ward.`,
    challenge: `Designing a priority queuing algorithm capable of arbitrating emergency biometric packets over standard vehicular diagnostic channels under adverse RF multipath interference and high vehicle transit speeds.`,
    impact: `Delivered 40% faster emergency telemetry packets to the trauma room, reduced intersection signal transit delays by 65%, and maintained packet loss below 0.05%.`,
    keyFeatures: [
      "Dynamic 3-tier QoS priority scheduler giving critical telemetry top transmission priority",
      "Autonomous traffic signal preemption triggered up to 500m before intersection",
      "CAN-bus interfacing with on-board vehicle diagnostics and patient telemetry",
      "Direct MQTT hospital trauma gateway calculating real-time dynamic ETA",
      "Over 40% reduction in end-to-end packet delivery latency during transit"
    ],
    systemFlow: "Ambulance Patient Monitor + OBD-II → On-Board STM32 Unit → Dynamic QoS Scheduler → Long-Range Active RFID/V2I Beacon → Traffic Signal Controller + Hospital Trauma Ward",
    techStack: ["STM32", "ESP32", "MQTT", "Embedded C", "QoS Scheduling", "RFID Priority", "V2I Protocols"],
    metrics: [
      { label: "Data Delivery", value: "40% Faster", desc: "Reduction in emergency telemetry packet latency" },
      { label: "Signal Delay", value: "-65%", desc: "Intersection wait time through RFID preemption" },
      { label: "Priority Levels", value: "3 Tiers", desc: "Critical T1, Urgent T2, Transit T3 QoS" },
      { label: "Packet Loss", value: "< 0.05%", desc: "Under high-speed road vibrations" }
    ],
    architecture: `Built an intelligent vehicle-to-infrastructure firmware pipeline:
1. STM32 on-board unit reads vehicle OBD-II diagnostics and patient critical telemetry.
2. Long-range active RFID / DCN transceiver detects oncoming traffic intersections 500m ahead.
3. Implemented a custom QoS scheduling algorithm ensuring Tier-1 emergency packets supersede standard traffic sensor data.
4. Direct MQTT bridge notifies hospital trauma wards with pre-arrival patient vitals and estimated arrival time (ETA).`,
    simType: "ambulance-qos",
    simDefaults: {
      distance: 350,
      priorityLevel: "Critical Tier 1",
      trafficLightState: "GREEN_PREEMPTION",
      etaSeconds: 42
    },
    codeSnippet: `// Dynamic QoS Traffic Packet Prioritization
typedef enum { PRIORITY_LOW = 0, PRIORITY_URGENT = 1, PRIORITY_CRITICAL = 2 } PacketQoS_t;

void TransmitEmergencyPacket(PatientVitals_t *vitals, PacketQoS_t qos) {
    CAN_TxHeaderTypeDef TxHeader;
    TxHeader.StdId = (qos == PRIORITY_CRITICAL) ? 0x010 : 0x1F0;
    TxHeader.RTR = CAN_RTR_DATA;
    TxHeader.IDE = CAN_ID_STD;
    TxHeader.DLC = 8;
    
    // Transmit over high-priority CAN mailbox 0
    HAL_CAN_AddTxMessage(&hcan1, &TxHeader, (uint8_t*)vitals, &pTxMailbox);
}`
  },
  {
    id: "proj-pharmachain",
    chipRef: "esp32",
    category: "iomt-healthcare",
    badge: "PharmaTech & IoT",
    image: "/projects/pharmachain.jpg",
    title: "Securing Pharmaceutical Supply Chain Using IoT & Blockchain (PharmaChain)",
    subtitle: "Real-Time Environmental Monitoring • Secure Traceability • QR Verification",
    year: "Jul 2025",
    role: "Embedded IoT & Systems Architect",
    summary: "PharmaChain is a hardware–software integrated pharmaceutical supply-chain platform designed to monitor medicine transportation conditions and maintain secure, traceable pharmaceutical batch records.",
    overview: `PharmaChain addresses critical counterfeit drug and cold-chain breakdown risks in pharmaceutical logistics by unifying embedded IoT environmental sensing with a cryptographic tamper-evident ledger and consumer QR code verification.
The system combines ESP32/NodeMCU-based IoT sensing, temperature and humidity monitoring, REST APIs, database management, cryptographic hashing, role-based access control, and QR-based product verification into a unified platform.`,
    challenge: `Preventing sensor data spoofing and ensuring that intermittent in-transit connectivity does not compromise the cryptographic continuity of the cold-chain transaction ledger.`,
    impact: `Guaranteed tamper-evident 2°C–8°C cold-chain verification with sub-200ms QR audit verification, eliminating unauthorized data alteration and providing immutable provenance for medicine batches.`,
    keyFeatures: [
      "IoT Environmental Monitoring: Continuously captures temperature and humidity during transit and detects threshold violations",
      "Secure Supply-Chain Traceability: Maintains chronological records of batch events from manufacturing through distribution",
      "Tamper-Evident Data Integrity: Cryptographic SHA-256 hashing makes unauthorized modification of recorded transactions detectable",
      "QR-Based Verification: Connects physical pharmaceutical products with digital batch records for instant authenticity checks",
      "Role-Based Access: Dedicated portals for manufacturers, regulators, distributors, pharmacies, and patients",
      "Threshold-based environmental alerts and real-time shipment condition dashboards"
    ],
    systemFlow: "Sensors → ESP32/NodeMCU → Wi-Fi/API → Backend → Database & Tamper-Evident Ledger → Dashboard / QR Verification",
    techStack: ["ESP32", "NodeMCU", "DHT11 / DHT22", "Embedded C/C++", "Node.js / Express", "SHA-256 Hashing", "QR Verification", "MongoDB / Firebase"],
    metrics: [
      { label: "Integrity", value: "Tamper-Proof", desc: "Cryptographic SHA-256 block ledger" },
      { label: "Cold-Chain", value: "2°C – 8°C", desc: "Continuous vaccine & medicine safety" },
      { label: "QR Scan", value: "< 200 ms", desc: "Instant patient & pharmacy audit" },
      { label: "Alert Dispatch", value: "< 1.5 s", desc: "Excursion breach push notification" }
    ],
    architecture: `End-to-End Pharmaceutical Integrity Architecture:
1. Embedded Sensing Node: ESP32/NodeMCU polls DHT11/DHT22 sensors inside insulated vaccine transit boxes.
2. Cold-Chain Compliance: Continuous verification against critical 2°C–8°C safe bounds with local buzzer alerts.
3. Cryptographic Hashing: Every sensor reading and shipping checkpoint is digested using SHA-256 into a chain of cryptographically linked blocks.
4. QR Verification & Web Portal: Generates secure QR tokens stamped on medicine containers allowing consumers and regulators to audit thermal lifecycle history.`,
    simType: "pharmachain-sim",
    simDefaults: {
      temperature: 4.8,
      humidity: 52.0,
      isValid: true,
      blockHash: "0x8f2d61a9c3b4e72081f9a2e5d1b7c403"
    },
    codeSnippet: `// ESP32 Environmental Checkpoint & Cryptographic Hash Block
void Record_Pharma_Checkpoint(Batch_t *batch, float temp, float humidity) {
    char payload[256];
    snprintf(payload, sizeof(payload), "{\"batchId\":\"%s\",\"temp\":%.2f,\"rh\":%.2f,\"ts\":%lu}",
             batch->id, temp, humidity, (unsigned long)time(NULL));
             
    // Generate SHA-256 Digest for Tamper-Evident Ledger
    uint8_t hash[32];
    mbedtls_sha256_context ctx;
    mbedtls_sha256_init(&ctx);
    mbedtls_sha256_starts(&ctx, 0);
    mbedtls_sha256_update(&ctx, (const unsigned char*)payload, strlen(payload));
    mbedtls_sha256_finish(&ctx, hash);
    
    // Post to REST API & append to immutable transaction history
    HTTPClient http;
    http.begin(API_ENDPOINT_CHECKPOINT);
    http.addHeader("Content-Type", "application/json");
    http.POST(payload);
    http.end();
}`
  },

  // --- AEROSPACE ---
  {
    id: "proj-astra-gds",
    chipRef: "satellite-avionics",
    category: "aerospace",
    badge: "Aerospace & AI",
    image: "/projects/astragds.jpg",
    title: "ASTRA-GDS v3.0: Autonomous Satellite Ground Data System",
    subtitle: "Digital Twin, Predictive Health & Hardware-in-the-Loop Control",
    year: "Feb 2026",
    role: "Aerospace & Autonomous Systems Architect",
    summary: "Autonomous satellite ground operations platform combining a physics-based satellite digital twin, machine-learning anomaly detection (Isolation Forest), orbital propagation (SGP4), explainable AI, and an ESP32-based Hardware-in-the-Loop (HIL) testbed for closed-loop spacecraft recovery.",
    overview: `ASTRA-GDS v3.0 is an autonomous satellite ground operations platform designed for SmallSat and CubeSat mission monitoring.
Instead of waiting for a spacecraft parameter to cross a critical threshold, ASTRA-GDS analyzes telemetry trends, predicts potential failures, evaluates recovery scenarios, executes a validated telecommand through physical hardware, and verifies the resulting system response.
The platform implements a closed-loop 7-Stage Autonomous Decision Pipeline:
DETECT → DIAGNOSE → PREDICT → SIMULATE → DECIDE → RECOVER → VERIFY.`,
    challenge: `Ground contact with CubeSats is sparse (5–10 min per pass). An anomaly starting during LOS (loss-of-signal) can cascade into vehicle loss before the next contact window. Traditional static threshold alarms fail to predict degradation trends ahead of time.`,
    impact: `Pioneered a closed-loop predictive autonomous operations architecture that simulates mitigation strategies against a real-time digital twin and validates recovery commands on physical ESP32 HIL hardware before critical threshold breach.`,
    keyFeatures: [
      "Physical Spacecraft HIL: ESP32 avionics controller with INA219 power monitor, MPU6050 IMU, MOSFET payload switching, and FreeRTOS tasks",
      "Telemetry & Telecommand Gateway: Bidirectional USB Serial, Web Serial API, and MQTT with QoS-based command acknowledgement",
      "Physics Digital Twin: Battery/power behavior, thermal dynamics, orbital position, ground-station visibility, and recovery simulation",
      "AI Predictive Health: Isolation Forest multivariate monitoring over 10 feature vectors with Explainable AI (XAI) feature attribution",
      "Space Traffic Management: Conjunction assessment, collision probability, orbital uncertainty covariance margins, and avoidance maneuver analysis",
      "Space Sustainability: Natural orbital decay evaluation, required de-orbit ΔV calculations, and passivation readiness",
      "Earth Observation Payload Workflow: Multispectral acquisition, onboard compression, ground pass downlink, and NDVI product generation"
    ],
    systemFlow: "Spacecraft HIL (ESP32) → Telecommand Gateway (MQTT/Serial) → Digital Twin (SGP4/Physics) + ML Engine (Isolation Forest/XAI) → Autonomous Decision Engine → Telecommand Execution → Closed-Loop Verification",
    techStack: ["ESP32", "FreeRTOS", "Embedded C/C++", "Python / FastAPI", "Isolation Forest", "Explainable AI", "SGP4 Orbital", "Digital Twin HIL", "Three.js / WebGL"],
    metrics: [
      { label: "Recovery Loop", value: "< 250 ms", desc: "Automated anomaly detect to physical HIL action" },
      { label: "ML Accuracy", value: "98.2% AUC", desc: "Multidimensional Isolation Forest detection" },
      { label: "Telemetry", value: "10 Channels", desc: "Voltage, current, SOC, temps, gyro, solar, CPU" },
      { label: "Ephemeris", value: "SGP4 / TLE", desc: "Physics-based orbital position & ground track" }
    ],
    architecture: `Closed-Loop Autonomous Aerospace Operations Architecture:
1. Physical Spacecraft HIL: An ESP32 runs FreeRTOS tasks acquiring INA219 power and MPU6050 attitude telemetry, driving MOSFET switches for payload isolation.
2. Telemetry & Telecommand Gateway: Fast bidirectional USB/WebSerial and MQTT broker dispatching real-time downlink packets at 10Hz.
3. Physics Digital Twin & SGP4: Models satellite battery state, solar generation, orbit track, and ground station AOS/LOS visibility from two-line element sets.
4. AI Predictive Anomaly Engine: Isolation Forest detects abnormal multi-parameter patterns with feature attribution for transparent root-cause analysis.
5. Autonomous 7-Stage Decision Loop: Detects power spike → Diagnoses payload fault → Predicts battery brownout → Simulates load shedding → Dispatches CMD_PAYLOAD_OFF → Verifies physical recovery through telemetry feedback.`,
    simType: "astra-sim",
    simDefaults: {
      busVoltage: 8.2,
      payloadCurrent: 1.45,
      pipelineStage: "NOMINAL",
      recovered: false
    },
    codeSnippet: `// ESP32 Spacecraft HIL Firmware: FreeRTOS Telemetry & Telecommand Handler
void vTaskSpacecraftAvionics(void *pvParameters) {
    TickType_t xLastWakeTime = xTaskGetTickCount();
    for (;;) {
        float bus_volts = ina219.getBusVoltage_V();
        float current_A = ina219.getCurrent_mA() / 1000.0f;
        
        // Check for inbound telecommand from Ground Control
        if (Serial.available()) {
            String cmd = Serial.readStringUntil('\\n');
            if (cmd == "CMD_PAYLOAD_OFF") {
                // Actuate physical MOSFET switch to shed non-essential payload
                digitalWrite(PIN_MOSFET_PAYLOAD, LOW);
                telemetry_status.payload_active = false;
                Serial.println("ACK:CMD_PAYLOAD_OFF:EXECUTED");
            }
        }
        
        // Transmit 10-channel telemetry packet over downlink
        Transmit_Telemetry_Downlink(bus_volts, current_A, telemetry_status.payload_active);
        vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(100)); // 10Hz rate
    }
}`
  }
];

export const experienceData = [
  {
    role: "Research and Development Technician",
    organization: "ACM SIGBED – Student Chapter, KARE",
    period: "Apr 2025 – May 2026",
    location: "KARE, Tamil Nadu",
    highlights: [
      "Conducted R&D in Embedded Systems and Real-Time Operating Systems (RTOS), benchmarking hardware architectures (ARM Cortex-M vs RISC-V).",
      "Analyzed technical literature and evaluated deterministic scheduling algorithms under heavy bus contention.",
      "Facilitated hands-on technical workshops on microcontroller programming, sensor interfacing, and real-time systems for 50+ undergraduate engineers."
    ]
  },
  {
    role: "Embedded Firmware Intern",
    organization: "Kaashiv Info-tech",
    period: "May 2025 – June 2025",
    location: "Chennai, India",
    highlights: [
      "Designed and tested embedded hardware circuits featuring microcontroller-based control systems and tight hardware-software integration.",
      "Conducted rigorous validation and system-level integration testing using serial monitors, logic analyzers, and oscilloscopes to verify protocol compliance.",
      "Optimized peripheral driver routines (I2C/SPI), cutting register configuration latency by 18%."
    ]
  },
  {
    role: "Embedded Systems Developer",
    organization: "HYBIX Group’s Startup",
    period: "July 2025 – July 2026",
    location: "Remote / Hybrid",
    highlights: [
      "Led end-to-end development of embedded and IoT solutions, translating hardware requirements into working commercial prototypes.",
      "Collaborated with clients and cross-functional teams to deliver scalable, production-ready embedded firmware architectures.",
      "Managed firmware development, circuit integration, PCB bring-up, and automated testing across multiple microcontroller platforms (STM32, ESP32, AVR)."
    ]
  }
];

export const freelanceProjectsData = [
  { title: "Smart Irrigation & Soil NPK Sensor Node", tech: "STM32 + LoRaWAN", client: "AgriTech Client" },
  { title: "Industrial RS-485 Power Meter Logger", tech: "ESP32 + MODBUS RTU", client: "Energy Monitoring Co." },
  { title: "Automated Greenhouse Climate Controller", tech: "AVR + FreeRTOS", client: "Commercial Floriculture" },
  { title: "Low-Power Asset Tracker with GPS/GPRS", tech: "ARM Cortex-M0 + SIM7600", client: "Logistics Startup" },
  { title: "BLE 5.0 Medical Pulse Oximeter Patch", tech: "nRF52840 + Custom BLE", client: "HealthTech Freelance" },
  { title: "Sub-GHz Long Range Remote Emergency Beacon", tech: "SX1278 + Bare-metal C", client: "Marine Safety Project" }
];

export const certificationsData = [
  {
    title: "Writing Code for ARM® Cortex® Microcontrollers",
    issuer: "Microchip University",
    date: "Certified",
    badge: "ARM Architecture",
    description: "In-depth bare-metal registers, memory maps, CMSIS, linker scripts, and interrupt vectors."
  },
  {
    title: "25035 RTOS1: Building Real-Time Applications with FreeRTOS",
    issuer: "Microchip University",
    date: "Certified",
    badge: "RTOS Kernel",
    description: "Multitasking, task priorities, synchronization primitives, queues, and memory management."
  },
  {
    title: "Introduction to Embedded Linux",
    issuer: "Microchip University",
    date: "Certified",
    badge: "Embedded OS",
    description: "U-Boot bootloader, kernel compilation, root filesystem creation, and device tree architecture."
  },
  {
    title: "QNX Neutrino RTOS & Embedded Systems",
    issuer: "QNX Pi Square Technologies",
    date: "Certified",
    badge: "Safety-Critical RTOS",
    description: "Microkernel architecture, deterministic IPC, POSIX real-time extensions, and high-reliability systems."
  },
  {
    title: "Embedded Systems Internship Certification",
    issuer: "Kaashiv Info-tech",
    date: "Certified",
    badge: "Industrial Internship",
    description: "Microcontroller control systems, serial protocols verification, and embedded hardware validation."
  }
];

export const achievementsData = [
  "Delivered 20+ freelance projects in embedded systems, IoT, and industrial automation across agriculture, healthcare, and smart transport domains since 2024.",
  "Participated in 15+ hackathons and technical symposiums, winning hardware prototype sprint awards for rapid IoT hardware bring-up.",
  "Conducted hands-on technical workshop on 'Next-Gen Embedded Systems and IoT Development' covering bare-metal C, sensor interfacing, and FreeRTOS for 50+ students."
];
