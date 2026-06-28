import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Cpu, Layers, Workflow, CheckCircle2, Terminal, ArrowRight, Sparkles, 
  Database, ShieldCheck, Mail, ArrowUpRight, Code, Server, HelpCircle, HardDrive,
  BookOpen, Calculator, Briefcase, ExternalLink, Lock, FileSpreadsheet, TrendingUp, Users, Settings, ArrowLeft,
  Globe
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { ContactForm } from "@/src/components/ContactForm";
import { PixelMushroom } from "@/src/components/PixelMushroom";
import { BlogsView } from "@/src/components/BlogsView";
import { MiniAppsView } from "@/src/components/MiniApps";
import { SeriousProjectsView } from "@/src/components/SeriousProjectsView";

// Project Definitions
const PROJECTS = [
  {
    id: "solar_crm",
    title: "SolarFlow™",
    category: "The Custom Solar Operations CRM",
    description: "Built to upgrade solar installers from error-prone Google Sheets to a robust, accountable database. Powered by React and Supabase, SolarFlow provides a real-time financial dashboard, a visual 11-stage project pipeline, and an immutable activity audit log. It coordinates agents and admins to eliminate double data entry and collect receivables faster.",
    badges: ["React Vite", "Supabase", "Financial Ledger", "Audit Logging", "Role-Based Access"],
    gridSpan: "md:col-span-2",
    hasDemo: true,
    demoUrl: "https://solarflow.mahvishsadaf.com"
  },
  {
    id: "company_brain",
    title: "The Secure Company Brain",
    category: "Private AI Intelligence",
    description: "We built a private, highly secure intelligence for a firm that needed instant answers from 10,000+ pages of internal policies and past contracts. Employees ask questions in plain English; the 'Brain' answers instantly. 100% of the data stays strictly inside the company walls.",
    badges: ["Local Llama", "Pinecone DB", "LangChain", "FastAPI"],
    gridSpan: "md:col-span-1",
    hasDemo: false,
    demoUrl: null
  },
  {
    id: "invoice_ocr",
    title: "The Paperwork Pipeline",
    category: "Automated Data Extraction",
    description: "A secure, end-to-end document processing pipeline. Google Apps Script monitors Gmail for PDF invoices, stores them in Drive, and forwards them to a Render-hosted FastAPI service. The service converts PDFs to Markdown and extracts structured accounting data via Groq AI, automatically logging rows into Google Sheets.",
    badges: ["FastAPI", "Groq AI", "PyMuPDF", "Google Sheets API", "Apps Script"],
    gridSpan: "md:col-span-3",
    hasDemo: true,
    demoUrl: "https://invoice-automater.onrender.com"
  }
];

// Tech stack items for marquee
const STACK_ITEMS = [
  "Python", "FastAPI", "LangChain", "LangGraph", "RAG", "Pinecone", "FAISS", 
  "Redis", "PostgreSQL", "Whisper", "Ollama", "Docker", "React", "Vite", 
  "Selectolax", "n8n", "Supabase", "Pydantic", "AsyncIO"
];

// Services definitions
const SERVICES = [
  {
    id: "ops",
    icon: Cpu,
    title: "Operations Software",
    description: "We map your current process, identify exactly what is broken or slow, and build a system around how your business actually works."
  },
  {
    id: "web",
    icon: Globe,
    title: "High-Performance Websites & E-commerce",
    description: "Custom, blazing-fast web sites and tailor-made e-commerce backends designed for high load, frictionless checkouts, and clean data integrations."
  },
  {
    id: "email",
    icon: Mail,
    title: "Zero-SaaS Custom Domain Email",
    description: "Set up secure private custom mail servers on your own domain (@yourdomain.com). Zero vendor lock-in, zero monthly per-user licenses to Google Workspace or Zoho. Completely owned."
  },
  {
    id: "auto",
    icon: Workflow,
    title: "Automation Pipelines",
    description: "Repetitive manual work between your systems gets automated. Data moves, reports generate, and alerts fire without anyone touching it."
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 120,
    },
  },
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("work");
  const [currentView, setCurrentView] = React.useState<"home" | "blogs" | "miniapps" | "serious-projects">("home");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("solar_crm");

  // Reset scroll on view change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  // Handle active class for glassmorphic nav
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setCurrentView("home");
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#22c55e]/20 selection:text-white overflow-hidden relative">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14321a25_1px,transparent_1px),linear-gradient(to_bottom,#14321a25_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_75%,transparent_100%)] pointer-events-none" />

      {/* Sticky blurred Navigation */}
      <header 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-zinc-950/80 backdrop-blur-md border-[#14321a]/50 py-3" 
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div 
            onClick={() => { setCurrentView("home"); }} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="h-7 w-7 rounded bg-[#22c55e] flex items-center justify-center p-0.5 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(34,197,94,0.35)]">
              <PixelMushroom size={18} animate={false} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-200 hover:text-white hover:text-shadow-sm transition-all flex items-center gap-1.5">
              <span>Deeproot Systems</span>
              <span className="text-[9px] font-mono bg-[#14321a] px-1.5 py-0.5 text-[#22c55e] border border-[#22c55e]/20 rounded">v1.2</span>
            </span>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => { setCurrentView("home"); setActiveTab("home"); }} 
              className={`text-xs font-semibold tracking-wider uppercase cursor-pointer hover:text-[#22c55e] transition-colors ${currentView === "home" ? "text-[#22c55e]" : "text-zinc-400"}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setCurrentView("serious-projects"); }} 
              className={`text-xs font-semibold tracking-wider uppercase cursor-pointer hover:text-[#22c55e] transition-colors ${currentView === "serious-projects" ? "text-[#22c55e]" : "text-zinc-400"}`}
            >
              Products
            </button>
            <button 
              onClick={() => scrollTo("partnership")} 
              className="text-xs font-semibold tracking-wider uppercase cursor-pointer hover:text-[#22c55e] text-zinc-400 transition-colors"
            >
              Plans
            </button>
            <button 
              onClick={() => { setCurrentView("blogs"); }} 
              className={`text-xs font-semibold tracking-wider uppercase cursor-pointer hover:text-[#22c55e] transition-colors ${currentView === "blogs" ? "text-[#22c55e]" : "text-zinc-400"}`}
            >
              Blogs
            </button>
            <button 
              onClick={() => scrollTo("contact")} 
              className="text-xs font-semibold tracking-wider uppercase cursor-pointer hover:text-[#22c55e] text-zinc-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Contact Button Desktop */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#14321a] hover:border-[#22c55e] text-xs text-[#edfcf1] hover:text-white"
              onClick={() => scrollTo("contact")}
            >
              Start Diagnostic
            </Button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-white focus:outline-hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 border-b border-zinc-900 bg-zinc-950/98 backdrop-blur-lg py-5 px-6 space-y-4 shadow-xl flex flex-col"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                onClick={() => { setCurrentView("home"); setIsMobileMenuOpen(false); }} 
                className={`text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 ${currentView === "home" ? "text-[#22c55e]" : "text-zinc-400"}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentView("serious-projects"); setIsMobileMenuOpen(false); }} 
                className={`text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 ${currentView === "serious-projects" ? "text-[#22c55e]" : "text-zinc-500"}`}
              >
                Products
              </button>
              <button 
                onClick={() => { scrollTo("partnership"); }} 
                className="text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 text-zinc-400"
              >
                Plans
              </button>
              <button 
                onClick={() => { setCurrentView("blogs"); setIsMobileMenuOpen(false); }} 
                className={`text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 ${currentView === "blogs" ? "text-[#22c55e]" : "text-zinc-400"}`}
              >
                Blogs
              </button>
              <button 
                onClick={() => scrollTo("contact")} 
                className="text-left text-sm font-medium tracking-wide pb-1 text-zinc-400"
              >
                Contact
              </button>
              <Button 
                variant="default" 
                size="sm" 
                className="w-full mt-2"
                onClick={() => scrollTo("contact")}
              >
                Start Diagnostic
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Sections Wrapper */}
      <main className="relative z-10">

        {currentView === "home" ? (
          <>
            {/* HERO SECTION */}
            <section id="hero" className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
              <div className="absolute inset-x-0 top-1/4 h-80 bg-[#22c55e]/[0.02] blur-3xl rounded-full pointer-events-none" />

              <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 select-none">
                
                {/* Word entry stagger on Headline */}
                <motion.div 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="inline-flex items-center space-x-2 bg-[#14321a]/40 border border-[#14321a] rounded-full px-3.5 py-1.5 mb-2 hover:border-[#22c55e] transition-colors">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wider uppercase text-green-300 flex items-center gap-1.5 font-bold">
                      <span>Custom Software Agency</span>
                      <PixelMushroom size={14} animate={true} />
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.12]">
                    {"We build the engines that run your operations.".split(" ").map((word, i) => (
                      <motion.span 
                        key={word + "-" + i} 
                        className="inline-block mr-3 sm:mr-4 last:mr-0 text-white"
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 16, stiffness: 180, delay: i * 0.05 } }
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Subheadline Fade in delay */}
                  <motion.p 
                    className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto leading-relaxed pt-2"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Bespoke systems for businesses that have outgrown spreadsheets and manual data entry.
                  </motion.p>
                </motion.div>

                {/* CTAs */}
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <Button 
                    variant="default" 
                    size="lg" 
                    className="w-full sm:w-auto h-11"
                    onClick={() => {
                      setCurrentView("serious-projects");
                    }}
                  >
                    Explore Our Solutions
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="w-full sm:w-auto border border-[#251b12] hover:border-[#22c55e]/60 transition-all text-zinc-350 hover:text-white"
                    onClick={() => scrollTo("contact")}
                  >
                    Get in Touch
                  </Button>
                </motion.div>
              </div>

              {/* Scroll Down Hint decoration with responsive hides to prevent button overlaps */}
              <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center space-y-2 pointer-events-none select-none opacity-50">
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500">Scroll to Explore</span>
                <div className="h-10 w-[1px] bg-zinc-850 relative overflow-hidden">
                  <div className="absolute inset-x-0 h-1/2 bg-white animate-bounce top-0" />
                </div>
              </div>
            </section>


            {/* WORK SECTION (Bento Grid) */}
            <section id="work" className="section bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60">
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Header label and title */}
                <div className="space-y-4 max-w-xl">
                  <div className="text-xs font-mono font-semibold tracking-wider text-green-500 uppercase flex items-center space-x-2">
                    <span>01</span>
                    <span className="h-px w-6 bg-green-800/40" />
                    <span>Selected Portfolio Case Studies</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
                    <span>Work</span>
                    <PixelMushroom size={20} className="align-middle" />
                  </h2>
                  <p className="text-sm text-zinc-400">
                    A look at the functional operational systems we have designed, architected, and fully deployed directly to client infrastructure. Click Detail to read full case specs.
                  </p>
                </div>

                {/* Bento Grid layout */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {PROJECTS.map((proj) => (
                    <motion.div 
                      key={proj.id} 
                      variants={fadeUpItem}
                      className={`flex h-full ${proj.gridSpan}`}
                    >
                      <Card className="flex flex-col justify-between w-full p-6 relative group overflow-hidden border border-zinc-800/80 bg-zinc-950/45 hover:border-zinc-700 transition-all duration-300">
                        
                        {/* Visual pattern accent */}
                        <div className="absolute top-0 right-0 h-24 w-24 bg-white/[0.005] rounded-bl-full pointer-events-none group-hover:bg-white/[0.01] transition-colors" />

                        <div className="space-y-4">
                          {/* Sub-header details */}
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                            <span>{proj.category}</span>
                            <span>[DP_SYS_{proj.id.toUpperCase()}]</span>
                          </div>

                          {/* Title */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-1">
                              <CardTitle className="text-md font-semibold text-zinc-100 group-hover:text-white transition-colors">
                                {proj.title}
                              </CardTitle>
                              {proj.hasDemo && <Sparkles className="h-3.5 w-3.5 text-white/80 animate-pulse ml-1" />}
                            </div>
                            <CardDescription className="text-sm text-zinc-400 leading-relaxed max-w-2xl min-h-[40px]">
                              {proj.description}
                            </CardDescription>
                          </div>
                        </div>
                        {/* Footer region with live demo buttons */}
                        <div className="mt-8 pt-4 border-t border-[#14321a]/60 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            {proj.hasDemo && proj.demoUrl && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="w-full sm:w-auto h-8 text-xs px-3 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_22px_rgba(34,197,94,0.5)] border border-[#a7f3d0] font-bold"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(proj.demoUrl, "_blank");
                                }}
                              >
                                Demo
                                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full sm:w-auto h-8 border-[#14321a] text-xs px-3 hover:text-white hover:border-[#22c55e] cursor-pointer text-zinc-350"
                              onClick={() => {
                                setSelectedProjectId(proj.id);
                                setCurrentView("serious-projects");
                              }}
                            >
                              View Detail
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            </section>


            {/* SERVICES SECTION */}
            <section id="services" className="section bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60">
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Header section content */}
                <div className="space-y-4 max-w-xl">
                  <div className="text-xs font-mono font-semibold tracking-wider text-green-500 uppercase flex items-center space-x-2">
                    <span>02</span>
                    <span className="h-px w-6 bg-green-800/40" />
                    <span>Our Capabilities</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
                    <span>Services</span>
                    <PixelMushroom size={20} className="align-middle animate-[bounce_3s_infinite]" />
                  </h2>
                </div>

                {/* Grid 4-columns */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {SERVICES.map((serv) => {
                    const Icon = serv.icon;
                    return (
                      <motion.div key={serv.id} variants={fadeUpItem}>
                        <Card className="p-6 md:p-8 h-full bg-zinc-950/50 border-zinc-850 hover:border-[#22c55e]/60 transition-all duration-300">
                          <div className="space-y-6">
                            {/* Custom icon rounded backdrop */}
                            <div className="h-10 w-10 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-[#22c55e]" />
                            </div>
                            <div className="space-y-3">
                              <CardTitle className="text-base text-zinc-100 font-semibold">{serv.title}</CardTitle>
                              <CardDescription className="text-zinc-400 text-sm leading-relaxed">{serv.description}</CardDescription>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>

              </div>
            </section>


            {/* PRIVATE DEPLOYMENT SECTION (Highlight Full Width) */}
            <section className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 overflow-hidden relative">
              {/* Subtle light trace effect inside the deployment container frame */}
              <div className="max-w-7xl mx-auto bg-zinc-950/20 border border-zinc-800/80 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
                
                {/* Minimal pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#161618_1px,transparent_1px),linear-gradient(to_bottom,#161618_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_60%,transparent_100%)] pointer-events-none" />

                {/* Two column grid content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10 items-center">
                  
                  {/* Text side */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-zinc-300" />
                      <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">Security Architecture</span>
                    </div>
                    
                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                      Your data stays yours.
                    </h2>
                    
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                      We deploy everything on your own infrastructure. No third party touches your data, no vendor lock-in, no monthly SaaS fees. Docker-based, one command to run, fully yours.
                    </p>

                    {/* 3 Callouts */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-900">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-medium text-zinc-150 block">Local AI Models</span>
                        <span className="text-xs text-zinc-500 block">Whisper, Llama, and vision modules run matching offline.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-medium text-zinc-150 block">Docker Deployed</span>
                        <span className="text-xs text-zinc-500 block">Single deployment command builds sandbox cleanly.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-medium text-zinc-150 block">Zero Vendor Lock-in</span>
                        <span className="text-xs text-zinc-500 block">Fully owned codebase, standard PostgreSQL db.</span>
                      </div>
                    </div>
                  </div>

                  {/* Terminal mock side */}
                  <div className="lg:col-span-5 h-full flex flex-col justify-center">
                    <div className="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-5 font-mono text-[11px] leading-relaxed select-none shadow-2xl relative">
                      
                      {/* Decorative dots */}
                      <div className="flex items-center space-x-1.5 border-b border-zinc-900 pb-3.5 mb-4">
                        <div className="h-2 w-2 rounded-full bg-zinc-800" />
                        <div className="h-2 w-2 rounded-full bg-zinc-800" />
                        <div className="h-2 w-2 rounded-full bg-zinc-800" />
                        <span className="text-[9px] text-zinc-500 ml-2">deeproot-deploy-service</span>
                      </div>

                      {/* Lines */}
                      <div className="space-y-2 text-zinc-400">
                        <div className="flex items-center">
                          <span className="text-zinc-655 mr-1.5">$</span>
                          <span className="text-zinc-200">docker-compose up -d --build</span>
                        </div>
                        <div className="text-zinc-500">Creating deeproot-network ... <span className="text-green-500">done</span></div>
                        <div className="text-zinc-500">Building core-ops-pipeline ... <span className="text-green-500">done</span></div>
                        <div className="text-zinc-500">Running postgresql:16 ... <span className="text-zinc-300">Port 5432</span></div>
                        <div className="text-zinc-500">Setting model hooks [Ollama] ... <span className="text-zinc-300">Ready</span></div>
                        <div className="text-zinc-200 animate-pulse flex items-center space-x-1 pt-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e] mr-1 inline" />
                          <span>Systems integrated. Service live.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>


            {/* MARQUEE SECTION */}
            <section id="stack" className="bg-zinc-950 py-16 px-4 border-t border-zinc-900/60 overflow-hidden relative select-none">
              <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <div className="text-xs font-mono text-green-500 uppercase tracking-wider">03 / Standard Tech Stack</div>
                  <h3 className="text-lg font-semibold text-zinc-100">The battle-tested technologies we use</h3>
                </div>

                {/* Marquee viewport container */}
                <div className="relative w-full overflow-hidden py-4 mt-6">
                  <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

                  {/* Scrolling wrapper row with infinite linear marquee animation */}
                  <div className="flex flex-nowrap w-max gap-8 animate-marquee hover:[animation-play-state:paused] cursor-pointer">
                    {[...STACK_ITEMS, ...STACK_ITEMS].map((item, index) => (
                      <div 
                        key={index} 
                        className="flex items-center space-x-2 border border-zinc-900 bg-zinc-900/15 text-zinc-400 hover:text-white rounded-lg px-4 py-2.5 hover:border-zinc-700 transition-colors duration-200 font-mono text-xs font-semibold"
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* THE PARTNERSHIP MODEL SECTION */}
            <section id="partnership" className="bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60 relative">
              <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Section Header */}
                <div className="max-w-2xl">
                  <div className="text-xs font-mono font-semibold tracking-wider text-green-500 uppercase flex items-center space-x-2">
                    <span>04</span>
                    <span className="h-px w-6 bg-green-800/40" />
                    <span>The Partnership Model</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-3">
                    Choose Your Pace
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-450 mt-2">
                    Two practical frameworks to architect, deploy, and support your custom enterprise system.
                  </p>
                </div>

                {/* Italicized Quote Box (Roots run deep) */}
                <div className="border border-[#251b12] bg-[#1a120c]/25 p-5 rounded-xl max-w-3xl border-l-[3px] border-l-[#22c55e]/60">
                  <p className="text-xs sm:text-sm font-mono text-zinc-350 italic leading-relaxed">
                    "Real operational efficiency isn&apos;t bought off-the-shelf; it is custom-engineered from the soil up."
                  </p>
                </div>

                {/* 2 Choice Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Option 1: The Asset Model */}
                  <Card className="p-6 sm:p-8 bg-zinc-950/40 border-zinc-850 flex flex-col justify-between hover:border-[#22c55e]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#22c55e] uppercase font-bold">Buy & Own</span>
                        <h3 className="text-lg font-bold text-white">Option 1: The Asset Model</h3>
                        <p className="text-xs text-zinc-450">Best for established firms looking to build long-term company value.</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-zinc-900 text-xs">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Investment</span>
                            <span className="text-zinc-450">A one-time project fee to architect, build, and install your system.</span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Ownership</span>
                            <span className="text-zinc-450">You own the code and the data 100%. It is a digital asset on your company’s balance sheet.</span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Support</span>
                            <span className="text-zinc-450">Includes 30 days of post-launch support. Optional "Peace of Mind" maintenance is available afterward for a flat monthly fee.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-900 bg-[#251b12]/15 p-4 rounded-lg">
                      <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-wider block font-bold">WHY CHOOSE THIS?</span>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                        You eliminate "per-user" subscription fees forever and maintain total control over your infrastructure.
                      </p>
                    </div>
                  </Card>

                  {/* Option 2: The Managed Engine */}
                  <Card className="p-6 sm:p-8 bg-zinc-950/40 border-zinc-850 flex flex-col justify-between hover:border-[#22c55e]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#22c55e] uppercase font-bold">Subscription</span>
                        <h3 className="text-lg font-bold text-white">Option 2: The Managed Engine</h3>
                        <p className="text-xs text-zinc-450">Best for fast-growing businesses that want elite tech with zero upfront stress.</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-zinc-900 text-xs">
                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Investment</span>
                            <span className="text-zinc-450">A predictable monthly "all-inclusive" fee. No large upfront cost.</span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Service</span>
                            <span className="text-zinc-450">We host, manage, and maintain the entire system on our secure cloud. We handle everything under the hood.</span>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-zinc-200 block">The Flexibility</span>
                            <span className="text-zinc-450">You get the same custom power as our Asset Model, but with the flexibility of a monthly operating expense.</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-900 bg-[#251b12]/15 p-4 rounded-lg">
                      <span className="text-[9px] font-mono text-zinc-550 uppercase tracking-wider block font-bold">WHY CHOOSE THIS?</span>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                        You get a private technical department and high-end software for a single monthly price. We grow with you.
                      </p>
                    </div>
                  </Card>
                </div>

              </div>
            </section>


            {/* ABOUT SECTION */}
            <section className="section bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12 md:gap-24">
                
                {/* Header label and title */}
                <div className="space-y-4 max-w-sm">
                  <div className="text-xs font-mono font-semibold tracking-wider text-green-500 uppercase flex items-center space-x-2">
                    <span>05</span>
                    <span className="h-px w-6 bg-green-800/40" />
                    <span>The Deeproot Mandate</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                    About us
                  </h2>
                </div>

                {/* Main short body about Deeproot Systems */}
                <div className="flex-1 md:pt-4">
                  <p className="text-sm sm:text-base text-zinc-350 leading-relaxed font-normal">
                    Small focused team that goes deep on operations, automation, and data. Not an agency that takes every project. We pick problems worth solving and build systems that actually get used.
                  </p>
                </div>

              </div>
            </section>


            {/* CONTACT SECTION */}
            <section id="contact" className="section bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900/60">
              <div className="max-w-7xl mx-auto space-y-16">
                
                {/* Header copy */}
                <div className="max-w-xl mx-auto text-center space-y-4">
                  <div className="text-xs font-mono font-semibold tracking-wider text-green-500 uppercase inline-flex items-center space-x-2">
                    <span>06</span>
                    <span className="h-px w-6 bg-green-800/40" />
                    <span>Let&apos;s Build</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-tight">
                    Have a process that needs fixing?
                  </h2>
                  
                  <p className="text-sm text-zinc-450 leading-relaxed">
                    Tell us what is slow, broken, or manual. We will tell you honestly if we can help.
                  </p>
                </div>

                {/* Diagnostic interactive form */}
                <div className="pt-4">
                  <ContactForm />
                </div>

                {/* Direct secure email fallback */}
                <div className="text-center pt-8 space-y-3">
                  <p className="text-xs text-zinc-500 font-mono">
                    Direct channel secure link fallback
                  </p>
                  <a 
                    href="mailto:enquiry@mahvishsadaf.com" 
                    className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition-all border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 rounded-full px-4.5 py-2 font-mono text-xs shadow-md"
                  >
                    <Mail className="h-3.5 w-3.5 text-zinc-400" />
                    <span>enquiry@mahvishsadaf.com</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                  </a>
                </div>

              </div>
            </section>
          </>
        ) : (
          /* Multi-view sub-pages routing container */
          <section className="relative px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto min-h-[85vh]">
            {currentView === "blogs" && <BlogsView />}
            {currentView === "miniapps" && <MiniAppsView />}
            {currentView === "serious-projects" && <SeriousProjectsView initialProjectId={selectedProjectId} />}
            
            {/* Direct secure email enquiry bar inside all subpage layouts */}
            <div className="border-t border-zinc-900 mt-20 pt-12 text-center space-y-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">DEPLOYMENT ENQUIRY CHANNELS</span>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-850 hover:border-[#22c55e] text-xs h-9 cursor-pointer"
                  onClick={() => setCurrentView("home")}
                >
                  <ArrowLeft size={13} className="mr-1.5" />
                  Back to Homepage
                </Button>
                <a 
                  href="mailto:enquiry@mahvishsadaf.com" 
                  className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition-all border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 rounded-full px-4.5 py-2 font-mono text-xs shadow-md h-9"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-450" />
                  <span>enquiry@mahvishsadaf.com</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
                </a>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer copyright */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 text-center text-xs text-zinc-600 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Deeproot Systems. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-zinc-600 font-mono text-[10px]">
            <span>DP_INFRA_STABLE</span>
            <span>•</span>
            <span>SECURE EDGE TLS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
