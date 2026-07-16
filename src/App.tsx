import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MerchantsPage } from './pages/MerchantsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { RiskMonitorPage } from './pages/RiskMonitorPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter basename="/Merchant360">
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="merchants" element={<MerchantsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="risk-monitor" element={<RiskMonitorPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
