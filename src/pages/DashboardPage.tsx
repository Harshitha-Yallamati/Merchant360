import { useMemo } from 'react';
import { KpiCards } from '../components/cards/KpiCards';
import { AnalyticsSection } from '../components/charts/AnalyticsSection';
import { getMerchants } from '../data/merchants';

export function DashboardPage() {
  const allMerchants = useMemo(() => getMerchants(), []);

  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Overview header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">A high-level summary of your merchant portfolio health and analytics.</p>
      </div>

      <div className="space-y-6">
        <KpiCards merchants={allMerchants} />
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
        <div className="mb-6">
          <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">Revenue & Risk Trends</h2>
        </div>
        <AnalyticsSection merchants={allMerchants} />
      </section>
    </div>
  );
}
