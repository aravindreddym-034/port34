import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "../../data/portfolio";

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

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 md:px-12" data-testid="about-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 01 · About
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter leading-[1.05]">
            Who <span className="text-gradient-cyan-purple">Am I?</span>
          </h2>
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
            <p className="font-space text-2xl leading-snug text-white/90 relative">
              &ldquo;Data is only useful when it&rsquo;s{" "}
              <span className="text-gradient-cyan-purple">understood, felt, and acted on.</span>
              &rdquo;
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 space-y-6"
        >
          <p className="text-lg text-zinc-300 leading-relaxed font-manrope">
            I&rsquo;m a Data Analyst passionate about turning complex datasets into meaningful
            insights. My expertise lies in{" "}
            <span className="text-cyan-300">SQL, Python, data visualization, statistics, and machine learning</span>.
            I enjoy solving analytical problems, building interactive dashboards, optimizing SQL
            queries, and developing predictive models.
          </p>
          <p className="text-lg text-zinc-400 leading-relaxed font-manrope">
            Currently pursuing my Bachelor&rsquo;s degree while strengthening my expertise in{" "}
            <span className="text-purple-300">Business Intelligence, Data Analytics, and Machine Learning</span>{" "}
            through continuous learning and hands-on projects.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl p-4"
                data-testid={`stat-${s.label.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="font-space font-bold text-3xl md:text-4xl text-gradient-cyan-purple">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500 mt-1">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
