# Merchant Churn Intelligence Dashboard

A production-quality internal analytics dashboard that helps Customer Success teams identify merchants at risk of churning, understand **why** they're at risk, and take the **next best action** for each merchant.

Designed in the premium SaaS style of Stripe, Linear, Vercel, and Shopify Admin.

---

## Features

### Dashboard Overview
- **Header** with refresh, export, notifications, dark-mode toggle, and user avatar
- **6 KPI cards**: Total Merchants, Healthy, Medium Risk, High Risk, Average Health Score, Revenue at Risk — each with trend indicators
- **25 realistic merchants** across 12 industries with diverse risk scenarios

### Merchant Table
- 14 columns: name, industry, plan, revenue, revenue change, orders, order change, last login, failed payments, support tickets, health score (progress bar), risk level (color badge), recommended action
- Sticky header, pagination (10 per page), clickable rows, keyboard accessible
- Color-blind-friendly status dots and badges

### Merchant Details Drawer
- Slide-in side panel with merchant overview, business metrics, health & risk score
- **AI Recommendation** card with dynamically generated next best action
- **Top reasons for churn** — penalty breakdown explaining every deduction
- Revenue trend area chart
- Recent activity timeline with typed event icons
- Recommended next action CTA

### Analytics Section
- Revenue trend (area chart)
- Risk distribution (donut chart)
- Monthly orders trend (line chart)
- Industry breakdown by revenue (bar chart)
- Health score comparison — top 8 merchants (horizontal bar)
- Average health score (radial gauge)

### Search & Filters
- Full-text search across name, industry, and plan
- Industry filter, risk filter, plan filter
- Sort by: highest risk, lowest health, revenue, name, newest, oldest
- Clear filters button

### Churn Scoring Model
Health score starts at 100 and subtracts weighted penalties based on:
- Revenue decline (>5% drop)
- Order volume decline (>5% drop)
- Login inactivity (>3 days)
- High support ticket volume (>3 tickets)
- Failed payments (per occurrence)
- No recent orders (>5 days)
- Low feature adoption (<60%)
- New account (<12 months)

Score is clamped 0–100. Risk levels: **Healthy** (80–100), **Medium** (60–79), **High** (<60).

### Recommendation Engine
Dynamically generates recommendations from the merchant's risk factors:
- Revenue falling → Offer promotional discount
- Inactive login → Re-engagement campaign
- Many support tickets → Dedicated account manager
- Payment failures → Billing assistance
- Low feature usage → Product onboarding
- Healthy & growing → Upsell premium plan

### UX Polish
- Loading skeletons on initial load and refresh
- Empty states for no-results
- Smooth fade-in and slide-in animations
- Hover states and transitions throughout
- Full dark mode support
- Keyboard accessible (Enter to open drawer, Escape to close)
- Responsive layout from mobile to desktop
- Custom scrollbars

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** build tooling
- **Tailwind CSS** with custom design tokens
- **Recharts** for data visualization
- **Lucide React** for icons

No backend, no API calls, no database — all data is local TypeScript objects.

---

## Installation

```bash
npm install
```

## Run Instructions

```bash
npm run dev
```

The dashboard runs immediately with 25 pre-loaded merchants.

### Build

```bash
npm run build
npm run typecheck
```

---

## Folder Structure

```
src/
├── components/
│   ├── cards/
│   │   └── KpiCards.tsx
│   ├── charts/
│   │   └── AnalyticsSection.tsx
│   ├── drawer/
│   │   └── MerchantDrawer.tsx
│   ├── filters/
│   │   └── FilterBar.tsx
│   ├── table/
│   │   └── MerchantTable.tsx
│   ├── ui/
│   │   ├── HealthBar.tsx
│   │   ├── RiskBadge.tsx
│   │   ├── Tooltip.tsx
│   │   └── TrendIndicator.tsx
│   └── Header.tsx
├── data/
│   └── merchants.ts          # 25 merchants + scoring + recommendation logic
├── types/
│   └── merchant.ts           # TypeScript interfaces
├── utils/
│   ├── filter.ts             # filter/sort/CSV export logic
│   └── format.ts             # currency/percent/time formatters + risk styles
├── App.tsx
├── main.tsx
└── index.css
```

---

## Design Decisions

- **Color system**: Blue primary (brand), with emerald/amber/rose for healthy/medium/high risk. No purple. Color-blind-friendly dots complement badge labels.
- **Typography**: Inter font family with 4 weights (400/500/600/700) and tabular-nums for metrics.
- **Spacing**: 8px-based spacing system with consistent card padding and section gaps.
- **Shadows**: Soft, layered shadows (`shadow-card` / `shadow-card-hover`) for depth without heaviness.
- **Business logic separation**: All scoring, filtering, sorting, and recommendation logic lives in `data/` and `utils/` — UI components are purely presentational.
- **Memoization**: KPI cards, filter bar, table, drawer, and analytics are all `memo`-wrapped; filtered/sorted lists use `useMemo`.

---

## Assumptions

- This is a read-only analytics view — no data mutation is needed.
- All merchant data is static and generated locally; no real-time updates.
- The "AI Recommendation" is rule-based, generated from the churn scoring model.
- Revenue trends are interpolated from current vs. previous month for visualization purposes.
- Customer Success user is always authenticated (no auth UI needed).

---

## Future Improvements

- Real-time data via Supabase or API integration
- Bulk action selection and outreach workflows
- Email/calendar integration for "Take Action" button
- Configurable scoring weights and thresholds
- Historical churn prediction accuracy tracking
- Cohort analysis and merchant segmentation
- Alert configuration (Slack/email notifications for risk threshold changes)
- Full virtual scrolling for large merchant datasets
- Saved filter presets and custom views
