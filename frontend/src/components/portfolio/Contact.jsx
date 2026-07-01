import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2 } from "lucide-react";
import { PROFILE } from "../../data/portfolio";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form);
      setSent(true);
      toast.success("Message sent — I'll get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12"
      data-testid="contact-section"
    >
      <div className="aurora-blob w-[600px] h-[600px] bg-cyan-500/25 top-20 left-1/3" />
      <div className="aurora-blob w-[500px] h-[500px] bg-purple-600/25 bottom-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">
            / 06 · Contact
          </span>
          <h2 className="font-space font-bold text-4xl md:text-6xl tracking-tighter leading-[1.05]">
            Let&rsquo;s build something <span className="text-gradient-cyan-purple">meaningful</span> with data.
          </h2>
          <p className="text-zinc-400 font-manrope text-lg leading-relaxed">
            Open to internships, freelance analytics, and full-time Data Analyst roles. Have a
            dataset, a challenge, or an idea? Say hi.
          </p>

          <div className="space-y-3 pt-2">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-cyan-400/50 transition-colors group"
              data-testid="contact-email-link"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-400/10 grid place-items-center">
                <Mail className="w-4.5 h-4.5 text-cyan-300" size={18} />
              </div>
              <div>
                <div className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
                  Email
                </div>
                <div className="font-space text-white group-hover:text-cyan-300 transition-colors">
                  {PROFILE.email}
                </div>
              </div>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-cyan-400/50 transition-colors group"
              data-testid="contact-linkedin-link"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-400/10 grid place-items-center">
                <Linkedin className="w-4.5 h-4.5 text-blue-300" size={18} />
              </div>
              <div>
                <div className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
                  LinkedIn
                </div>
                <div className="font-space text-white group-hover:text-blue-300 transition-colors">
                  Aravind Reddy M
                </div>
              </div>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 glass-card rounded-xl p-4 hover:border-cyan-400/50 transition-colors group"
              data-testid="contact-github-link"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-400/10 grid place-items-center">
                <Github className="w-4.5 h-4.5 text-purple-300" size={18} />
              </div>
              <div>
                <div className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
                  GitHub
                </div>
                <div className="font-space text-white group-hover:text-purple-300 transition-colors">
                  @aravindreddym-034
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={onSubmit}
          className="lg:col-span-7 glass-card rounded-3xl p-6 md:p-8 space-y-5"
          data-testid="contact-form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
                Your Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.05] transition-all font-manrope"
                placeholder="e.g. Ada Lovelace"
                data-testid="contact-input-name"
              />
            </div>
            <div>
              <label className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.05] transition-all font-manrope"
                placeholder="you@company.com"
                data-testid="contact-input-email"
              />
            </div>
          </div>
          <div>
            <label className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.05] transition-all font-manrope"
              placeholder="Analytics opportunity, project collab…"
              data-testid="contact-input-subject"
            />
          </div>
          <div>
            <label className="font-mono-code text-[10px] uppercase tracking-widest text-zinc-500">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.05] transition-all font-manrope resize-none"
              placeholder="Tell me about your dataset, role, or idea…"
              data-testid="contact-input-message"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="font-mono-code text-[10px] text-zinc-500">
              Usually replies within 24 hours
            </span>
            <button
              type="submit"
              disabled={loading}
              className="btn-glow inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-space font-semibold hover:scale-[1.03] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              data-testid="contact-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </>
              ) : sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Sent!
                </>
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
