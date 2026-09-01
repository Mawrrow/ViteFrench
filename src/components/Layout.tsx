import { Link, Outlet, useLocation } from "react-router-dom";

const PRACTICE_PATHS = new Set(["/", "/quiz", "/results"]);

export function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh bg-brand-cream">
      <nav className="border-b-4 border-brand-black bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-lg tracking-tight uppercase hover:cursor-pointer">
            ViteFrench
          </Link>
          <div className="flex gap-2">
            <NavTab to="/" active={PRACTICE_PATHS.has(pathname)}>
              Practice
            </NavTab>
            <NavTab to="/progress" active={pathname === "/progress"}>
              Progress
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
      className={`border-4 border-brand-black px-4 py-2 font-display text-sm uppercase shadow-brutal-sm transition-colors hover:cursor-pointer ${
        active ? "bg-brand-blue text-white" : "bg-white"
      }`}
    >
      {children}
    </Link>
  );
}
