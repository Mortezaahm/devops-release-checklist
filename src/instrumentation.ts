import { getRuntimeConfig } from "@/lib/config";

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const config = getRuntimeConfig();

  console.info("[startup] Application server initialized", {
    application: config.appName,
    environment: config.environment,
    timestamp: new Date().toISOString(),
  });
}
