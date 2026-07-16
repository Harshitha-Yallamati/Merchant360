import { RISK_STYLES } from '../../utils/format';
import type { RiskLevel } from '../../types/merchant';

export function HealthBar({ score, riskLevel }: { score: number; riskLevel: RiskLevel }) {
  const s = RISK_STYLES[riskLevel];
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full ${s.bar} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">{score}</span>
    </div>
  );
}
