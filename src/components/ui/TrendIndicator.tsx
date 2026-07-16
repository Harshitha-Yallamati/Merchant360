import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

export function TrendIndicator({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const isUp = value > 0;
  const isDown = value < 0;
  const isFlat = !isUp && !isDown;
  const color = isUp ? 'text-emerald-600 dark:text-emerald-400' : isDown ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400';
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${color}`}>
      <Icon className="h-3 w-3" />
      {isFlat ? '0' : `${Math.abs(value).toFixed(1)}${suffix}`}
    </span>
  );
}
