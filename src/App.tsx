import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { KpiCards } from './components/cards/KpiCards';
import { FilterBar, type FilterState } from './components/filters/FilterBar';
import { MerchantTable } from './components/table/MerchantTable';
import { MerchantDrawer } from './components/drawer/MerchantDrawer';
import { AnalyticsSection } from './components/charts/AnalyticsSection';
import { getMerchants } from './data/merchants';
import type { Merchant } from './types/merchant';
import { applyFilters, exportToCsv } from './utils/filter';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  industry: 'all',
  risk: 'all',
  plan: 'all',
  sort: 'risk',
};

export default function App() {
  const allMerchants = useMemo(() => getMerchants(), []);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const filtered = useMemo(() => applyFilters(allMerchants, filters), [allMerchants, filters]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleExport = useCallback(() => {
    exportToCsv(filtered);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
      <Header
        onRefresh={handleRefresh}
        onExport={handleExport}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
      />

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingState />
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* KPI Cards */}
            <KpiCards merchants={allMerchants} />

            {/* Filters + Table */}
            <section>
              <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
              <div className="mt-4">
                <MerchantTable merchants={filtered} onSelect={setSelected} />
              </div>
            </section>

            {/* Analytics */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Analytics</h2>
                <p className="text-sm text-gray-400">Visualize merchant health, risk distribution, and revenue trends.</p>
              </div>
              <AnalyticsSection merchants={allMerchants} />
            </section>
          </div>
        )}
      </main>

      <MerchantDrawer merchant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            <div className="skeleton h-9 w-9 rounded-lg" />
            <div className="skeleton mt-4 h-7 w-16" />
            <div className="skeleton mt-2 h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="skeleton h-12 w-full rounded-xl" />
      <div className="skeleton h-96 w-full rounded-xl" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="skeleton h-72 rounded-xl" />
        <div className="skeleton h-72 rounded-xl" />
      </div>
    </div>
  );
}
