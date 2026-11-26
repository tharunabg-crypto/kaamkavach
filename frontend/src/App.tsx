import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { SignInPage } from './pages/SignInPage';
import { WorkerWorkspacePage } from './pages/WorkerWorkspacePage';
import { EmployerWorkspacePage } from './pages/EmployerWorkspacePage';

function ScrollToTopOnRouteChange() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const routeState = state as { scrollTo?: string } | null;
    if (!routeState?.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, state]);

  return null;
}

export function App() {
  const { pathname } = useLocation();

  const handleNavigateSection = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const hideFooterOnMobileWorkspace =
    pathname === '/worker' || pathname === '/employer';

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#102347]">
      <ScrollToTopOnRouteChange />
      <Navbar onNavigateSection={handleNavigateSection} />

      <Routes>
        <Route
          path="/"
          element={<LandingPage onNavigateSection={handleNavigateSection} />}
        />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/worker" element={<WorkerWorkspacePage />} />
        <Route path="/employer" element={<EmployerWorkspacePage />} />
        <Route
          path="*"
          element={<LandingPage onNavigateSection={handleNavigateSection} />}
        />
      </Routes>

      <div className={hideFooterOnMobileWorkspace ? 'hidden md:block' : ''}>
        <Footer onNavigateSection={handleNavigateSection} />
      </div>
    </div>
  );
}

export default App;
