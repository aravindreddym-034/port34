import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Terminal, Trash2, Database, ShieldAlert } from "lucide-react";
import { PROFILE } from "../../data/portfolio";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  // Load message logs from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_contact_messages");
    if (saved) {
      try {
        setLocalMessages(JSON.parse(saved));
      } catch (e) {
        setLocalMessages([]);
      }
    }
  }, []);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields (*).");
      return;
    }

    setLoading(true);

    // Simulate database write speed (150ms)
    setTimeout(() => {
      try {
        const id = Math.random().toString(36).substring(2, 11);
        const newMessage = {
          id,
          name: form.name,
          email: form.email,
          subject: form.subject || "N/A",
          message: form.message,
          created_at: new Date().toISOString()
        };

        const updated = [newMessage, ...localMessages];
        localStorage.setItem("portfolio_contact_messages", JSON.stringify(updated));
        setLocalMessages(updated);

        // Dispatch a custom event so the global system console log updates in real-time
        const customEvent = new CustomEvent("new-portfolio-message", { detail: newMessage });
        window.dispatchEvent(customEvent);

        setSent(true);
        toast.success("Message recorded in local database successfully!");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 3000);
      } catch (err) {
        toast.error("Database write error. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const clearDatabase = () => {
    localStorage.removeItem("portfolio_contact_messages");
    setLocalMessages([]);
    toast.info("Local message database flushed successfully.");
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest">/ 06 · Communications Hub</span>
        <h1 className="font-space font-bold text-3xl sm:text-4xl tracking-tight text-white mt-1">
          Contact & Database Logs
        </h1>
        <p className="text-sm text-zinc-400 font-manrope mt-1">
          Send a message to save it into the client-side database, then watch it log live below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Socials */}
        <div className="lg:col-span-5 space-y-6">
          <form
            onSubmit={onSubmit}
            className="glass-card rounded-2xl p-5 border border-white/5 space-y-4 shadow-xl"
            data-testid="contact-form"
          >
            <div className="space-y-1">
              <label className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500">Your Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full bg-[#05050A]/60 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/50 transition-colors font-manrope"
                placeholder="Ada Lovelace"
                data-testid="contact-input-name"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500">Email Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                className="w-full bg-[#05050A]/60 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/50 transition-colors font-manrope"
                placeholder="you@company.com"
                data-testid="contact-input-email"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                className="w-full bg-[#05050A]/60 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/50 transition-colors font-manrope"
                placeholder="Collaboration, job opening..."
                data-testid="contact-input-subject"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono-code text-[10px] uppercase tracking-wider text-zinc-500">Message Details *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={4}
                className="w-full bg-[#05050A]/60 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/50 transition-colors font-manrope resize-none"
                placeholder="Hello! Let's talk about statistics..."
                data-testid="contact-input-message"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-space font-bold text-xs hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
              data-testid="contact-submit"
            >
              {loading ? (
                <span>Writing to Local DB...</span>
              ) : sent ? (
                <span>Success (DB Committed)</span>
              ) : (
                <>
                  <span>Commit Message</span> <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Social Links Block */}
          <div className="grid grid-cols-3 gap-2.5">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex flex-col items-center gap-1.5 p-3.5 glass-card border border-white/5 rounded-xl text-center group hover:border-cyan-400/30 transition-colors"
            >
              <Mail className="w-4 h-4 text-cyan-300 group-hover:scale-105 transition-transform" />
              <span className="font-mono-code text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Email</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 p-3.5 glass-card border border-white/5 rounded-xl text-center group hover:border-cyan-400/30 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-300 group-hover:scale-105 transition-transform" />
              <span className="font-mono-code text-[9px] text-zinc-500 uppercase tracking-widest mt-1">LinkedIn</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1.5 p-3.5 glass-card border border-white/5 rounded-xl text-center group hover:border-cyan-400/30 transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-300 group-hover:scale-105 transition-transform" />
              <span className="font-mono-code text-[9px] text-zinc-500 uppercase tracking-widest mt-1">GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Database Logger Viewer */}
        <div className="lg:col-span-7 glass-card rounded-2xl border border-white/5 overflow-hidden shadow-2xl flex flex-col">
          {/* DB Logs Header */}
          <div className="bg-[#0A0B10] border-b border-white/5 px-4.5 py-3.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <span className="font-space font-bold text-xs uppercase tracking-wider text-zinc-300">
                Local Messages Database Table
              </span>
            </div>
            {localMessages.length > 0 && (
              <button
                onClick={clearDatabase}
                className="flex items-center gap-1 text-[10px] font-mono-code text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Flush DB
              </button>
            )}
          </div>

          {/* Table display */}
          <div className="p-4 bg-zinc-950/60 min-h-[280px] max-h-[380px] overflow-auto font-mono-code text-[11px] custom-scrollbar">
            {localMessages.length > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-white/5 pb-2 mb-2 font-mono-code">
                  <span>SELECT * FROM contact_messages;</span>
                  <span>{localMessages.length} Row(s)</span>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-zinc-400 uppercase text-[9px] font-bold">
                        <th className="pb-2 pr-3">Timestamp</th>
                        <th className="pb-2 pr-3">Sender</th>
                        <th className="pb-2 pr-3">Subject</th>
                        <th className="pb-2 pr-3">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {localMessages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-white/[0.02]">
                          <td className="py-2 pr-3 text-[10px] text-zinc-500 whitespace-nowrap">
                            {new Date(msg.created_at).toLocaleTimeString()}
                          </td>
                          <td className="py-2 pr-3 text-cyan-300 font-medium">
                            <span className="block max-w-[120px] truncate" title={msg.name}>{msg.name}</span>
                            <span className="block text-[9px] text-zinc-500 max-w-[120px] truncate" title={msg.email}>{msg.email}</span>
                          </td>
                          <td className="py-2 pr-3 text-zinc-400 truncate max-w-[100px]" title={msg.subject}>
                            {msg.subject}
                          </td>
                          <td className="py-2 pr-3 text-zinc-300 max-w-[180px] truncate" title={msg.message}>
                            {msg.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-600 gap-3">
                <ShieldAlert className="w-10 h-10 text-zinc-700" />
                <div className="font-space text-xs">Table &quot;contact_messages&quot; is empty.</div>
                <div className="text-[10px] max-w-[200px] leading-relaxed">
                  Submit a message via the commit form to write rows to the local dataset.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
