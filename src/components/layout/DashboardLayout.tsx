import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleExport = useCallback(() => {
    alert('Export functionality should be handled by the active page.');
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#02040a]">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'}`}>
        <Header
          onRefresh={handleRefresh}
          onExport={handleExport}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode((d) => !d)}
        />

        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {loading ? <LoadingState /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0b0f19]">
            <div className="skeleton h-10 w-10 rounded-lg" />
            <div className="skeleton mt-5 h-8 w-16" />
            <div className="skeleton mt-2 h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="skeleton h-14 w-full rounded-xl" />
      <div className="skeleton h-[400px] w-full rounded-xl" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="skeleton h-80 rounded-xl" />
        <div className="skeleton h-80 rounded-xl" />
      </div>
    </div>
  );
}
