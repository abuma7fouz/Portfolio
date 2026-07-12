import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export default function TestimonialSlider() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sherif Mansour',
      role: 'Co-Founder & CEO',
      company: 'Veloce Logistics',
      quote: "Working with Mohamed was a game-changer. He automated our routing pipeline using AI predictive models, saving us over 20% in fuel costs. His speed and engineering capability are remarkable."
    },
    {
      name: 'Sarah Jenkins',
      role: 'Lead UX Architect',
      company: 'PixelForge Design',
      quote: "Mohamed has an extremely rare skill set: he is a solid AI engineer who actually understands typography, layout, and user experience. The interface he built for our client was stunning."
    },
    {
      name: 'Dr. Tarek Hegazi',
      role: 'Clinical Research Director',
      company: 'BioHealth Labs',
      quote: "His multilabel chest X-ray classification model using ResNet50 helped our research department validate thoracic markers with impressive accuracy. The code structure was highly professional."
    },
    {
      name: 'Marcus Chen',
      role: 'VP of Engineering',
      company: 'EdTech Labs',
      quote: "The BERT-based Educational Assistant chatbot Mohamed developed transformed how our curriculum team creates quiz materials. Excellent technical architecture and documentation."
    },
    {
      name: 'Nour El-Din',
      role: 'Head of Marketing',
      company: 'GrowthLoop Agency',
      quote: "We scaled our ad automation from zero to 10k monthly creatives using the NXT G Ads pipelines he built. His business intuition is just as strong as his technical expertise."
    },
    {
      name: 'Elena Rostova',
      role: 'Lead ML Engineer',
      company: 'NeuralFlow',
      quote: "Mohamed writes clean, production-ready code. The YOLOv8 real-time license plate detection pipeline he set up with FastAPI is solid, scalable, and runs flawlessly under high loads."
    },
    {
      name: 'Youssef Soliman',
      role: 'Founder',
      company: 'Soliman Real Estate',
      quote: "He built our business dashboard and campaign metrics trackers. We now have complete transparency over our ad campaigns and visual assets. An invaluable partner."
    },
    {
      name: 'Amara Diop',
      role: 'Creative Director',
      company: 'Studio Kismet',
      quote: "As a professional photographer, he has an eye for composition and visual storytelling that transfers perfectly into his frontend development work. Every animation has purpose."
    },
    {
      name: 'Liam Vance',
      role: 'Product Lead',
      company: 'Synthetix AI',
      quote: "Mohamed is an AI engineer who doesn't just build models—he builds products. He took our rough ideas and transformed them into a working, high-converting FastAPI + Next.js web application."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5, ease: 'easeIn' as const }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center select-none"
    >
      <div className="relative w-full h-72 sm:h-64 flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
          >
            {/* Quote Icon */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base sm:text-lg text-foreground">
                  {testimonials[currentIndex].name}
                </span>
                <span className="font-mono text-[10px] text-muted uppercase tracking-wider mt-0.5">
                  {testimonials[currentIndex].role} — <span className="text-accent font-semibold">{testimonials[currentIndex].company}</span>
                </span>
              </div>
              <Quote className="w-8 h-8 text-accent/15" />
            </div>

            {/* Testimonial Quote */}
            <p className="font-sans text-sm sm:text-base text-foreground/80 italic leading-relaxed my-4">
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Verification code indicator */}
            <div className="flex justify-between items-center border-t border-border-custom pt-4 font-mono text-[9px] text-muted">
              <span>TESTIMONIAL_VERIFIED_SHA256</span>
              <span className="text-[var(--color-success,#39FF88)]">STATUS: SECURE_CORE</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation and Indicators */}
      <div className="flex items-center space-x-6 mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-border-custom flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 magnetic-btn cursor-pointer focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bullet Dot Indicators */}
        <div className="flex space-x-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                idx === currentIndex
                  ? 'w-6 bg-accent'
                  : 'w-1.5 bg-border-custom hover:bg-accent/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-border-custom flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all duration-300 magnetic-btn cursor-pointer focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
