import React from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
      data-testid="main-nav"
    >
      <div className="glass-card rounded-full px-5 py-2.5 flex items-center justify-between">
        <a
          href="#home"
          className="font-space font-semibold text-white flex items-center gap-2"
          data-testid="nav-logo"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00F0FF]" />
          Aravind<span className="text-cyan-400">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors font-manrope rounded-full hover:bg-white/5"
              data-testid={`nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-sm px-4 py-1.5 rounded-full bg-white text-black font-space font-medium hover:scale-105 transition-transform"
          data-testid="nav-cta"
        >
          Let&rsquo;s Talk
        </a>
      </div>
    </motion.header>
  );
}
