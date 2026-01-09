
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Hero from './components/Hero';
import Services from './components/Services';
import Work, { projects } from './components/Work';
import Process from './components/Process';
import AiDemo from './components/AiDemo';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import ResourceHub from './components/ResourceHub';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPostView';
import Testimonials from './components/Testimonials';
import StrategicDiagnostics from './components/StrategicDiagnostics';
import Team from './components/Team';
import ClosingSequence from './components/ClosingSequence';
import SeoAgent from './components/SeoAgent';
import BrandLogo from './components/BrandLogo';
import { ProjectItem, BlogPost } from './types';

type ViewState = 'home' | 'resources' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [homeFooterOpen, setHomeFooterOpen] = useState(false);
  const [aiTranscript, setAiTranscript] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: string) => {
    if (section === 'resources') {
      setSelectedProject(null);
      setSelectedPost(null);
      setView('resources');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'blog') {
      setSelectedProject(null);
      setSelectedPost(null);
      setView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If we are in resources, blog, or detail view, go back home first
      if (view !== 'home' || selectedProject || selectedPost) {
        setView('home');
        setSelectedProject(null);
        setSelectedPost(null);
        // Small delay to allow component mount before scrolling
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        // Already on home, just scroll
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleContactScroll = () => {
    // If not on home, go home first (or if we implement ClosingSequence on all pages, just scroll)
    // Since ClosingSequence is on all pages, we can just find the ID
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback if component hasn't mounted yet or view change needed
        // For now, if we are in project detail, we might need to close it.
        // But ClosingSequence is inside ProjectDetail too, so it should work.
        console.warn("Contact section not found");
    }
  };

  const handleOpenContact = (transcript?: string) => {
      if (transcript) setAiTranscript(transcript);
      setHomeFooterOpen(true);
      // Wait for state update and expansion handled by ClosingSequence internal useEffect or fallback
      // We don't strictly need setTimeout here if ClosingSequence handles it, but adding a safe scroll trigger
      setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
      }, 100);
  };

  const handleProjectSelect = (project: ProjectItem) => {
      setSelectedProject(project);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePostSelect = (post: BlogPost) => {
      setSelectedPost(post);
      setView('blog-post');
  };

  return (
    <main className="min-h-screen bg-void text-white relative selection:bg-neon-blue selection:text-black cursor-none overflow-x-hidden">
      <CustomCursor />
      
      {/* Global Persistent HUD Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="noise-bg absolute inset-0 opacity-[0.03]" />
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03]" />
      </div>

      {/* Contact Overlay (Legacy Support / Optional) */}
      <Contact isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 px-8 flex justify-between items-center transition-all duration-500 
        ${selectedProject || selectedPost || isContactOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-md border-b border-white/5' : 'py-6 mix-blend-difference'}
      `}>
        <div className="cursor-pointer group" onClick={() => handleNavigate('hero')}>
          <BrandLogo className="h-8 w-auto text-white drop-shadow-[0_0_8px_rgba(189,0,255,0.3)] group-hover:text-neon-purple transition-all duration-300" />
        </div>
        
        <div className="hidden md:flex gap-8 lg:gap-12">
          <button onClick={() => handleNavigate('work')} className={`text-sm font-mono hover:text-neon-blue transition-colors drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ${view === 'home' ? 'text-gray-300' : 'text-gray-500'}`}>
            01. WORK
          </button>
          <button onClick={() => handleNavigate('expertise')} className={`text-sm font-mono hover:text-neon-blue transition-colors drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ${view === 'home' ? 'text-gray-300' : 'text-gray-500'}`}>
            02. EXPERTISE
          </button>
          <button onClick={() => handleNavigate('intelligence')} className={`text-sm font-mono hover:text-neon-blue transition-colors drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ${view === 'home' ? 'text-gray-300' : 'text-gray-500'}`}>
            03. INTELLIGENCE
          </button>
          
          {/* Module Links with Indicators */}
          <button 
            onClick={() => handleNavigate('resources')} 
            className={`group flex items-center gap-1 text-sm font-mono hover:text-neon-blue transition-colors drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ${view === 'resources' ? 'text-neon-blue' : 'text-gray-300'}`}
          >
            04. RESOURCES
            <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
          </button>
          
          <button 
            onClick={() => handleNavigate('blog')} 
            className={`group flex items-center gap-1 text-sm font-mono hover:text-neon-blue transition-colors drop-shadow-[0_0_3px_rgba(0,0,0,0.5)] ${view === 'blog' || view === 'blog-post' ? 'text-neon-blue' : 'text-gray-300'}`}
          >
            05. INSIGHTS
            <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
          </button>
        </div>

        <div>
           <button 
             onClick={() => handleContactScroll()}
             className="text-xs font-bold border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all tracking-widest uppercase drop-shadow-[0_0_3px_rgba(0,0,0,0.5)]"
           >
             Contact_Us
           </button>
        </div>
      </nav>

      <AnimatePresence mode='wait'>
        {view === 'resources' ? (
            <ResourceHub 
                key="resources" 
                onBack={() => setView('home')} 
                onNavigate={handleNavigate}
                onContactClick={handleContactScroll}
            />
        ) : view === 'blog' ? (
            <BlogList 
                key="blog-list" 
                onBack={() => setView('home')} 
                onSelectPost={handlePostSelect} 
                onNavigate={handleNavigate}
                onContactClick={handleContactScroll}
            />
        ) : view === 'blog-post' && selectedPost ? (
            <BlogPostView 
                key="blog-post" 
                post={selectedPost} 
                onBack={() => setView('blog')} 
                onNavigate={handleNavigate}
                onContactClick={handleContactScroll}
            />
        ) : selectedProject ? (
            <ProjectDetail 
                key="project-detail" 
                project={selectedProject} 
                onBack={() => setSelectedProject(null)} 
                onNext={handleNextProject}
                onNavigate={handleNavigate}
                onContactClick={handleContactScroll}
            />
        ) : (
            <motion.div 
                key="home-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div id="hero">
                    <Hero 
                        onConsultClick={handleContactScroll} 
                        onCaseStudiesClick={() => handleNavigate('work')} 
                    />
                </div>
                
                <StrategicDiagnostics />

                <div className="relative">
                    <Work onProjectSelect={handleProjectSelect} />
                    
                    <div id="expertise">
                        <Services />
                    </div>
                    
                    <SeoAgent />

                    <Process />
                    <Testimonials />
                    <Team />
                    
                    <div className="h-32 bg-gradient-to-b from-surface to-void w-full" />

                    <div id="intelligence">
                        <div className="pt-24 pb-4 text-center relative z-10 bg-void">
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tighter">
                                EXPERIENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">INTELLIGENCE</span>
                            </h2>
                            <p className="text-gray-500 mb-2 max-w-xl mx-auto font-mono text-sm">
                                // INTERACT WITH OUR CORE SYSTEM BELOW
                            </p>
                            <div className="flex justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/50 animate-pulse mt-2 mb-2"></div>
                            </div>
                        </div>

                        <AiDemo onContactClick={handleOpenContact} />
                    </div>
                </div>
                
                <ClosingSequence isOpen={homeFooterOpen} onToggle={setHomeFooterOpen} aiTranscript={aiTranscript} />
                <Footer onNavigate={handleNavigate} onContactClick={handleContactScroll} />
            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;
