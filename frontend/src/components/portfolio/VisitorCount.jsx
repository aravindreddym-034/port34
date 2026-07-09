import React, { useState, useEffect } from "react";
import { getOrCreateFingerprint } from "../../lib/fingerprint";
import { recordVisitorAndGetStats } from "../../lib/supabase";
import { Users } from "lucide-react";

/**
 * Compute ordinal suffix: 1st, 2nd, 3rd, 4th, 11th, 12th, 13th, 21st, etc.
 */
function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * VisitorCount — shows "You are Xth / Y visitors" in the dashboard OS style.
 * 
 * - On mount: generates/retrieves fingerprint → calls Supabase RPC
 * - Loading: shows skeleton pulse
 * - Error: shows quiet fallback
 */
export default function VisitorCount() {
  const [rank, setRank] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchVisitorStats() {
      try {
        const visitorId = getOrCreateFingerprint();
        const stats = await recordVisitorAndGetStats(visitorId);

        if (!cancelled) {
          setRank(stats.rank);
          setTotal(stats.total);
        }
      } catch (err) {
        console.error("[VisitorCount] Error:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchVisitorStats();
    return () => { cancelled = true; };
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-950/50 border border-white/5">
        <Users className="w-3.5 h-3.5 text-zinc-600" />
        <div className="flex gap-1.5 items-center">
          <div className="h-3 w-8 bg-zinc-800 rounded animate-pulse" />
          <span className="text-zinc-700 text-[10px]">/</span>
          <div className="h-3 w-10 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Error / no data fallback — stay quiet
  if (rank === null || total === null) {
    return null;
  }

  return (
    <div className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-950/50 border border-white/5 hover:border-cyan-500/20 transition-all duration-300">
      <Users className="w-3.5 h-3.5 text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
      <div className="font-mono-code text-[10px] text-zinc-500 tracking-wide">
        <span className="text-zinc-400">You are </span>
        <span className="text-cyan-300 font-semibold">
          {rank.toLocaleString()}{getOrdinal(rank)}
        </span>
        <span className="text-zinc-600 mx-1">/</span>
        <span className="text-purple-300 font-semibold">
          {total.toLocaleString()}
        </span>
        <span className="text-zinc-400"> visitors</span>
      </div>
    </div>
  );
}
