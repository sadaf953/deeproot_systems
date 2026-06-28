import * as React from "react";
import { 
  Briefcase, Zap, ExternalLink, ArrowRight, ShieldCheck, Database, 
  Workflow, Table, ClipboardList, CheckCircle2, TrendingUp, Cpu, Server
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

interface ProjectDetails {
  id: string;
  title: string;
  category: string;
  badges: string[];
  demoUrl: string | null;
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
    title: "SolarFlow™ — Solar Operations CRM",
    category: "The Custom Solar Operations CRM",
    badges: ["React Vite", "Supabase", "PostgreSQL", "Audit Trail", "Milestone Payments"],
    demoUrl: "https://solarflow.mahvishsadaf.com",
    problem: "The installer was managing projects and payments across scattered Google Sheets. Financial calculations like Total Sales, Realized Cash, and Pending Receivables were prone to manual typos. Field agents had no simple way to upload leads, and changes were hard to track, leading to a lack of accountability and coordination errors.",
    solution: "A custom React web app with a Supabase backend that acts as a secure, structured alternative to spreadsheets. It includes two modes (Agents for lead uploads, Admins for project transitions), an automatic financial dashboard tracking cash flow, and an immutable stage-change audit log to ensure total team accountability.",
    architecture: [
      "Client UI: Single-page React Vite web application with responsive styling",
      "Backend database: Supabase PostgreSQL (Free Tier) housing relational tables",
      "Authentication: Dual-role setup separating field agent permissions from full admin operations",
      "Audit Trail: Database-level triggers that record every single stage change and financial update",
      "State Engine: Interactive 11-stage project pipeline (Leads to Completed) with easy transition logs",
      "Future Expansion: Gmail API integration to auto-generate client document folders in Google Drive"
    ],
    metrics: [
      "Spreadsheet formula errors: 100% eliminated",
      "Realized cash tracking: Managed across ₹87.8L of sales",
      "Duplicate entries: Prevented by schema-level database validation constraints",
      "Team accountability: 100% of stage changes recorded in the activity log"
    ],
    technicalSpecs: [
      { label: "Framework", value: "React Vite + Tailwind CSS" },
      { label: "Backend Database", value: "Supabase PostgreSQL (Free Tier)" },
      { label: "Pipeline Stages", value: "11 distinct operational stages" },
      { label: "Audit Mechanism", value: "Immutable Activity Log" }
    ],
    keyFeatures: [
      { 
        title: "11-Stage Pipeline", 
        desc: "Easily track and transition projects from Leads, Material Procurement, through DISCOM Inspection, to Completed.",
        icon: Workflow
      },
      { 
        title: "Financial Dashboard", 
        desc: "Automatically aggregates financials in one page: Total Sales, Pending Dues, and Realized Cash Inflow (e.g. ₹9.30L realized out of ₹87.8L total).",
        icon: Table
      },
      { 
        title: "Accountable Activity Log", 
        desc: "Every transition and update is logged with agent identity and timestamp — e.g. 'G. Prasad: Moved to Meter Installation (ADMIN)'.",
        icon: ShieldCheck
      },
      { 
        title: "Customer Card & Checklist", 
        desc: "Contains comprehensive checklists for permissions, document verification (PM Surya Ghar compliance), and post-installation records.",
        icon: ClipboardList
      },
      { 
        title: "Agent Lead Uploads", 
        desc: "Dedicated mode for field agents to upload lead data directly on the go, reducing data entry lag for the back office.",
        icon: Cpu
      }
    ]
  },
  {
    id: "company_brain",
    title: "The Secure Company Brain",
    category: "Private AI Intelligence",
    badges: ["Local Llama", "Pinecone DB", "LangChain", "FastAPI"],
    demoUrl: null,
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
    title: "The Paperwork Pipeline",
    category: "Automated Data Extraction",
    badges: ["FastAPI", "Groq AI", "PyMuPDF", "Google Sheets API", "Apps Script"],
    demoUrl: "https://invoice-automater.onrender.com",
    problem: "Accounts receivable spent over 12 hours a week manually downloading, reviewing, and typing values from complex PDF vendor invoices containing raw hardware parts lists, taxes, and billing entities.",
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
        desc: "No permanent file storage — files are converted and parsed entirely in memory/temporary cache structures.",
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
}

export function SeriousProjectsView({ initialProjectId = "solar_crm" }: SeriousProjectsViewProps) {
  const [activeId, setActiveId] = React.useState(initialProjectId);

  const activeProject = DETAIL_PROJECTS.find(p => p.id === activeId) || DETAIL_PROJECTS[0];

  return (
    <div className="w-full space-y-10">
      
      {/* Header section */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-[#14321a]/30 border border-[#14321a] rounded-full px-3 py-1 mb-2">
          <Briefcase size={13} className="text-[#22c55e]" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-green-300 font-bold">
            Enterprise Deployed Systems
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Enterprise Operational Products</h2>
        <p className="text-sm text-zinc-400">
          A granular view of the functional, reliable operational software architectures we have fully built, hardened, and deployed directly to client infrastructure.
        </p>
      </div>

      {/* Main layout pane split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        
        {/* Left rail selector */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest px-2 block">SELECT INSTANCE TO INSPECT</span>
          
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
                  <span className="text-[9px] font-mono text-zinc-650">[LIVE_DP]</span>
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
              
              {/* Demo button if exists */}
              {activeProject.demoUrl && (
                <Button
                  variant="default"
                  size="sm"
                  className="shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_22px_rgba(34,197,94,0.5)] border border-[#a7f3d0] font-bold self-start sm:self-auto shrink-0 h-9"
                  onClick={() => window.open(activeProject.demoUrl!, "_blank")}
                >
                  <Zap size={14} className="mr-1.5 text-zinc-900 fill-zinc-900" />
                  Launch Live System Demo
                  <ExternalLink size={13} className="ml-1.5" />
                </Button>
              )}
            </div>

            {/* Structured split regions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Problem Statement */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1 w-1 bg-red-500 rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450">THE BUSINESS PROBLEM</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {activeProject.problem}
                </p>
              </div>

              {/* Engineered Solution */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5">
                  <span className="h-1 w-1 bg-[#22c55e] rounded-full" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#22c55e]">THE ENGINEERED SOLUTION</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                  {activeProject.solution}
                </p>
              </div>

            </div>

            {/* Core Features list grids */}
            <div className="space-y-4 pt-4 border-t border-zinc-900">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">BESPOKE SYSTEM ADVANTAGES</span>
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
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">DEPLOYMENT ARCHITECTURE</span>
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">AUDITED PERFORMANCE METRICS</span>
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-450 block">TECHNICAL RUNTIME SHEET</span>
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
