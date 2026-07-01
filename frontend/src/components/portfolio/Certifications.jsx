import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Award, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS, LEARNING } from "../../data/portfolio";

export default function Certifications() {
  return (
    <div className="space-y-12 relative">
      <div>
        <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">/ 05 · Accreditations</span>
        <h1 className="font-space font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Credentials & Studies
        </h1>
        <p className="text-sm text-zinc-400 font-manrope mt-1">
          Scans of academic completions, virtual experience courses, and ongoing continuous skill pathways.
        </p>
      </div>

      {/* Outlined continuous loop learning marquee */}
      <div className="marquee-mask bg-zinc-950/20 border-y border-white/5 py-4">
        <div className="flex items-center gap-2 mb-4 px-6">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono-code text-[10px] text-cyan-400 uppercase tracking-widest">
            Continuous Stack Enrichment Loop
          </span>
        </div>
        <Marquee gradient={false} speed={35} pauseOnHover>
          {LEARNING.concat(LEARNING).map((item, i) => (
            <div
              key={i}
              className="mx-6 font-space font-bold text-3xl sm:text-4xl tracking-tighter cursor-default select-none"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                color: "transparent",
              }}
            >
              {item} <span className="text-cyan-400/30 mx-4 font-normal">✦</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Accredited Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {CERTIFICATIONS.map((c, i) => (
          <motion.a
            key={i}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ scale: 1.01 }}
            className="group block relative overflow-hidden bg-zinc-950/40 rounded-2xl border border-white/5 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.05)] transition-all flex flex-col sm:flex-row items-stretch"
            data-testid={`cert-${i}`}
          >
            {/* Ticket Left: Details */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono-code text-[9px] text-zinc-500 uppercase tracking-widest">VERIFIED_COMPLETION</span>
                </div>
                <h3 className="font-space font-bold text-sm sm:text-base text-zinc-200 group-hover:text-cyan-300 transition-colors leading-snug">
                  {c.name}
                </h3>
              </div>
              <p className="text-[11px] text-zinc-500 font-manrope">{c.issuer}</p>
            </div>

            {/* Ticket Punch Card Divider (Dotted line separator) */}
            <div className="hidden sm:flex flex-col items-center justify-between py-2 shrink-0 select-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#05050A] -mt-3.5 border-b border-white/5" />
              <div className="h-full border-l border-dashed border-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#05050A] -mb-3.5 border-t border-white/5" />
            </div>

            {/* Ticket Right: Badge */}
            <div className="p-5 w-full sm:w-28 shrink-0 bg-white/[0.01] border-t sm:border-t-0 sm:border-l border-white/5 flex sm:flex-col justify-between items-center sm:items-center text-center font-mono-code text-[11px] gap-2">
              <div className="w-9 h-9 rounded-lg bg-cyan-400/5 border border-cyan-400/10 grid place-items-center group-hover:bg-cyan-400/10 transition-colors">
                <Award className="w-4 h-4 text-cyan-300" />
              </div>
              <div className="flex sm:flex-col sm:items-center gap-3 sm:gap-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">YEAR</span>
                <span className="font-bold text-white px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                  {c.year}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
