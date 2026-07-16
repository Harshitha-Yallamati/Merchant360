import { useState, useMemo } from 'react';
import { MerchantTable } from '../components/table/MerchantTable';
import { MerchantDrawer } from '../components/drawer/MerchantDrawer';
import { getMerchants } from '../data/merchants';
import type { Merchant } from '../types/merchant';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export function RiskMonitorPage() {
  const allMerchants = useMemo(() => getMerchants(), []);
  const [selected, setSelected] = useState<Merchant | null>(null);

  const atRiskMerchants = useMemo(() => {
    return allMerchants.filter((m) => m.riskLevel === 'high' || m.riskLevel === 'medium')
      .sort((a, b) => a.healthScore - b.healthScore);
  }, [allMerchants]);

  const highRiskCount = atRiskMerchants.filter((m) => m.riskLevel === 'high').length;
  const mediumRiskCount = atRiskMerchants.filter((m) => m.riskLevel === 'medium').length;

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Risk Monitor</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Identify and analyze merchants at risk of churn.</p>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-600 dark:text-red-400">High Risk Merchants</p>
            <p className="text-3xl font-bold text-red-700 dark:text-red-500">{highRiskCount}</p>
          </div>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900/50 dark:bg-yellow-900/10 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium Risk Merchants</p>
            <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-500">{mediumRiskCount}</p>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">At-Risk Portfolio</h2>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
            Sorted by Lowest Health Score
          </span>
        </div>
        <div className="p-5">
          <MerchantTable merchants={atRiskMerchants} onSelect={setSelected} />
        </div>
      </section>

      <MerchantDrawer merchant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
