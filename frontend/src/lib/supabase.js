/**
 * Lightweight Supabase REST API client for the visitor counter.
 * 
 * Uses fetch to call the Supabase PostgREST RPC endpoint directly —
 * no @supabase/supabase-js dependency needed.
 * 
 * Environment variables:
 *   REACT_APP_SUPABASE_URL      - Supabase project URL
 *   REACT_APP_SUPABASE_ANON_KEY - Supabase anon/publishable key (safe for client-side)
 */

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

/**
 * Record a visitor and get their rank + total count in one RPC call.
 * 
 * Calls the `get_visitor_stats` Postgres function which:
 * - Inserts the visitor_id (ignores duplicates)
 * - Computes rank (ordinal position by creation time)
 * - Computes total visitor count
 * 
 * @param {string} visitorId - The hashed fingerprint
 * @returns {Promise<{ rank: number|null, total: number|null }>}
 */
export async function recordVisitorAndGetStats(visitorId) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("[VisitorCounter] Supabase env vars missing — skipping.");
    return { rank: null, total: null };
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_visitor_stats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ p_visitor_id: visitorId }),
    });

    if (!response.ok) {
      console.error("[VisitorCounter] RPC error:", response.status, await response.text());
      return { rank: null, total: null };
    }

    const data = await response.json();
    return {
      rank: typeof data.rank === "number" ? data.rank : null,
      total: typeof data.total === "number" ? data.total : null,
    };
  } catch (err) {
    console.error("[VisitorCounter] Network error:", err);
    return { rank: null, total: null };
  }
}
