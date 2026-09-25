import React from 'react';
import { Cpu } from 'lucide-react';
import { sounds } from '../../audio/soundEngine';
import ThreeBackground from './ThreeBackground';
import ClassicHeader from './ClassicHeader';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import AchievementsSection from './AchievementsSection';
import ContactSection from './ContactSection';
import ClassicFooter from './ClassicFooter';

export default function ClassicPortfolioView({
  theme,
  toggleTheme,
  onOpen3DLab,
  onOpenResume,
  onSelectProject
}) {
  return (
    <div className="classic-portfolio-wrapper" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Interactive 3D Parallax Canvas Background */}
      <ThreeBackground />

      {/* Main Header Bar */}
      <ClassicHeader
        theme={theme}
        toggleTheme={toggleTheme}
        onOpen3DLab={onOpen3DLab}
        onOpenResume={onOpenResume}
      />

      {/* Main Page Sections */}
      <main>
        <HeroSection
          onOpen3DLab={onOpen3DLab}
          onOpenResume={onOpenResume}
        />
        <AboutSection onOpenResume={onOpenResume} />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection onSelectProject={onSelectProject} />
        <ExperienceSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Floating Sticky 3D Hardware Lab Quick Button */}
      <button
        onClick={() => {
          sounds.playBootChime();
          onOpen3DLab();
        }}
        className="floating-3d-lab-trigger"
        title="Open 3D Silicon Hardware Lab"
      >
        <Cpu size={18} />
        <span>3D Hardware Lab</span>
      </button>

      {/* Footer */}
      <ClassicFooter
        onOpen3DLab={onOpen3DLab}
        onOpenResume={onOpenResume}
      />
    </div>
  );
}
