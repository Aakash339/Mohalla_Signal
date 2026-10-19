import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ShieldAlert, LogOut, Loader2 } from 'lucide-react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, profile, loading, profileLoading, signOut } = useAuth();
  const location = useLocation();

  if (loading || (user && profileLoading && !profile)) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-secondary)',
        }}
      >
        <Loader2
          size={32}
          className="spin"
          style={{
            color: 'var(--accent-primary)',
            animation: 'spin 1s linear infinite',
          }}
        />
        <p style={{ fontSize: '0.875rem' }}>Verifying merchant session...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle authenticated user with non-merchant role
  if (profile && profile.role !== 'MERCHANT') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div
          className="surface-card"
          style={{ maxWidth: '480px', width: '100%', padding: '2rem' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--accent-signal)',
              marginBottom: '1rem',
            }}
          >
            <ShieldAlert size={28} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              Merchant Access Required
            </h2>
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            You are signed in as{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {profile.email || user.email}
            </strong>{' '}
            with role{' '}
            <span className="badge badge-info">{profile.role}</span>.
            The Mohalla Signal dashboard requires an authenticated account with
            the <span className="badge badge-primary">MERCHANT</span> role.
          </p>

          <div
            className="alert alert-info"
            style={{ fontSize: '0.8125rem', marginBottom: '1.5rem' }}
          >
            To onboard this account as a Kirana merchant, please use the merchant onboarding endpoint or sign in with an authorized merchant account.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button
              onClick={() => signOut()}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
