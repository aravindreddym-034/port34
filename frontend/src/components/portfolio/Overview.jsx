import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  FileText, 
  Sparkles, 
  Database,
  Terminal,
  Layers,
  LineChart
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import ParticleField from "./ParticleField";
import { PROFILE, TYPING_ROLES, STATS } from "../../data/portfolio";

function TypingRoles() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPING_ROLES[i];
    let timeout;
    if (!deleting && text === full) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((i + 1) % TYPING_ROLES.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) => (deleting ? prev.slice(0, -1) : full.slice(0, prev.length + 1)));
        },
        deleting ? 40 : 80
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i]);

  return (
    <span className="font-space font-semibold">
      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span className="inline-block w-[2px] h-[0.9em] align-middle ml-1 bg-cyan-400 animate-pulse" />
    </span>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const step = (t) => {
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
      else setN(value);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const radarData = [
  { subject: 'SQL / DBs', value: 95, fullMark: 100 },
  { subject: 'Python Stack', value: 85, fullMark: 100 },
  { subject: 'Power BI', value: 90, fullMark: 100 },
  { subject: 'Data Viz', value: 88, fullMark: 100 },
  { subject: 'ML & Modeling', value: 78, fullMark: 100 },
  { subject: 'Statistics', value: 82, fullMark: 100 },
];

export default function Overview() {
  return (
    <div className="relative space-y-12">
      {/* Dynamic Background particles limited to parent scope */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <ParticleField />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Typographic Details */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card font-mono-code text-[11px] text-cyan-300 border border-cyan-400/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to transform data</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-space font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Hi, I&rsquo;m <span className="text-gradient-cyan-purple">Aravind Reddy M</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-zinc-300 font-space font-medium">
              Data Analyst specialized in <TypingRoles />
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-zinc-400 leading-relaxed font-manrope max-w-xl"
          >
            {PROFILE.description} I specialize in translating complex relational databases and unstructured datasets into actionable dashboards, models, and analytics pipelines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            <a
              href="#projects"
              className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-space font-medium text-sm hover:scale-[1.02] transition-transform"
            >
              Analyze Projects
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#skills"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card border border-white/5 font-space font-medium text-sm text-white hover:border-cyan-400/30 transition-colors"
            >
              SQL Playground
              <Terminal className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 font-space font-medium text-sm text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
            >
              Get in Touch
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3 pt-2"
          >
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 grid place-items-center rounded-xl glass-card border border-white/5 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 grid place-items-center rounded-xl glass-card border border-white/5 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="w-10 h-10 grid place-items-center rounded-xl glass-card border border-white/5 text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Skill Matrix Visualizer & Avatar Panel */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card rounded-2xl p-5 border border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <LineChart className="w-4 h-4 text-cyan-400" />
                <span className="font-space font-semibold text-xs text-zinc-200 uppercase tracking-wider">Analytical Skill Matrix</span>
              </div>
              <span className="font-mono-code text-[10px] text-zinc-500">Radar_v1.0</span>
            </div>

            {/* Recharts Radar Chart */}
            <div className="h-[220px] w-full flex items-center justify-center font-mono-code text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10, fontFamily: 'monospace' }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8 }} 
                  />
                  <Radar 
                    name="Skills" 
                    dataKey="value" 
                    stroke="#00F0FF" 
                    fill="#00F0FF" 
                    fillOpacity={0.15} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Minimal Floating Avatar & Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="glass-card rounded-2xl p-4 border border-white/5 flex items-center gap-4 relative overflow-hidden"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 glow-cyan">
              <img 
                src={PROFILE.avatar} 
                alt="Aravind Reddy Avatar" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-zinc-300 font-manrope text-sm italic leading-relaxed">
                &ldquo;Data is only useful when it&rsquo;s <span className="text-cyan-300 font-semibold">understood, felt, and acted on.</span>&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Counter Section (Moved from old About component) */}
      <div className="relative z-10 pt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl p-5 border border-white/5 flex flex-col justify-between"
              data-testid={`stat-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
            >
              <div className="font-space font-bold text-3xl sm:text-4xl text-gradient-cyan-purple leading-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500 mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
