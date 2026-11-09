export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }
  console.info("[startup] Application server initialized", {
    application: "DevOps Release Checklist",
    environment:
      process.env.APP_ENV ??
      process.env.NODE_ENV ??
      "unknown",
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
}
