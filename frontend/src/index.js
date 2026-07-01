// Intercept and patch React DevTools global hook to prevent crash on empty renderer version strings
if (typeof window !== "undefined" && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
  const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  
  // 1. Intercept renderer registration inject method
  const originalInject = hook.inject;
  hook.inject = function (renderer) {
    if (renderer && (!renderer.version || renderer.version === "")) {
      renderer.version = "19.0.0";
    }
    return originalInject.apply(this, arguments);
  };

  // 2. Intercept renderers Map.set mutation method
  if (hook.renderers) {
    const originalSet = hook.renderers.set;
    if (originalSet) {
      hook.renderers.set = function (key, value) {
        if (value && (!value.version || value.version === "")) {
          value.version = "19.0.0";
        }
        return originalSet.apply(this, arguments);
      };
    }

    // 3. Scan and patch pre-registered renderers immediately
    hook.renderers.forEach((renderer) => {
      if (renderer && (!renderer.version || renderer.version === "")) {
        renderer.version = "19.0.0";
      }
    });
  }

  // 4. Safety net: Scan and patch on window resize
  window.addEventListener("resize", () => {
    if (hook.renderers) {
      hook.renderers.forEach((renderer) => {
        if (renderer && (!renderer.version || renderer.version === "")) {
          renderer.version = "19.0.0";
        }
      });
    }
  });
}

import React from "react";
if (!React.version || React.version === "") {
  React.version = "19.0.0";
}
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
