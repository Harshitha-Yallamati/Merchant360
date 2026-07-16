import { useMemo } from 'react';
import { getMerchants } from '../data/merchants';
import { exportToCsv } from '../utils/filter';
import { Download, FileBarChart2, FileSpreadsheet, Users, Activity } from 'lucide-react';

export function ReportsPage() {
  const allMerchants = useMemo(() => getMerchants(), []);

  const reports = [
    {
      id: 'full-portfolio',
      title: 'Full Portfolio Export',
      description: 'A complete CSV export of all merchants, including health scores, risk levels, and recent activity metrics.',
      icon: Users,
      action: () => exportToCsv(allMerchants),
    },
    {
      id: 'high-risk',
      title: 'High-Risk Merchants Report',
      description: 'Export a targeted list of only high-risk merchants requiring immediate attention.',
      icon: Activity,
      action: () => exportToCsv(allMerchants.filter(m => m.riskLevel === 'high')),
    },
    {
      id: 'revenue-impact',
      title: 'Revenue Impact Analysis',
      description: 'Export merchants sorted by highest revenue drop month-over-month.',
      icon: FileBarChart2,
      action: () => {
        const sorted = [...allMerchants].sort((a, b) => a.revenueChangePct - b.revenueChangePct);
        exportToCsv(sorted);
      },
    },
    {
      id: 'feature-adoption',
      title: 'Low Feature Adoption Report',
      description: 'Identify merchants utilizing less than 60% of available features in their plan.',
      icon: FileSpreadsheet,
      action: () => exportToCsv(allMerchants.filter(m => m.featureUsagePercent < 60)),
    },
  ];

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Generate and export comprehensive reports for external analysis.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <report.icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{report.title}</h3>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1">
              {report.description}
            </p>
            
            <button 
              onClick={report.action}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-[#0b0f19]"
            >
              <Download className="h-4 w-4" />
              Generate CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
