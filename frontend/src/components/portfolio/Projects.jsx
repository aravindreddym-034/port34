import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../../data/portfolio";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 px-6 md:px-12"
      data-testid="projects-section"
    >
      <div className="aurora-blob w-[600px] h-[600px] bg-purple-600/20 top-20 -right-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 04 · Featured Work
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter mt-3">
            Selected <span className="text-gradient-cyan-purple">Projects</span>
          </h2>
          <p className="mt-4 text-zinc-400 font-manrope text-lg">
            A curated set of case studies — from raw SQL to polished, interactive dashboards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative glass-card rounded-3xl overflow-hidden flex flex-col ${p.span}`}
              data-testid={`project-card-${i}`}
            >
              <div className="relative overflow-hidden h-52">
                <motion.img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono-code text-[10px] text-cyan-300 uppercase tracking-widest">
                  {p.category}
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4 flex-1">
                <h3 className="font-space font-semibold text-xl md:text-2xl text-white">
                  {p.title}
                </h3>
                <p className="text-zinc-400 font-manrope text-sm leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.02] font-mono-code text-[10px] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <a
                    href={p.github}
                    className="inline-flex items-center gap-1.5 text-xs font-space text-zinc-400 hover:text-cyan-300 transition-colors"
                    data-testid={`project-github-${i}`}
                  >
                    <Github size={14} /> Code
                  </a>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <a
                    href={p.demo}
                    className="inline-flex items-center gap-1.5 text-xs font-space text-zinc-400 hover:text-purple-300 transition-colors"
                    data-testid={`project-demo-${i}`}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
