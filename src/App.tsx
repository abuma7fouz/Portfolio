import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  ExternalLink, 
  Sparkles, 
  Mail, 
  Power,
  ChevronRight,
  Brain,
  Plus,
  Minus,
  ArrowUp,
  Award,
  Image,
  Video,
  Palette,
  Cpu,
  BarChart3,
  Camera,
  Layers,
  Film,
  Code
} from 'lucide-react';

// Custom UI Components
import AICursor from './components/ui/AICursor';
import LoadingScreen from './components/ui/LoadingScreen';
import Navbar from './components/ui/Navbar';
import { ProfilePlaceholder, ProjectNeuralFingerprint } from './components/ui/Placeholders';
import Timeline from './components/ui/Timeline';
import TestimonialSlider from './components/ui/TestimonialSlider';
import InteractiveSkillGraph from './components/ui/InteractiveSkillGraph';

// 3D Scene Component
import NeuralBackground from './components/3d/NeuralBackground';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Project {
  id: number;
  code: string;
  name: string;
  desc: string;
  tools: string[];
  image: string;
  link: string;
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 10 });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Interactive 3D connections
  const [hoveredLobe, setHoveredLobe] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);

  // Floating Back to Top state
  const [showBackToTop, setShowBackToTop] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      code: 'MOD_HRA_901',
      name: 'HR Analytics Dashboard',
      desc: 'An interactive Power BI dashboard designed to analyze HR data and monitor workforce performance, including employee count, attrition, age distribution, experience, department performance, and salary insights. The dashboard enables HR teams to make data-driven decisions through interactive visualizations and filters.',
      tools: ['Power BI', 'DAX', 'Power Query', 'Excel'],
      image: import.meta.env.BASE_URL + "project-hr.png",
      link: ''
    },
    {
      id: 2,
      code: 'MOD_EMO_702',
      name: 'Emotion Recognition',
      desc: 'Developed a Convolutional Neural Network (CNN) from scratch for facial emotion recognition. The model classifies multiple human emotions and is deployed as a web application for real-time emotion prediction through an intuitive interface.',
      tools: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'Flask', 'CNN'],
      image: import.meta.env.BASE_URL + "project-emotion.jpg",
      link: ''
    },
    {
      id: 3,
      code: 'MOD_EDU_303',
      name: 'EduBot AI Assistant',
      desc: 'Educational assistant chatbot powered by BERT, DistilBART, and T5 models. Capable of parsing complex curriculum texts, answering queries dynamically, generating custom summaries, and compiling quizzes.',
      tools: ['Python', 'FastAPI', 'Next.js', 'PyTorch', 'Transformers'],
      image: import.meta.env.BASE_URL + "project-edubot.jpg",
      link: 'https://github.com/abuma7fouz/EduBot-AI-Assistant-using-Transformer-Models'
    },
    {
      id: 4,
      code: 'MOD_CXR_144',
      name: 'Multilabel CXR-14 Disease Detection',
      desc: 'Detects fourteen thoracic diseases from chest X-rays using ResNet50. Implements transfer learning, multi-label classification, Focal Loss to address dataset imbalances, and Streamlit deployment.',
      tools: ['Python', 'PyTorch', 'ResNet50', 'Streamlit', 'Transfer Learning'],
      image: import.meta.env.BASE_URL + "project-cxr14.jpg",
      link: 'https://github.com/abuma7fouz/Multilabel-Chest-Xray14-Classification-using-ResNet50'
    },
    {
      id: 5,
      code: 'MOD_FAS_805',
      name: 'Fashion Multi-Label Classification',
      desc: 'Interactive computer vision system that recognizes multiple clothing attributes (type, color, style, fabric) from a single image in real-time. Features multi-head classifiers.',
      tools: ['Python', 'YOLOv8', 'PyTorch', 'FastAPI', 'OpenCV'],
      image: import.meta.env.BASE_URL + "project-fashion.jpg",
      link: ''
    },
    {
      id: 6,
      code: 'MOD_LPR_506',
      name: 'SmartPlate Recognition',
      desc: 'Real-time License Plate Recognition system incorporating camera streaming, YOLOv8 object detection, OCR string extraction, regex format filtering, and a FastAPI statistics dashboard.',
      tools: ['Python', 'YOLOv8', 'FastAPI', 'OpenCV', 'React', 'Regex'],
      image: '/project-plate.png',
      link: ''
    }
  ];

  const services = [
    { name: 'AI Advertising Content', icon: Sparkles },
    { name: 'AI Images', icon: Image },
    { name: 'AI Videos', icon: Video },
    { name: 'Canva Design', icon: Palette },
    { name: 'AI Models', icon: Cpu },
    { name: 'Dashboards', icon: BarChart3 },
    { name: 'Photography', icon: Camera },
    { name: 'Photoshop', icon: Layers },
    { name: 'Video Editing', icon: Film },
    { name: 'Website Development', icon: Code }
  ];

  // Synchronize document theme class
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Telemetry: Track scroll height and active section
  useEffect(() => {
    if (!isLoaded || isSleeping) return;

    const handleScroll = () => {
      // Toggle floating scroll button visibility
      setShowBackToTop(window.scrollY > 400);

      const sections = ['hero', 'about', 'experience', 'certificates', 'skills', 'projects', 'services', 'testimonials', 'contact'];
      let currentSection = 'hero';
      let minDistance = Infinity;

      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = secId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded, isSleeping]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleWakeUp = () => {
    setIsSleeping(false);
    setTimeout(() => {
      handleNavigate('hero');
    }, 100);
  };

  const handleNavigate = (sectionId: string) => {
    if (isSleeping) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      {/* Scanline CRT overlay filter */}
      <div className="scanlines" />

      {/* Custom physics magnetic mouse pointer */}
      <AICursor />

      {/* Custom Boot Loader Sequence */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
            className="fixed inset-0 z-50"
          >
            <LoadingScreen onComplete={() => setIsLoaded(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main 3D canvas backdrop layout */}
      <NeuralBackground 
        theme={theme}
        isSleeping={isSleeping}
        onPositionChange={setCoordinates}
        hoveredLobe={hoveredLobe}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
      />

      {/* Landing page HTML overlay panels */}
      {isLoaded && !isSleeping && (
        <div className="relative w-full flex flex-col z-10">
          
          {/* Top Navbar */}
          <Navbar 
            activeSection={activeSection} 
            onNavigate={handleNavigate}
            coordinates={coordinates}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Scrolling continuous sections stack - expanded to max-w-6xl */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center pt-24">
            
            {/* Section 1: Hero */}
            <section 
              id="hero" 
              className="w-full flex flex-col items-center justify-center py-12 md:py-16 text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-4xl flex flex-col items-center space-y-6 md:space-y-8"
              >
                <div className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.25em] uppercase">
                  //_COGNITIVE_CORTEX_INIT
                </div>

                <div className="magnetic-node">
                  <ProfilePlaceholder
                    imageUrl={import.meta.env.BASE_URL + "profile-hero.jpg"}
                    type="hero"
                    />
                </div>

                <div className="space-y-3">
                  <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground drop-shadow-[0_2px_10px_rgba(5,8,22,0.85)]">
                    Mohamed Mahfouz
                  </h1>
                  <p className="font-mono text-xs sm:text-sm text-muted tracking-wider">
                    SENIOR AI ENGINEER & CREATIVE PRODUCT DESIGNER
                  </p>
                </div>

                <p className="font-sans text-sm sm:text-base text-foreground/85 leading-relaxed max-w-xl drop-shadow-[0_1px_5px_rgba(5,8,22,0.9)]">
                  AI Engineer passionate about building intelligent systems, transforming ideas into impactful AI-powered products, and creating seamless user experiences.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                  {['Python', 'PyTorch', 'FastAPI', 'LLM', 'YOLO', 'Computer Vision', 'Docker', 'SQL', 'Next.js'].map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-[11px] font-mono rounded-full border border-border-custom bg-white/5 dark:bg-white/5 light:bg-slate-900/5 text-muted hover:border-[var(--color-glow,#00E5FF)] hover:text-[var(--color-glow,#00E5FF)] transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                  <button 
                    onClick={() => handleNavigate('projects')}
                    className="w-44 py-3 rounded-xl font-heading text-sm font-bold neon-btn flex items-center justify-center space-x-2 cursor-pointer magnetic-btn focus:outline-none"
                  >
                    <span>View Projects</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleNavigate('contact')}
                    className="w-44 py-3 rounded-xl font-heading text-sm font-semibold border border-border-custom bg-white/5 dark:bg-white/5 light:bg-slate-900/5 text-foreground hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-900/10 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer magnetic-btn focus:outline-none"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Contact Me</span>
                  </button>
                </div>
              </motion.div>
            </section>

            {/* Section 2: About */}
            <section 
              id="about" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left"
              >
                <div className="w-full md:w-[35%] flex justify-center magnetic-node shrink-0">
                  <ProfilePlaceholder
                    imageUrl={import.meta.env.BASE_URL + "profile-about.jpg"}
                    type="about"
                    />
                </div>

                <div className="w-full md:w-[65%] space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block">
                      //_SYS_BIOGRAPHY
                    </span>
                    <h2 className="font-heading text-3xl font-bold text-foreground">
                      Decoding Visual Intelligence
                    </h2>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-foreground/85 leading-relaxed drop-shadow-[0_1px_5px_rgba(5,8,22,0.9)]">
                    A specialized AI Engineer focused on building robust machine learning architectures, real-time computer vision systems, and automated cognitive workflows. Dedicated to bridging high-dimensional mathematics with premium, intuitive front-end designs.
                  </p>

                  <div className="border-t border-border-custom pt-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-[var(--color-glow,#00E5FF)]" />
                      Education & Architecture
                    </h3>
                    <div className="grid grid-cols-2 gap-4 font-mono">
                      <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom rounded-xl">
                        <div className="text-[9px] text-muted">INSTITUTION</div>
                        <div className="text-[11px] font-bold text-foreground mt-0.5">Egyptian Russian University</div>
                      </div>
                      <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom rounded-xl">
                        <div className="text-[9px] text-muted">SPECIALIZATION</div>
                        <div className="text-[11px] font-bold text-foreground mt-0.5">Artificial Intelligence</div>
                      </div>
                      <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom rounded-xl">
                        <div className="text-[9px] text-muted">ACADEMIC_RECORD</div>
                        <div className="text-[11px] font-bold text-[var(--color-success,#39FF88)] mt-0.5">Excellent Grade</div>
                      </div>
                      <div className="p-3 bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom rounded-xl">
                        <div className="text-[9px] text-muted">CGPA</div>
                        <div className="text-[11px] font-bold text-[var(--color-glow,#00E5FF)] mt-0.5">3.74 / 4.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Section 3: Experience */}
            <section 
              id="experience" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-6 text-center"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block uppercase">
                    //_SYNAPSE_TIMELINE
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Professional Flow
                  </h2>
                </div>
                <Timeline />
              </motion.div>
            </section>

            {/* Section 3.5: Certificates (Redesigned as premium achievement modules) */}
            <section 
              id="certificates" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-6 text-left"
              >
                <div className="space-y-2 text-center">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block uppercase">
                    //_CREDENTIAL_VERIFICATION
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Verifiable Credentials
                  </h2>
                  <p className="font-sans text-xs text-muted">
                    Academic certifications and specialized credentials mapped inside the database.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
                  
                  {/* Redesigned Certificate 1 */}
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border-custom hover:border-[var(--color-glow,#00E5FF)]/45 transition-all duration-500 relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[300px]">
                    {/* Corner Telemetry details */}
                    <div className="absolute top-4 right-5 font-mono text-[8px] text-muted tracking-widest uppercase flex items-center gap-1">
                      <span>VERIFIED_NTI_HASH</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success,#39FF88)] animate-pulse" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-glow,#00E5FF)]/10 border border-[var(--color-glow,#00E5FF)]/20 flex items-center justify-center text-[var(--color-glow,#00E5FF)] shrink-0 transition-transform duration-700 group-hover:rotate-12">
                          <Award className="w-6 h-6 filter drop-shadow-[0_0_5px_var(--color-glow)] animate-pulse" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] text-accent uppercase tracking-wider font-semibold">
                            National Technology Institute
                          </span>
                          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground leading-tight">
                            NTI – Data Analysis
                          </h3>
                        </div>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed drop-shadow-[0_1px_4px_rgba(5,8,22,0.9)] pt-1">
                        Completed a comprehensive Data Analysis training program focused on data cleaning, visualization, and business insights using industry-standard tools. Gained hands-on experience in analyzing datasets and building interactive dashboards for data-driven decision-making.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-custom mt-4">
                      {['Excel', 'SQL', 'Power BI', 'Data Visualization', 'Data Cleaning'].map((skill) => (
                        <span 
                          key={skill}
                          className="px-2.5 py-1 text-[9px] font-mono rounded-full border border-accent/20 bg-accent/5 text-accent shadow-[0_0_8px_rgba(0,229,255,0.02)] transition-colors hover:border-accent/40 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Redesigned Certificate 2 */}
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border-custom hover:border-[var(--color-glow,#00E5FF)]/45 transition-all duration-500 relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[300px]">
                    {/* Corner Telemetry details */}
                    <div className="absolute top-4 right-5 font-mono text-[8px] text-muted tracking-widest uppercase flex items-center gap-1">
                      <span>VERIFIED_DEPI_HASH</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success,#39FF88)] animate-pulse" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--color-glow,#00E5FF)]/10 border border-[var(--color-glow,#00E5FF)]/20 flex items-center justify-center text-[var(--color-glow,#00E5FF)] shrink-0 transition-transform duration-700 group-hover:rotate-12">
                          <Award className="w-6 h-6 filter drop-shadow-[0_0_5px_var(--color-glow)] animate-pulse" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-mono text-[9px] text-accent uppercase tracking-wider font-semibold">
                            Digital Egypt Pioneers Initiative
                          </span>
                          <h3 className="font-heading text-base sm:text-lg font-bold text-foreground leading-tight">
                            DEPI – AI & Data Science
                          </h3>
                        </div>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed drop-shadow-[0_1px_4px_rgba(5,8,22,0.9)] pt-1">
                        Completed an intensive AI & Data Science program covering machine learning, deep learning, and data science concepts. Gained hands-on experience in building practical predictive models and deploying machine learning solutions using modern Python frameworks.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-custom mt-4">
                      {['Python', 'Machine Learning', 'Deep Learning', 'Scikit-learn', 'TensorFlow', 'Data Science', 'Model Deployment'].map((skill) => (
                        <span 
                          key={skill}
                          className="px-2.5 py-1 text-[9px] font-mono rounded-full border border-accent/20 bg-accent/5 text-accent shadow-[0_0_8px_rgba(0,229,255,0.02)] transition-colors hover:border-accent/40 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </section>

            {/* Section 4: Skills */}
            <section 
              id="skills" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-8 text-left"
              >
                <div className="space-y-2 text-center">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block">
                    //_COGNITIVE_MAPPING
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Interactive Brain Map
                  </h2>
                  <p className="font-sans text-xs text-muted">
                    Toggle lobes below to isolate and measure technology synapse connection telemetry in real-time.
                  </p>
                </div>

                <InteractiveSkillGraph onLobeHover={setHoveredLobe} />
              </motion.div>
            </section>

            {/* Section 5: Projects */}
            <section 
              id="projects" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-8 text-left"
              >
                <div className="space-y-2 text-center">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block uppercase">
                    //_NEURAL_FINGERPRINTS
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Cognitive Modules
                  </h2>
                  <p className="font-sans text-xs text-muted">
                    Explore and dissect project nodes below to reveal deep neural architecture and code metrics.
                  </p>
                </div>

                {/* Cyber Accordion Project Stack */}
                <div className="space-y-4 w-full">
                  {projects.map((proj) => {
                    const isExpanded = activeProject === proj.id;
                    return (
                      <motion.div
                        key={proj.id}
                        layout
                        onClick={() => setActiveProject(isExpanded ? null : proj.id)}
                        className={`glass-panel rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer select-none relative ${
                          isExpanded 
                            ? 'border-[var(--color-glow,#00E5FF)] shadow-[0_0_30px_rgba(0,229,255,0.06)]' 
                            : 'border-border-custom hover:border-[var(--color-glow,#00E5FF)]/45'
                        }`}
                      >
                        {/* Glow indicator line */}
                        {isExpanded && (
                          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[var(--color-glow,#00E5FF)] to-transparent" />
                        )}

                        {/* Collapsed Header Bar */}
                        <div className="p-5 flex items-center justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            {/* Round Thumbnail Node slot */}
                            <div className="w-10 h-10 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom flex items-center justify-center text-[10px] font-mono text-[var(--color-glow,#00E5FF)] font-bold shrink-0">
                              0{proj.id}
                            </div>
                            
                            <div className="space-y-1">
                              <h3 className="font-heading text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-[var(--color-glow,#00E5FF)]">
                                {proj.name}
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {proj.tools.slice(0, 3).map((t) => (
                                  <span key={t} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white/10 dark:bg-white/10 light:bg-slate-900/10 text-muted">
                                    {t}
                                  </span>
                                ))}
                                {proj.tools.length > 3 && (
                                  <span className="font-mono text-[8px] text-muted px-1 mt-0.5">+{proj.tools.length - 3}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3.5 shrink-0">
                            <span className="hidden sm:inline font-mono text-[9px] text-muted tracking-widest">{proj.code}</span>
                            <div className="w-8 h-8 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-900/5 border border-border-custom flex items-center justify-center text-muted">
                              {isExpanded ? <Minus className="w-4 h-4 text-accent" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* Expanded details slide drawer */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                              className="border-t border-border-custom bg-white/[0.015] dark:bg-white/[0.015] light:bg-slate-900/[0.015]"
                            >
                              <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                
                                {/* Image / Blueprint Block */}
                                <div className="md:col-span-5 relative group overflow-hidden rounded-xl border border-border-custom aspect-video flex items-center justify-center bg-black/45 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                  {proj.image ? (
                                    <>
                                      <img
                                        src={proj.image}
                                        alt={proj.name}
                                        className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
                                      />
                                      {/* Laser Scan line on top */}
                                      <motion.div 
                                        className="absolute w-full h-[1.5px] bg-[var(--color-glow,#00E5FF)] shadow-[0_0_6px_var(--color-glow,#00E5FF)]"
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                      />
                                    </>
                                  ) : (
                                    <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                                      <ProjectNeuralFingerprint id={6} />
                                    </div>
                                  )}
                                </div>

                                {/* Text Details Block */}
                                <div className="md:col-span-7 space-y-4">
                                  <p className="font-sans text-xs sm:text-sm text-foreground/80 leading-relaxed drop-shadow-[0_1px_4px_rgba(5,8,22,0.9)]">
                                    {proj.desc}
                                  </p>

                                  <div className="flex flex-wrap gap-1.5 pt-2">
                                    {proj.tools.map((t) => (
                                      <span key={t} className="font-mono text-[9px] px-2.5 py-0.5 rounded border border-border-custom bg-white/5 dark:bg-white/5 light:bg-slate-900/5 text-muted hover:border-[var(--color-glow,#00E5FF)]/30 hover:text-[var(--color-glow,#00E5FF)] transition-colors">
                                        {t}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="pt-4 border-t border-border-custom/50 flex justify-between items-center">
                                    <span className="font-mono text-[8px] text-[var(--color-success,#39FF88)]">NODE_STATUS: STABLE_INTEGRITY</span>
                                    
                                    {proj.link && (
                                      <a
                                        href={proj.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="px-3.5 py-1.5 rounded-lg border border-[var(--color-glow,#00E5FF)]/30 bg-[var(--color-glow,#00E5FF)]/10 text-foreground hover:bg-[var(--color-glow,#00E5FF)] hover:text-white dark:hover:text-[#050816] transition-all font-mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 focus:outline-none"
                                      >
                                        <GithubIcon className="w-3.5 h-3.5" />
                                        <span>Code Repository</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                  </div>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </section>

            {/* Section 6: Services */}
            <section 
              id="services" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-6 text-center"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block uppercase">
                    //_DENDRITE_SERVICES
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Cognitive Services
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
                  {services.map((srv, idx) => {
                    const Icon = srv.icon;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl glass-panel text-center flex flex-col items-center justify-center hover:border-[var(--color-glow,#00E5FF)]/45 hover:-translate-y-1 transition-all duration-300 cursor-default group"
                      >
                        <Icon className="w-5.5 h-5.5 text-[var(--color-glow)] filter drop-shadow-[0_0_4px_var(--color-glow)] mb-3.5 transition-transform duration-300 group-hover:scale-110" />
                        <span className="font-sans text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors leading-relaxed">
                          {srv.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </section>

            {/* Section 7: Testimonials */}
            <section 
              id="testimonials" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl space-y-6 text-center"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.2em] block uppercase">
                    //_SYNAPSE_PEER_REVIEWS
                  </span>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Peer Recommendations
                  </h2>
                </div>
                <TestimonialSlider />
              </motion.div>
            </section>

            {/* Section 8: Contact */}
            <section 
              id="contact" 
              className="w-full flex items-center justify-center py-12 md:py-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center text-center space-y-6 w-full max-w-3xl"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-[var(--color-glow,#00E5FF)] tracking-[0.25em] block uppercase">
                    //_GATEWAY_TERMINAL
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    Let's Build Intelligence Together
                  </h2>
                </div>

                <p className="font-sans text-sm sm:text-base text-muted leading-relaxed max-w-md">
                  Initiate a high-speed synapse connection to start collaborating on machine learning models, graphics design, or automated systems.
                </p>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <a
                    href="https://wa.me/201002265734"
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-2xl glass-panel flex flex-col items-center gap-2 hover:border-[var(--color-success,#39FF88)]/40 hover:bg-[var(--color-success,#39FF88)]/5 transition-all duration-300 magnetic-btn cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--color-success,#39FF88)]/10 flex items-center justify-center text-[var(--color-success,#39FF88)] mb-1.5">
                      <span className="font-mono text-xs font-bold">WA</span>
                    </div>
                    <span className="font-heading text-sm font-bold text-foreground">WhatsApp Direct</span>
                    <span className="font-mono text-[9px] text-[var(--color-success,#39FF88)] font-semibold">ONLINE_GATE</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/abumahfouz"
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-2xl glass-panel flex flex-col items-center gap-2 hover:border-[var(--color-glow,#00E5FF)]/40 hover:bg-[var(--color-glow,#00E5FF)]/5 transition-all duration-300 magnetic-btn cursor-pointer"
                  >
                    <LinkedinIcon className="w-6 h-6 text-[var(--color-glow,#00E5FF)] mb-1.5" />
                    <span className="font-heading text-sm font-bold text-foreground">LinkedIn Core</span>
                    <span className="font-mono text-[9px] text-[var(--color-glow,#00E5FF)] font-semibold">ROUTE_SECURE</span>
                  </a>

                  <a
                    href="https://github.com/abuma7fouz"
                    target="_blank"
                    rel="noreferrer"
                    className="p-5 rounded-2xl glass-panel flex flex-col items-center gap-2 hover:border-[var(--color-warning,#FFC857)]/40 hover:bg-[var(--color-warning,#FFC857)]/5 transition-all duration-300 magnetic-btn cursor-pointer"
                  >
                    <GithubIcon className="w-6 h-6 text-[var(--color-warning,#FFC857)] mb-1.5" />
                    <span className="font-heading text-sm font-bold text-foreground">GitHub Hub</span>
                    <span className="font-mono text-[9px] text-[var(--color-warning,#FFC857)] font-semibold">VER_STABLE</span>
                  </a>

                  <a
                    href="mailto:abumahfouz7@gmail.com"
                    className="p-5 rounded-2xl glass-panel flex flex-col items-center gap-2 hover:border-[var(--color-error,#FF4D6D)]/40 hover:bg-[var(--color-error,#FF4D6D)]/5 transition-all duration-300 magnetic-btn cursor-pointer"
                  >
                    <Mail className="w-6 h-6 text-[var(--color-error,#FF4D6D)] mb-1.5" />
                    <span className="font-heading text-sm font-bold text-foreground">Email Transmission</span>
                    <span className="font-mono text-[9px] text-[var(--color-error,#FF4D6D)] font-semibold">MAIL_PDU</span>
                  </a>
                </div>

                <div className="pt-8 w-full border-t border-border-custom flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-muted/50">
                  <span className="font-mono text-[10px] text-muted hover:text-[var(--color-glow)] transition-colors duration-300">Designed &amp; Developed by Mahfouz <span className="text-[var(--color-error)] animate-pulse inline-block">❤️</span></span>
                  <button
                    onClick={() => setIsSleeping(true)}
                    className="flex items-center gap-1.5 hover:text-[var(--color-error,#FF4D6D)] transition-colors font-semibold uppercase tracking-wider magnetic-btn cursor-pointer focus:outline-none"
                  >
                    <Power className="w-3.5 h-3.5 text-[var(--color-error,#FF4D6D)] animate-pulse" />
                    <span>Shutdown AI Core</span>
                  </button>
                </div>
              </motion.div>
            </section>

          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && isLoaded && !isSleeping && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={() => handleNavigate('hero')}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full glass-panel border border-[var(--color-border)] flex items-center justify-center text-foreground hover:text-[var(--color-glow)] hover:border-[var(--color-glow)] shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:shadow-[0_0_20px_var(--color-glow)] transition-all duration-300 cursor-pointer focus:outline-none pulse-glow"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 text-accent" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Shutdown / Sleep Screen Overlay */}
      {isLoaded && isSleeping && (
        <AnimatePresence>
          <motion.div
            key="sleepMode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono text-[11px] text-white/30 space-y-6"
          >
            <div className="space-y-1.5 flex flex-col items-center text-center">
              <Power className="w-10 h-10 text-[#FF4D6D] animate-ping duration-1000 mb-2" />
              <span>SYSTEM_SHUTDOWN: SUCCESSFUL</span>
              <span>COGNITIVE_ARCHITECTURE: SUSPENDED</span>
            </div>
            
            <button
              onClick={handleWakeUp}
              className="px-5 py-2.5 rounded-xl border border-white/20 hover:border-[#00E5FF] text-white/60 hover:text-[#00E5FF] transition-all hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] font-semibold uppercase tracking-widest cursor-pointer magnetic-btn focus:outline-none"
            >
              Wake Up Core
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
