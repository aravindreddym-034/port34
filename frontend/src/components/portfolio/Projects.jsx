import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, BarChart3 } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart as ReLineChart, 
  Line, 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import { PROJECTS } from "../../data/portfolio";

const sqlChartData = [
  { month: "Jan", Cohort_A: 100, Cohort_B: 100 },
  { month: "Feb", Cohort_A: 85, Cohort_B: 80 },
  { month: "Mar", Cohort_A: 72, Cohort_B: 68 },
  { month: "Apr", Cohort_A: 65, Cohort_B: 54 },
  { month: "May", Cohort_A: 60, Cohort_B: 48 },
  { month: "Jun", Cohort_A: 58, Cohort_B: 45 },
];

const powerbiChartData = [
  { region: "East", revenue: 42000, targets: 40000 },
  { region: "West", revenue: 51000, targets: 48000 },
  { region: "Central", revenue: 38000, targets: 42000 },
  { region: "South", revenue: 29000, targets: 30000 },
];

const churnChartData = [
  { feature: "Contract Type", importance: 92 },
  { feature: "Tenure Month", importance: 85 },
  { feature: "Tech Support", importance: 74 },
  { feature: "Monthly Charges", importance: 62 },
  { feature: "Payment Method", importance: 41 },
];

const edaChartData = [
  { category: "Tech", sales: 85000, profit: 14500 },
  { category: "Supplies", sales: 62000, profit: 8900 },
  { category: "Furniture", sales: 74000, profit: 2100 },
];

const statsChartData = [
  { day: "Day 1", Control: 120, Variant: 130 },
  { day: "Day 2", Control: 125, Variant: 142 },
  { day: "Day 3", Control: 118, Variant: 145 },
  { day: "Day 4", Control: 132, Variant: 158 },
  { day: "Day 5", Control: 128, Variant: 162 },
];

const pipelineChartData = [
  { step: "Raw Ingest", duration: 120 },
  { step: "SQL Trans", duration: 45 },
  { step: "Python Proc", duration: 75 },
  { step: "BI Refresh", duration: 15 },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ["All", "SQL", "Python", "Power BI", "Machine Learning", "Statistics"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase()) || 
           p.tech.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  const renderProjectChart = (projectTitle) => {
    const tooltipStyle = { background: "#18181b", border: "1px solid #27272a", fontSize: 10, color: "#f4f4f5" };
    switch (projectTitle) {
      case "SQL Business Analysis":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Cohort Retention Analysis (%)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReLineChart data={sqlChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" tick={{ fontSize: 9 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="Cohort_A" stroke="#3b82f6" strokeWidth={2} name="Cohort A" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="Cohort_B" stroke="#94a3b8" strokeWidth={2} name="Cohort B" dot={{ r: 2 }} />
              </ReLineChart>
            </ResponsiveContainer>
          </div>
        );
      case "Power BI Sales Dashboard":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Sales Performance vs Targets ($)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={powerbiChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="region" stroke="#71717a" tick={{ fontSize: 9 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Actual" />
                <Bar dataKey="targets" fill="#52525b" radius={[2, 2, 0, 0]} name="Target" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Customer Churn Prediction":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">SHAP Feature Importance (Weights)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={churnChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis type="number" stroke="#71717a" tick={{ fontSize: 9 }} />
                <YAxis dataKey="feature" type="category" stroke="#71717a" tick={{ fontSize: 8 }} width={80} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 2, 2, 0]} name="Importance" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Python EDA — Global Superstore":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">Sales & Net Profit by Category ($)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={edaChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="category" stroke="#71717a" tick={{ fontSize: 8 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sales" fill="#52525b" radius={[2, 2, 0, 0]} name="Sales" />
                <Bar dataKey="profit" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Profit" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      case "Statistics Case Study":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">A/B Conversion Run Log (p = 0.034)</span>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={statsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#71717a" tick={{ fontSize: 9 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="Control" stroke="#71717a" fill="rgba(113,113,122,0.05)" name="Control" />
                <Area type="monotone" dataKey="Variant" stroke="#3b82f6" fill="rgba(59,130,246,0.1)" name="Variant" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );
      case "End-to-End Analytics Pipeline":
        return (
          <div className="h-48 w-full bg-black/25 p-3 rounded-lg border border-[#27272a] font-mono text-[10px]">
            <span className="text-zinc-500 block mb-2 uppercase tracking-widest text-[9px]">ETL Process Duration (Seconds)</span>
            <ResponsiveContainer width="100%" height="90%">
              <ReBarChart data={pipelineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="step" stroke="#71717a" tick={{ fontSize: 8 }} />
                <YAxis stroke="#71717a" tick={{ fontSize: 9 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="duration" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Processing Time (s)" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">/ 02 · Showcase</span>
          <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
            Data Analytics Projects
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Browse portfolio projects. Select any project to view its details and analytical output.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-[#27272a] pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeFilter === filter 
                  ? "bg-[#27272a] border border-[#3f3f46] text-white" 
                  : "border border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p, idx) => (
          <motion.article
            key={p.title}
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
            onClick={() => setSelectedProject(p)}
            className="group bg-[#18181b] rounded-xl border border-[#27272a] overflow-hidden flex flex-col cursor-pointer hover:border-zinc-700 transition-colors shadow-md"
          >
            {/* Image Wrap */}
            <div className="relative overflow-hidden h-40">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/10 to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 border border-white/5 font-mono text-[9px] text-[#3b82f6] uppercase tracking-wider">
                {p.category.split(" · ")[0]}
              </div>
            </div>

            {/* Core Info */}
            <div className="p-5 flex flex-col flex-1 gap-3">
              <h3 className="font-bold text-lg text-white group-hover:text-[#3b82f6] transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {p.desc}
              </p>
              
              <div className="flex flex-wrap gap-1 mt-auto">
                {p.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-[#27272a] font-mono text-[9px] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="px-1.5 py-0.5 rounded bg-[#27272a] font-mono text-[9px] text-zinc-500">
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Slide-out Case Study Details Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Drawer layout */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[560px] bg-[#18181b] border-l border-[#27272a] p-6 sm:p-8 z-50 overflow-y-auto flex flex-col gap-6 shadow-2xl selection:bg-blue-500/20 selection:text-white"
            >
              {/* Drawer header */}
              <div className="flex justify-between items-start border-b border-[#27272a] pb-4">
                <div>
                  <span className="font-mono text-[10px] text-[#3b82f6] uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-bold text-2xl text-white mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-[#27272a] border border-[#3f3f46] text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Case study chart viz */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-xs text-zinc-300">
                  <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
                  <span>Analytical Visualisation</span>
                </div>
                {renderProjectChart(selectedProject.title)}
              </div>

              {/* Detailed Content */}
              <div className="space-y-4 text-sm text-zinc-300">
                <div>
                  <h4 className="font-semibold text-zinc-400 uppercase tracking-wider text-xs mb-1.5">Project Overview</h4>
                  <p className="leading-relaxed text-zinc-300">
                    {selectedProject.desc}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-zinc-400 uppercase tracking-wider text-xs mb-1.5">Analytical Objectives</h4>
                  <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                    <li>Uncover core trend anomalies across distinct business periods.</li>
                    <li>Cleanse and normalize database attributes for query pipeline optimization.</li>
                    <li>Construct descriptive visualizations mapping primary KPI clusters.</li>
                  </ul>
                </div>
              </div>

              {/* Full Tech pills */}
              <div className="space-y-2 pt-2 border-t border-[#27272a]">
                <h4 className="font-semibold text-zinc-400 uppercase tracking-wider text-xs">Technologies Employed</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#27272a] border border-[#3f3f46] font-mono text-xs text-[#3b82f6]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code & Demo CTA buttons */}
              <div className="flex gap-3 pt-4 mt-auto border-t border-[#27272a]">
                <a
                  href={selectedProject.github}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#27272a] bg-[#1c1c1f] text-zinc-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Showcase
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
