import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, FileText, ArrowRight, Activity, Terminal, ShieldAlert } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { PixelMushroom } from "./PixelMushroom";

const BOTTLENECKS = [
  { id: "manual_entry", label: "Manual Data Entry", desc: "Copying data between PDFs, sheets, or portals", solution: "Structured OCR pipeline parsing documents directly into your primary database in seconds." },
  { id: "spreadsheets", label: "Spreadsheet Overload", desc: "Relying on massive Excel/WhatsApp threads to coordinate work", solution: "Centralized relational CRM and scheduling application with single-source-of-truth tables." },
  { id: "siloed_systems", label: "Disconnected Software", desc: "No automation between standalone applications", solution: "Internal API integrations and automated scheduled event routers." },
  { id: "customer_support", label: "SOP & Knowledge Lookup", desc: "Agents seeking product answers", solution: "Private RAG-enabled knowledge system grounded strictly in your proprietary manuals." }
];

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [selectedBottleneck, setSelectedBottleneck] = React.useState<string | null>(null);
  const [customText, setCustomText] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [step, setStep] = React.useState<"form" | "result">("form");

  const activeBottleneck = BOTTLENECKS.find(b => b.id === selectedBottleneck);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/enquiry@mahvishsadaf.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `Deeproot Operations Inquiry from ${name} (${company || 'No Company'})`,
          name: name,
          email: email,
          company: company || "Not provided",
          bottleneck: activeBottleneck ? activeBottleneck.label : "Custom Operations Review",
          message: customText || "Workflow audit request."
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setStep("result");
      } else {
        alert("Failed to send message. Please try again or email us directly at enquiry@mahvishsadaf.com.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to the mail service. Please try again or email us directly at enquiry@mahvishsadaf.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-[#251b12] bg-[#1a120c]/90 rounded-xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
      {/* Decorative Pixel Mushrooms in the upper corner */}
      <div className="absolute top-4 right-6 flex items-center space-x-1.5 select-none opacity-80 pointer-events-none">
        <PixelMushroom size={18} />
        <PixelMushroom size={12} className="opacity-60" />
      </div>

      {/* Absolute faint grid background for form */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e05_1px,transparent_1px),linear-gradient(to_bottom,#22c55e05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div
            key="contact-form-fields"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Select Bottleneck Pill Grid */}
              <div>
                <label className="block text-xs font-mono font-semibold text-[#22c55e] uppercase tracking-wider mb-3 flex items-center">
                  <span>Identify your primary bottleneck (Optional)</span>
                  <PixelMushroom size={14} className="ml-1.5" animate={true} />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {BOTTLENECKS.map((b) => {
                    const isSelected = selectedBottleneck === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        className={`text-left p-3 rounded-lg border text-xs transition-all duration-250 cursor-pointer ${
                          isSelected
                            ? "border-[#22c55e] bg-[#2f2217]/80 text-[#edfcf1]"
                            : "border-[#251b12] bg-[#1a120c]/30 text-zinc-400 hover:border-[#4a3424] hover:text-zinc-200"
                        }`}
                        onClick={() => setSelectedBottleneck(isSelected ? null : b.id)}
                      >
                        <div className="font-semibold text-zinc-200 mb-0.5 flex items-center justify-between">
                          <span>{b.label}</span>
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />}
                        </div>
                        <div className="text-zinc-500 text-[11px] leading-relaxed">{b.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full h-10 px-3 bg-[#120c08] border border-[#251b12] rounded-md text-sm text-zinc-150 placeholder-zinc-800 focus:outline-hidden focus:border-[#22c55e] transition-colors focus:ring-1 focus:ring-[#22c55e]/25"
                  />
                </div>
                <div>
                  <label htmlFor="company-name" className="block text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Jenkins Logistics"
                    className="w-full h-10 px-3 bg-[#120c08] border border-[#251b12] rounded-md text-sm text-zinc-150 placeholder-zinc-800 focus:outline-hidden focus:border-[#22c55e] transition-colors focus:ring-1 focus:ring-[#22c55e]/25"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="client-email" className="block text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Business Email
                </label>
                <input
                  id="client-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@jenkinslogistics.com"
                  className="w-full h-10 px-3 bg-[#120c08] border border-[#251b12] rounded-md text-sm text-zinc-150 placeholder-zinc-800 focus:outline-hidden focus:border-[#22c55e] transition-colors focus:ring-1 focus:ring-[#22c55e]/25"
                />
              </div>

              {/* Describe operations */}
              <div>
                <label htmlFor="describe-bottleneck" className="block text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Describe what is slow, broken, or manual
                </label>
                <textarea
                  id="describe-bottleneck"
                  rows={3}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Tell us what process occupies your week. What tools are failing to support your workflow?"
                  className="w-full p-3 bg-[#120c08] border border-[#251b12] rounded-md text-sm text-zinc-150 placeholder-zinc-800 focus:outline-hidden focus:border-[#22c55e] transition-colors focus:ring-1 focus:ring-[#22c55e]/25 resize-none"
                />
              </div>

              {/* CTA button */}
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={isSubmitting || !name || !email}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Activity className="h-4 w-4 animate-pulse mr-2 text-zinc-950" />
                    Integrating mail parameters...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="h-4 w-4 mr-2 text-zinc-950" />
                    Start a Conversation
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="contact-results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-left space-y-6"
          >
            {/* Header Success Ring */}
            <div className="flex items-center space-x-3 pb-4 border-b border-[#251b12]">
              <div className="h-10 w-10 rounded-full bg-[#2f2217] border border-[#22c55e] flex items-center justify-center text-[#22c55e]">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-zinc-100 font-semibold text-md">Diagnosis Initiated</h4>
                  <PixelMushroom size={16} />
                </div>
                <p className="text-xs text-zinc-500">Thank you, {name}. Preparing your direct channel mail client parameters.</p>
              </div>
            </div>

            {/* Custom generated architectural diagnosis block */}
            <div className="space-y-4">
              <div className="bg-[#120c08] border border-[#251b12] rounded-lg p-5 font-mono text-xs leading-relaxed text-zinc-400 space-y-3">
                <div className="flex items-center justify-between text-[#22c55e] border-b border-[#251b12] pb-2 mb-2">
                  <span className="text-[10px] tracking-wider uppercase flex items-center">
                    <Terminal className="h-3.5 w-3.5 mr-1" />
                    Draft Architecture Output
                  </span>
                  <span className="text-[10px] bg-[#2f2217] text-[#22c55e] px-2 py-0.5 rounded">Targeting: {company || "Independent Operations"}</span>
                </div>

                <div className="space-y-2">
                  <p>
                    <span className="text-zinc-500">INPUT:</span> &quot;{customText || "Client requested general workflow assessment and technology review."}&quot;
                  </p>
                  
                  {activeBottleneck ? (
                    <>
                      <p>
                        <span className="text-zinc-500 font-mono">BOTTLENECK IDENTIFIED:</span> <span className="text-[#22c55e]">{activeBottleneck.label}</span>
                      </p>
                      <p>
                        <span className="text-[#4ade80] font-mono">PROPOSED ARCHITECTURE SOLUTION:</span>
                        <br />
                        <span className="text-zinc-300 block mt-1 border-l-2 border-[#22c55e] pl-3 italic">
                          {activeBottleneck.solution}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p>
                      <span className="text-zinc-500 font-semibold">PRELIMINARY DIAGNOSIS:</span> Custom operations architecture. We will map your process pipelines, identify data leakage/WhatsApp silos, and build self-hosted custom CRM/automation engines tailored specifically to your exact manual processes.
                    </p>
                  )}

                  <p className="pt-2 text-zinc-500 text-[11px] border-t border-[#14321a] font-sans">
                    * This system blueprint represents our conceptual strategy. Our lead systems architect has been alerted and will send a specific calendar scheduling link directly to <span className="text-[#22c55e] font-mono">{email}</span>.
                  </p>
                </div>
              </div>

              {/* Extra button to repeat or dismiss assessment view */}
              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#14321a] text-zinc-400 hover:bg-[#112415] hover:text-[#22c55e]"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setCompany("");
                    setSelectedBottleneck(null);
                    setCustomText("");
                    setStep("form");
                  }}
                >
                  Configure a new scenario
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
