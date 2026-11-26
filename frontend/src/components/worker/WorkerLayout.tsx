import React from 'react';
import {
  Home,
  Search,
  Mic,
  Briefcase,
  User,
  ShieldCheck,
  FileCheck2,
  ArrowLeftRight,
} from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BrandMark } from '../BrandMark';

interface WorkerLayoutProps {
  children: React.ReactNode;
}

const WORKER_NAV = [
  { to: '/worker', label: 'Home', icon: Home, end: true },
  { to: '/worker/find-work', label: 'Find Work', icon: Search, end: false },
  { to: '/worker/kaamvaani', label: 'KaamVaani', icon: Mic, end: false, featured: true },
  { to: '/worker/my-work', label: 'My Work', icon: Briefcase, end: false },
  { to: '/worker/profile', label: 'Profile', icon: User, end: false },
];

export const WorkerLayout: React.FC<WorkerLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#102347]">
      {/* App Header */}
      <header className="safe-top sticky top-0 z-40 border-b border-[#173B78]/14 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Back to KaamKavach home">
              <BrandMark />
            </Link>
            <span className="hidden border-l border-[#173B78]/20 pl-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#173B78]/70 sm:inline-block">
              Worker App
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Worker Desktop Navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {WORKER_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex min-h-[40px] items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#173B78] text-white'
                        : item.featured
                          ? 'border border-[#FF8A45] bg-[#FF8A45]/12 text-[#173B78] hover:bg-[#FF8A45] hover:text-[#0F2347]'
                          : 'text-[#102347]/80 hover:bg-[#F8F7F3] hover:text-[#173B78]'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Passport, Receipts & Role Switch */}
          <div className="flex items-center gap-2">
            <Link
              to="/worker/passport"
              aria-label="Open Skill Passport"
              className={`inline-flex min-h-[38px] items-center gap-1.5 border px-2.5 text-xs font-semibold transition-colors ${
                pathname === '/worker/passport'
                  ? 'border-[#3478F6] bg-[#3478F6] text-white'
                  : 'border-[#173B78]/20 bg-[#F8F7F3] text-[#173B78] hover:border-[#3478F6]'
              }`}
            >
              <ShieldCheck className="h-4 w-4 text-[#FF8A45]" />
              <span className="hidden sm:inline">Passport</span>
            </Link>
            <Link
              to="/worker/receipts"
              aria-label="Open WorkReceipts"
              className={`inline-flex min-h-[38px] items-center gap-1.5 border px-2.5 text-xs font-semibold transition-colors ${
                pathname === '/worker/receipts'
                  ? 'border-[#3478F6] bg-[#3478F6] text-white'
                  : 'border-[#173B78]/20 bg-[#F8F7F3] text-[#173B78] hover:border-[#3478F6]'
              }`}
            >
              <FileCheck2 className="h-4 w-4 text-[#3478F6]" />
              <span className="hidden sm:inline">Receipts</span>
            </Link>
            <Link
              to="/employer"
              title="Switch to Employer Workspace"
              className="inline-flex min-h-[38px] items-center gap-1 border border-[#173B78]/18 px-2.5 text-[11px] font-semibold text-[#173B78] hover:bg-[#173B78] hover:text-white"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Employer</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="mx-auto max-w-6xl px-4 pt-5 pb-24 sm:px-6 md:pb-12">
        {children}
      </div>

      {/* Sticky Worker Bottom Navigation (Mobile-First) */}
      <nav
        aria-label="Worker Bottom Navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[#173B78]/16 bg-white/98 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-5 items-end">
          {WORKER_NAV.map((item) => {
            const Icon = item.icon;
            if (item.featured) {
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex min-h-[60px] flex-col items-center justify-center gap-0.5 py-1.5 text-[11px] font-bold ${
                      isActive ? 'text-[#173B78]' : 'text-[#102347]/75'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          isActive
                            ? 'border-[#173B78] bg-[#FF8A45] text-[#0F2347]'
                            : 'border-[#FF8A45] bg-[#173B78] text-white'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex min-h-[60px] flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold transition-colors ${
                    isActive
                      ? 'border-t-2 border-[#3478F6] bg-[#F8F7F3] text-[#173B78]'
                      : 'text-[#102347]/65'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 ${isActive ? 'text-[#3478F6]' : ''}`}
                    />
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
