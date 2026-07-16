import { RISK_STYLES } from '../../utils/format';
import type { RiskLevel } from '../../types/merchant';

export function RiskBadge({ level, size = 'sm' }: { level: RiskLevel; size?: 'sm' | 'xs' }) {
  const s = RISK_STYLES[level];
  const sizing = size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ring-1 ring-inset ${s.badge} ${sizing}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {s.label}
    </span>
  );
}
