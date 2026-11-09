const APP_ENVIRONMENTS = [
  "development",
  "production",
  "test",
  "staging",
] as const;

export type AppEnvironment =
  (typeof APP_ENVIRONMENTS)[number] | "unknown";

function resolveEnvironment(
  value: string | undefined
): AppEnvironment {
  if (
    value &&
    APP_ENVIRONMENTS.includes(
      value as (typeof APP_ENVIRONMENTS)[number]
    )
  ) {
    return value as AppEnvironment;
  }

  return "unknown";
}

export function getRuntimeConfig() {
  return {
    appName:
      process.env.APP_NAME?.trim() ||
      "DevOps Release Checklist",

    environment: resolveEnvironment(
      process.env.APP_ENV
    ),
  };
}
