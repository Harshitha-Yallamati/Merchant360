import { memo } from 'react';
import { RefreshCw, Download, Bell, Moon, Sun, Search } from 'lucide-react';

export const Header = memo(function Header({
  onRefresh,
  onExport,
  darkMode,
  onToggleDark,
}: {
  onRefresh: () => void;
  onExport: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-[#0b0f19]/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Search */}
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search anything..."
              className="block w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-3 text-sm text-gray-900 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-800 dark:bg-[#060a14]/50 dark:text-gray-100 dark:focus:bg-[#0b0f19]"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
            title="Refresh data"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
            title="Export data"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <div className="h-5 w-px bg-gray-200 mx-1 dark:bg-gray-800 hidden sm:block" />

          <button className="relative inline-flex items-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-[#0b0f19]" />
          </button>
          <button
            onClick={onToggleDark}
            className="inline-flex items-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          
          <button className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white shadow-sm ring-2 ring-white transition-transform hover:scale-105 dark:ring-[#0b0f19]">
            CS
          </button>
        </div>
      </div>
    </header>
  );
});
