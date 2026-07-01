import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Database, Table, Columns, Terminal, CheckCircle2 } from "lucide-react";
import { SKILL_GROUPS } from "../../data/portfolio";
import SkillSphere from "./SkillSphere";

// Mock Database Tables
const DB_SKILLS = [
  { id: 1, name: "MySQL", category: "Databases", level: "Expert" },
  { id: 2, name: "PostgreSQL", category: "Databases", level: "Expert" },
  { id: 3, name: "MS SQL Server", category: "Databases", level: "Advanced" },
  { id: 4, name: "Pandas", category: "Python", level: "Expert" },
  { id: 5, name: "NumPy", category: "Python", level: "Advanced" },
  { id: 6, name: "Scikit-learn", category: "Machine Learning", level: "Advanced" },
  { id: 7, name: "Power BI", category: "Business Intelligence", level: "Expert" },
  { id: 8, name: "DAX", category: "Business Intelligence", level: "Advanced" },
  { id: 9, name: "Hypothesis Testing", category: "Statistics", level: "Advanced" },
  { id: 10, name: "Regression Models", category: "Machine Learning", level: "Expert" },
];

const DB_DATABASES = [
  { db_name: "MySQL", dialect: "SQL", type: "Relational", port: 3306 },
  { db_name: "PostgreSQL", dialect: "PL/pgSQL", type: "Relational", port: 5432 },
  { db_name: "MS SQL Server", dialect: "T-SQL", type: "Relational", port: 1433 },
  { db_name: "SQLite", dialect: "SQL", type: "File-based", port: "N/A" },
];

const DB_CREDENTIALS = [
  { name: "Python Pro Bootcamp", issuer: "Udemy (Angela Yu)", year: 2026 },
  { name: "Claude 101 Certificate", issuer: "Anthropic", year: 2026 },
  { name: "Forage Data Analytics", issuer: "Boston Consulting Group", year: 2025 },
];

export default function Skills() {
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM skills;");
  const [queryResults, setQueryResults] = useState([]);
  const [queryTime, setQueryTime] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeSchema, setActiveSchema] = useState("skills");

  const presetQueries = [
    { label: "Fetch All Skills", query: "SELECT * FROM skills;" },
    { label: "Check SQL Engines", query: "SELECT db_name, dialect, type FROM databases;" },
    { label: "Show Python & ML Skills", query: "SELECT name, level FROM skills WHERE category = 'Python' OR category = 'Machine Learning';" },
  ];

  // Execute mock SQL query
  const executeQuery = () => {
    const start = performance.now();
    setErrorMsg("");
    setQueryResults([]);

    // Normalize query whitespace
    const cleanQuery = sqlQuery.trim().replace(/\s+/g, " ").toLowerCase();

    setTimeout(() => {
      try {
        if (!cleanQuery.startsWith("select")) {
          throw new Error("Syntax Error: Only SELECT queries are supported in read-only sandbox mode.");
        }

        let dataset = [];
        if (cleanQuery.includes("from skills")) {
          dataset = DB_SKILLS;
          setActiveSchema("skills");
        } else if (cleanQuery.includes("from databases")) {
          dataset = DB_DATABASES;
          setActiveSchema("databases");
        } else if (cleanQuery.includes("from credentials") || cleanQuery.includes("from certifications")) {
          dataset = DB_CREDENTIALS;
          setActiveSchema("credentials");
        } else {
          throw new Error("Table Not Found: Table must be 'skills', 'databases', or 'credentials'.");
        }

        // Apply basic column filters
        // Matches e.g. SELECT column1, column2 FROM ...
        const selectPart = cleanQuery.substring(6, cleanQuery.indexOf("from")).trim();
        let colsToKeep = [];
        if (selectPart !== "*") {
          colsToKeep = selectPart.split(",").map(c => c.trim());
        }

        // Apply basic where conditions
        let filteredData = [...dataset];
        if (cleanQuery.includes("where")) {
          const wherePart = cleanQuery.substring(cleanQuery.indexOf("where") + 5).replace(";", "").trim();
          if (wherePart.includes("python") || wherePart.includes("machine learning")) {
            filteredData = filteredData.filter(
              row => row.category === "Python" || row.category === "Machine Learning"
            );
          }
        }

        // Project columns
        const finalResults = filteredData.map(row => {
          if (colsToKeep.length === 0) return row;
          const projected = {};
          colsToKeep.forEach(col => {
            if (row[col] !== undefined) {
              projected[col] = row[col];
            } else {
              // Try to find approximate column match
              const match = Object.keys(row).find(key => key.toLowerCase() === col.toLowerCase());
              if (match) projected[match] = row[match];
            }
          });
          return projected;
        });

        if (finalResults.length === 0) {
          throw new Error("No rows matched the criteria.");
        }

        setQueryResults(finalResults);
        setQueryTime(((performance.now() - start) / 1000).toFixed(4));
      } catch (err) {
        setErrorMsg(err.message);
      }
    }, 150);
  };

  useEffect(() => {
    executeQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accentMap = {
    cyan: "hover:border-cyan-400/60 hover:text-cyan-300",
    purple: "hover:border-purple-400/60 hover:text-purple-300",
    blue: "hover:border-blue-400/60 hover:text-blue-300",
  };

  const dotMap = {
    cyan: "bg-cyan-400 shadow-[0_0_10px_#00F0FF]",
    purple: "bg-purple-400 shadow-[0_0_10px_#7B2CBF]",
    blue: "bg-blue-400 shadow-[0_0_10px_#007AFF]",
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">/ 03 · Skill Matrix & Sandbox</span>
        <h1 className="font-space font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Technical Toolbox
        </h1>
        <p className="text-sm text-zinc-400 font-manrope mt-1">
          Review core competencies or run test SQL queries inside the interactive sandbox terminal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Skills Bento Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="glass-card rounded-2xl p-4.5 flex flex-col gap-3.5 border border-white/5 shadow-lg hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dotMap[group.accent]}`} />
                <h3 className="font-space font-bold text-sm text-white">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.01] font-mono-code text-[10px] text-zinc-400 transition-all cursor-default ${
                      accentMap[group.accent]
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* R3F Globe Sphere integrated in bento grid */}
          <div className="sm:col-span-2 glass-card rounded-2xl border border-white/5 h-48 relative overflow-hidden flex items-center justify-between p-6">
            <div className="z-10 max-w-[55%]">
              <h3 className="font-space font-bold text-base text-white">Neural Cluster Visualizer</h3>
              <p className="text-xs text-zinc-400 font-manrope mt-1">
                Slowly rotating neural 3D node wireframe representing the connection points between my data skill subsets.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/2">
              <SkillSphere />
            </div>
          </div>
        </div>

        {/* Right Side: Interactive SQL Query Console */}
        <div className="lg:col-span-6 glass-card rounded-2xl border border-white/5 overflow-hidden shadow-2xl flex flex-col">
          {/* Console Header */}
          <div className="bg-[#0A0B10] border-b border-white/5 px-4.5 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-space font-bold text-xs uppercase tracking-wider text-zinc-300">
                Mock SQL Client (Read-Only)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono-code text-[10px] text-zinc-500">DB: portfolio_prod</span>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="p-4 bg-zinc-950/30 border-b border-white/5 flex flex-wrap gap-2">
            {presetQueries.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setSqlQuery(preset.query)}
                className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono-code text-zinc-400 hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Text Area Command Editor */}
          <div className="p-4 bg-black/80 flex gap-3.5 border-b border-white/5">
            <div className="font-mono-code text-zinc-700 text-xs text-right select-none space-y-1">
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full bg-transparent font-mono-code text-xs text-cyan-200 outline-none resize-none h-14 leading-relaxed"
              rows={3}
            />
          </div>

          {/* Control Buttons */}
          <div className="px-4.5 py-3 bg-[#0A0B10] flex items-center justify-between">
            <span className="font-mono-code text-[10px] text-zinc-500">
              Tables: <span className="text-zinc-400">skills</span>, <span className="text-zinc-400">databases</span>, <span className="text-zinc-400">credentials</span>
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setSqlQuery("SELECT * FROM skills;")}
                className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors"
                title="Reset editor"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={executeQuery}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-400 text-black font-space font-semibold text-xs hover:scale-[1.03] transition-transform"
              >
                <Play className="w-3 h-3 fill-black" /> Run Query
              </button>
            </div>
          </div>

          {/* Query Results / Output Grid */}
          <div className="p-4 bg-zinc-950/60 min-h-[160px] max-h-[220px] overflow-auto font-mono-code text-[11px]">
            {errorMsg ? (
              <div className="text-red-400 leading-relaxed">
                {errorMsg}
              </div>
            ) : queryResults.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 border-b border-white/5 pb-1.5 mb-1.5">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Success ({queryResults.length} rows returned)</span>
                  <span>Execution: {queryTime} seconds</span>
                </div>
                
                {/* Result Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400">
                        {Object.keys(queryResults[0]).map((key) => (
                          <th key={key} className="pb-1.5 pr-4 uppercase tracking-wider text-[10px] font-bold">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {queryResults.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          {Object.values(row).map((val, vIdx) => (
                            <td key={vIdx} className="py-2 pr-4 font-mono-code">
                              {val}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-zinc-600 italic">No query output loaded. Click 'Run Query' to execute.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
