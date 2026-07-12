import { motion } from 'framer-motion';

export function ProfilePlaceholder({ imageUrl, type }: { imageUrl?: string; type?: 'hero' | 'about' }) {
  return (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-[var(--color-border,rgba(0,229,255,0.25))] flex items-center justify-center bg-black/35 overflow-hidden shadow-[0_0_35px_rgba(0,229,255,0.1)]">
      {/* Background Image - Object Cover inside circle is perfect for profile headshots */}
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Mohamed Mahfouz Profile" 
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] contrast-[1.08]"
        />
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none mix-blend-overlay" />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[var(--color-border,rgba(0,229,255,0.25))]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner fast-rotating telemetry ring */}
      <motion.div
        className="absolute w-[70%] h-[70%] rounded-full border border-[var(--color-border,rgba(94,235,255,0.15))] border-t-[var(--color-glow,rgba(0,229,255,0.65))]"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Crosshair grids */}
      <div className="absolute w-[92%] h-[1px] bg-white/10" />
      <div className="absolute h-[92%] w-[1px] bg-white/10" />

      {/* Telemetry Core Badge overlay */}
      {!imageUrl ? (
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.15)_0%,transparent_70%)] flex items-center justify-center"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-[9px] text-[#00E5FF] tracking-[0.2em] font-semibold">SUBJECT_CORE</span>
        </motion.div>
      ) : (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-black/65 border border-[var(--color-border,rgba(0,229,255,0.2))] font-mono text-[8px] text-[var(--color-glow,#00E5FF)] tracking-widest uppercase">
          {type === 'hero' ? 'CORE_MODULE_01' : 'CORE_MODULE_02'}
        </div>
      )}

      {/* Vertically sliding scanline */}
      <motion.div
        className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-glow,#00E5FF)] to-transparent shadow-[0_0_8px_var(--color-glow,#00E5FF)]"
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Side telemetry text */}
      <div className="absolute bottom-6 font-mono text-[9px] text-white/50 bg-black/65 px-3 py-1 rounded border border-white/5 tracking-widest text-center select-none backdrop-blur-sm">
        <div>SIG_SIG: STABLE</div>
        <div>SCAN_LOCK: 100%</div>
      </div>
    </div>
  );
}

interface NeuralFingerprintProps {
  id: number;
}

export function ProjectNeuralFingerprint({ id }: NeuralFingerprintProps) {
  const getPath = (seed: number) => {
    switch (seed) {
      case 1:
        return "M50,10 Q80,45 100,50 T150,90 T180,100 M20,50 Q60,90 100,100 T170,140 M40,150 Q100,120 160,150";
      case 2:
        return "M10,10 C50,60 100,20 150,120 S190,190 100,180 M30,100 C70,120 120,60 170,110 M20,160 Q80,110 180,160";
      case 3:
        return "M100,10 C120,60 50,120 100,190 M50,50 C100,90 100,110 150,150 M10,100 C50,100 150,100 190,100";
      default:
        return "M100,100 A80,80 0 1,0 100,101 M100,100 A50,50 0 1,1 100,101 M100,100 A20,20 0 1,0 100,101";
    }
  };

  return (
    <div className="relative w-full h-40 flex items-center justify-center bg-black/30 border border-[#00E5FF]/10 rounded-xl overflow-hidden group">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

      <svg className="w-[85%] h-[85%] opacity-55 group-hover:opacity-85 transition-opacity duration-500" viewBox="0 0 200 200">
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#39FF88" />
          </linearGradient>
        </defs>

        <motion.path
          d={getPath(id)}
          fill="none"
          stroke={`url(#grad-${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />

        <motion.circle
          r="3"
          fill="#FFFFFF"
          className="filter drop-shadow-[0_0_4px_#39FF88]"
          animate={{
            cx: id === 1 ? [50, 100, 150] : id === 2 ? [10, 100, 190] : [100, 50, 100],
            cy: id === 1 ? [10, 50, 90] : id === 2 ? [10, 20, 190] : [10, 120, 190],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="absolute w-full h-[1px] bg-[#00E5FF]/40 shadow-[0_0_6px_#00E5FF]"
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <span className="absolute bottom-2 right-3 font-mono text-[8px] text-[#00E5FF]/50 uppercase tracking-widest">
        FINGERPRINT_SIG_{id}
      </span>
    </div>
  );
}
