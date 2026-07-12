import { motion } from 'framer-motion';

interface TimelineItem {
  year: string;
  role: string;
  company?: string;
  description: string;
}

export default function Timeline() {
  const items: TimelineItem[] = [
    {
      year: '2025 — Present',
      role: 'CEO & Founder',
      company: 'NXT G Ads',
      description: 'Built and scaled an advertising startup from the ground up. Managing branding, marketing, AI-powered content creation, automation, creative production, and digital campaigns. Using AI to increase productivity, creativity, and business performance.'
    },
    {
      year: '2022 — 2024',
      role: 'Freelance Graphic Designer',
      description: 'Worked with numerous clients creating branding, social media campaigns, advertising creatives, visual identities, and marketing assets.'
    },
    {
      year: '2017 — 2023',
      role: 'Professional Photographer',
      description: 'Captured commercial, event, portrait, and creative photography projects while developing storytelling, composition, and visual communication expertise.'
    }
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Central Synaptic Fiber (Vertical Line) */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00E5FF]/80 via-[#39FF88]/40 to-transparent" />
      
      {/* Animated Synapse Pulse */}
      <motion.div
        className="absolute left-8 md:left-1/2 -translate-x-1/2 w-[4px] h-20 bg-gradient-to-b from-transparent via-[#00E5FF] to-transparent rounded-full shadow-[0_0_8px_#00E5FF]"
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="space-y-12 relative">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-start md:items-center ${
                isLeft ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Spacing for layout alignment */}
              <div className="w-full md:w-1/2" />

              {/* Central Synapse Lobe Node */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div
                  className="w-4 h-4 rounded-full bg-[#050816] border-2 border-[#00E5FF] cursor-pointer shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                  whileHover={{
                    scale: 1.4,
                    borderColor: '#39FF88',
                    boxShadow: '0 0 16px #39FF88',
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />
              </div>

              {/* Timeline Card */}
              <motion.div
                className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'
                }`}
                initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
              >
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden hover:border-[#00E5FF]/40 transition-all duration-300 group">
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.02),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Time Badge */}
                  <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold block mb-2">
                    {item.year}
                  </span>
                  
                  {/* Title / Role */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground">
                    {item.role}
                  </h3>
                  
                  {/* Company */}
                  {item.company && (
                    <span className="inline-block px-2.5 py-0.5 mt-1.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-mono text-[10px] uppercase tracking-wider">
                      {item.company}
                    </span>
                  )}
                  
                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
