import React from 'react';
import { useAuth } from '../context/useAuth';
import { MerchantProfile } from '../types/api';
import {
  Store,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Radio,
  Info,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const merchant = profile?.profile as MerchantProfile | null;

  if (!merchant) {
    return (
      <div className="surface-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <AlertTriangle
          size={32}
          style={{ color: 'var(--accent-signal)', marginBottom: '0.75rem' }}
        />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Merchant Profile Required
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Your user account does not have an associated merchant profile record yet.
          Please complete onboarding through the merchant registration endpoint.
        </p>
      </div>
    );
  }

  const isAssigned = Boolean(merchant.neighborhoodId && merchant.neighborhood);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.625rem',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            marginBottom: '0.35rem',
          }}
        >
          {merchant.shopName}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Merchant Shop Overview &bull; PIN Code: {merchant.pincode}
        </p>
      </div>

      {/* Neighborhood Assignment Status Alert */}
      {!isAssigned ? (
        <div className="alert alert-signal" style={{ marginBottom: '1.75rem' }}>
          <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Neighborhood Cluster Assignment Pending:</strong> Your Kirana shop is
            not yet assigned to a verified neighborhood cluster. By Mohalla Signal privacy
            rules, an administrator must assign your shop via{' '}
            <code>PATCH /api/v1/demand/merchants/{merchant.id}/neighborhood</code> before
            demand capture and quotation workflows can be initiated.
          </div>
        </div>
      ) : (
        <div className="alert alert-info" style={{ marginBottom: '1.75rem' }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Verified Cluster:</strong> Your shop is assigned to the{' '}
            <strong>{merchant.neighborhood?.name}</strong> neighborhood ({merchant.neighborhood?.city} - PIN {merchant.neighborhood?.pincode}).
            Your demand inputs will aggregate with nearby merchants under the $\ge 3$ shop privacy threshold.
          </div>
        </div>
      )}

      {/* Profile & Shop Metadata Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {/* Card 1: Shop Location & Details */}
        <div className="surface-card" style={{ padding: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Store Location
            </span>
            <Store size={18} style={{ color: 'var(--accent-primary)' }} />
          </div>

          <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {merchant.shopName}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
            {merchant.storeAddress}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
            <span className="badge badge-neutral">PIN: {merchant.pincode}</span>
            {merchant.isVerified ? (
              <span className="badge badge-primary">
                <ShieldCheck size={12} /> Verified Shop
              </span>
            ) : (
              <span className="badge badge-signal">
                <Clock size={12} /> Verification Pending
              </span>
            )}
          </div>
        </div>

        {/* Card 2: Cluster Assignment */}
        <div className="surface-card" style={{ padding: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Neighborhood Cluster
            </span>
            <MapPin size={18} style={{ color: 'var(--accent-info)' }} />
          </div>

          {merchant.neighborhood ? (
            <>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {merchant.neighborhood.name}
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                City: {merchant.neighborhood.city} &bull; PIN: {merchant.neighborhood.pincode}
              </p>
              <span className="badge badge-primary">Cluster Active</span>
            </>
          ) : (
            <>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--accent-signal)', marginBottom: '0.25rem' }}>
                Unassigned
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Awaiting administrator neighborhood assignment.
              </p>
              <span className="badge badge-signal">Pending Assignment</span>
            </>
          )}
        </div>

        {/* Card 3: Account & Session */}
        <div className="surface-card" style={{ padding: '1.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Authenticated User
            </span>
            <Radio size={18} style={{ color: 'var(--accent-signal)' }} />
          </div>

          <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            {profile?.displayName || 'Merchant Owner'}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            {profile?.email}
          </p>
          <span className="badge badge-info">Role: {profile?.role}</span>
        </div>
      </div>

      {/* Phase Roadmap Information Panel (No Fake Metrics) */}
      <div className="surface-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Info size={18} style={{ color: 'var(--accent-primary)' }} />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
            Next Workflow Capabilities (Phase B Schedule)
          </h2>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Phase A has established your verified merchant session, authenticated API client, and secure design system.
          The upcoming Phase B implementation will activate:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              1. Missed Demand Capture
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Rapid capture of unstocked customer requests with live deterministic product catalog matching.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              2. Ambiguous Match Resolver
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Confirm canonical products when customer voice or query text matches multiple catalog candidates.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
              3. Private Demand History
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Full paginated history of your shop's recorded requests without cross-merchant data leakage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
