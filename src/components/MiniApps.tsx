import * as React from "react";
import { Calculator, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/src/components/ui/card";

export function EmailCalculator() {
  const [employees, setEmployees] = React.useState(25);
  const [perUserCost, setPerUserCost] = React.useState(6);

  const annualSaaS = employees * perUserCost * 12;
  const triSaaS = annualSaaS * 3;
  const microVpsCost = 5 * 12 * 3; // $5/mo for 3 years
  const savings = triSaaS - microVpsCost;

  return (
    <Card className="bg-zinc-950/60 border-zinc-850 p-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#22c55e]">
          <Calculator size={18} />
          <h3 className="text-base font-semibold text-white">Domain Email Cost Estimator</h3>
        </div>
        <p className="text-xs text-zinc-400 font-normal leading-relaxed">
          Compare paying recurring monthly SaaS seats to Google/Zoho vs. a flat-rate custom private mail server on your own domain (<span className="text-[#a7f3d0]">@yourdomain.com</span>).
        </p>
        
        {/* Sliders */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-zinc-300">
              <span>Employee Mailboxes:</span>
              <span className="text-[#22c55e] font-bold">{employees} users</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="200" 
              value={employees} 
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg cursor-pointer accent-[#22c55e]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-zinc-300">
              <span>Cost Per Mailbox/Month:</span>
              <span className="text-[#22c55e] font-bold">${perUserCost} /mo</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="18" 
              value={perUserCost} 
              onChange={(e) => setPerUserCost(Number(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg cursor-pointer accent-[#22c55e]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-zinc-950 p-3 rounded border border-zinc-900">
            <span className="text-[10px] text-zinc-500 block uppercase font-mono">3-Year Big Tech cost</span>
            <span className="text-md sm:text-lg font-bold text-red-500">${triSaaS.toLocaleString()}</span>
          </div>
          <div className="bg-[#14321a]/20 p-3 rounded border border-[#22c55e]/20">
            <span className="text-[10px] text-green-500 block uppercase font-mono">3-Year Private VPS cost</span>
            <span className="text-md sm:text-lg font-bold text-[#22c55e]">${microVpsCost.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 p-3 rounded text-center border border-zinc-800">
          <span className="text-[11px] text-zinc-405 block font-normal text-zinc-350">Total Budget Saved with Private Deployment</span>
          <span className="text-xl font-extrabold text-[#22c55e] block mt-1 tracking-tight">
            +${savings.toLocaleString()} Saved
          </span>
        </div>
      </div>
    </Card>
  );
}

export function SolarCRMPlayground() {
  const [capacityKw, setCapacityKw] = React.useState(8);
  const [pricePerKw, setPricePerKw] = React.useState(60000);
  const [completedSteps, setCompletedSteps] = React.useState<Record<string, boolean>>({
    booking: true,
    procurement: false,
    discom: false,
    commissioning: false
  });

  const STEPS = [
    { id: "booking", label: "Booking Advance", pct: 15 },
    { id: "procurement", label: "Material Dispatched/Erected", pct: 50 },
    { id: "discom", label: "DISCOM Approvals", pct: 25 },
    { id: "commissioning", label: "Commissioning & Subsidy Log", pct: 10 }
  ];

  const totalProjectPrice = capacityKw * pricePerKw;
  
  let totalReceived = 0;
  STEPS.forEach(step => {
    if (completedSteps[step.id]) {
      totalReceived += (totalProjectPrice * step.pct) / 100;
    }
  });

  const pendingReceivables = totalProjectPrice - totalReceived;

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Card className="bg-zinc-950/60 border-zinc-850 p-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[#22c55e]">
          <Zap size={18} className="text-[#22c55e] fill-[#22c55e]/30" />
          <h3 className="text-base font-semibold text-white">SolarFlow Ledger Simulator</h3>
        </div>
        <p className="text-xs text-zinc-400 font-normal leading-relaxed">
          Play with SolarFlow&apos;s real-time financial tracking rules. Log completed installation milestones to instantly recalculate cash balance details.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-450 block">SYSTEM CAPACITY (kW)</label>
            <input 
              type="number" 
              value={capacityKw} 
              onChange={(e) => setCapacityKw(Math.max(1, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-850 text-xs px-3 py-1.5 rounded focus:outline-hidden focus:border-[#22c55e] text-white font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-zinc-450 block">PRICE PER kW (INR)</label>
            <input 
              type="number" 
              value={pricePerKw} 
              onChange={(e) => setPricePerKw(Math.max(1000, Number(e.target.value)))}
              className="w-full bg-zinc-950 border border-zinc-850 text-xs px-3 py-1.5 rounded focus:outline-hidden focus:border-[#22c55e] text-white font-mono"
            />
          </div>
        </div>

        {/* Installment stages check list */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono text-zinc-500 block uppercase">Log Milestone Payments Status</span>
          <div className="space-y-2">
            {STEPS.map(step => (
              <div 
                key={step.id} 
                onClick={() => toggleStep(step.id)}
                className={`flex items-center justify-between p-2.5 rounded border cursor-pointer select-none transition-all ${
                  completedSteps[step.id] 
                    ? "border-[#22c55e]/40 bg-[#14321a]/20 text-white" 
                    : "border-zinc-900 bg-zinc-950/40 text-zinc-500"
                }`}
              >
                <div className="flex items-center space-x-2.5 text-xs">
                  <div className={`h-4 w-4 rounded-sm border flex items-center justify-center transition-all ${completedSteps[step.id] ? "bg-[#22c55e] border-[#22c55e]" : "border-zinc-850"}`}>
                    {completedSteps[step.id] && <CheckCircle2 className="h-3 w-3 text-black fill-black" />}
                  </div>
                  <span>{step.label}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-zinc-300">{step.pct}% (₹{((totalProjectPrice * step.pct) / 100).toLocaleString()})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-905 pt-5 space-y-2.5 font-mono text-xs">
        <div className="flex justify-between text-zinc-400">
          <span>Total Project Revenue:</span>
          <span className="text-white font-bold">₹{totalProjectPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-[#22c55e] font-semibold bg-[#14321a]/10 px-2 py-1 rounded">
          <span>Total Received Balance:</span>
          <span>₹{totalReceived.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-emerald-400/85 px-2 py-1">
          <span>Pending Receivables:</span>
          <span>₹{pendingReceivables.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}

export function MiniAppsView() {
  return (
    <div className="w-full space-y-10">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-[#14321a]/30 border border-[#14321a] rounded-full px-3 py-1 mb-2">
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-green-300 font-bold">
            Sandboxed Prototypes
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Interactive Operational Tools</h2>
        <p className="text-sm text-zinc-400">
          We believe in proving functionality. Test drive some miniature interactive calculators representing the bespoke solutions we design and deploy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <EmailCalculator />
        <SolarCRMPlayground />
      </div>
    </div>
  );
}
