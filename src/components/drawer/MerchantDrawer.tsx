import { memo, useEffect } from 'react';
import {
  X,
  Building2,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  LogIn,
  CreditCard,
  LifeBuoy,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import type { Merchant } from '../../types/merchant';
import { RiskBadge } from '../ui/RiskBadge';
import { TrendIndicator } from '../ui/TrendIndicator';
import { formatFullCurrency, formatCurrency, timeAgo, RISK_STYLES } from '../../utils/format';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const activityIcon = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  neutral: Clock,
};

const activityColor = {
  success: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
  warning: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  danger: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10',
  neutral: 'text-gray-400 bg-gray-100 dark:bg-gray-800',
};

function MetricRow({
  icon: Icon,
  label,
  value,
  trend,
  negative,
}: {
  icon: typeof ShoppingBag;
  label: string;
  value: string;
  trend?: number;
  negative?: boolean;
}) {
  const valueColor = negative ? 'text-rose-600 dark:text-rose-400' : 'text-gray-900 dark:text-white';
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Icon className="h-4 w-4 text-gray-400" />
        {label}
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${valueColor}`}>{value}</span>
        {trend !== undefined && <TrendIndicator value={trend} />}
      </div>
    </div>
  );
}

export const MerchantDrawer = memo(function MerchantDrawer({
  merchant,
  onClose,
}: {
  merchant: Merchant | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!merchant) return null;
  const s = RISK_STYLES[merchant.riskLevel];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-gray-900/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl animate-slide-in dark:bg-gray-900"
        role="dialog"
        aria-label={`${merchant.name} details`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
              <Building2 className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">{merchant.name}</h2>
              <p className="text-xs text-gray-400">{merchant.industry} · {merchant.subscriptionPlan} plan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {/* Health & Risk summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Health Score</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tabular-nums text-gray-900 dark:text-white">{merchant.healthScore}</span>
                <span className="text-sm text-gray-400">/ 100</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className={`h-full rounded-full ${s.bar} transition-all duration-700`} style={{ width: `${merchant.healthScore}%` }} />
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Risk Level</p>
              <div className="mt-2 flex items-center gap-2">
                <RiskBadge level={merchant.riskLevel} />
              </div>
              <p className="mt-3 text-xs text-gray-400">
                {merchant.riskLevel === 'high'
                  ? 'Immediate outreach recommended'
                  : merchant.riskLevel === 'medium'
                  ? 'Monitor and engage proactively'
                  : 'Account is performing well'}
              </p>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="rounded-xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-4 dark:border-brand-500/20 dark:from-brand-500/10 dark:to-gray-900">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-500/20">
                <Sparkles className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-400">AI Recommendation</p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{merchant.recommendedAction}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Generated from {merchant.penalties.length === 0 ? 'healthy account signals' : `${merchant.penalties.length} risk factor(s)`}
                </p>
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Business Metrics</h3>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              <MetricRow icon={merchant.revenueChangePct >= 0 ? TrendingUp : TrendingDown} label="Monthly Revenue" value={formatFullCurrency(merchant.monthlyRevenue)} trend={merchant.revenueChangePct} />
              <MetricRow icon={ShoppingBag} label="Orders (30 days)" value={merchant.orders30Days.toLocaleString()} trend={merchant.orderChangePct} />
              <MetricRow icon={LogIn} label="Last Login" value={timeAgo(merchant.loginDaysAgo)} negative={merchant.loginDaysAgo > 7} />
              <MetricRow icon={CreditCard} label="Failed Payments" value={String(merchant.failedPayments)} negative={merchant.failedPayments > 0} />
              <MetricRow icon={LifeBuoy} label="Support Tickets" value={String(merchant.supportTickets30Days)} negative={merchant.supportTickets30Days > 3} />
              <MetricRow icon={Calendar} label="Account Age" value={`${merchant.accountAgeMonths} months`} />
              <MetricRow icon={Sparkles} label="Feature Usage" value={`${merchant.featureUsagePercent}%`} />
            </div>
          </div>

          {/* Revenue Trend Chart */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Revenue Trend</h3>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={merchant.revenueTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(v) => [formatFullCurrency(Number(v)), 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Reasons for Churn */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Top Reasons for Churn Risk</h3>
            {merchant.penalties.length === 0 ? (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                No significant risk factors detected
              </div>
            ) : (
              <div className="space-y-2">
                {merchant.penalties.map((p) => (
                  <div key={p.key} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-rose-50 dark:bg-rose-500/10">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{p.label}</p>
                        <p className="text-xs text-gray-400">{p.detail}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-rose-600 dark:text-rose-400">-{p.penalty}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity Timeline */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Recent Activity</h3>
            <div className="space-y-3">
              {merchant.activity.map((a, i) => {
                const Icon = activityIcon[a.type];
                return (
                  <div key={i} className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${activityColor[a.type]}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      {i < merchant.activity.length - 1 && <div className="mt-1 w-px flex-1 bg-gray-200 dark:bg-gray-800" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm text-gray-900 dark:text-white">{a.event}</p>
                      <p className="text-xs text-gray-400">{a.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Action CTA */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/50">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Recommended Next Action</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{merchant.recommendedAction}</p>
              <button className="inline-flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-700">
                Take Action
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});
