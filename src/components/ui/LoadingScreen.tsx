import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [stage, setStage] = useState(0);

  const logSequence = [
    { text: 'Initializing Neural Network...', delay: 200 },
    { text: 'Loading Cognitive Architecture...', delay: 800 },
    { text: 'Reasoning...', delay: 1400 },
    { text: 'Model Loaded Successfully', delay: 2000 },
  ];

  useEffect(() => {
    // Add logs step-by-step
    logSequence.forEach((step, index) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
        setStage(index + 1);
      }, step.delay);

      return () => clearTimeout(timer);
    });

    // Complete loading after final log
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      finishTimer && clearTimeout(finishTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050816] z-50 flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Background Matrix/Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      {/* Glow highlight behind */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none filter blur-xl" />

      {/* Interactive Neural Growth SVG */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 200 200">
          {/* Synapses lines */}
          {stage >= 1 && (
            <>
              {/* Central to Top-Left */}
              <motion.line
                x1="100" y1="100" x2="60" y2="60"
                stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {/* Central to Top-Right */}
              <motion.line
                x1="100" y1="100" x2="140" y2="60"
                stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              />
            </>
          )}

          {stage >= 2 && (
            <>
              {/* Left branches */}
              <motion.line
                x1="60" y1="60" x2="30" y2="90"
                stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="60" y1="60" x2="50" y2="130"
                stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
              {/* Right branches */}
              <motion.line
                x1="140" y1="60" x2="170" y2="90"
                stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="140" y1="60" x2="150" y2="130"
                stroke="rgba(0, 229, 255, 0.3)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
            </>
          )}

          {stage >= 3 && (
            <>
              {/* Bottom cluster connections */}
              <motion.line
                x1="50" y1="130" x2="100" y2="160"
                stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.line
                x1="150" y1="130" x2="100" y2="160"
                stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            </>
          )}

          {/* Central Neuron Node */}
          <motion.circle
            cx="100" cy="100" r="8"
            className="fill-white filter drop-shadow-[0_0_8px_#00E5FF]"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Connected Outer Nodes */}
          {stage >= 1 && (
            <>
              <motion.circle
                cx="60" cy="60" r="4"
                className="fill-[#00E5FF] filter drop-shadow-[0_0_4px_#00E5FF]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              <motion.circle
                cx="140" cy="60" r="4"
                className="fill-[#00E5FF] filter drop-shadow-[0_0_4px_#00E5FF]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              />
            </>
          )}

          {stage >= 2 && (
            <>
              <motion.circle
                cx="30" cy="90" r="3"
                className="fill-white/80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              />
              <motion.circle
                cx="50" cy="130" r="3.5"
                className="fill-[#5EEBFF] filter drop-shadow-[0_0_3px_#5EEBFF]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              />
              <motion.circle
                cx="170" cy="90" r="3"
                className="fill-white/80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              />
              <motion.circle
                cx="150" cy="130" r="3.5"
                className="fill-[#5EEBFF] filter drop-shadow-[0_0_3px_#5EEBFF]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              />
            </>
          )}

          {stage >= 3 && (
            <motion.circle
              cx="100" cy="160" r="5"
              className="fill-[#39FF88] filter drop-shadow-[0_0_5px_#39FF88]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            />
          )}

          {/* Travelling Data Packets */}
          {stage >= 3 && (
            <>
              {/* Central to Top-Left */}
              <motion.circle
                r="2" fill="#FFFFFF"
                animate={{
                  cx: [100, 60],
                  cy: [100, 60],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Top-Left to Bottom-Left Node */}
              <motion.circle
                r="1.5" fill="#5EEBFF"
                animate={{
                  cx: [60, 50],
                  cy: [60, 130],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
              {/* Central to Top-Right */}
              <motion.circle
                r="2" fill="#FFFFFF"
                animate={{
                  cx: [100, 140],
                  cy: [100, 60],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.7,
                }}
              />
            </>
          )}
        </svg>
      </div>

      {/* Boot Logs */}
      <div className="w-80 h-32 flex flex-col items-start justify-end font-mono text-[11px] text-white/40 tracking-wider space-y-1">
        <AnimatePresence>
          {logs.map((log, index) => {
            const isSuccess = log.includes('Success') || log.includes('Successfully');
            const isReasoning = log.includes('Reasoning');
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-1.5"
              >
                <span className="text-[#00E5FF]">&gt;</span>
                <span className={
                  isSuccess 
                    ? 'text-[#39FF88] font-bold drop-shadow-[0_0_4px_rgba(57,255,136,0.3)]' 
                    : isReasoning 
                    ? 'text-[#FFC857] animate-pulse' 
                    : 'text-white/80'
                }>
                  {log}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* UI Subtitles */}
      <div className="absolute bottom-10 font-mono text-[10px] text-white/20 tracking-[0.2em] flex flex-col items-center space-y-1">
        <span>COGNITIVE CORE V4.0.0</span>
        <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute h-full bg-[#00E5FF]"
            animate={{
              left: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: '40%' }}
          />
        </div>
      </div>
    </div>
  );
}
