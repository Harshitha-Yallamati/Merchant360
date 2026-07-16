import { useMemo } from 'react';
import { AnalyticsSection } from '../components/charts/AnalyticsSection';
import { getMerchants } from '../data/merchants';

export function AnalyticsPage() {
  const allMerchants = useMemo(() => getMerchants(), []);

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Deep Analytics</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive view of performance metrics and forecasting.</p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
        <AnalyticsSection merchants={allMerchants} />
      </section>
    </div>
  );
}
