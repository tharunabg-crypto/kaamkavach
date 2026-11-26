import React from 'react';
import {
  Home,
  Search,
  Mic,
  Briefcase,
  User,
  ArrowLeftRight,
  ShieldCheck,
} from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BrandMark } from '../BrandMark';
import { Badge } from '../ui';

interface WorkerLayoutProps {
  children?: React.ReactNode;
}

const WORKER_NAV = [
  { to: '/worker/home', label: 'Home', icon: Home, end: true },
  { to: '/worker/find-work', label: 'Find Work', icon: Search, end: false },
  { to: '/worker/kaamvaani', label: 'KaamVaani', icon: Mic, end: false, featured: true },
  { to: '/worker/my-work', label: 'My Work', icon: Briefcase, end: false },
  { to: '/worker/profile', label: 'Profile', icon: User, end: false },
];

export const WorkerLayout: React.FC<WorkerLayoutProps> = ({ children }) => {
  const page = children ?? <Outlet />;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="safe-top sticky top-0 z-40 border-b border-navy/12 bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-[var(--layout-gutter)]">
          <div className="flex items-center gap-3">
            <Link to="/worker/home" aria-label="KaamKavach worker home">
              <BrandMark />
            </Link>
            <span className="hidden border-l border-navy/15 pl-3 text-xs font-semibold text-text-muted sm:inline">
              Worker workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge tone="warning" className="hidden sm:inline-flex">
              Sample data
            </Badge>
            <Link
              to="/employer/dashboard"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-control border border-navy/15 px-3 text-xs font-semibold text-navy transition-colors hover:bg-cream"
            >
              <ArrowLeftRight className="h-4 w-4" />
              <span className="hidden sm:inline">Employer view</span>
              <span className="sm:hidden">Employer</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] gap-8 px-[var(--layout-gutter)]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r border-navy/10 py-7 md:flex">
          <nav aria-label="Worker workspace" className="space-y-1">
            {WORKER_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-navy text-white'
                        : item.featured
                          ? 'text-navy hover:bg-accent/15'
                          : 'text-text-muted hover:bg-white hover:text-navy'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <Link
            to="/worker/skill-passport"
            className="mt-4 flex min-h-11 items-center gap-3 rounded-control border border-navy/12 bg-white px-3 text-sm font-semibold text-navy hover:border-electric"
          >
            <ShieldCheck className="h-4 w-4 text-electric" />
            Skill Passport
          </Link>
        </aside>

        <main className="min-w-0 flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-5 md:py-8">
          {page}
        </main>
      </div>

      <nav
        aria-label="Worker bottom navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-navy/12 bg-white md:hidden"
      >
        <div className="grid grid-cols-5">
          {WORKER_NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-[58px] flex-col items-center justify-center gap-1 px-1 text-[10px] font-semibold ${
                    isActive ? 'text-navy' : 'text-text-muted'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-7 w-9 items-center justify-center rounded-full ${
                        isActive ? 'bg-electric/10 text-electric' : ''
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
