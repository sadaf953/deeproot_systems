// Tap-to-play: move one solar customer through SolarFlow. Each tap advances a stage,
// sparkles burst from the tap point and a short line about what the software does pops out.
import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  UserPlus, Ruler, FileText, Landmark, Truck, Wrench, Zap, BadgeIndianRupee, Sparkles, RotateCcw, ArrowUpRight, Hand,
} from "lucide-react";

const STAGES = [
  { icon: UserPlus, name: "New lead", line: "Just a name and a phone number to start" },
  { icon: Ruler, name: "Site survey", line: "System size worked out from panel count" },
  { icon: FileText, name: "Quotation", line: "Proposal PDF with savings, subsidy and GST" },
  { icon: Landmark, name: "Loan", line: "Loan tracked on its own dated track" },
  { icon: Truck, name: "Delivery", line: "Truck loading sheet, stock deducted on delivery" },
  { icon: Wrench, name: "Installation", line: "Each partner sees only their own work" },
  { icon: Zap, name: "Grid connected", line: "DISCOM and meter steps, one at a time" },
  { icon: BadgeIndianRupee, name: "Subsidy received", line: "PM Surya Ghar subsidy tracked to the end" },
];

const SPARKS = 12;

type Burst = { id: number; x: number; y: number };

export function PipelinePlay({ demoUrl }: { demoUrl: string }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = React.useState(-1); // -1 = not started
  const [bursts, setBursts] = React.useState<Burst[]>([]);
  const padRef = React.useRef<HTMLButtonElement>(null);
  const done = stage === STAGES.length - 1;

  const advance = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (done) return;
    setStage((s) => Math.min(s + 1, STAGES.length - 1));
    if (reduce) return;
    const rect = padRef.current?.getBoundingClientRect();
    if (!rect) return;
    let x = rect.width / 2;
    let y = rect.height / 2;
    // Keyboard presses arrive as clicks with detail 0; burst from the centre for those
    if (e.detail > 0) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x, y }]);
    window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 900);
  };

  const reset = () => {
    setStage(-1);
    setBursts([]);
  };

  const current = stage >= 0 ? STAGES[stage] : null;
  const CurrentIcon = current?.icon ?? Hand;

  return (
    <div className="rounded-3xl border border-[#14321a] bg-gradient-to-br from-[#0d170f]/70 via-zinc-950 to-zinc-950 p-5 sm:p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Copy */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-sm font-semibold text-[#22c55e]">Try it</div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Move a solar customer from lead to subsidy.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Tap the card to push one project through SolarFlow, the CRM we built for solar installers. Every tap is a
            stage, and every stage is something the software handles for the team.
          </p>
        </div>

        {/* Play area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Track */}
          <ol className="relative flex items-center justify-between" aria-label="Project stages">
            <div className="absolute left-3 right-3 top-1/2 -mt-px h-0.5 bg-zinc-850 rounded-full" />
            <motion.div
              className="absolute left-3 right-3 top-1/2 -mt-px h-0.5 origin-left bg-[#22c55e] rounded-full shadow-[0_0_10px_#22c55e]"
              initial={false}
              animate={{ scaleX: stage <= 0 ? 0 : stage / (STAGES.length - 1) }}
              transition={{ type: "spring", damping: 22, stiffness: 140 }}
            />
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const reached = i <= stage;
              const isNow = i === stage;
              return (
                <li key={s.name} className="relative z-10" aria-current={isNow ? "step" : undefined}>
                  <motion.div
                    className={`h-7 w-7 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border transition-colors ${
                      reached ? "bg-[#14321a] border-[#22c55e] text-[#22c55e]" : "bg-zinc-950 border-zinc-800 text-zinc-600"
                    }`}
                    animate={isNow && !reduce ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.45 }}
                    title={s.name}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </motion.div>
                  <span className="sr-only">{s.name}{reached ? " (done)" : ""}</span>
                </li>
              );
            })}
          </ol>

          {/* Tap pad */}
          <div className="relative">
            <motion.button
              ref={padRef}
              type="button"
              onClick={advance}
              disabled={done}
              whileTap={done || reduce ? undefined : { scale: 0.97 }}
              className={`relative w-full overflow-hidden rounded-2xl border p-6 sm:p-8 text-left select-none touch-manipulation transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] ${
                done
                  ? "border-[#22c55e]/70 bg-[#14321a]/40 cursor-default"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-[#22c55e]/60 cursor-pointer"
              }`}
              aria-label={done ? "Project complete" : current ? `Move to ${STAGES[stage + 1].name}` : "Start a new project"}
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <motion.div
                  key={stage}
                  className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center"
                  initial={reduce ? false : { rotate: -12, scale: 0.7 }}
                  animate={stage === -1 && !reduce ? { y: [0, -4, 0] } : { rotate: 0, scale: 1 }}
                  transition={stage === -1 ? { repeat: Infinity, duration: 1.6 } : { type: "spring", damping: 12, stiffness: 220 }}
                >
                  <CurrentIcon className="h-7 w-7 text-[#22c55e]" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-zinc-500">
                    {current ? `Stage ${stage + 1} of ${STAGES.length}` : "Example customer: 3 kW rooftop"}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                    {current ? current.name : "Tap to start a project"}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {done ? "Project complete" : current ? `Tap for ${STAGES[stage + 1].name.toLowerCase()}` : "One tap per stage"}
                  </div>
                </div>
              </div>

              {/* Sparkle bursts */}
              {bursts.map((b) => (
                <span key={b.id} className="pointer-events-none absolute" style={{ left: b.x, top: b.y }} aria-hidden>
                  {Array.from({ length: SPARKS }).map((_, i) => {
                    const angle = (i / SPARKS) * Math.PI * 2;
                    const dist = 40 + (i % 3) * 18;
                    return (
                      <motion.span
                        key={i}
                        className={`absolute block rounded-full ${i % 2 ? "h-1.5 w-1.5 bg-[#22c55e]" : "h-1 w-1 bg-amber-300"}`}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.4 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    );
                  })}
                </span>
              ))}
            </motion.button>

            {/* Popping line */}
            <div className="min-h-[3.5rem] mt-4 flex items-center" aria-live="polite">
              <AnimatePresence mode="popLayout">
                {current && (
                  <motion.div
                    key={stage}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14, scale: 0.95 }}
                    transition={{ type: "spring", damping: 16, stiffness: 240 }}
                    className="inline-flex items-center gap-2 rounded-full border border-[#14321a] bg-[#14321a]/40 px-4 py-2 text-sm text-green-200"
                  >
                    <Sparkles className="h-4 w-4 text-[#22c55e] shrink-0" />
                    {current.line}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Finish */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: reduce ? 0 : 0.35 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-zinc-850 bg-zinc-950/60 p-5"
              >
                <div>
                  <div className="font-display text-lg font-bold text-white">Lead to subsidy, all in one place.</div>
                  <div className="text-xs text-zinc-400 mt-1">The real system has 14 stages. We build the same way for your business.</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 sm:flex-none justify-center whitespace-nowrap inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-zinc-800 text-sm text-zinc-300 hover:border-[#22c55e]/60 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Play again
                  </button>
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none justify-center whitespace-nowrap inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-[#22c55e] text-sm font-semibold text-zinc-950 hover:bg-[#16a34a]"
                  >
                    Try the demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
