/**
 * Client-side fingerprinting for visitor identification.
 * 
 * Generates a deterministic hash from browser/device signals and stores it
 * in localStorage. Only the hashed value is ever sent to the server —
 * raw fingerprint inputs are NOT transmitted.
 */

/**
 * djb2 hash function — fast, simple string hash that produces a short numeric string.
 * @param {string} str - Input string to hash
 * @returns {string} Hashed string
 */
function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + char
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Generate a canvas-based hash to add entropy from the GPU/rendering engine.
 * @returns {string} Canvas hash string
 */
function getCanvasHash() {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "no-canvas";

    // Draw text with specific styling — subtle rendering differences across devices
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 17);

    return djb2Hash(canvas.toDataURL());
  } catch {
    return "canvas-error";
  }
}

/**
 * Generate a fingerprint from multiple browser/device signals.
 * @returns {string} A hashed fingerprint string
 */
function generateFingerprint() {
  const components = [
    navigator.userAgent || "",
    navigator.language || "",
    `${screen.width}x${screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    String(navigator.hardwareConcurrency || ""),
    String(navigator.deviceMemory || ""),
    getCanvasHash(),
  ];

  return djb2Hash(components.join("|"));
}

/**
 * Get existing fingerprint from localStorage or create a new one.
 * @returns {string} The visitor_id (hashed fingerprint)
 */
export function getOrCreateFingerprint() {
  const STORAGE_KEY = "visitor_id";

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const fingerprint = generateFingerprint();
    localStorage.setItem(STORAGE_KEY, fingerprint);
    return fingerprint;
  } catch {
    // localStorage unavailable (private browsing, etc.) — generate ephemeral ID
    return generateFingerprint();
  }
}
