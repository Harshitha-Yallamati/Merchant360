import { useState, useMemo } from 'react';
import { getMerchants } from '../data/merchants';
import type { Merchant, RecommendedAction } from '../types/merchant';
import { MerchantDrawer } from '../components/drawer/MerchantDrawer';
import { Lightbulb, ArrowRight, UserPlus, PhoneCall, Tag, ShieldAlert, BookOpen, HeadphonesIcon, Megaphone } from 'lucide-react';

const ACTION_ICONS: Record<RecommendedAction, any> = {
  'Schedule success call': PhoneCall,
  'Offer promotional discount': Tag,
  'Billing assistance': ShieldAlert,
  'Upsell premium plan': UserPlus,
  'Product onboarding': BookOpen,
  'Dedicated account manager': UserPlus,
  'Priority technical support': HeadphonesIcon,
  'Re-engagement campaign': Megaphone,
};

export function RecommendationsPage() {
  const allMerchants = useMemo(() => getMerchants(), []);
  const [selected, setSelected] = useState<Merchant | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<RecommendedAction, Merchant[]>();
    allMerchants.forEach(m => {
      if (!map.has(m.recommendedAction)) map.set(m.recommendedAction, []);
      map.get(m.recommendedAction)!.push(m);
    });
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [allMerchants]);

  return (
    <div className="animate-fade-in pb-12">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Recommendations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">AI-driven action plans tailored to your merchant segments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grouped.map(([action, merchants]) => {
          const Icon = ACTION_ICONS[action] || Lightbulb;
          return (
            <div key={action} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/20 dark:text-brand-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{action}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{merchants.length} merchants affected</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 mb-4">
                {merchants.slice(0, 3).map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800/60 bg-gray-50 dark:bg-gray-800/20">
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{m.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">Score: {m.healthScore}</span>
                    </div>
                    <button 
                      onClick={() => setSelected(m)}
                      className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 p-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {merchants.length > 3 && (
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
                    + {merchants.length - 3} more merchants
                  </p>
                )}
              </div>
              
              <button className="mt-auto w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors">
                View All for this Action
              </button>
            </div>
          );
        })}
      </div>

      <MerchantDrawer merchant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
