import { memo, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import type { Merchant } from '../../types/merchant';
import { RiskBadge } from '../ui/RiskBadge';
import { HealthBar } from '../ui/HealthBar';
import { TrendIndicator } from '../ui/TrendIndicator';
import { formatCurrency, timeAgo } from '../../utils/format';

const PAGE_SIZE = 10;

const COLUMNS = [
  { key: 'name', label: 'Merchant', sortable: false },
  { key: 'industry', label: 'Industry', sortable: false },
  { key: 'subscriptionPlan', label: 'Plan', sortable: false },
  { key: 'monthlyRevenue', label: 'Revenue', sortable: false },
  { key: 'revenueChangePct', label: 'Rev Change', sortable: false },
  { key: 'orders30Days', label: 'Orders', sortable: false },
  { key: 'orderChangePct', label: 'Order Change', sortable: false },
  { key: 'loginDaysAgo', label: 'Last Login', sortable: false },
  { key: 'failedPayments', label: 'Failed Pmts', sortable: false },
  { key: 'supportTickets30Days', label: 'Tickets', sortable: false },
  { key: 'healthScore', label: 'Health', sortable: false },
  { key: 'riskLevel', label: 'Risk', sortable: false },
  { key: 'recommendedAction', label: 'Action', sortable: false },
] as const;

export const MerchantTable = memo(function MerchantTable({
  merchants,
  onSelect,
}: {
  merchants: Merchant[];
  onSelect: (m: Merchant) => void;
}) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(merchants.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(0, totalPages - 1));

  const pageData = useMemo(
    () => merchants.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE),
    [merchants, currentPage]
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur dark:bg-gray-900/95">
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                <ArrowUpDown className="h-3 w-3" />
              </th>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {pageData.map((m) => (
              <tr
                key={m.id}
                onClick={() => onSelect(m)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSelect(m);
                }}
                className="cursor-pointer transition-colors hover:bg-brand-50/50 dark:hover:bg-brand-500/5 focus:bg-brand-50 dark:focus:bg-brand-500/10 focus:outline-none"
              >
                <td className="px-4 py-3">
                  <span className={`inline-block h-2 w-2 rounded-full ${
                    m.riskLevel === 'high' ? 'bg-rose-500' : m.riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="font-medium text-gray-900 dark:text-white">{m.name}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">{m.industry}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {m.subscriptionPlan}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium tabular-nums text-gray-900 dark:text-white">
                  {formatCurrency(m.monthlyRevenue)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <TrendIndicator value={m.revenueChangePct} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-gray-600 dark:text-gray-400">
                  {m.orders30Days.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <TrendIndicator value={m.orderChangePct} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                  {timeAgo(m.loginDaysAgo)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={m.failedPayments > 0 ? 'font-semibold text-rose-600 dark:text-rose-400' : 'text-gray-400'}>
                    {m.failedPayments}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={m.supportTickets30Days > 3 ? 'font-semibold text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}>
                    {m.supportTickets30Days}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <HealthBar score={m.healthScore} riskLevel={m.riskLevel} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <RiskBadge level={m.riskLevel} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{m.recommendedAction}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No merchants found</p>
          <p className="mt-1 text-xs text-gray-400">Try adjusting your filters or search</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-800">
          <p className="text-xs text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="inline-flex items-center rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage >= totalPages - 1}
              className="inline-flex items-center rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-gray-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
