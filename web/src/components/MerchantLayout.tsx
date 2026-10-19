import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { MerchantProfile } from '../types/api';
import {
  Radio,
  Store,
  MapPin,
  LogOut,
  LayoutDashboard,
  Search,
  History,
  TrendingUp,
  FileText,
  AlertCircle,
} from 'lucide-react';

export const MerchantLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const merchantProfile = profile?.profile as MerchantProfile | null;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4.25rem',
          }}
        >
          {/* Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-primary-subtle)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Radio size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
                Mohalla Signal
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
                Merchant Portal
              </div>
            </div>
          </div>

          {/* Shop Context & Session Control */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {merchantProfile && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                }}
              >
                <Store size={15} style={{ color: 'var(--accent-primary)' }} />
                <span style={{ fontWeight: 600 }}>{merchantProfile.shopName}</span>
                {merchantProfile.neighborhood ? (
                  <span className="badge badge-primary">
                    <MapPin size={11} /> {merchantProfile.neighborhood.name}
                  </span>
                ) : (
                  <span className="badge badge-signal">
                    <AlertCircle size={11} /> Neighborhood Pending
                  </span>
                )}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                {profile?.email || user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                title="Sign out of merchant account"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav
          style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingTop: '0.35rem',
              paddingBottom: '0.35rem',
            }}
          >
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `btn ${isActive ? 'btn-secondary' : ''}`
              }
              style={({ isActive }) => ({
                padding: '0.35rem 0.75rem',
                fontSize: '0.8125rem',
                border: 'none',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-surface-elevated)' : 'transparent',
              })}
            >
              <LayoutDashboard size={15} /> Overview
            </NavLink>

            {/* Phase B planned modules clearly marked as scheduled */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                cursor: 'default',
              }}
              title="Scheduled for Phase B implementation"
            >
              <Search size={15} /> Demand Capture
              <span className="badge badge-neutral" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                Phase B
              </span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                cursor: 'default',
              }}
              title="Scheduled for Phase B implementation"
            >
              <History size={15} /> Demand History
              <span className="badge badge-neutral" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                Phase B
              </span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                cursor: 'default',
              }}
              title="Scheduled for Phase C implementation"
            >
              <TrendingUp size={15} /> Neighborhood Signals
              <span className="badge badge-neutral" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                Phase C
              </span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.75rem',
                fontSize: '0.8125rem',
                color: 'var(--text-muted)',
                cursor: 'default',
              }}
              title="Scheduled for Phase D implementation"
            >
              <FileText size={15} /> Supplier Quotes
              <span className="badge badge-neutral" style={{ fontSize: '0.625rem', padding: '0.1rem 0.35rem' }}>
                Phase D
              </span>
            </span>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        <Outlet />
      </main>

      {/* Clean Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '1.25rem 0',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
        }}
      >
        Mohalla Signal &bull; Local Kirana & Retail Demand Intelligence &bull; Backend: <code>http://localhost:4000/api/v1</code>
      </footer>
    </div>
  );
};
