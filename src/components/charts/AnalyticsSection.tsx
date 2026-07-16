import { memo, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from 'recharts';
import type { Merchant } from '../../types/merchant';
import { formatCurrency, formatFullCurrency } from '../../utils/format';

const RISK_COLORS = { healthy: '#10b981', medium: '#f59e0b', high: '#f43f5e' };

const tooltipStyle = {
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  fontSize: 12,
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  background: '#fff',
};

function ChartCard({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-gray-800 dark:bg-gray-900 ${className ?? ''}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export const AnalyticsSection = memo(function AnalyticsSection({ merchants }: { merchants: Merchant[] }) {
  // Revenue trend (aggregate)
  const revenueTrend = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    return months.map((month, i) => {
      const total = merchants.reduce((s, m) => {
        const t = m.revenueTrend[i];
        return s + (t?.revenue ?? 0);
      }, 0);
      const orders = merchants.reduce((s, m) => {
        const t = m.revenueTrend[i];
        return s + (t?.orders ?? 0);
      }, 0);
      return { month, revenue: Math.round(total), orders: Math.round(orders) };
    });
  }, [merchants]);

  // Risk distribution
  const riskDist = useMemo(() => {
    const counts = { healthy: 0, medium: 0, high: 0 };
    merchants.forEach((m) => counts[m.riskLevel]++);
    return [
      { name: 'Healthy', value: counts.healthy, color: RISK_COLORS.healthy },
      { name: 'Medium', value: counts.medium, color: RISK_COLORS.medium },
      { name: 'High', value: counts.high, color: RISK_COLORS.high },
    ];
  }, [merchants]);

  // Industry breakdown
  const industryData = useMemo(() => {
    const map = new Map<string, { count: number; avgHealth: number; revenue: number }>();
    merchants.forEach((m) => {
      const cur = map.get(m.industry) ?? { count: 0, avgHealth: 0, revenue: 0 };
      cur.count++;
      cur.avgHealth += m.healthScore;
      cur.revenue += m.monthlyRevenue;
      map.set(m.industry, cur);
    });
    return Array.from(map.entries())
      .map(([name, v]) => ({ name, count: v.count, avgHealth: Math.round(v.avgHealth / v.count), revenue: v.revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [merchants]);

  // Health score comparison (top/bottom 8)
  const healthComparison = useMemo(() => {
    return [...merchants]
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, 8)
      .map((m) => ({ name: m.name.length > 15 ? m.name.slice(0, 13) + '…' : m.name, score: m.healthScore, fill: RISK_COLORS[m.riskLevel] }));
  }, [merchants]);

  // Monthly orders trend
  const ordersTrend = useMemo(
    () => revenueTrend.map((d) => ({ month: d.month, orders: d.orders })),
    [revenueTrend]
  );

  // Radial health distribution
  const radialData = useMemo(() => {
    const avg = Math.round(merchants.reduce((s, m) => s + m.healthScore, 0) / merchants.length);
    return [{ name: 'Avg Health', value: avg, fill: avg >= 80 ? RISK_COLORS.healthy : avg >= 60 ? RISK_COLORS.medium : RISK_COLORS.high }];
  }, [merchants]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard title="Revenue Trend" subtitle="Total merchant revenue over 8 months" className="lg:col-span-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTrend} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="totalRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatFullCurrency(Number(v)), 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} fill="url(#totalRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Risk Distribution" subtitle="Merchant count by risk level">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={riskDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {riskDist.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Monthly Orders Trend" subtitle="Aggregate order volume">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ordersTrend} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString(), 'Orders']} />
              <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3, fill: '#8b5cf6' }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Industry Breakdown" subtitle="Revenue by industry" className="lg:col-span-2">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" height={60} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatFullCurrency(Number(v)), 'Revenue']} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Health Score Comparison" subtitle="Top 8 merchants by health score">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={healthComparison} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.3} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={100} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v), 'Health Score']} />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {healthComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Average Health Score" subtitle="Across all merchants">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="60%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <RadialBar background dataKey="value" cornerRadius={10} fill={radialData[0].fill} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-gray-900 dark:fill-white" style={{ fontSize: 28, fontWeight: 700 }}>
                {radialData[0].value}
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
});
