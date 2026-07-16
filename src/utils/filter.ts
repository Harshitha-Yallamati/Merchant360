import type { Merchant } from '../types/merchant';
import type { FilterState, SortOption } from '../components/filters/FilterBar';

export function applyFilters(merchants: Merchant[], filters: FilterState): Merchant[] {
  let result = merchants;

  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.industry.toLowerCase().includes(q) ||
        m.subscriptionPlan.toLowerCase().includes(q)
    );
  }
  if (filters.industry !== 'all') {
    result = result.filter((m) => m.industry === filters.industry);
  }
  if (filters.risk !== 'all') {
    result = result.filter((m) => m.riskLevel === filters.risk);
  }
  if (filters.plan !== 'all') {
    result = result.filter((m) => m.subscriptionPlan === filters.plan);
  }

  return sortMerchants(result, filters.sort);
}

const riskWeight = { high: 3, medium: 2, healthy: 1 } as const;

export function sortMerchants(merchants: Merchant[], sort: SortOption): Merchant[] {
  const sorted = [...merchants];
  switch (sort) {
    case 'risk':
      return sorted.sort((a, b) => riskWeight[b.riskLevel] - riskWeight[a.riskLevel] || a.healthScore - b.healthScore);
    case 'health':
      return sorted.sort((a, b) => a.healthScore - b.healthScore);
    case 'revenue':
      return sorted.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return sorted.sort((a, b) => a.accountAgeMonths - b.accountAgeMonths);
    case 'oldest':
      return sorted.sort((a, b) => b.accountAgeMonths - a.accountAgeMonths);
    default:
      return sorted;
  }
}

export function exportToCsv(merchants: Merchant[]) {
  const headers = [
    'Name', 'Industry', 'Plan', 'Monthly Revenue', 'Revenue Change %',
    'Orders (30d)', 'Order Change %', 'Last Login (days)', 'Failed Payments',
    'Support Tickets', 'Health Score', 'Risk Level', 'Recommended Action',
  ];
  const rows = merchants.map((m) => [
    m.name, m.industry, m.subscriptionPlan, m.monthlyRevenue,
    m.revenueChangePct.toFixed(1), m.orders30Days, m.orderChangePct.toFixed(1),
    m.loginDaysAgo, m.failedPayments, m.supportTickets30Days,
    m.healthScore, m.riskLevel, m.recommendedAction,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'merchants-export.csv';
  a.click();
  URL.revokeObjectURL(url);
}
