import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandMark } from './BrandMark';
import { PwaInstallButton } from './PwaInstallButton';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'For Workers', id: 'for-workers' },
  { label: 'For Employers', id: 'for-employers' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSectionClick = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      onNavigateSection(id);
    }
  };

  return (
    <header
      className={`safe-top sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[#173B78]/14 bg-[#F8F7F3]/95 backdrop-blur-md'
          : 'border-b border-[#173B78]/8 bg-[#F8F7F3]/90 backdrop-blur-xs'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              onNavigateSection('home');
            }
          }}
          className="min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3478F6]"
          aria-label="KaamKavach Home"
        >
          <BrandMark />
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleSectionClick(link.id)}
              className="text-sm font-semibold text-[#102347]/80 transition-colors hover:text-[#173B78]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <PwaInstallButton compact />
          <Link
            to="/signin"
            className="inline-flex min-h-[42px] items-center px-4 py-2 text-sm font-semibold text-[#173B78] transition-colors hover:bg-[#173B78]/6"
          >
            Sign In
          </Link>
          <Link
            to="/get-started"
            className="inline-flex min-h-[42px] items-center gap-1.5 bg-[#173B78] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3478F6]"
          >
            <span>Get Started</span>
            <ArrowUpRight className="h-4 w-4 text-[#FF8A45]" />
          </Link>
        </div>

        {/* Mobile Actions + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/get-started"
            className="inline-flex min-h-[40px] items-center bg-[#173B78] px-3.5 text-xs font-bold text-white"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#173B78]/18 bg-white text-[#173B78]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-[#173B78]/12 bg-[#F8F7F3] lg:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="space-y-1 px-4 pt-3 pb-6"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleSectionClick(link.id)}
                  className="flex min-h-[48px] w-full items-center justify-between border-b border-[#173B78]/10 py-3 text-left text-base font-semibold text-[#102347] active:bg-[#173B78]/5"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#3478F6]" />
                </button>
              ))}

              <div className="pt-3 flex flex-wrap gap-2">
                <PwaInstallButton />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <Link
                  to="/signin"
                  className="flex min-h-[48px] items-center justify-center border border-[#173B78]/25 bg-white text-sm font-semibold text-[#173B78]"
                >
                  Sign In
                </Link>
                <Link
                  to="/get-started"
                  className="flex min-h-[48px] items-center justify-center bg-[#173B78] text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
