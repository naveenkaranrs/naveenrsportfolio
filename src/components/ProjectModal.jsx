import React from 'react';
import { X, User, Calendar } from 'lucide-react';
import { sounds } from '../audio/soundEngine';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#090d15] border border-emerald-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Modal Top Header - Matching Screenshot 3 */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-3xl font-bold text-[#00f5a0] tracking-wide font-sans leading-tight">
              {project.title}
            </h2>

            {/* Metadata Row: Role & Date */}
            <div className="flex items-center gap-5 text-sm text-slate-300 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <User size={16} />
                <span>{project.role}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Calendar size={16} />
                <span>{project.year}</span>
              </div>
            </div>

            {/* Tech Badges Pill Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-full font-mono bg-[#032021] text-[#00e599] border border-[#00e599]/40 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body - Only Project Details & Story (Matching Screenshot 3) */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Left Column: Overview, Challenge & Approach, Impact */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-[#00e599] font-mono mb-2">
                  Overview
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.overview || project.summary}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#00e599] font-mono mb-2">
                  Challenge & Approach
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.challenge || project.summary}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#00e599] font-mono mb-2">
                  Impact
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                  {project.impact || "Validated real-time performance with deterministic hardware execution."}
                </p>
              </div>
            </div>

            {/* Right Column: Project Image & Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Metrics Grid */}
              {project.metrics && (
                <div className="grid grid-cols-2 gap-2.5">
                  {project.metrics.slice(0, 4).map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">{m.label}</div>
                      <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer - Matching Screenshot 3 */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="project-modal__back-btn"
          >
            Back to Projects
          </button>
          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            {project.badge} // {project.year}
          </div>
        </div>
      </div>
    </div>
  );
}
