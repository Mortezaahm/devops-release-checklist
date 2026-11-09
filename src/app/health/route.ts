import { connection } from "next/server";

import { getRuntimeConfig } from "@/lib/config";

export async function GET() {
    await connection();

    const config = getRuntimeConfig();

  const healthData = {
    status: "ok",
    service: config.appName,
    environment: config.environment,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  };
  console.info("[health] Health check requested", {
    environment: config.environment,
    timeStamp: healthData.timestamp,
  });

  return Response.json(healthData, {
    status: 200,
    headers: {
        "Cache-Control": "no-store, max-age=0",
    },
  });
}
