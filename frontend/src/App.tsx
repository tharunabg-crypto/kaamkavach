import { useCallback, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { SignInPage } from './pages/SignInPage';
import { WorkerWorkspacePage } from './pages/WorkerWorkspacePage';
import { EmployerWorkspacePage } from './pages/EmployerWorkspacePage';
import { WorkerHomePage } from './pages/worker/WorkerHomePage';
import { WorkDiscoveryPage } from './pages/worker/WorkDiscoveryPage';
import { MyWorkPage } from './pages/worker/MyWorkPage';
import { WorkReceiptPage } from './pages/worker/WorkReceiptPage';
import { SkillPassportPage } from './pages/worker/SkillPassportPage';
import { KaamVaaniPage } from './pages/worker/KaamVaaniPage';
import { WorkerProfilePage } from './pages/worker/WorkerProfilePage';
import { WorkerJobDetailsPage } from './pages/worker/WorkerJobDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { EmployerDashboardPage } from './pages/employer/EmployerDashboardPage';
import { EmployerWorkersPage } from './pages/employer/EmployerWorkersPage';
import { EmployerWorkerProfilePage } from './pages/employer/EmployerWorkerProfilePage';
import { EmployerPostWorkPage } from './pages/employer/EmployerPostWorkPage';
import { EmployerRecordsPage } from './pages/employer/EmployerRecordsPage';
import { EmployerProfilePage } from './pages/employer/EmployerProfilePage';

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
    pathname.startsWith('/worker') || pathname.startsWith('/employer');
  const isApplicationRoute =
    pathname.startsWith('/worker') || pathname.startsWith('/employer');

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F8F7F3] text-[#102347]">
        <ScrollToTopOnRouteChange />
        {!isApplicationRoute && (
          <Navbar onNavigateSection={handleNavigateSection} />
        )}

        <Routes>
          <Route
            path="/"
            element={<LandingPage onNavigateSection={handleNavigateSection} />}
          />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/worker" element={<Navigate to="/worker/home" replace />} />
          <Route path="/worker/home" element={<WorkerHomePage />} />
          <Route path="/worker/find-work" element={<WorkDiscoveryPage />} />
          <Route path="/worker/jobs/:jobId" element={<WorkerJobDetailsPage />} />
          <Route path="/worker/my-work" element={<MyWorkPage />} />
          <Route path="/worker/receipts" element={<WorkReceiptPage />} />
          <Route
            path="/worker/receipts/:receiptId"
            element={<WorkReceiptPage />}
          />
          <Route path="/worker/skill-passport" element={<SkillPassportPage />} />
          <Route
            path="/worker/passport"
            element={<Navigate to="/worker/skill-passport" replace />}
          />
          <Route path="/worker/kaamvaani" element={<KaamVaaniPage />} />
          <Route path="/worker/profile" element={<WorkerProfilePage />} />
          <Route
            path="/worker/workspace"
            element={<WorkerWorkspacePage />}
          />
          <Route
            path="/employer"
            element={<Navigate to="/employer/dashboard" replace />}
          />
          <Route
            path="/employer/dashboard"
            element={<EmployerDashboardPage />}
          />
          <Route path="/employer/workers" element={<EmployerWorkersPage />} />
          <Route
            path="/employer/workers/:workerId"
            element={<EmployerWorkerProfilePage />}
          />
          <Route
            path="/employer/post-work"
            element={<EmployerPostWorkPage />}
          />
          <Route path="/employer/agreements" element={<EmployerRecordsPage />} />
          <Route path="/employer/receipts" element={<EmployerRecordsPage />} />
          <Route
            path="/employer/receipts/:receiptId"
            element={<EmployerRecordsPage />}
          />
          <Route
            path="/employer/profile"
            element={<EmployerProfilePage />}
          />
          <Route
            path="/employer/workspace"
            element={<EmployerWorkspacePage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {!hideFooterOnMobileWorkspace && (
          <Footer onNavigateSection={handleNavigateSection} />
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
