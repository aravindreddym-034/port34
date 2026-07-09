import React from "react";
import { motion } from "framer-motion";
import { Database, Code, Library, Brain, BarChart2, BookOpen, Settings } from "lucide-react";
import { SKILL_GROUPS } from "../../data/portfolio";

const iconMap = {
  "Databases": Database,
  "SQL Mastery": Code,
  "Python Stack": Library,
  "Data Analytics": BarChart2,
  "Machine Learning": Brain,
  "Statistics": BookOpen,
  "Business Intelligence": BarChart2,
  "Tools": Settings
};

const getSkillIcon = (name) => {
  const normalized = name.toLowerCase().trim();
  
  const deviconMap = {
    python: "python/python-original.svg",
    mysql: "mysql/mysql-original.svg",
    postgresql: "postgresql/postgresql-original.svg",
    sqlite: "sqlite/sqlite-original.svg",
    "oracle sql": "oracle/oracle-original.svg",
    pandas: "pandas/pandas-original.svg",
    numpy: "numpy/numpy-original.svg",
    "scikit-learn": "scikitlearn/scikitlearn-original.svg",
    git: "git/git-original.svg",
    github: "github/github-original.svg",
    jupyter: "jupyter/jupyter-original.svg",
    "vs code": "vscode/vscode-original.svg",
    docker: "docker/docker-original.svg",
    linux: "linux/linux-original.svg",
  };

  if (deviconMap[normalized]) {
    return (
      <img 
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconMap[normalized]}`} 
        alt={name} 
        className="w-4 h-4 shrink-0 object-contain" 
      />
    );
  }

  if (normalized === "excel" || normalized === "pivot tables") {
    return (
      <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    );
  }

  if (normalized === "power bi" || normalized === "power query" || normalized === "dax") {
    return (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="4" height="6" rx="0.5" fill="#F2C811" />
        <rect x="10" y="8" width="4" height="12" rx="0.5" fill="#E29C10" />
        <rect x="17" y="3" width="4" height="17" rx="0.5" fill="#D4730A" />
      </svg>
    );
  }

  return (
    <svg className="w-3 h-3 text-zinc-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

export default function Skills() {
  const stackGroups = SKILL_GROUPS.filter(g => 
    ["Databases", "Python Stack", "Business Intelligence", "Tools"].includes(g.title)
  );
  
  const conceptGroups = SKILL_GROUPS.filter(g => 
    ["SQL Mastery", "Data Analytics", "Machine Learning", "Statistics"].includes(g.title)
  );

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">/ 03 · Skills & Capabilities</span>
        <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Technical Skills & Toolkit
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          A structured layout of my technical stack and conceptual database expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Stack & Tools */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-2">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">01 · Platforms, Langs & Tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stackGroups.map((group, idx) => {
              const Icon = iconMap[group.title] || Code;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className="bg-[#18181b] rounded-xl p-5 border border-[#27272a] flex flex-col gap-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2 pb-1.5 border-b border-[#27272a]">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <h3 className="font-semibold text-xs text-white uppercase tracking-wider">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#27272a] text-zinc-300 font-mono text-[10px] hover:text-white transition-colors"
                      >
                        {getSkillIcon(item)}
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Concepts & Methodologies */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-[#27272a] pb-2">
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider">02 · Methodologies & Frameworks</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conceptGroups.map((group, idx) => {
              const Icon = iconMap[group.title] || Code;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 + 0.1 }}
                  className="bg-[#18181b] rounded-xl p-5 border border-[#27272a] flex flex-col gap-3.5 shadow-sm"
                >
                  <div className="flex items-center gap-2 pb-1.5 border-b border-[#27272a]">
                    <Icon className="w-4 h-4 text-zinc-400" />
                    <h3 className="font-semibold text-xs text-white uppercase tracking-wider">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#27272a] text-zinc-300 font-mono text-[10px] hover:text-white transition-colors"
                      >
                        {getSkillIcon(item)}
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
