import * as React from "react";
import { 
  Briefcase, ArrowRight, ShieldCheck, Database, 
  Workflow, Table, ClipboardList, CheckCircle2, TrendingUp, Cpu, Server,
  Landmark, FileText, Truck, Users
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  badges: string[];
  problem: string;
  solution: string;
  architecture: string[];
  metrics: string[];
  technicalSpecs: { label: string; value: string }[];
  keyFeatures: { title: string; desc: string; icon: any }[];
}

const DETAIL_PROJECTS: ProjectDetails[] = [
  {
    id: "solar_crm",
    title: "SolarFlow™ - Solar Operations CRM",
    category: "Solar EPC Operations Platform",
    badges: ["React", "Supabase", "Row-Level Security", "PM Surya Ghar", "Inventory & BOM"],
    problem: "Rooftop solar installers run every project through the same long chain: quotation, registration, Jansamarth loan or cash, material order, delivery, installation, geo-tagging, DISCOM paperwork, meter fitting, inspection and the PM Surya Ghar subsidy. Most teams track all of it in Google Sheets and WhatsApp, across channel partners, dealers, installation vendors and stamp makers. Loans and subsidies move on their own timelines, stock goes missing from the godown, and nobody can say who changed what.",
    solution: "One system for the whole company. Every customer moves through a guided 14-stage pipeline where each stage asks only for the one or two fields that matter. Loan and subsidy status run on their own tracks with dated history. Materials, deliveries and stock are tied to each customer, and every partner, vendor and document maker gets their own portal that shows only their work.",
    architecture: [
      "Frontend: React + Vite single-page app with Tailwind CSS, with each role's portal loaded on demand",
      "Backend: Supabase PostgreSQL with Auth, Storage and Edge Functions for staff onboarding and vendor job notifications",
      "Access control: 8 user roles enforced with database row-level security, so partner offices only ever see their own network",
      "Documents: quotations, feasibility reports, BOM loading checklists and agreements generated as PDFs in the browser",
      "Field capture: in-browser barcode scanning of inverter and panel serial numbers, plus geo-tag photo uploads",
      "Client intake: a shareable enquiry form for new customers that autosaves and can be resumed securely later"
    ],
    metrics: [
      "14 working stages from lead to subsidy, plus Completed and Lost",
      "8 user roles across 4 dedicated portals",
      "Stock deducted exactly once per delivered customer",
      "Up to 500 panel serials per customer, captured by barcode"
    ],
    technicalSpecs: [
      { label: "Framework", value: "React + Vite + Tailwind" },
      { label: "Backend", value: "Supabase (Postgres, Auth, Storage)" },
      { label: "Access Control", value: "8 roles, row-level security" },
      { label: "Pipeline", value: "14 stages + loan & subsidy tracks" }
    ],
    keyFeatures: [
      {
        title: "Lead-to-Subsidy Pipeline",
        desc: "Leads, Registration, Loan or Cash, Material Order, Integration, Delivery, Installation, Geo Tag, DISCOM Submission, Meter, DISCOM Inspection, Subsidy and Final Review. Paused projects keep their stage and resume where they left off.",
        icon: Workflow
      },
      {
        title: "Loan & Subsidy Tracking",
        desc: "Jansamarth loans (in process, sanctioned, 1st and 2nd bank release) and PM Surya Ghar subsidies (in process, redeemed, approved, received) are tracked separately from the project stage, each with dated history.",
        icon: Landmark
      },
      {
        title: "Quotations That Become Leads",
        desc: "Build branded quotations with capacity sizing, brand options, discounts and subsidy, download the PDF, and convert an approved quote into a customer record without retyping anything.",
        icon: FileText
      },
      {
        title: "Inventory, BOM & Delivery Trips",
        desc: "Each customer gets a bill of materials and a printable loading checklist. Trips club several customers on one truck with driver and vehicle, stock is deducted on delivery, and a daily godown report shows opening and closing stock.",
        icon: Truck
      },
      {
        title: "Portals for Every Partner",
        desc: "Channel partner offices and dealers manage only their own leads. Installation vendors see only their assigned jobs and update installation and geo-tag status. Stamp makers receive DISCOM agreement requests and return the signed files.",
        icon: Users
      },
      {
        title: "Full Audit Trail",
        desc: "Every save and stage move is recorded in the activity log with the person and role behind it, alongside vendor installation payments and dated customer history.",
        icon: ShieldCheck
      }
    ]
  },
  {
    id: "company_brain",
    title: "The Secure Company Brain",
    category: "Private AI Intelligence",
    badges: ["Local Llama", "Pinecone DB", "LangChain", "FastAPI"],
    problem: "We built a private, highly secure intelligence for a firm that needed instant answers from 10,000+ pages of internal policies and past contracts. Customer and corporate details are highly sensitive and require absolute insulation from public networks.",
    solution: "A local, secure vector retrieval service where employees ask questions in plain English; the 'Brain' answers instantly with exact source citations. 100% of the data stays strictly inside the company walls.",
    architecture: [
      "Local Embedding Service: Local CPU-based vectors matching security regulations",
      "Vector Storage: Isolated FAISS index files and Pinecone structures",
      "Agent Framework: LangChain query rerank pipelines giving highly accurate citations"
    ],
    metrics: [
      "Troubleshooting search time: Reduced from 40 mins to 10 seconds",
      "Accuracy rating: Zero conversational hallucinations, strictly bounded within indexed sheets"
    ],
    technicalSpecs: [
      { label: "Core AI LLM", value: "Ollama Llama-3-8B Local" },
      { label: "Vector DB", value: "FAISS Local Sandbox" },
      { label: "Access Security", value: "Private internal company network Only" }
    ],
    keyFeatures: [
      { 
        title: "True Local Isolation", 
        desc: "Runs completely on internal server hardware. Absolutely zero corporate data leaks to public web networks.",
        icon: Server
      },
      { 
        title: "Reference Page Citation", 
        desc: "Every response lists exactly which SOP chapter and page number the source was fetched from to prevent mistakes.",
        icon: ClipboardList
      }
    ]
  },
  {
    id: "invoice_ocr",
    title: "Invoice Automater",
    category: "Automated Data Extraction",
    badges: ["FastAPI", "Groq AI", "PyMuPDF", "Google Sheets API", "Apps Script"],
    problem: "Businesses receiving invoices in bulk often miss them in congested email inboxes, leading to late payments, manual sorting delays, and hours of tedious download-and-log overhead.",
    solution: "An end-to-end automated pipeline. An email watcher forwards PDF attachments to a FastAPI service on Render. The service converts PDFs to Markdown using PyMuPDF, extracts clean structured JSON via a Groq LLM (llama-3.1-8b-instant), and appends it directly to a Google Sheet.",
    architecture: [
      "Email Watcher: Google Apps Script detects incoming vendor invoice PDFs in Gmail",
      "Storage Bridge: Saves PDFs to a secure Google Drive folder and indexes metadata",
      "API Service: FastAPI backend deployed on Render receives and orchestrates documents",
      "Converter: Converts PDF structure to Markdown using PyMuPDF",
      "Extraction: Groq LLM (llama-3.1-8b-instant) extracts structured data",
      "Sheets Sync: Appends validated invoice rows directly to Google Sheets via gspread"
    ],
    metrics: [
      "Saves manual entry time by: 12+ worker hours/week",
      "Key extraction accuracy score: 99.4% with auto decimal/comma cleansing",
      "End-to-end processing pipeline: Fully automated under 5 seconds"
    ],
    technicalSpecs: [
      { label: "Hosting", value: "FastAPI / Render Hosting" },
      { label: "Extraction Engine", value: "Groq (llama-3.1-8b-instant)" },
      { label: "Document Parser", value: "PyMuPDF (Zero-Trace Converter)" },
      { label: "Database / Sink", value: "Google Sheets / Drive Sync" }
    ],
    keyFeatures: [
      { 
        title: "Gmail & Drive Automation", 
        desc: "Monitors custom inbox channels, saves attachments, and updates ledger spreadsheets automatically.",
        icon: Workflow
      },
      { 
        title: "Zero-Trace Privacy", 
        desc: "No permanent file storage. Files are converted and parsed entirely in memory/temporary cache structures.",
        icon: ShieldCheck
      },
      { 
        title: "Google Sheets Sync", 
        desc: "Writes clean invoice metadata (Date, Vendor, Invoice No., Grand Total, Tax) directly to Google Sheets.",
        icon: Table
      }
    ]
  }
];

interface SeriousProjectsViewProps {
  initialProjectId?: string;
  onRequestDemo?: (projectTitle: string) => void;
}

export function SeriousProjectsView({ initialProjectId = "solar_crm", onRequestDemo }: SeriousProjectsViewProps) {
  const [activeId, setActiveId] = React.useState(initialProjectId);

  const activeProject = DETAIL_PROJECTS.find(p => p.id === activeId) || DETAIL_PROJECTS[0];

  return (
    <div className="w-full space-y-10">
      
      {/* Header section */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-[#14321a]/30 border border-[#14321a] rounded-full px-3 py-1 mb-2">
          <Briefcase size={13} className="text-[#22c55e]" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-green-300 font-bold">
            Products
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Our Products</h2>
        <p className="text-sm text-zinc-400">
          The problem each system solves, how it is built, and what it changed for the business using it.
        </p>
      </div>

      {/* Main layout pane split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left rail selector */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest px-2 block">Select a project</span>
          
          <div className="space-y-2">
            {DETAIL_PROJECTS.map(proj => (
              <div
                key={proj.id}
                onClick={() => setActiveId(proj.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  activeId === proj.id
                    ? "border-[#22c55e] bg-[#14321a]/10 shadow-[0_0_15px_rgba(34,197,94,0.15)] text-white"
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider text-green-500 font-semibold">{proj.badges[0]}</span>
                </div>
                <h4 className="font-semibold text-sm mt-1 text-zinc-150">{proj.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                  {proj.problem}
                </p>
              </div>
            ))}
          </div>


        </div>

        {/* Right detailed sheet */}
        <div className="lg:col-span-8">
          <div className="border border-zinc-850 bg-zinc-950/50 rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden backdrop-blur-md">
            
            {/* Corner header details */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-900">
              <div className="space-y-1">
                <span className="text-[10px] font-mono bg-[#14321a]/30 border border-[#14321a] px-2.5 py-1 rounded text-[#22c55e] tracking-wider block w-max uppercase">
                  {activeProject.category}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white pt-1">
                  {activeProject.title}
                </h3>
              </div>
              
              {onRequestDemo && (
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold self-start sm:self-auto shrink-0 h-9 cursor-pointer"
                  onClick={() => onRequestDemo(activeProject.title.split(" - ")[0])}
                >
                  Request a Demo
                  <ArrowRight size={14} className="ml-1.5" />
                </Button>
              )}
            </div>

            {/* Structured split regions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Problem Statement */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1 w-1 bg-red-500 rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450">The problem</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {activeProject.problem}
                </p>
              </div>

              {/* Engineered Solution */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1 w-1 bg-[#22c55e] rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#22c55e]">What we built</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {activeProject.solution}
                </p>
              </div>

            </div>

            {/* Core Features list grids */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">Key features</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeProject.keyFeatures.map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div key={idx} className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 space-y-2">
                      <div className="flex items-center space-x-2 text-[#22c55e]">
                        <FeatIcon size={14} />
                        <span className="text-xs font-semibold text-zinc-150">{feat.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Architecture Details */}
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">How it is built</span>
              <ul className="space-y-1.5">
                {activeProject.architecture.map((arch, idx) => (
                  <li key={idx} className="flex items-start text-[11px] text-zinc-400 font-normal leading-relaxed">
                    <CheckCircle2 size={13} className="text-[#22c55e] mr-2 mt-0.5 shrink-0" />
                    <span>{arch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Tech specs and metrics strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-900">
              
              {/* Metrics */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">Key numbers</span>
                <div className="space-y-1.5">
                  {activeProject.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-zinc-300 font-mono">
                      <TrendingUp size={13} className="text-green-500 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">Tech specs</span>
                <div className="bg-zinc-950 rounded-xl border border-zinc-900 p-3 space-y-1.5 font-mono text-[10px]">
                  {activeProject.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-1 border-b border-zinc-900/40 last:border-0 leading-normal">
                      <span className="text-zinc-500">{spec.label}</span>
                      <span className="text-zinc-300 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
