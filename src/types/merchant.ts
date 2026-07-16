export type RiskLevel = 'healthy' | 'medium' | 'high';

export type Industry =
  | 'Restaurant'
  | 'Retail'
  | 'Healthcare'
  | 'Travel'
  | 'Education'
  | 'Electronics'
  | 'Fashion'
  | 'Beauty'
  | 'Food Delivery'
  | 'Pharmacy'
  | 'Logistics'
  | 'Fitness';

export type SubscriptionPlan = 'Starter' | 'Growth' | 'Pro' | 'Enterprise';

export type RecommendedAction =
  | 'Schedule success call'
  | 'Offer promotional discount'
  | 'Billing assistance'
  | 'Upsell premium plan'
  | 'Product onboarding'
  | 'Dedicated account manager'
  | 'Priority technical support'
  | 'Re-engagement campaign';

export interface MerchantRaw {
  id: string;
  name: string;
  industry: Industry;
  subscriptionPlan: SubscriptionPlan;
  monthlyRevenue: number;
  previousRevenue: number;
  orders30Days: number;
  previousOrders30Days: number;
  loginDaysAgo: number;
  supportTickets30Days: number;
  failedPayments: number;
  lastOrderDaysAgo: number;
  accountAgeMonths: number;
  featureUsagePercent: number;
}

export interface PenaltyFactor {
  key: string;
  label: string;
  detail: string;
  penalty: number;
}

export interface Merchant extends MerchantRaw {
  healthScore: number;
  riskLevel: RiskLevel;
  recommendedAction: RecommendedAction;
  penalties: PenaltyFactor[];
  revenueChangePct: number;
  orderChangePct: number;
  revenueTrend: { month: string; revenue: number; orders: number }[];
  activity: { date: string; event: string; type: 'success' | 'warning' | 'danger' | 'neutral' }[];
}
