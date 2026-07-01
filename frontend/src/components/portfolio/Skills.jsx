import React from "react";
import { motion } from "framer-motion";
import { SKILL_GROUPS } from "../../data/portfolio";
import SkillSphere from "./SkillSphere";

const accentMap = {
  cyan: "hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]",
  purple: "hover:border-purple-400/60 hover:text-purple-300 hover:shadow-[0_0_20px_rgba(123,44,191,0.15)]",
  blue: "hover:border-blue-400/60 hover:text-blue-300 hover:shadow-[0_0_20px_rgba(0,122,255,0.15)]",
};

const dotMap = {
  cyan: "bg-cyan-400 shadow-[0_0_10px_#00F0FF]",
  purple: "bg-purple-400 shadow-[0_0_10px_#7B2CBF]",
  blue: "bg-blue-400 shadow-[0_0_10px_#007AFF]",
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      data-testid="skills-section"
    >
      <SkillSphere />
      <div className="aurora-blob w-[500px] h-[500px] bg-cyan-500/20 top-20 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 02 · Toolbox
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter mt-3">
            The stack that <span className="text-gradient-cyan-purple">powers</span> my analysis.
          </h2>
          <p className="mt-4 text-zinc-400 font-manrope text-lg">
            From raw queries to shipped dashboards — a curated toolkit refined through practice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="glass-card rounded-2xl p-5 flex flex-col gap-4"
              data-testid={`skill-group-${group.title.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotMap[group.accent]}`} />
                <h3 className="font-space font-semibold text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono-code text-[11px] text-zinc-300 transition-all cursor-default ${
                      accentMap[group.accent]
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
