import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Award, BookOpen, ExternalLink } from "lucide-react";
import { CERTIFICATIONS, LEARNING } from "../../data/portfolio";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      data-testid="certifications-section"
    >
      <div className="max-w-7xl mx-auto">
        {/* Learning marquee */}
        <div className="mb-24 marquee-mask">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
              Currently Learning
            </span>
          </div>
          <Marquee gradient={false} speed={40} pauseOnHover>
            {LEARNING.concat(LEARNING).map((item, i) => (
              <div
                key={i}
                className="mx-4 font-space font-bold text-4xl md:text-6xl tracking-tighter"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                  color: "transparent",
                }}
              >
                {item} <span className="text-cyan-400/60 mx-3">✦</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 05 · Credentials
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter mt-3">
            <span className="text-gradient-cyan-purple">Certifications</span> &amp; Achievements
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((c, i) => (
            <motion.a
              key={i}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ x: 6 }}
              className="group glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-400/40 transition-colors"
              data-testid={`cert-${i}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 grid place-items-center border border-white/10 shrink-0">
                <Award className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-space font-semibold text-white leading-tight group-hover:text-cyan-300 transition-colors">
                  {c.name}
                </h3>
                <p className="text-sm text-zinc-500 font-manrope mt-0.5">{c.issuer}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono-code text-xs text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5">
                  {c.year}
                </span>
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
