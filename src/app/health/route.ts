import { connection } from "next/server";

export async function GET() {
    await connection();

  const environment =
    process.env.APP_ENV ??
    process.env.NODE_ENV ??
    "unknown";
  const healthData = {
    status: "ok",
    service: "devops-release-checklist",
    environment,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  };
  return Response.json(healthData, {
    status: 200,
  });
}
