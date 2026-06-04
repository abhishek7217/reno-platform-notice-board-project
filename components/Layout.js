import Link from "next/link";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xl font-semibold uppercase tracking-[0.25em] text-blue-600">
              Reno Platforms
            </p>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {title || "Notice Board"}
            </h1>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
            ) : null}
          </div>

          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            
            >
              All Notices
            </Link>
            <Link
              href="/notices/new"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Add Notice
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
