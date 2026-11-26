import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Card, Container, SectionHeading } from '../components/ui';

export const ForgotPasswordPage: React.FC = () => (
  <main className="min-h-[calc(100vh-4rem)] bg-cream py-10 sm:py-14">
    <Container size="narrow">
      <Card variant="surface" padding="lg" className="mx-auto max-w-xl">
        <SectionHeading
          title="Account recovery"
          description="Password recovery is not available in this frontend preview."
        />
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-control border border-status-warning/25 bg-status-warning-soft p-4 text-sm leading-relaxed text-status-warning"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            No authentication provider or password-reset service is connected.
            No reset request was sent and no account access can be recovered here.
          </p>
        </div>
        <Link
          to="/sign-in"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-control border border-navy/20 px-4 text-sm font-semibold text-navy hover:bg-cream"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </Card>
    </Container>
  </main>
);
