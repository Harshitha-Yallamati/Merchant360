import type {
  Merchant,
  MerchantRaw,
  PenaltyFactor,
  RecommendedAction,
  RiskLevel,
} from '../types/merchant';

const RAW_MERCHANTS: MerchantRaw[] = [
  {
    id: 'm01',
    name: 'Bella Tavola Trattoria',
    industry: 'Restaurant',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 48200,
    previousRevenue: 51800,
    orders30Days: 3120,
    previousOrders30Days: 3480,
    loginDaysAgo: 2,
    supportTickets30Days: 1,
    failedPayments: 0,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 34,
    featureUsagePercent: 86,
  },
  {
    id: 'm02',
    name: 'Northwind Outfitters',
    industry: 'Retail',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 92400,
    previousRevenue: 88100,
    orders30Days: 5210,
    previousOrders30Days: 4980,
    loginDaysAgo: 1,
    supportTickets30Days: 2,
    failedPayments: 1,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 52,
    featureUsagePercent: 92,
  },
  {
    id: 'm03',
    name: 'Meridian Health Clinic',
    industry: 'Healthcare',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 156000,
    previousRevenue: 158400,
    orders30Days: 1840,
    previousOrders30Days: 1890,
    loginDaysAgo: 1,
    supportTickets30Days: 3,
    failedPayments: 0,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 61,
    featureUsagePercent: 78,
  },
  {
    id: 'm04',
    name: 'Wanderlust Travel Co',
    industry: 'Travel',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 38700,
    previousRevenue: 52400,
    orders30Days: 980,
    previousOrders30Days: 1640,
    loginDaysAgo: 14,
    supportTickets30Days: 7,
    failedPayments: 3,
    lastOrderDaysAgo: 9,
    accountAgeMonths: 28,
    featureUsagePercent: 41,
  },
  {
    id: 'm05',
    name: 'BrightPath Academy',
    industry: 'Education',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 21800,
    previousRevenue: 22600,
    orders30Days: 760,
    previousOrders30Days: 790,
    loginDaysAgo: 3,
    supportTickets30Days: 2,
    failedPayments: 0,
    lastOrderDaysAgo: 2,
    accountAgeMonths: 19,
    featureUsagePercent: 73,
  },
  {
    id: 'm06',
    name: 'Voltaic Electronics',
    industry: 'Electronics',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 184000,
    previousRevenue: 172000,
    orders30Days: 4100,
    previousOrders30Days: 3890,
    loginDaysAgo: 1,
    supportTickets30Days: 4,
    failedPayments: 1,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 47,
    featureUsagePercent: 88,
  },
  {
    id: 'm07',
    name: 'Atelier Mode',
    industry: 'Fashion',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 64300,
    previousRevenue: 69800,
    orders30Days: 2890,
    previousOrders30Days: 3320,
    loginDaysAgo: 6,
    supportTickets30Days: 5,
    failedPayments: 2,
    lastOrderDaysAgo: 4,
    accountAgeMonths: 23,
    featureUsagePercent: 64,
  },
  {
    id: 'm08',
    name: 'Lumière Beauty Bar',
    industry: 'Beauty',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 28400,
    previousRevenue: 27100,
    orders30Days: 1620,
    previousOrders30Days: 1580,
    loginDaysAgo: 2,
    supportTickets30Days: 1,
    failedPayments: 0,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 15,
    featureUsagePercent: 81,
  },
  {
    id: 'm09',
    name: 'QuickCrave Delivery',
    industry: 'Food Delivery',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 71200,
    previousRevenue: 74800,
    orders30Days: 8900,
    previousOrders30Days: 9400,
    loginDaysAgo: 1,
    supportTickets30Days: 6,
    failedPayments: 1,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 31,
    featureUsagePercent: 85,
  },
  {
    id: 'm10',
    name: 'CareWell Pharmacy',
    industry: 'Pharmacy',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 132000,
    previousRevenue: 134500,
    orders30Days: 3210,
    previousOrders30Days: 3280,
    loginDaysAgo: 2,
    supportTickets30Days: 3,
    failedPayments: 0,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 55,
    featureUsagePercent: 90,
  },
  {
    id: 'm11',
    name: 'Velocity Freight Logistics',
    industry: 'Logistics',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 198000,
    previousRevenue: 205000,
    orders30Days: 6800,
    previousOrders30Days: 7100,
    loginDaysAgo: 1,
    supportTickets30Days: 4,
    failedPayments: 1,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 43,
    featureUsagePercent: 83,
  },
  {
    id: 'm12',
    name: 'PeakForm Fitness Studio',
    industry: 'Fitness',
    subscriptionPlan: 'Starter',
    monthlyRevenue: 14200,
    previousRevenue: 16800,
    orders30Days: 540,
    previousOrders30Days: 720,
    loginDaysAgo: 11,
    supportTickets30Days: 4,
    failedPayments: 2,
    lastOrderDaysAgo: 8,
    accountAgeMonths: 12,
    featureUsagePercent: 38,
  },
  {
    id: 'm13',
    name: 'Saffron & Sage Kitchen',
    industry: 'Restaurant',
    subscriptionPlan: 'Starter',
    monthlyRevenue: 9800,
    previousRevenue: 11400,
    orders30Days: 410,
    previousOrders30Days: 520,
    loginDaysAgo: 18,
    supportTickets30Days: 3,
    failedPayments: 3,
    lastOrderDaysAgo: 12,
    accountAgeMonths: 8,
    featureUsagePercent: 29,
  },
  {
    id: 'm14',
    name: 'Urban Threads Apparel',
    industry: 'Fashion',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 41600,
    previousRevenue: 43200,
    orders30Days: 1980,
    previousOrders30Days: 2050,
    loginDaysAgo: 4,
    supportTickets30Days: 2,
    failedPayments: 1,
    lastOrderDaysAgo: 2,
    accountAgeMonths: 26,
    featureUsagePercent: 72,
  },
  {
    id: 'm15',
    name: 'Horizon Travel Partners',
    industry: 'Travel',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 168000,
    previousRevenue: 162000,
    orders30Days: 3200,
    previousOrders30Days: 3050,
    loginDaysAgo: 1,
    supportTickets30Days: 5,
    failedPayments: 0,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 38,
    featureUsagePercent: 89,
  },
  {
    id: 'm16',
    name: 'Scholarly Press Online',
    industry: 'Education',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 36800,
    previousRevenue: 39200,
    orders30Days: 1240,
    previousOrders30Days: 1410,
    loginDaysAgo: 9,
    supportTickets30Days: 6,
    failedPayments: 2,
    lastOrderDaysAgo: 6,
    accountAgeMonths: 21,
    featureUsagePercent: 55,
  },
  {
    id: 'm17',
    name: 'Circuit City Electronics',
    industry: 'Electronics',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 58200,
    previousRevenue: 61400,
    orders30Days: 2640,
    previousOrders30Days: 2910,
    loginDaysAgo: 7,
    supportTickets30Days: 4,
    failedPayments: 2,
    lastOrderDaysAgo: 5,
    accountAgeMonths: 17,
    featureUsagePercent: 61,
  },
  {
    id: 'm18',
    name: 'MediCare Plus Clinic',
    industry: 'Healthcare',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 89400,
    previousRevenue: 91800,
    orders30Days: 2310,
    previousOrders30Days: 2420,
    loginDaysAgo: 3,
    supportTickets30Days: 3,
    failedPayments: 1,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 33,
    featureUsagePercent: 79,
  },
  {
    id: 'm19',
    name: 'Glow & Go Cosmetics',
    industry: 'Beauty',
    subscriptionPlan: 'Starter',
    monthlyRevenue: 11200,
    previousRevenue: 13600,
    orders30Days: 680,
    previousOrders30Days: 890,
    loginDaysAgo: 16,
    supportTickets30Days: 5,
    failedPayments: 4,
    lastOrderDaysAgo: 11,
    accountAgeMonths: 10,
    featureUsagePercent: 34,
  },
  {
    id: 'm20',
    name: 'Dasher Eats Network',
    industry: 'Food Delivery',
    subscriptionPlan: 'Enterprise',
    monthlyRevenue: 142000,
    previousRevenue: 138000,
    orders30Days: 12400,
    previousOrders30Days: 11900,
    loginDaysAgo: 1,
    supportTickets30Days: 7,
    failedPayments: 1,
    lastOrderDaysAgo: 0,
    accountAgeMonths: 29,
    featureUsagePercent: 91,
  },
  {
    id: 'm21',
    name: 'RapidRx Pharmacy Group',
    industry: 'Pharmacy',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 76800,
    previousRevenue: 79200,
    orders30Days: 2890,
    previousOrders30Days: 3010,
    loginDaysAgo: 5,
    supportTickets30Days: 4,
    failedPayments: 1,
    lastOrderDaysAgo: 3,
    accountAgeMonths: 24,
    featureUsagePercent: 76,
  },
  {
    id: 'm22',
    name: 'GlobalLink Logistics',
    industry: 'Logistics',
    subscriptionPlan: 'Pro',
    monthlyRevenue: 104000,
    previousRevenue: 108000,
    orders30Days: 5400,
    previousOrders30Days: 5680,
    loginDaysAgo: 2,
    supportTickets30Days: 3,
    failedPayments: 1,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 36,
    featureUsagePercent: 82,
  },
  {
    id: 'm23',
    name: 'Iron Peak Gym Chain',
    industry: 'Fitness',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 32600,
    previousRevenue: 34100,
    orders30Days: 1480,
    previousOrders30Days: 1560,
    loginDaysAgo: 3,
    supportTickets30Days: 2,
    failedPayments: 0,
    lastOrderDaysAgo: 1,
    accountAgeMonths: 20,
    featureUsagePercent: 74,
  },
  {
    id: 'm24',
    name: 'Marketplace General Store',
    industry: 'Retail',
    subscriptionPlan: 'Starter',
    monthlyRevenue: 8400,
    previousRevenue: 10200,
    orders30Days: 380,
    previousOrders30Days: 470,
    loginDaysAgo: 21,
    supportTickets30Days: 6,
    failedPayments: 5,
    lastOrderDaysAgo: 15,
    accountAgeMonths: 6,
    featureUsagePercent: 22,
  },
  {
    id: 'm25',
    name: 'Cloud9 Travel Booking',
    industry: 'Travel',
    subscriptionPlan: 'Growth',
    monthlyRevenue: 47600,
    previousRevenue: 49800,
    orders30Days: 1820,
    previousOrders30Days: 1910,
    loginDaysAgo: 4,
    supportTickets30Days: 3,
    failedPayments: 1,
    lastOrderDaysAgo: 2,
    accountAgeMonths: 22,
    featureUsagePercent: 68,
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

function buildTrend(current: number, previous: number, ordersCurrent: number, ordersPrev: number) {
  const ratio = current / (previous || 1);
  const orderRatio = ordersCurrent / (ordersPrev || 1);
  const trend = MONTHS.map((month, i) => {
    const progress = (i + 1) / MONTHS.length;
    const rev = Math.round(previous * (1 + (ratio - 1) * progress));
    const ord = Math.round(ordersPrev * (1 + (orderRatio - 1) * progress));
    return { month, revenue: i === MONTHS.length - 1 ? current : rev, orders: i === MONTHS.length - 1 ? ordersCurrent : ord };
  });
  return trend;
}

function buildActivity(m: MerchantRaw) {
  const activity: Merchant['activity'] = [];
  const today = new Date('2026-07-16');
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  if (m.loginDaysAgo <= 2) {
    activity.push({ date: fmt(new Date(today.getTime() - m.loginDaysAgo * 86400000)), event: 'Dashboard login', type: 'success' });
  } else {
    activity.push({ date: fmt(new Date(today.getTime() - m.loginDaysAgo * 86400000)), event: 'Last dashboard login', type: 'warning' });
  }
  if (m.failedPayments > 0) {
    activity.push({ date: fmt(new Date(today.getTime() - 3 * 86400000)), event: `${m.failedPayments} failed payment(s)`, type: 'danger' });
  }
  if (m.supportTickets30Days > 0) {
    activity.push({ date: fmt(new Date(today.getTime() - 5 * 86400000)), event: `${m.supportTickets30Days} support ticket(s) opened`, type: m.supportTickets30Days > 4 ? 'warning' : 'neutral' });
  }
  activity.push({ date: fmt(new Date(today.getTime() - m.lastOrderDaysAgo * 86400000)), event: 'Last order processed', type: m.lastOrderDaysAgo > 7 ? 'warning' : 'success' });
  if (m.featureUsagePercent < 50) {
    activity.push({ date: fmt(new Date(today.getTime() - 10 * 86400000)), event: 'Low feature adoption detected', type: 'warning' });
  }
  activity.push({ date: fmt(new Date(today.getTime() - 30 * 86400000)), event: 'Monthly billing cycle', type: 'neutral' });
  return activity;
}

export function computeHealth(raw: MerchantRaw): { score: number; penalties: PenaltyFactor[] } {
  const penalties: PenaltyFactor[] = [];
  let score = 100;

  const revenueChange = ((raw.previousRevenue - raw.monthlyRevenue) / (raw.previousRevenue || 1)) * 100;
  if (revenueChange > 5) {
    const p = Math.min(25, Math.round(revenueChange * 1.5));
    score -= p;
    penalties.push({ key: 'revenue', label: 'Revenue decline', detail: `${revenueChange.toFixed(1)}% drop vs last month`, penalty: p });
  }

  const orderChange = ((raw.previousOrders30Days - raw.orders30Days) / (raw.previousOrders30Days || 1)) * 100;
  if (orderChange > 5) {
    const p = Math.min(20, Math.round(orderChange * 1.2));
    score -= p;
    penalties.push({ key: 'orders', label: 'Order volume decline', detail: `${orderChange.toFixed(1)}% fewer orders`, penalty: p });
  }

  if (raw.loginDaysAgo > 3) {
    const p = Math.min(15, (raw.loginDaysAgo - 3) * 1.5);
    score -= Math.round(p);
    penalties.push({ key: 'login', label: 'Login inactivity', detail: `${raw.loginDaysAgo} days since last login`, penalty: Math.round(p) });
  }

  if (raw.supportTickets30Days > 3) {
    const p = Math.min(15, (raw.supportTickets30Days - 3) * 3);
    score -= p;
    penalties.push({ key: 'tickets', label: 'High support volume', detail: `${raw.supportTickets30Days} tickets in 30 days`, penalty: p });
  }

  if (raw.failedPayments > 0) {
    const p = Math.min(20, raw.failedPayments * 5);
    score -= p;
    penalties.push({ key: 'payments', label: 'Failed payments', detail: `${raw.failedPayments} failed payment(s)`, penalty: p });
  }

  if (raw.lastOrderDaysAgo > 5) {
    const p = Math.min(15, (raw.lastOrderDaysAgo - 5) * 1.2);
    score -= Math.round(p);
    penalties.push({ key: 'lastOrder', label: 'No recent orders', detail: `${raw.lastOrderDaysAgo} days since last order`, penalty: Math.round(p) });
  }

  if (raw.featureUsagePercent < 60) {
    const p = Math.min(15, Math.round((60 - raw.featureUsagePercent) * 0.4));
    score -= p;
    penalties.push({ key: 'feature', label: 'Low feature adoption', detail: `${raw.featureUsagePercent}% feature usage`, penalty: p });
  }

  if (raw.accountAgeMonths < 12) {
    const p = 5;
    score -= p;
    penalties.push({ key: 'newAccount', label: 'New account', detail: `${raw.accountAgeMonths} months onboarded`, penalty: p });
  }

  return { score: Math.max(0, Math.min(100, Math.round(score))), penalties };
}

export function riskFromScore(score: number): RiskLevel {
  if (score >= 80) return 'healthy';
  if (score >= 60) return 'medium';
  return 'high';
}

export function recommendAction(raw: MerchantRaw, penalties: PenaltyFactor[]): RecommendedAction {
  const keys = new Set(penalties.map((p) => p.key));
  if (raw.failedPayments >= 3) return 'Billing assistance';
  if (keys.has('revenue') && keys.has('orders')) return 'Offer promotional discount';
  if (keys.has('login') && raw.loginDaysAgo > 10) return 'Re-engagement campaign';
  if (raw.supportTickets30Days > 5) return 'Dedicated account manager';
  if (keys.has('feature') && raw.featureUsagePercent < 50) return 'Product onboarding';
  if (keys.has('lastOrder')) return 'Schedule success call';
  if (raw.supportTickets30Days > 3) return 'Priority technical support';
  // healthy merchants
  if (raw.featureUsagePercent > 85 && raw.monthlyRevenue > raw.previousRevenue) return 'Upsell premium plan';
  return 'Schedule success call';
}

export function getMerchants(): Merchant[] {
  return RAW_MERCHANTS.map((raw) => {
    const { score, penalties } = computeHealth(raw);
    const riskLevel = riskFromScore(score);
    const recommendedAction = recommendAction(raw, penalties);
    return {
      ...raw,
      healthScore: score,
      riskLevel,
      recommendedAction,
      penalties,
      revenueChangePct: ((raw.monthlyRevenue - raw.previousRevenue) / (raw.previousRevenue || 1)) * 100,
      orderChangePct: ((raw.orders30Days - raw.previousOrders30Days) / (raw.previousOrders30Days || 1)) * 100,
      revenueTrend: buildTrend(raw.monthlyRevenue, raw.previousRevenue, raw.orders30Days, raw.previousOrders30Days),
      activity: buildActivity(raw),
    };
  });
}
