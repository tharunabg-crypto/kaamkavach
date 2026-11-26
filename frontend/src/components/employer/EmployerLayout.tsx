import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  Building2,
  ArrowLeftRight,
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { BrandMark } from '../BrandMark';

interface EmployerLayoutProps {
  children: React.ReactNode;
}

const EMPLOYER_NAV = [
  { to: '/employer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/employer/workers', label: 'Find Workers', icon: Users, end: false },
  { to: '/employer/agreements', label: 'WorkReceipts', icon: FileCheck2, end: false },
  { to: '/employer/profile', label: 'Profile', icon: Building2, end: false },
];

export const EmployerLayout: React.FC<EmployerLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#102347]">
      {/* Employer Header */}
      <header className="safe-top sticky top-0 z-40 border-b border-[#173B78]/14 bg-[#173B78] text-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" aria-label="Back to KaamKavach home">
              <BrandMark inverted />
            </Link>
            <span className="hidden border-l border-white/20 pl-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#FF8A45] sm:inline-block">
              Employer Portal
            </span>
          </div>

          <nav
            aria-label="Employer Desktop Navigation"
            className="hidden items-center gap-1 md:flex"
          >
            {EMPLOYER_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex min-h-[40px] items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-white text-[#173B78]'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <Link
            to="/worker"
            className="inline-flex min-h-[38px] items-center gap-1.5 border border-white/25 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white hover:text-[#173B78]"
          >
            <ArrowLeftRight className="h-3.5 w-3.5 text-[#FF8A45]" />
            <span>Worker App</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-5 pb-24 sm:px-6 md:pb-12">
        {children}
      </div>

      {/* Mobile Sticky Bottom Navigation */}
      <nav
        aria-label="Employer Bottom Navigation"
        className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-[#173B78]/18 bg-white/98 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-4">
          {EMPLOYER_NAV.map((item) => {
            const Icon = item.icon;
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
