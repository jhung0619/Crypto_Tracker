# Crypto Tracker MVP

Mobile-first crypto tracker for BTC, ETH, and SOL with price charts, moving averages, sentiment, and news.

## Features ✅

✅ **Multi-Coin Support** — BTC, ETH, SOL  
✅ **Real-Time Prices** — Live from CoinGecko  
✅ **24h Change** — Color-coded green/red  
✅ **365-Day Charts** — Historical price visualization  
✅ **Moving Averages** — 30/90/240/365-day MAs  
✅ **MA Overlays** — Visual trend lines on chart  
✅ **Market Sentiment** — Fear & Greed Index  
✅ **Crypto News** — Latest headlines  
✅ **Error Handling** — Graceful API failure states  
✅ **Loading States** — Skeleton loaders  
✅ **Mobile-First** — Responsive design  

## Tech Stack

- **Next.js 15** (App Router)
- **TradingView Lightweight Charts** for price display
- **Tailwind CSS** for styling
- **CoinGecko API** (free tier, no auth)
- **Alternative.me** (Fear & Greed Index)

## Install & Run

```bash
cd crypto-tracker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## File Structure

```
crypto-tracker/
├── app/
│   ├── api/
│   │   ├── crypto/route.js     → Prices + historical + MAs
│   │   ├── sentiment/route.js  → Fear & Greed Index
│   │   └── news/route.js       → Crypto news
│   ├── layout.js
│   ├── page.js                 → Main dashboard
│   └── globals.css
├── components/
│   ├── Header.js               → Top header with refresh
│   ├── CoinSelector.js         → BTC/ETH/SOL tabs
│   ├── CoinCards.js            → Price overview cards
│   ├── PriceChart.js           → Interactive chart with MAs
│   ├── SentimentSummary.js     → Fear & Greed index
│   ├── MovingAverages.js       → MA table (30/90/240/365)
│   └── NewsFeed.js             → Latest news headlines
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd crypto-tracker
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Scope? (your account)
# - Link to existing project? No
# - Project name? crypto-tracker
# - Directory? ./
# - Build settings? Yes (auto-detected)
```

### Environment Variables

No API keys required — all APIs use free tiers.

### Production URL

After deployment:
- Production: `https://crypto-tracker-*.vercel.app`
- Automatic HTTPS
- Global CDN
- Edge caching

## Performance

**CoinGecko Free Tier:**
- Rate limit: ~10-50 calls/minute
- 365-day historical: 5-15s response
- Server-side caching (60s price, 1h historical)

**Optimization:**
- Next.js server-side caching
- Skeleton loaders
- Error boundaries

## Architecture

```
/app/api/*        → Server-side API routes (external calls)
/components/*     → Client React components (UI only)
Server handles    → API calls + caching + rate limits
Client handles    → Rendering + state + user interaction
```

## Notes

- TradingView Lightweight Charts
- Dark theme optimized for crypto
- Mobile-first responsive
- No external dependencies beyond Next.js stack
