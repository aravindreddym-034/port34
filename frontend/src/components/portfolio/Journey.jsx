import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Settings, CheckCircle2, ChevronRight } from "lucide-react";
import { JOURNEY } from "../../data/portfolio";

const pipelineStages = [
  {
    phase: "PHASE_01",
    status: "COMPLETE",
    progress: 100,
    metrics: ["Excel Core: 100%", "SQL SELECT: 100%"]
  },
  {
    phase: "PHASE_02",
    status: "COMPLETE",
    progress: 100,
    metrics: ["Pandas EDA: 95%", "Stats Hypotheses: 85%"]
  },
  {
    phase: "PHASE_03",
    status: "COMPLETE",
    progress: 100,
    metrics: ["DAX Queries: 90%", "Power Query: 95%"]
  },
  {
    phase: "PHASE_04",
    status: "COMPLETE",
    progress: 100,
    metrics: ["ML Models: 80%", "Query Tuning: 90%"]
  },
  {
    phase: "PHASE_05",
    status: "PROCESSING",
    progress: 85,
    metrics: ["Vite SPA: 90%", "ETL Automation: 85%"]
  }
];

export default function Journey() {
  return (
    <div className="space-y-8 relative">
      <div>
        <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">/ 04 · Progression Pipeline</span>
        <h1 className="font-space font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Learning & Growth Journey
        </h1>
        <p className="text-sm text-zinc-400 font-manrope mt-1">
          Chronological milestone tracker designed as a multi-stage Data Processing Pipeline.
        </p>
      </div>

      {/* Horizontal Pipeline Steps Overview (Desktop-only) */}
      <div className="hidden lg:grid grid-cols-5 gap-4 bg-zinc-950/40 border border-white/5 p-5 rounded-2xl">
        {JOURNEY.map((j, i) => {
          const stage = pipelineStages[i];
          const isActive = stage.status === "PROCESSING";
          return (
            <div key={i} className="space-y-2 relative font-mono-code text-[11px]">
              {i < JOURNEY.length - 1 && (
                <div className="absolute top-2 right-0 translate-x-1/2 text-zinc-700 z-10">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="flex justify-between items-center text-zinc-500">
                <span>{stage.phase}</span>
                <span className={isActive ? "text-cyan-400 animate-pulse font-bold" : "text-emerald-400 font-bold"}>
                  {stage.status}
                </span>
              </div>
              <h3 className="font-space font-bold text-zinc-200 text-xs truncate">{j.title.split(" ").slice(0, 3).join(" ")}...</h3>
              <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stage.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  className={`h-full ${isActive ? 'bg-cyan-400 shadow-[0_0_8px_#00F0FF]' : 'bg-emerald-400'}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical Pipeline timeline entries */}
      <div className="relative pl-8 md:pl-12 max-w-4xl">
        {/* Glowing Pipeline Connector Line */}
        <div className="absolute left-[13px] md:left-[17px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-600" />

        <div className="space-y-8">
          {JOURNEY.map((j, i) => {
            const stage = pipelineStages[i];
            const isComplete = stage.status === "COMPLETE";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                {/* Custom pipeline node icon indicator */}
                <div className={`absolute -left-[27px] md:-left-[35px] top-1.5 w-6 h-6 rounded-full bg-[#05050A] border-2 flex items-center justify-center ${
                  isComplete 
                    ? 'border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.3)]' 
                    : 'border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                }`}>
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                  )}
                </div>

                {/* Milestone Detail Card */}
                <div className="glass-card rounded-2xl p-5 border border-white/5 hover:border-cyan-400/30 transition-colors flex flex-col md:flex-row gap-5 items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[11px] text-cyan-300 bg-cyan-400/5 px-2 py-0.5 rounded border border-cyan-400/10">
                        {j.year}
                      </span>
                      <span className="font-mono-code text-[10px] text-zinc-500 uppercase tracking-widest">{stage.phase}</span>
                    </div>
                    
                    <h3 className="font-space font-bold text-lg text-white">
                      {j.title}
                    </h3>
                    <p className="text-sm text-zinc-400 font-manrope leading-relaxed">
                      {j.desc}
                    </p>
                  </div>

                  {/* Right side metrics display */}
                  <div className="w-full md:w-48 shrink-0 bg-zinc-950/40 border border-white/5 rounded-xl p-3.5 font-mono-code text-[10px] space-y-2">
                    <span className="text-zinc-500 block uppercase tracking-wider">Metrics Achieved</span>
                    <div className="space-y-1.5">
                      {stage.metrics.map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center text-zinc-300">
                          <span className="truncate">{m.split(":")[0]}</span>
                          <span className="text-cyan-400 font-bold">{m.split(":")[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
