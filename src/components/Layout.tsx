import { Link, Outlet, useLocation } from "react-router-dom";

const PRACTICE_PATHS = new Set(["/", "/quiz", "/results"]);

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh bg-brand-cream">
      <nav className="border-b-4 border-brand-black bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-3 py-3 sm:gap-x-4 sm:px-4 sm:py-4">
          <Link to="/" className="font-display text-base tracking-tight uppercase hover:cursor-pointer sm:text-lg">
            ViteFrench
          </Link>
          <div className="flex gap-1.5 sm:gap-2">
            <NavTab to="/" active={PRACTICE_PATHS.has(pathname)}>
              Practice
            </NavTab>
            <NavTab to="/progress" active={pathname === "/progress"}>
              Progress
            </NavTab>
            <NavTab to="/reference" active={pathname.startsWith("/reference")}>
              Reference
            </NavTab>
          </div>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

function NavTab({ to, active, children }: { to: string; active: boolean; children: string }) {
  return (
    <Link
      to={to}
      className={`border-4 border-brand-black px-2 py-1.5 font-display text-xs uppercase shadow-brutal-sm transition-colors hover:cursor-pointer sm:px-4 sm:py-2 sm:text-sm ${
        active ? "bg-brand-blue text-white" : "bg-white"
      }`}
    >
      {children}
    </Link>
  );
}
