import { useState, useMemo } from 'react';
import { FilterBar, type FilterState } from '../components/filters/FilterBar';
import { MerchantTable } from '../components/table/MerchantTable';
import { MerchantDrawer } from '../components/drawer/MerchantDrawer';
import { getMerchants } from '../data/merchants';
import type { Merchant } from '../types/merchant';
import { applyFilters } from '../utils/filter';

const DEFAULT_FILTERS: FilterState = {
  search: '',
  industry: 'all',
  risk: 'all',
  plan: 'all',
  sort: 'risk',
};

export function MerchantsPage() {
  const allMerchants = useMemo(() => getMerchants(), []);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [selected, setSelected] = useState<Merchant | null>(null);

  const filtered = useMemo(() => applyFilters(allMerchants, filters), [allMerchants, filters]);

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Merchant Directory</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage and analyze your complete list of merchants.</p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
        <div className="p-5">
          <FilterBar filters={filters} onChange={setFilters} resultCount={filtered.length} />
          <div className="mt-4">
            <MerchantTable merchants={filtered} onSelect={setSelected} />
          </div>
        </div>
      </section>

      <MerchantDrawer merchant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
