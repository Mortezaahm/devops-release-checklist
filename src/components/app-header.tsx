import Link from "next/link"

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
            DR
          </span>

          <span>
            <span className="block text-sm font-bold text-slate-900">
              DevOps Release
            </span>

            <span className="block text-xs text-slate-500">
              Deployment Checklist
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            About
          </Link>
        </nav>

      </div>
    </header>
  );
}
