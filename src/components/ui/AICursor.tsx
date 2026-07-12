import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function AICursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredType, setHoveredType] = useState<'button' | 'node' | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        const magnetic = hoveredElement.closest('.magnetic-node') || hoveredElement.closest('.magnetic-btn');
        if (magnetic) {
          const rect = magnetic.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Magnetic pull: attract cursor 70% toward the center of the node
          targetX = centerX + (e.clientX - centerX) * 0.3;
          targetY = centerY + (e.clientY - centerY) * 0.3;
          
          setIsHovered(true);
          setHoveredType(magnetic.classList.contains('magnetic-node') ? 'node' : 'button');
        } else {
          const interactive = hoveredElement.closest('button, a, [role="button"]');
          if (interactive) {
            setIsHovered(true);
            setHoveredType('button');
          } else {
            setIsHovered(false);
            setHoveredType(null);
          }
        }
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? (hoveredType === 'node' ? 1.8 : 1.4) : 1,
          backgroundColor: isHovered 
            ? (hoveredType === 'node' ? 'rgba(0, 229, 255, 0.2)' : 'rgba(0, 229, 255, 0.08)')
            : 'rgba(0, 229, 255, 0)',
          borderColor: isHovered ? 'var(--color-hover, #5EEBFF)' : 'var(--color-glow, #00E5FF)',
          boxShadow: isHovered 
            ? '0 0 20px var(--color-hover, rgba(94, 235, 255, 0.6))' 
            : '0 0 10px var(--color-glow, rgba(0, 229, 255, 0.2))',
        }}
      />
      {/* Core focus dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovered ? 0.6 : 1,
          backgroundColor: 'var(--color-glow, #00E5FF)',
          boxShadow: '0 0 8px var(--color-glow, #00E5FF)',
        }}
      />
    </>
  );
}
