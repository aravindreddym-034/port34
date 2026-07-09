import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  LineChart 
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PROFILE, STATS } from "../../data/portfolio";
import ParticleField from "./ParticleField";

const radarData = [
  { subject: 'SQL / DBs', value: 95 },
  { subject: 'Python Stack', value: 85 },
  { subject: 'Power BI', value: 90 },
  { subject: 'Data Viz', value: 88 },
  { subject: 'ML & Modeling', value: 78 },
  { subject: 'Statistics', value: 82 },
];

export default function Overview() {
  return (
    <div className="relative space-y-12 max-w-5xl">
      {/* Space particle background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[450px]">
        <ParticleField />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column: Typographic Details */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#18181b] border border-[#27272a] text-xs text-[#3b82f6] w-fit"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to transform data</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-bold tracking-tight text-2xl sm:text-4xl lg:text-5xl text-white whitespace-nowrap">
                Hi, I'm {PROFILE.name}
              </h1>
              
              {/* Tagline formatted as neat labels */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PROFILE.tagline.split(" · ").map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-zinc-300 font-mono text-[10px] uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl"
          >
            {PROFILE.description} I specialize in translating complex relational databases and unstructured datasets into actionable dashboards, models, and analytics pipelines.
          </motion.p>

          {/* Stats inline metrics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-y border-[#27272a] max-w-xl"
          >
            {STATS.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="text-2xl font-bold text-white leading-none">
                  {s.value}{s.suffix}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-[#3b82f6] font-mono leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Actions & Socials unified toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors"
            >
              Analyze Projects
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181b] border border-[#27272a] font-medium text-sm text-white hover:bg-[#27272a] transition-colors"
            >
              Get in Touch
              <Mail className="w-4 h-4" />
            </a>

            <div className="h-6 w-px bg-[#27272a] hidden sm:block" />

            <div className="flex items-center gap-2">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 grid place-items-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 grid place-items-center rounded-lg bg-[#18181b] border border-[#27272a] text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Skill Matrix Visualizer & Avatar Panel */}
        <div className="md:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#18181b] rounded-xl p-5 border border-[#27272a] shadow-sm"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-[#3b82f6]" />
                <span className="font-semibold text-xs text-zinc-200 uppercase tracking-wider">Analytical Skill Matrix</span>
              </div>
            </div>

            {/* Recharts Radar Chart */}
            <div className="h-[220px] w-full flex items-center justify-center font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#27272a" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#a1a1aa', fontSize: 10 }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: '#52525b', fontSize: 8 }} 
                  />
                  <Radar 
                    name="Skills" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.1} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Minimal Floating Avatar & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-[#18181b] rounded-xl p-4 border border-[#27272a] flex items-center gap-4 shadow-sm"
          >
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#27272a]">
              <img 
                src={PROFILE.avatar} 
                alt="Aravind Reddy Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-400 text-xs sm:text-sm italic leading-relaxed">
                "Data is only useful when it's <span className="text-white font-semibold">understood, felt, and acted on.</span>"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
