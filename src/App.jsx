import React, { useState, useEffect } from 'react';
import ClassicPortfolioView from './components/ClassicPortfolio/ClassicPortfolioView';
import BootSequence from './components/BootSequence';
import HUDNavbar from './components/HUDNavbar';
import PCBScene3D from './components/PCBScene3D';
import TelemetryDashboard from './components/TelemetryDashboard';
import OscilloscopeLab from './components/OscilloscopeLab';
import TerminalCLI from './components/TerminalCLI';
import ProjectModal from './components/ProjectModal';
import ChipDetailsModal from './components/ChipDetailsModal';
import ResumeModal from './components/ResumeModal';
import { projectsData } from './data/portfolioData';
import { sounds } from './audio/soundEngine';
import { downloadResumePDF } from './utils/downloadResume';

export default function App() {
  const [portfolioMode, setPortfolioMode] = useState('classic'); // 'classic' (Harishkumaran ECE style) or 'hardware-lab' (3D PCB & Silicon Lab)
  const [theme, setTheme] = useState('dark');
  const [isBooting, setIsBooting] = useState(false);
  const [activeLabView, setActiveLabView] = useState('pcb'); // 'pcb', 'telemetry', 'oscilloscope', 'cli'
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedChipId, setSelectedChipId] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Switch to 3D Hardware Lab
  const open3DLab = () => {
    setPortfolioMode('hardware-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Classic Web Portfolio
  const returnToClassic = () => {
    setPortfolioMode('classic');
  };

  // Handle interaction from 3D PCB canvas
  const handleSelectComponent = (compData) => {
    const id = compData?.id;
    if (id && id.startsWith('proj-')) {
      const match = projectsData.find((p) => p.id === id);
      if (match) setSelectedProject(match);
    } else if (id) {
      setSelectedChipId(id);
    }
  };

  const handleReboot = () => {
    setSelectedProject(null);
    setSelectedChipId(null);
    setIsResumeOpen(false);
    setIsBooting(true);
  };

  return (
    <div className={`app-root ${portfolioMode === 'hardware-lab' ? 'overflow-hidden h-screen' : 'min-h-screen'}`}>
      {/* MODE 1: CLASSIC ECE PORTFOLIO (HARISHKUMARAN STYLE TAILORED FOR NAVEEN KARAN) */}
      {portfolioMode === 'classic' && (
        <ClassicPortfolioView
          theme={theme}
          toggleTheme={toggleTheme}
          onOpen3DLab={open3DLab}
          onOpenResume={() => downloadResumePDF()}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
      )}

      {/* MODE 2: ATTACHED 3D HARDWARE & SILICON LAB (PREVIOUS 3D WEBSITE) */}
      {portfolioMode === 'hardware-lab' && (
        <div className="w-full h-screen bg-[#070a10] text-slate-100 flex flex-col overflow-hidden font-mono relative">
          {/* Bare-Metal Boot Sequence Screen */}
          {isBooting && (
            <BootSequence onComplete={() => setIsBooting(false)} />
          )}

          {/* Mission Control HUD Navbar with Return Button */}
          <HUDNavbar
            activeView={activeLabView}
            setActiveView={setActiveLabView}
            onOpenResume={() => downloadResumePDF()}
            onOpenContact={() => setSelectedChipId('chip-contact')}
            onReboot={handleReboot}
            onReturnToPortfolio={returnToClassic}
          />

          {/* Viewport Content Area */}
          <main className="flex-1 w-full relative overflow-hidden">
            {activeLabView === 'pcb' && (
              <PCBScene3D
                onSelectComponent={handleSelectComponent}
                activeComponentId={selectedProject?.id || selectedChipId}
              />
            )}

            {activeLabView === 'telemetry' && (
              <TelemetryDashboard />
            )}

            {activeLabView === 'oscilloscope' && (
              <OscilloscopeLab />
            )}

            {activeLabView === 'cli' && (
              <TerminalCLI
                onOpenResume={() => downloadResumePDF()}
                onReboot={handleReboot}
              />
            )}
          </main>
        </div>
      )}

      {/* Shared Project Details Modal with Live Simulators */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Shared Chip / Component Inspection Modal */}
      {selectedChipId && (
        <ChipDetailsModal
          componentId={selectedChipId}
          onClose={() => setSelectedChipId(null)}
          onOpenResume={() => {
            setSelectedChipId(null);
            downloadResumePDF();
          }}
        />
      )}

      {/* Shared Formatted & Printable Resume Modal */}
      {isResumeOpen && (
        <ResumeModal onClose={() => setIsResumeOpen(false)} />
      )}
    </div>
  );
}
