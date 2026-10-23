import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, CheckCircle2, ArrowRight, Mail, ArrowUpRight, ArrowLeft, XCircle, Sun, Wrench,
  FileStack, Percent, Clock, Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/src/components/ui/card";
import { ContactForm } from "@/src/components/ContactForm";
import { PixelMushroom } from "@/src/components/PixelMushroom";
import { BlogsView } from "@/src/components/BlogsView";
import { MiniAppsView } from "@/src/components/MiniApps";
import { SeriousProjectsView } from "@/src/components/SeriousProjectsView";
import {
  SOLARFLOW_DEMO_URL, GENERIC_VS_BUILT, SOLARFLOW_STATS, SOLARFLOW_FEATURES, CLIENT_BUILDS,
  CUSTOMIZATION_STEPS, GOOD_FEATURES, TOOLS, DOC_EXAMPLES, DOC_FLOW, SETUPS, EXTRA_SETUPS,
  PARTNERSHIP_POINTS, PLANS, VENTURE_STEPS, HIGHLIGHTS, TESTIMONIALS,
} from "@/src/homeContent";

const approvedTestimonials = TESTIMONIALS.filter((t) => t.approved);

type View = "home" | "blogs" | "miniapps" | "serious-projects";

const NAV_LINKS: { label: string; target: string }[] = [
  { label: "Approach", target: "approach" },
  { label: "SolarFlow", target: "solarflow" },
  { label: "Services", target: "services" },
  { label: "Partnership", target: "partnership" },
  { label: "Contact", target: "contact" },
];

const QUICK_LINKS = [
  { target: "solarflow", icon: Sun, title: "SolarFlow™", desc: "Operations platform for solar installers" },
  { target: "tools", icon: Wrench, title: "Ready-made business tools", desc: "Quotes, GST, receipts, payslips" },
  { target: "documents", icon: FileStack, title: "Document automation", desc: "Any repeat document, in seconds" },
  { target: "services", icon: Sparkles, title: "One-time setups", desc: "Email, Shopify, OCR, document links" },
  { target: "build-with-us", icon: Percent, title: "Build a product with us", desc: "Earn a share of every sale" },
];

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 120 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

function SectionHeader({ label, title, children, center = false }: {
  label: string; title: React.ReactNode; children?: React.ReactNode; center?: boolean;
}) {
  return (
    <div className={`space-y-4 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className="text-sm font-semibold text-[#22c55e]">{label}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">{title}</h2>
      {children && <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{children}</p>}
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-t border-zinc-900/60 scroll-mt-16 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-14">{children}</div>
    </section>
  );
}

// A grid of small icon cards that fade in together
function IconGrid({ items, cols }: { items: { icon: React.ElementType; title: string; desc: string }[]; cols: string }) {
  return (
    <motion.div
      className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-4`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            variants={fadeUpItem}
            className="rounded-xl border border-zinc-850 bg-zinc-950/50 p-5 hover:border-[#22c55e]/40 transition-colors"
          >
            <Icon className="h-5 w-5 text-[#22c55e]" />
            <div className="text-sm font-semibold text-zinc-100 mt-3">{item.title}</div>
            <div className="text-xs text-zinc-400 leading-relaxed mt-1.5">{item.desc}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<View>("home");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("solar_crm");
  const [demoPrefill, setDemoPrefill] = React.useState<string>("");

  // Reset scroll on view change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  // Solid nav background once the page scrolls
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to a homepage section, switching back to the homepage first if needed
  const scrollTo = (id: string) => {
    setCurrentView("home");
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  // Send visitors to the contact form with their interest pre-filled
  const enquire = (message: string) => {
    setDemoPrefill(message);
    scrollTo("contact");
  };

  const requestDemo = (projectTitle: string) => {
    enquire(`I'd like a demo of ${projectTitle.replace("™", "")}.`);
  };

  const openProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView("serious-projects");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-[#22c55e]/20 selection:text-white overflow-hidden relative">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#14321a25_1px,transparent_1px),linear-gradient(to_bottom,#14321a25_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_30%_at_50%_0%,#000_75%,transparent_100%)] pointer-events-none" />

      {/* Sticky navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-zinc-950/85 backdrop-blur-md border-[#14321a]/50 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div
            onClick={() => scrollTo("hero")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="h-7 w-7 rounded bg-[#22c55e] flex items-center justify-center p-0.5 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(34,197,94,0.35)]">
              <PixelMushroom size={18} animate={false} />
            </div>
            <span className="text-sm font-semibold tracking-wide text-zinc-200 group-hover:text-white transition-colors">
              Deeproot Systems
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="text-sm font-medium cursor-pointer hover:text-[#22c55e] text-zinc-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => openProject("solar_crm")}
              className={`text-sm font-medium cursor-pointer hover:text-[#22c55e] transition-colors ${currentView === "serious-projects" ? "text-[#22c55e]" : "text-zinc-400"}`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentView("blogs")}
              className={`text-sm font-medium cursor-pointer hover:text-[#22c55e] transition-colors ${currentView === "blogs" ? "text-[#22c55e]" : "text-zinc-400"}`}
            >
              Blogs
            </button>
          </nav>

          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="sm"
              className="border-[#14321a] hover:border-[#22c55e] text-xs text-[#edfcf1] hover:text-white"
              onClick={() => scrollTo("contact")}
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md border border-zinc-900 bg-zinc-950 text-zinc-400 hover:text-white focus:outline-hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 border-b border-zinc-900 bg-zinc-950/98 backdrop-blur-lg py-5 px-6 space-y-4 shadow-xl flex flex-col"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 text-zinc-400"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => openProject("solar_crm")}
                className="text-left text-sm font-medium tracking-wide border-b border-zinc-900 pb-2 text-zinc-400"
              >
                Products
              </button>
              <button
                onClick={() => { setCurrentView("blogs"); setIsMobileMenuOpen(false); }}
                className="text-left text-sm font-medium tracking-wide pb-1 text-zinc-400"
              >
                Blogs
              </button>
              <Button variant="default" size="sm" className="w-full mt-2" onClick={() => scrollTo("contact")}>
                Book a Call
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative z-10">

        {currentView === "home" ? (
          <>
            {/* HERO */}
            <section id="hero" className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
              <div className="absolute inset-x-0 top-1/4 h-80 bg-[#22c55e]/[0.03] blur-3xl rounded-full pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
                <motion.div
                  className="lg:col-span-7 space-y-7"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center space-x-2 bg-[#14321a]/40 border border-[#14321a] rounded-full px-3.5 py-1.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
                    <span className="text-xs font-medium text-green-300">
                      Business software, built in Hyderabad
                    </span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                    Software shaped around<br className="hidden sm:block" />{" "}
                    <span className="text-[#22c55e]">your business.</span>
                  </h1>

                  <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                    Not a generic CRM you have to bend to. We build systems that follow how your team already works,
                    automate the documents you make every day, and set up the tools that save you hours each week.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a href={SOLARFLOW_DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <Button variant="default" size="lg" className="w-full h-11">
                        Try the SolarFlow Demo
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="w-full sm:w-auto h-11 border border-zinc-850 hover:border-[#22c55e]/60"
                      onClick={() => scrollTo("contact")}
                    >
                      Talk to Us
                    </Button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />90+ people use it every day</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />No per-user fees</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />You own your data</span>
                  </div>
                </motion.div>

                {/* Quick links panel */}
                <motion.div
                  className="lg:col-span-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md p-2">
                    <div className="px-4 pt-3 pb-2 text-xs font-medium text-zinc-500">
                      What are you looking for?
                    </div>
                    {QUICK_LINKS.map((link, i) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.target}
                          onClick={() => scrollTo(link.target)}
                          className={`w-full flex items-center gap-4 rounded-xl p-4 text-left transition-colors group cursor-pointer ${
                            i === 0 ? "bg-[#14321a]/30 border border-[#14321a] hover:border-[#22c55e]/60" : "hover:bg-zinc-900/70"
                          }`}
                        >
                          <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center ${i === 0 ? "bg-[#22c55e]/15" : "bg-zinc-900 border border-zinc-800"}`}>
                            <Icon className="h-5 w-5 text-[#22c55e]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-zinc-100">{link.title}</div>
                            <div className="text-xs text-zinc-500">{link.desc}</div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#22c55e] group-hover:translate-x-0.5 transition-all" />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </section>


            {/* HIGHLIGHTS STRIP */}
            <section className="px-4 sm:px-6 lg:px-8 border-t border-zinc-900/60 bg-zinc-900/20">
              <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-zinc-900 lg:divide-x">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="py-8 px-2 lg:px-8 text-center lg:text-left">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-white">{item.value}</div>
                    <div className="text-xs text-zinc-400 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>


            {/* APPROACH: GENERIC CRM VS BUILT AROUND YOU */}
            <Section id="approach">
              <SectionHeader label="Our approach" title="Why not just use a generic CRM?">
                Off-the-shelf CRMs are built for everyone, so your team ends up working around them. We think a system
                should be specialised: built around your business, your stages and your people, and nothing else.
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 sm:p-8 bg-zinc-950/40 border-zinc-850">
                  <div className="text-xs font-medium text-zinc-500 font-bold">Generic CRM</div>
                  <h3 className="font-display text-xl font-bold text-zinc-300 mt-2">You adapt to the software</h3>
                  <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-900">
                    {GENERIC_VS_BUILT.generic.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-zinc-400">
                        <XCircle className="h-4 w-4 text-zinc-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="p-6 sm:p-8 bg-[#0d170f]/60 border-[#14321a]">
                  <div className="text-xs font-medium text-[#22c55e] font-bold">Built by Deeproot</div>
                  <h3 className="font-display text-xl font-bold text-white mt-2">The software adapts to you</h3>
                  <ul className="space-y-3 mt-6 pt-6 border-t border-[#14321a]">
                    {GENERIC_VS_BUILT.built.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-zinc-200">
                        <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </Section>


            {/* SOLARFLOW */}
            <Section id="solarflow">
              <div className="rounded-3xl border border-[#14321a] bg-gradient-to-br from-[#0d170f]/80 via-zinc-950 to-zinc-950 p-6 sm:p-10 lg:p-14 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl pointer-events-none" />

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="text-sm font-semibold text-[#22c55e]">Our flagship product</div>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">SolarFlow™</h2>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      The operations system for rooftop solar installers. Quotations, loans, PM Surya Ghar subsidies,
                      godown stock, delivery trips and partner portals in one place, instead of spread across Google Sheets and WhatsApp.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {SOLARFLOW_STATS.map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-4">
                          <div className="font-display text-2xl font-bold text-[#22c55e]">{stat.value}</div>
                          <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a href={SOLARFLOW_DEMO_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="default" className="w-full">
                          Open Live Demo
                          <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                      </a>
                      <Button variant="outline" className="w-full sm:w-auto hover:border-[#22c55e]" onClick={() => openProject("solar_crm")}>
                        Full Breakdown
                      </Button>
                    </div>
                    <p className="text-xs text-zinc-500">
                      Pick any of 8 roles in the demo, from admin to vendor. No password, and your own sandbox with sample data.
                    </p>
                  </div>

                  <div className="lg:col-span-7">
                    <IconGrid items={SOLARFLOW_FEATURES} cols="" />
                  </div>
                </div>
              </div>

              {/* Client versions */}
              <div className="space-y-8">
                <div className="max-w-2xl space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">One product, shaped for each company.</h3>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    Every installer runs their business a little differently, so every copy of SolarFlow is different too.
                    Here is what we built specially for the companies using it.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {CLIENT_BUILDS.map((client) => (
                    <Card key={client.name} className="p-6 sm:p-7 bg-zinc-950/50 border-zinc-850 hover:border-[#22c55e]/40 transition-colors flex flex-col">
                      <div className="text-xs font-medium text-green-400 font-bold">{client.type}</div>
                      <h4 className="font-display text-xl font-bold text-white mt-2">{client.name}</h4>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{client.summary}</p>
                      <ul className="space-y-2.5 mt-5 pt-5 border-t border-zinc-900">
                        {client.custom.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-[13px] text-zinc-300 leading-relaxed">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e] shrink-0 mt-1" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                {/* How customization works */}
                <div className="rounded-2xl border border-zinc-850 bg-zinc-900/30 p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                    <div>
                      <div className="text-xs font-medium text-zinc-500 font-bold">How each copy is made</div>
                      <h4 className="font-display text-xl font-bold text-white mt-2">Two setup forms, then your own system in 3 to 5 working days.</h4>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 px-4 hover:border-[#22c55e] shrink-0" onClick={() => requestDemo("SolarFlow")}>
                      Get Your Own Copy
                    </Button>
                  </div>
                  <IconGrid items={CUSTOMIZATION_STEPS} cols="lg:grid-cols-4" />
                  <p className="text-xs text-zinc-500 mt-5">
                    Each company gets its own database, its own web address and its own logins. Nothing is shared between clients.
                  </p>
                </div>
              </div>
            </Section>


            {/* TESTIMONIALS (hidden until a client has approved a quote) */}
            {approvedTestimonials.length > 0 && (
              <Section id="testimonials">
                <SectionHeader label="What clients say" title="Built for how they work." />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {approvedTestimonials.map((t) => (
                    <Card key={t.quote} className="p-6 sm:p-8 bg-zinc-950/50 border-zinc-850 flex flex-col justify-between">
                      <p className="text-sm text-zinc-200 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                      <div className="mt-6 pt-5 border-t border-zinc-900">
                        <div className="text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-zinc-500">{t.role}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Section>
            )}


            {/* GOOD FEATURES */}
            <Section id="features">
              <SectionHeader label="Worth having anywhere" title="Features every business should have.">
                Whatever your industry, these are the things we build into almost every system, because they save time from day one.
              </SectionHeader>
              <IconGrid items={GOOD_FEATURES} cols="lg:grid-cols-4" />
            </Section>


            {/* TOOLS */}
            <Section id="tools">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                <div className="lg:col-span-4 space-y-5">
                  <SectionHeader label="Start small" title="Maybe you just need a few good tools.">
                    Not every business needs a full system on day one. Sometimes a quote maker, a GST calculator and a proper
                    receipt are what make the biggest difference. We have a ready-made toolbox we can brand for you.
                  </SectionHeader>
                  <Button variant="default" size="sm" className="h-9 px-4" onClick={() => enquire("I'd like a set of business tools for my company.")}>
                    Ask About the Toolbox
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
                <div className="lg:col-span-8">
                  <IconGrid items={TOOLS} cols="lg:grid-cols-3" />
                </div>
              </div>
            </Section>


            {/* DOCUMENT AUTOMATION */}
            <Section id="documents">
              <SectionHeader label="Document automation" title="If you make it more than twice, it can be automated.">
                Any document your team types out again and again can be generated from data you already have. What took
                twenty minutes of copying, formatting and checking takes seconds, with no typos and the right numbering every time.
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DOC_FLOW.map((step, i) => (
                  <div key={step.title} className="relative rounded-2xl border border-zinc-850 bg-zinc-950/40 p-6">
                    <span className="font-display text-4xl font-bold text-zinc-850">{i + 1}</span>
                    <h3 className="text-base font-semibold text-white mt-3">{step.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1.5">{step.desc}</p>
                    {i < DOC_FLOW.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-3.5 -translate-y-1/2 h-5 w-5 text-[#22c55e] z-10" />
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#14321a] bg-[#0d170f]/40 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
                <div className="lg:w-1/3 space-y-2">
                  <div className="flex items-center gap-2 text-[#22c55e]">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium font-bold">Documents we automate</span>
                  </div>
                  <p className="text-sm text-zinc-300">Paper coming in can be read with OCR, and documents going out can be sent as a link.</p>
                </div>
                <div className="lg:w-2/3 flex flex-wrap gap-2">
                  {DOC_EXAMPLES.map((doc) => (
                    <span key={doc} className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3.5 py-1.5 text-xs text-zinc-300">{doc}</span>
                  ))}
                  <span className="rounded-full border border-[#22c55e]/40 px-3.5 py-1.5 text-xs text-[#22c55e]">Yours too</span>
                </div>
              </div>
            </Section>


            {/* ONE-TIME SETUPS */}
            <Section id="services">
              <SectionHeader label="Individual setups" title="One-time setups that make a real difference.">
                Small jobs, done properly, that make a business look sharper and run smoother.
              </SectionHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SETUPS.map((serv) => {
                  const Icon = serv.icon;
                  return (
                    <Card key={serv.id} id={serv.id} className="p-6 sm:p-8 bg-zinc-950/50 border-zinc-850 hover:border-[#22c55e]/40 transition-colors flex flex-col scroll-mt-24">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-lg bg-[#14321a]/50 border border-[#14321a] flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[#22c55e]" />
                        </div>
                        <span className="text-xs font-medium text-green-400 font-bold">{serv.tag}</span>
                      </div>
                      <CardTitle className="font-display text-xl font-bold text-white mt-5">{serv.title}</CardTitle>
                      <CardDescription className="text-sm text-zinc-400 leading-relaxed mt-2">{serv.pitch}</CardDescription>
                      <ul className="space-y-2.5 mt-5 flex-1">
                        {serv.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-300">
                            <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-zinc-900">
                        <Button variant="default" size="sm" className="w-full sm:w-auto h-9 px-4" onClick={() => enquire(`I'm interested in ${serv.title}.`)}>
                          Ask About This
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                        </Button>
                        {serv.projectId && (
                          <Button variant="outline" size="sm" className="w-full sm:w-auto h-9 px-4 hover:border-[#22c55e]" onClick={() => openProject(serv.projectId!)}>
                            {serv.projectLabel}
                          </Button>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-zinc-300">Smaller improvements that save time every week</h3>
                <IconGrid items={EXTRA_SETUPS} cols="lg:grid-cols-3" />
              </div>
            </Section>


            {/* LONG-TERM PARTNERSHIP + PLANS */}
            <Section id="partnership">
              <SectionHeader label="Long-term partnership" title="We don't hand over and disappear.">
                Your business will change, and your system should change with it. We work with clients for the long run, so the
                same team keeps improving the same system year after year.
              </SectionHeader>

              <IconGrid items={PARTNERSHIP_POINTS} cols="lg:grid-cols-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PLANS.map((plan) => (
                  <Card key={plan.title} className="p-6 sm:p-8 bg-zinc-950/40 border-zinc-850 hover:border-[#22c55e]/40 transition-colors flex flex-col">
                    <span className="text-xs font-semibold text-[#22c55e]">{plan.tag}</span>
                    <h3 className="font-display text-xl font-bold text-white mt-2">{plan.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{plan.fit}</p>
                    <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-900 flex-1">
                      {plan.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle2 className="h-4 w-4 text-[#22c55e] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Section>


            {/* BUILD WITH US: ROYALTY MODEL */}
            <Section id="build-with-us">
              <div className="rounded-3xl border border-[#14321a] bg-gradient-to-br from-[#0d170f]/70 via-zinc-950 to-zinc-950 p-6 sm:p-10 lg:p-14 space-y-12 relative overflow-hidden">
                <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl pointer-events-none" />

                <div className="relative">
                  <SectionHeader label="Build a product with us" title="Help us build it, and earn from every sale.">
                    This is how SolarFlow started. We find an industry that still runs on spreadsheets, build the product
                    hand in hand with one company, and then offer it to others in the same field.
                  </SectionHeader>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {VENTURE_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="rounded-xl border border-zinc-850 bg-zinc-950/60 p-5">
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5 text-[#22c55e]" />
                          <span className="text-xs text-zinc-500">Step {i + 1}</span>
                        </div>
                        <div className="text-sm font-semibold text-zinc-100 mt-4">{step.title}</div>
                        <div className="text-xs text-zinc-400 leading-relaxed mt-1.5">{step.desc}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl border border-[#22c55e]/30 bg-zinc-950/70 p-6 sm:p-8">
                  <div className="lg:col-span-8 space-y-3">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white">How the royalty works</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      If there is demand and we sell the product to other companies, the company that helped build it gets a
                      percentage of those sales. The percentage depends on how much they contributed: time, know-how and money.
                      It is paid until they have earned back what they put in, or for up to two years, whichever comes first.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex lg:justify-end">
                    <Button variant="default" className="w-full lg:w-auto" onClick={() => enquire("I'd like to build an industry product with Deeproot.")}>
                      Pitch Your Industry
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Section>


            {/* CONTACT */}
            <Section id="contact">
              <SectionHeader label="Let's talk" title="Tell us what you need." center>
                A small, focused team in Hyderabad. Tell us what is slow, broken or manual, and we will tell you honestly if we can help.
              </SectionHeader>

              <ContactForm prefillMessage={demoPrefill} />

              <div className="text-center space-y-3">
                <p className="text-xs text-zinc-500">Prefer email? Write to us directly</p>
                <a
                  href="mailto:enquiry@deeprootsystems.in"
                  className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition-all border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 rounded-full px-4.5 py-2 font-mono text-xs shadow-md"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-400" />
                  <span>enquiry@deeprootsystems.in</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              </div>
            </Section>
          </>
        ) : (
          /* Sub-pages */
          <section className="relative px-4 sm:px-6 lg:px-8 py-24 max-w-7xl mx-auto min-h-[85vh]">
            {currentView === "blogs" && <BlogsView />}
            {currentView === "miniapps" && <MiniAppsView />}
            {currentView === "serious-projects" && (
              // Keyed so picking another project from the footer remounts the view on it
              <React.Fragment key={selectedProjectId}>
                <SeriousProjectsView initialProjectId={selectedProjectId} onRequestDemo={requestDemo} />
              </React.Fragment>
            )}

            <div className="border-t border-zinc-900 mt-20 pt-12 text-center space-y-4">
              <span className="text-xs text-zinc-500 block">Questions? Get in touch</span>
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
                  href="mailto:enquiry@deeprootsystems.in"
                  className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition-all border border-zinc-900 bg-zinc-950/50 hover:bg-zinc-900/40 rounded-full px-4.5 py-2 font-mono text-xs shadow-md h-9"
                >
                  <Mail className="h-3.5 w-3.5 text-zinc-450" />
                  <span>enquiry@deeprootsystems.in</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
                </a>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-14 px-4 text-xs text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="text-sm font-semibold text-zinc-200">Deeproot Systems</div>
            <p>Software shaped around your business.</p>
            <p>Hyderabad, India</p>
            <a href="mailto:enquiry@deeprootsystems.in" className="hover:text-zinc-300 transition-colors block">enquiry@deeprootsystems.in</a>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300">Products</div>
            <a href={SOLARFLOW_DEMO_URL} target="_blank" rel="noopener noreferrer" className="block hover:text-zinc-300 transition-colors">SolarFlow™ live demo</a>
            <button onClick={() => openProject("solar_crm")} className="block hover:text-zinc-300 transition-colors cursor-pointer">SolarFlow™ breakdown</button>
            <button onClick={() => openProject("invoice_ocr")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Invoice Automater</button>
            <button onClick={() => scrollTo("tools")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Business Toolbox</button>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300">Services</div>
            <button onClick={() => scrollTo("documents")} className="block text-left hover:text-zinc-300 transition-colors cursor-pointer">Document automation</button>
            {SETUPS.map((serv) => (
              <button key={serv.id} onClick={() => scrollTo(serv.id)} className="block text-left hover:text-zinc-300 transition-colors cursor-pointer">
                {serv.title}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-zinc-300">Company</div>
            <button onClick={() => scrollTo("approach")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Our approach</button>
            <button onClick={() => scrollTo("partnership")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Partnership & plans</button>
            <button onClick={() => scrollTo("build-with-us")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Build a product with us</button>
            <button onClick={() => setCurrentView("blogs")} className="block hover:text-zinc-300 transition-colors cursor-pointer">Blogs</button>
          </div>
        </div>
        <p className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-900 text-zinc-600">
          © {new Date().getFullYear()} Deeproot Systems. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
