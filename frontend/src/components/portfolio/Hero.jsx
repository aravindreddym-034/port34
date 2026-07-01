import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, FileText, Sparkles } from "lucide-react";
import ParticleField from "./ParticleField";
import { PROFILE, TYPING_ROLES } from "../../data/portfolio";

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
    <span className="font-space font-medium" data-testid="hero-typing">
      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        {text}
      </span>
      <span className="inline-block w-[2px] h-[0.9em] align-middle ml-1 bg-cyan-400 animate-pulse" />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center overflow-hidden grain"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="aurora-blob w-[600px] h-[600px] bg-cyan-500/40 -top-40 -left-40" />
      <div className="aurora-blob w-[500px] h-[500px] bg-purple-600/40 top-40 right-0" />
      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card font-mono-code text-xs text-cyan-300"
            data-testid="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for opportunities</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="font-space font-bold tracking-tighter text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02]"
            data-testid="hero-name"
          >
            <span className="text-gradient-hero">Aravind</span>
            <br />
            <span className="text-white">Reddy M.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-zinc-300 font-space"
          >
            I&rsquo;m a <TypingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-zinc-400 max-w-xl font-manrope leading-relaxed"
            data-testid="hero-description"
          >
            {PROFILE.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="btn-glow group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-space font-medium hover:scale-[1.03] transition-transform"
              data-testid="hero-cta-projects"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card font-space font-medium text-white hover:border-cyan-400/60 transition-colors"
              data-testid="hero-cta-contact"
            >
              Contact Me
              <Mail className="w-4 h-4" />
            </a>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 font-space font-medium text-zinc-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
              data-testid="hero-cta-resume"
              onClick={() => window.alert("Resume will be available soon.")}
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4 pt-2"
          >
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 grid place-items-center rounded-full glass-card hover:text-cyan-300 hover:border-cyan-400/60 transition-colors"
              data-testid="hero-social-github"
            >
              <Github className="w-4.5 h-4.5" size={18} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-11 h-11 grid place-items-center rounded-full glass-card hover:text-cyan-300 hover:border-cyan-400/60 transition-colors"
              data-testid="hero-social-linkedin"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="w-11 h-11 grid place-items-center rounded-full glass-card hover:text-cyan-300 hover:border-cyan-400/60 transition-colors"
              data-testid="hero-social-email"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right - Avatar */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
            data-testid="hero-avatar-wrap"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-blue-500/30 blur-3xl rounded-full" />
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-[2rem] overflow-hidden glass-card glow-cyan">
                <img
                  src={PROFILE.avatar}
                  alt="Aravind Reddy avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/60 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-10 glass-card px-3 py-2 rounded-xl font-mono-code text-xs text-cyan-300"
              >
                SELECT * FROM insights;
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 bottom-14 glass-card px-3 py-2 rounded-xl font-mono-code text-xs text-purple-300"
              >
                model.fit(X, y) 🚀
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-4 -top-4 glass-card px-3 py-2 rounded-xl font-space text-xs text-white"
              >
                📊 Power BI
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent" />
      </motion.div>
    </section>
  );
}
