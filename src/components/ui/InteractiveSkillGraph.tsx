import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Settings2 } from 'lucide-react';

interface InteractiveSkillGraphProps {
  onLobeHover: (idx: number | null) => void;
}

interface Skill {
  name: string;
  weight: string;
  latency: string;
  status: string;
}

interface LobeCategory {
  name: string;
  lobe: string;
  desc: string;
  skills: Skill[];
}

export default function InteractiveSkillGraph({ onLobeHover }: InteractiveSkillGraphProps) {
  const categories: LobeCategory[] = [
    {
      name: 'Artificial Intelligence',
      lobe: 'Frontal Lobe',
      desc: 'Deep Neural Networks & Visual Cognition pipelines.',
      skills: [
        { name: 'Machine Learning', weight: '98%', latency: '0.4ms', status: 'OPTIMAL' },
        { name: 'Deep Learning', weight: '95%', latency: '0.8ms', status: 'OPTIMAL' },
        { name: 'NLP', weight: '88%', latency: '1.2ms', status: 'SYNCHRONIZED' },
        { name: 'Computer Vision', weight: '96%', latency: '0.5ms', status: 'OPTIMAL' },
        { name: 'Generative AI', weight: '92%', latency: '0.9ms', status: 'OPTIMAL' }
      ]
    },
    {
      name: 'Programming & Logic',
      lobe: 'Parietal Lobe',
      desc: 'Procedural logic and algorithms structure.',
      skills: [
        { name: 'Python Core', weight: '99%', latency: '0.2ms', status: 'OPTIMAL' },
        { name: 'C++', weight: '85%', latency: '1.5ms', status: 'STABLE' },
        { name: 'OOP Paradigm', weight: '94%', latency: '0.7ms', status: 'OPTIMAL' },
        { name: 'Data Structures', weight: '92%', latency: '0.9ms', status: 'OPTIMAL' },
        { name: 'Algorithms', weight: '90%', latency: '1.1ms', status: 'OPTIMAL' }
      ]
    },
    {
      name: 'ML Frameworks',
      lobe: 'Occipital Lobe',
      desc: 'Computational graphs & visual inference layers.',
      skills: [
        { name: 'PyTorch', weight: '96%', latency: '0.5ms', status: 'OPTIMAL' },
        { name: 'FastAPI', weight: '94%', latency: '0.6ms', status: 'OPTIMAL' },
        { name: 'Next.js', weight: '88%', latency: '1.3ms', status: 'SYNCHRONIZED' },
        { name: 'YOLOv8 & OpenCV', weight: '95%', latency: '0.5ms', status: 'OPTIMAL' },
        { name: 'ResNet50', weight: '93%', latency: '0.8ms', status: 'OPTIMAL' }
      ]
    },
    {
      name: 'Data Engineering',
      lobe: 'Temporal Lobe',
      desc: 'High-speed storage query & visual intelligence dashboards.',
      skills: [
        { name: 'Data Preprocessing', weight: '95%', latency: '0.6ms', status: 'OPTIMAL' },
        { name: 'Microsoft Excel', weight: '97%', latency: '0.4ms', status: 'OPTIMAL' },
        { name: 'Dashboarding', weight: '94%', latency: '0.8ms', status: 'OPTIMAL' },
        { name: 'Business Intel', weight: '89%', latency: '1.2ms', status: 'SYNCHRONIZED' }
      ]
    },
    {
      name: 'System Orchestration',
      lobe: 'Cerebellum & Stem',
      desc: 'Distributed environments & problem-solving throughput.',
      skills: [
        { name: 'Problem Solving', weight: '98%', latency: '0.1ms', status: 'OPTIMAL' },
        { name: 'Analytical Thinking', weight: '97%', latency: '0.2ms', status: 'OPTIMAL' },
        { name: 'Teamwork Flow', weight: '95%', latency: '0.4ms', status: 'OPTIMAL' },
        { name: 'Docker / SQL', weight: '90%', latency: '1.1ms', status: 'OPTIMAL' },
        { name: 'Time Mgmt', weight: '94%', latency: '0.7ms', status: 'OPTIMAL' }
      ]
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const activeCategory = categories[activeIdx];

  // Satellite node orbital layout math helper (evenly space points on a circle)
  const getOrbitalCoords = (index: number, total: number) => {
    const radius = 95; // SVG coordinate units
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2; // offset to top center
    return {
      x: 150 + Math.cos(angle) * radius,
      y: 150 + Math.sin(angle) * radius
    };
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Column: Interactive Lobe Switcher */}
      <div className="lg:col-span-5 flex flex-col space-y-3">
        {categories.map((cat, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveIdx(idx);
                setHoveredSkill(null);
                onLobeHover(idx);
              }}
              onMouseEnter={() => onLobeHover(idx)}
              onMouseLeave={() => onLobeHover(null)}
              onTouchStart={() => onLobeHover(idx)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden focus:outline-none cursor-pointer select-none ${
                isActive
                  ? 'border-[var(--color-glow,#00E5FF)] bg-[var(--color-glow,#00E5FF)]/5 shadow-[0_0_20px_rgba(0,229,255,0.05)]'
                  : 'border-border-custom bg-white/2 dark:bg-white/2 light:bg-slate-900/2 hover:border-[var(--color-glow,#00E5FF)]/35'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSkillBar"
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--color-glow,#00E5FF)]"
                />
              )}

              <div className="flex justify-between items-center">
                <span className="font-heading text-sm font-bold text-foreground">
                  {cat.name}
                </span>
                <span className="font-mono text-[8px] px-2 py-0.5 rounded bg-white/10 dark:bg-white/10 light:bg-slate-900/10 text-muted uppercase tracking-wider">
                  {cat.lobe}
                </span>
              </div>
              <p className="font-sans text-[11px] text-muted mt-1.5 leading-relaxed">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right Column: Active Synapse Map Visualizer */}
      <div className="lg:col-span-7 glass-panel rounded-2xl p-6 flex flex-col justify-between min-h-[350px] relative overflow-hidden select-none">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

        {/* Top telemetry status */}
        <div className="flex justify-between items-center border-b border-border-custom pb-3.5 relative z-10">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[var(--color-glow,#00E5FF)] animate-pulse" />
            <span className="font-mono text-[10px] text-foreground tracking-wider uppercase">
              SYNAPSE_GRID: {activeCategory.lobe.replace(' ', '_').toUpperCase()}
            </span>
          </div>
          <span className="font-mono text-[8px] text-[var(--color-success,#39FF88)] px-2 py-0.5 rounded bg-[var(--color-success,#39FF88)]/10 border border-[var(--color-success,#39FF88)]/25">
            SIGNAL: ONLINE
          </span>
        </div>

        {/* Mid: Active SVG Mapping */}
        <div className="flex-1 w-full min-h-[220px] flex items-center justify-center relative my-4">
          <svg className="w-72 h-72" viewBox="0 0 300 300">
            {/* Pulsing connecting lines (synapses) */}
            <AnimatePresence mode="wait">
              <g key={activeIdx}>
                {activeCategory.skills.map((skill, index) => {
                  const target = getOrbitalCoords(index, activeCategory.skills.length);
                  return (
                    <g key={skill.name}>
                      <motion.line
                        x1="150"
                        y1="150"
                        x2={target.x}
                        y2={target.y}
                        stroke="var(--color-border)"
                        strokeWidth="1.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      
                      {/* Traveling data pulse packets */}
                      <motion.circle
                        r="2.5"
                        fill="var(--color-glow)"
                        className="filter drop-shadow-[0_0_4px_var(--color-glow)]"
                        animate={{
                          cx: [150, target.x],
                          cy: [150, target.y]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </g>
                  );
                })}
              </g>
            </AnimatePresence>

            {/* Central Lobe Nucleus */}
            <motion.circle
              cx="150"
              cy="150"
              r="22"
              fill="var(--color-card-bg)"
              stroke="var(--color-glow)"
              strokeWidth="2"
              className="filter drop-shadow-[0_0_12px_var(--color-glow)] cursor-pointer"
              whileHover={{ scale: 1.1 }}
            />
            <g pointerEvents="none">
              <circle cx="150" cy="150" r="14" fill="rgba(0,229,255,0.06)" />
              {/* Micro Brain Icon directly drawn in center */}
              <text
                x="150"
                y="154"
                textAnchor="middle"
                className="fill-[var(--color-glow)] font-sans font-bold text-[11px]"
              >
                🧠
              </text>
            </g>

            {/* Orbiting Satellite Nodes */}
            <AnimatePresence mode="wait">
              <g key={`satellites-${activeIdx}`}>
                {activeCategory.skills.map((skill, index) => {
                  const target = getOrbitalCoords(index, activeCategory.skills.length);
                  const isHovered = hoveredSkill?.name === skill.name;
                  
                  return (
                    <g 
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onTouchStart={() => setHoveredSkill(skill)}
                      className="cursor-pointer"
                    >
                      {/* Large invisible circle for easy hover */}
                      <circle
                        cx={target.x}
                        cy={target.y}
                        r="26"
                        fill="transparent"
                      />

                      {/* Visible satellite circle */}
                      <motion.circle
                        cx={target.x}
                        cy={target.y}
                        r={isHovered ? "11" : "8"}
                        fill={isHovered ? "var(--color-glow)" : "var(--color-card-bg)"}
                        stroke="var(--color-glow)"
                        strokeWidth="1.5"
                        className="filter drop-shadow-[0_0_6px_var(--color-glow)]"
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      />

                      {/* Text tags hovering near node */}
                      <text
                        x={target.x}
                        y={target.y + 24}
                        textAnchor="middle"
                        className="fill-foreground font-mono text-[9px] font-bold"
                        pointerEvents="none"
                      >
                        {skill.name}
                      </text>
                    </g>
                  );
                })}
              </g>
            </AnimatePresence>
          </svg>
        </div>

        {/* Bottom Panel: Real-time Telemetry Stats */}
        <div className="border-t border-border-custom pt-3.5 relative z-10 flex flex-col sm:flex-row justify-between items-stretch gap-2.5">
          {hoveredSkill ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-3 w-full font-mono text-[9px]"
            >
              <div className="p-2 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 rounded border border-border-custom flex flex-col justify-between">
                <span className="text-muted">SYNAPSE_WT</span>
                <span className="text-foreground font-bold text-[10px] mt-0.5 text-glow">{hoveredSkill.weight}</span>
              </div>
              <div className="p-2 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 rounded border border-border-custom flex flex-col justify-between">
                <span className="text-muted">LATENCY</span>
                <span className="text-[var(--color-success,#39FF88)] font-bold text-[10px] mt-0.5">{hoveredSkill.latency}</span>
              </div>
              <div className="p-2 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 rounded border border-border-custom flex flex-col justify-between">
                <span className="text-muted">STATUS</span>
                <span className="text-[var(--color-glow,#00E5FF)] font-bold text-[10px] mt-0.5 tracking-wider">{hoveredSkill.status}</span>
              </div>
            </motion.div>
          ) : (
            <div className="w-full flex items-center justify-between text-muted font-mono text-[9px] py-2 leading-relaxed">
              <span className="flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-muted animate-spin" />
                <span>Hover over orbital nodes to measure signal packet metrics.</span>
              </span>
              <span className="hidden sm:inline">V: 120Hz</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
