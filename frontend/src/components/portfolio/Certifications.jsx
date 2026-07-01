import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { CERTIFICATIONS, LEARNING } from "../../data/portfolio";

export default function Certifications() {
  return (
    <div className="space-y-12 max-w-5xl">
      <div>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">/ 05 · Accreditations</span>
        <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Credentials & Studies
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Verified course completions, virtual experience programs, and continuous professional development.
        </p>
      </div>

      {/* Accredited Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((c, i) => (
          <motion.a
            key={i}
            href={c.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group block bg-[#18181b] rounded-xl border border-[#27272a] hover:border-zinc-700 transition-colors flex flex-col justify-between overflow-hidden shadow-sm"
          >
            <div className="p-5 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#3b82f6]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-mono text-[9px] uppercase tracking-wider">Verified Completion</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#3b82f6] transition-colors leading-snug">
                  {c.name}
                </h3>
              </div>
              <p className="text-xs text-zinc-400">{c.issuer}</p>
            </div>

            {/* Bottom details bar */}
            <div className="px-5 py-3.5 bg-black/20 border-t border-[#27272a] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 uppercase text-[9px]">Year:</span>
                <span className="text-white font-semibold">{c.year}</span>
              </div>
              <span className="flex items-center gap-1 text-[#3b82f6] group-hover:text-white transition-colors">
                <span>View Certificate</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Ongoing Studies & Focus */}
      <div className="border-t border-[#27272a] pt-8 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-zinc-400" />
          <h2 className="font-semibold text-base text-white uppercase tracking-wider text-xs">
            Ongoing Technical Enrichment
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {LEARNING.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-300 font-medium text-xs hover:text-white hover:border-zinc-700 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
