import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer
      className="relative border-t border-white/5 py-10 px-6 md:px-12"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-space text-sm text-zinc-500">
          © {new Date().getFullYear()} Aravind Reddy M. Crafted with{" "}
          <span className="text-cyan-400">SQL</span>,{" "}
          <span className="text-purple-400">Python</span> and a lot of coffee ☕
        </div>
        <div className="flex items-center gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-cyan-300 transition-colors"
            aria-label="GitHub"
            data-testid="footer-github"
          >
            <Github size={16} />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-500 hover:text-cyan-300 transition-colors"
            aria-label="LinkedIn"
            data-testid="footer-linkedin"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-zinc-500 hover:text-cyan-300 transition-colors"
            aria-label="Email"
            data-testid="footer-email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
