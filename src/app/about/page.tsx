import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

async function RuntimeEnvironment() {
  await connection();
  const environment =
    process.env.APP_ENV ??
    process.env.NODE_ENV ??
    "unknown";

  return (
    <span className="mt-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
      {environment}
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
          Project information
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About this application
        </h1>
        <p className="mt-5 text-base leading-7 text-slate-600">
          DevOps Release Checklist is a lightweight application
          developed to demonstrate modern web application
          development, containerization and automated deployment.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Technology stack
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            <li>Next.js and React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Node.js Runtime</li>
            <li>Docker</li>
            <li>GitHub Actions</li>
            <li>Render</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Runtime information
          </h2>
          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-slate-500">
                Application
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                DevOps Release Checklist
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">
                Environment
              </p>
              <Suspense
                fallback={
                  <span className="mt-2 text-xs text-slate-400">
                    Loading environment...
                  </span>
                }
              >
                <RuntimeEnvironment />
              </Suspense>
            </div>
            <div>
              <p className="text-xs text-slate-500">
                Rendering
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                Server Component
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">
          Server health
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You can check whether the application server is running
          by accessing its health endpoint.
        </p>
        <Link
          href="/health"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Check server health
        </Link>
      </section>
    </main>
  );
}
