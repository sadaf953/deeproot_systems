import * as React from "react";
import { BookOpen, ArrowRight, Shield, Globe, Award } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/src/components/ui/card";

export function BlogsView() {
  const BLOGS = [
    {
      id: 1,
      date: "01 June 2026",
      readTime: "5 min read",
      icon: Shield,
      title: "The SaaS Trap: Why Renting Your Pipelines Costs 10x More",
      description: "Paying per-user monthly SaaS subscriptions to execute key business spreadsheets or CRM files looks cheap early on. But as your team expands, this per-mailbox billing model turns into an expensive, unyielding tax. We explore how dedicated Dockerized applications deployed natively on flat-rate VPS plans run beautifully for years at zero additional platform cost.",
      tag: "Business Continuity"
    },
    {
      id: 2,
      date: "25 May 2026",
      readTime: "8 min read",
      icon: Globe,
      title: "Zero-SaaS Custom Email: Autonomy Without Big Tech Subscriptions",
      description: "Google Workspace and Zoho have normalized charging custom domain owners per mailbox, month after month, just to host text-based mail headers (@yourdomain.com). We show how we configure lightweight, spam-compliant, secure mailer relays directly on private instances to give your business unlimited custom email folders at flat infrastructure costs.",
      tag: "Autonomous Infrastructure"
    },
    {
      id: 3,
      date: "14 May 2026",
      readTime: "10 min read",
      icon: Award,
      title: "Streamlining the Suryaghar Subsidy Pipeline: SolarFlow Architecture",
      description: "Indian solar installers operate in an incredibly specialized, document-heavy landscape. Between PM Suryaghar subsidy checks, DISCOM utility submission stages, and LT-1/LT-2 meter requests, coordination failures delay disbursal by months. This article details the database entity relationship models we engineered to automate tracking installment states.",
      tag: "Solar Logistics"
    }
  ];

  return (
    <div className="w-full space-y-12">
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-[#14321a]/30 border border-[#14321a] rounded-full px-3 py-1 mb-2">
          <BookOpen size={13} className="text-[#22c55e]" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-green-300 font-bold">
            Systems Correspondence
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">Operational Architecture Log</h2>
        <p className="text-sm text-zinc-400">
          Deep dives, design principles, and technical strategies for businesses aiming for full software utility and database custody.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        {BLOGS.map(blog => {
          const IconComponent = blog.icon;
          return (
            <Card 
              key={blog.id} 
              className="bg-zinc-950/60 border-zinc-850 p-6 flex flex-col justify-between hover:border-[#22c55e]/50 transition-all duration-350 relative group overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#22c55e] uppercase tracking-wider">{blog.tag}</span>
                  <span className="text-[10px] font-mono text-zinc-550">{blog.readTime}</span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-100 group-hover:text-[#22c55e] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500 block">{blog.date}</span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-normal line-clamp-5">
                  {blog.description}
                </p>
              </div>

              <div className="border-t border-zinc-900 pt-4 mt-6 flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2 text-zinc-500">
                  <IconComponent size={14} className="text-zinc-500" />
                  <span className="text-[10px] font-mono">[DP_SYS_LOG_0{blog.id}]</span>
                </div>
                <span className="text-[#22c55e] flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform cursor-pointer">
                  Read Article <ArrowRight size={12} />
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
