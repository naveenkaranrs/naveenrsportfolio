import React, { useState } from 'react';
import { Search, Sliders, ExternalLink, Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../audio/soundEngine';
import { projectsData, freelanceProjectsData } from '../../data/portfolioData';

export default function ProjectsSection({ onSelectProject }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filterButtons = [
    { id: 'all', label: 'All Projects' },
    { id: 'industrial-automotive', label: 'Industrial & Automotive' },
    { id: 'iomt-healthcare', label: 'IoMT & Healthcare' },
    { id: 'aerospace', label: 'Aerospace' }
  ];

  const filteredProjects = projectsData.filter((proj) => {
    const matchesFilter = activeFilter === 'all' || proj.category === activeFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      proj.title.toLowerCase().includes(query) ||
      proj.summary.toLowerCase().includes(query) ||
      (proj.techStack && proj.techStack.some((t) => t.toLowerCase().includes(query)));
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-label">03. ENGINEERING WORK</div>
          <h2 className="section-title">Featured Engineering Projects</h2>
          <p className="section-subtitle">
            Real-time embedded systems, firmware development, intelligent IoT architectures, healthcare systems, and aerospace-focused engineering solutions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects by name, MCU, protocol (STM32, FreeRTOS, CAN, MQTT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {filterButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                sounds.playRelay();
                setActiveFilter(btn.id);
              }}
              className={`filter-btn ${activeFilter === btn.id ? 'is-active' : ''}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => {
                sounds.playChipSelect();
                onSelectProject(project);
              }}
            >
              {/* Top Project Image with Glowing Hover Overlay */}
              <div className="project-card__img-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card__img"
                  loading="lazy"
                />
                <div className="project-card__img-overlay">
                  <button
                    className="project-card__view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playChipSelect();
                      onSelectProject(project);
                    }}
                  >
                    <span>View Details</span>
                  </button>
                </div>
              </div>

              {/* Card Body - Only Title and 2 to 3 Line Explanation on Front Page */}
              <div className="project-card__body">
                <h3 className="project-card__title">
                  {project.title}
                </h3>

                <p className="project-card__summary">
                  {project.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
