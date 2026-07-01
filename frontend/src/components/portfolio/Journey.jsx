import React from "react";
import { motion } from "framer-motion";
import { JOURNEY } from "../../data/portfolio";

export default function Journey() {
  return (
    <section
      id="journey"
      className="relative py-24 md:py-32 px-6 md:px-12"
      data-testid="journey-section"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 03 · Journey
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter mt-3">
            Learning &amp; <span className="text-gradient-cyan-purple">Growth</span> Journey
          </h2>
          <p className="mt-4 text-zinc-400 font-manrope text-lg">
            Not just years — milestones. Every step forward has been a data point in itself.
          </p>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-transparent" />

          {JOURNEY.map((j, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative pb-12 last:pb-0"
              data-testid={`journey-item-${i}`}
            >
              <div className="absolute -left-[26px] md:-left-[34px] top-1 w-4 h-4 rounded-full bg-[#05050A] border-2 border-cyan-400 shadow-[0_0_15px_#00F0FF]" />
              <div className="glass-card rounded-2xl p-6 hover:border-cyan-400/40 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono-code text-xs text-cyan-300 uppercase tracking-widest">
                    {j.year}
                  </span>
                  <span className="h-[1px] flex-1 bg-white/10" />
                </div>
                <h3 className="font-space font-semibold text-2xl text-white">{j.title}</h3>
                <p className="mt-2 text-zinc-400 font-manrope leading-relaxed">{j.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
