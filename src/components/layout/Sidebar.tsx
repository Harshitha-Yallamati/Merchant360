import { memo, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  BarChart3,
  AlertTriangle,
  Lightbulb,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAVIGATION = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Merchants', path: '/merchants', icon: Store },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Risk Monitor', path: '/risk-monitor', icon: AlertTriangle },
  { name: 'Recommendations', path: '/recommendations', icon: Lightbulb },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar = memo(function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-200 bg-white/90 backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] dark:border-gray-800 dark:bg-[#060a14]/90 flex flex-col ${
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Branding */}
      <div className={`flex items-center gap-3 px-4 py-6 ${isCollapsed ? 'justify-center px-0' : ''}`}>
        <div className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-brand-700 shadow-md">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col animate-fade-in overflow-hidden whitespace-nowrap">
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
              Merchant360
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
              Intelligence Platform
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto overflow-x-hidden">
        {NAVIGATION.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`
            }
            title={isCollapsed ? item.name : undefined}
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                  } ${isCollapsed ? 'h-6 w-6' : 'h-5 w-5'}`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onToggle}
          className={`flex h-10 w-full items-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 ${
            isCollapsed ? 'justify-center' : 'justify-between px-3'
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
});
