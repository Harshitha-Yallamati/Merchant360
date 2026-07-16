import { memo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import type { Industry, SubscriptionPlan } from '../../types/merchant';

export type SortOption = 'risk' | 'health' | 'revenue' | 'name' | 'newest' | 'oldest';

export interface FilterState {
  search: string;
  industry: Industry | 'all';
  risk: 'all' | 'healthy' | 'medium' | 'high';
  plan: SubscriptionPlan | 'all';
  sort: SortOption;
}

export const SORT_LABELS: Record<SortOption, string> = {
  risk: 'Highest risk',
  health: 'Lowest health score',
  revenue: 'Revenue',
  name: 'Name',
  newest: 'Newest',
  oldest: 'Oldest',
};

const INDUSTRIES: Industry[] = [
  'Restaurant', 'Retail', 'Healthcare', 'Travel', 'Education', 'Electronics',
  'Fashion', 'Beauty', 'Food Delivery', 'Pharmacy', 'Logistics', 'Fitness',
];
const PLANS: SubscriptionPlan[] = ['Starter', 'Growth', 'Pro', 'Enterprise'];

const selectClass =
  'appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 transition-colors hover:border-gray-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600';

export const FilterBar = memo(function FilterBar({
  filters,
  onChange,
  resultCount,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}) {
  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });
  const hasActiveFilters =
    filters.industry !== 'all' || filters.risk !== 'all' || filters.plan !== 'all' || filters.search !== '';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Search merchants..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 transition-colors hover:border-gray-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </div>
          <div className="relative">
            <select
              value={filters.industry}
              onChange={(e) => update({ industry: e.target.value as Industry | 'all' })}
              className={selectClass}
            >
              <option value="all">All Industries</option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filters.risk}
              onChange={(e) => update({ risk: e.target.value as FilterState['risk'] })}
              className={selectClass}
            >
              <option value="all">All Risk</option>
              <option value="healthy">Healthy</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filters.plan}
              onChange={(e) => update({ plan: e.target.value as SubscriptionPlan | 'all' })}
              className={selectClass}
            >
              <option value="all">All Plans</option>
              {PLANS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value as SortOption })}
              className={selectClass}
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
                <option key={s} value={s}>{SORT_LABELS[s]}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => onChange({ search: '', industry: 'all', risk: 'all', plan: 'all', sort: filters.sort })}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Showing <span className="font-semibold text-gray-600 dark:text-gray-300">{resultCount}</span> merchants
      </p>
    </div>
  );
});
