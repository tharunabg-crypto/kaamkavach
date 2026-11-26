import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink, Container, SectionHeading } from '../components/ui';

export const NotFoundPage: React.FC = () => (
  <main className="min-h-[60vh] bg-cream py-16">
    <Container size="narrow" className="text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-electric">
        Page not found
      </p>
      <SectionHeading
        align="center"
        title="This page isn’t here."
        description="The link may have changed. Return to KaamKavach and choose a workspace."
      />
      <ButtonLink to="/" className="mt-6">
        Go to home
      </ButtonLink>
      <p className="mt-4 text-sm text-text-muted">
        Need a workspace? <Link to="/register" className="font-semibold text-electric">Register a local profile</Link>
      </p>
    </Container>
  </main>
);
