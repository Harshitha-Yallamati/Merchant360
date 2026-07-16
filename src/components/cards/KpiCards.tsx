import { memo } from 'react';
import {
  Building2,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  Activity,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';
import type { Merchant } from '../../types/merchant';
import { TrendIndicator } from '../ui/TrendIndicator';

interface KpiConfig {
  key: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  description: string;
  trend: number;
  trendInvert?: boolean;
}

const KPIS: KpiConfig[] = [
  { key: 'total', label: 'Total Merchants', icon: Building2, iconBg: 'bg-brand-50 dark:bg-brand-500/10', iconColor: 'text-brand-600 dark:text-brand-400', description: 'Active accounts', trend: 8 },
  { key: 'healthy', label: 'Healthy Merchants', icon: HeartPulse, iconBg: 'bg-emerald-50 dark:bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400', description: 'Health score 80+', trend: 5 },
  { key: 'medium', label: 'Medium Risk', icon: AlertTriangle, iconBg: 'bg-amber-50 dark:bg-amber-500/10', iconColor: 'text-amber-600 dark:text-amber-400', description: 'Needs attention', trend: -3, trendInvert: true },
  { key: 'high', label: 'High Risk', icon: ShieldAlert, iconBg: 'bg-rose-50 dark:bg-rose-500/10', iconColor: 'text-rose-600 dark:text-rose-400', description: 'Urgent outreach', trend: -2, trendInvert: true },
  { key: 'avgHealth', label: 'Average Health', icon: Activity, iconBg: 'bg-brand-50 dark:bg-brand-500/10', iconColor: 'text-brand-600 dark:text-brand-400', description: 'Across all merchants', trend: 1.2 },
  { key: 'revenueRisk', label: 'Revenue at Risk', icon: DollarSign, iconBg: 'bg-rose-50 dark:bg-rose-500/10', iconColor: 'text-rose-600 dark:text-rose-400', description: 'From at-risk merchants', trend: -4, trendInvert: true },
];

function computeKpis(merchants: Merchant[]) {
  const total = merchants.length;
  const healthy = merchants.filter((m) => m.riskLevel === 'healthy').length;
  const medium = merchants.filter((m) => m.riskLevel === 'medium').length;
  const high = merchants.filter((m) => m.riskLevel === 'high').length;
  const avgHealth = Math.round(merchants.reduce((s, m) => s + m.healthScore, 0) / total);
  const revenueRisk = merchants.filter((m) => m.riskLevel !== 'healthy').reduce((s, m) => s + m.monthlyRevenue, 0);
  return { total, healthy, medium, high, avgHealth, revenueRisk };
}

function KpiCard({ config, value }: { config: KpiConfig; value: number | string }) {
  const Icon = config.icon;
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${config.iconBg}`}>
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <TrendIndicator value={config.trendInvert ? -config.trend : config.trend} />
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">{value}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-700 dark:text-gray-300">{config.label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">{config.description}</p>
      </div>
    </div>
  );
}

export const KpiCards = memo(function KpiCards({ merchants }: { merchants: Merchant[] }) {
  const v = computeKpis(merchants);
  const values: Record<string, number | string> = {
    total: v.total,
    healthy: v.healthy,
    medium: v.medium,
    high: v.high,
    avgHealth: v.avgHealth,
    revenueRisk: `$${(v.revenueRisk / 1000).toFixed(1)}K`,
  };
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {KPIS.map((k) => (
        <KpiCard key={k.key} config={k} value={values[k.key]} />
      ))}
    </div>
  );
});
