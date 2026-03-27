# Phase 2 Complete — Multi-Coin + Moving Averages

## ✅ What's Working

### 1. Multi-Coin Support
- **BTC / ETH / SOL** all functional
- Coin selector tabs switch data dynamically
- All components update on coin change

### 2. Real Price Data
- Live prices from CoinGecko API
- 24h change percentage (color-coded green/red)
- Removed 24h high/low (not stable on free tier)

### 3. Moving Averages (Calculated)
- **30-day MA** — Short-term trend
- **90-day MA** — Medium-term trend
- **240-day MA** — Long-term trend
- **365-day MA** — Yearly average

**Calculation:**
- Server-side computation from 365 days of historical data
- Simple moving average: sum of last N days / N
- Color-coded display (green/yellow/orange/red)

### 4. Chart with MA Overlays
- 365-day historical price chart (TradingView Lightweight Charts)
- Blue line: Price
- Green line: 30-day MA overlay
- Orange line: 90-day MA overlay
- Red line: 240-day MA overlay

### 5. Error Handling
- Proper error states for failed API calls
- Loading skeletons for async data
- Graceful degradation (red error message, no crash)

### 6. Clean Architecture
- Server-side API routes (`/api/crypto`, `/api/sentiment`, `/api/news`)
- Client components fetch from internal APIs only
- No direct external API calls from browser
- Server-side caching (60s for prices, 1h for historical)

---

## File Structure

```
crypto-tracker/
├── app/
│   ├── api/
│   │   ├── crypto/route.js     → Prices + historical + MAs
│   │   ├── sentiment/route.js  → Fear & Greed (Phase 3)
│   │   └── news/route.js       → Mock news (Phase 3)
│   ├── layout.js
│   ├── page.js                 → Main dashboard
│   └── globals.css
├── components/
│   ├── Header.js               → Live clock header
│   ├── CoinSelector.js         → BTC/ETH/SOL tabs
│   ├── CoinCards.js            → Price + 24h change
│   ├── PriceChart.js           → Chart with MA overlays
│   ├── SentimentSummary.js     → (Phase 3)
│   ├── MovingAverages.js       → MA table (30/90/240/365)
│   └── NewsFeed.js             → (Phase 3)
├── package.json
├── jsconfig.json
└── README.md
```

---

## How Moving Averages Work

### Server-Side (API Route)

**File:** `app/api/crypto/route.js`

```javascript
const calculateMA = (data, period) => {
  if (data.length < period) return null;
  const slice = data.slice(-period);
  const sum = slice.reduce((acc, p) => acc + p.value, 0);
  return sum / period;
};

// Return MAs in API response
{
  ma30: calculateMA(prices, 30),
  ma90: calculateMA(prices, 90),
  ma240: calculateMA(prices, 240),
  ma365: calculateMA(prices, 365)
}
```

### Chart Overlay

**File:** `components/PriceChart.js`

```javascript
// Calculate MA line for chart overlay
const calculateMALine = (data, period) => {
  const result = [];
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const sum = slice.reduce((acc, p) => acc + p.value, 0);
    result.push({
      time: data[i].time,
      value: sum / period,
    });
  }
  return result;
};
```

**Why separate calculations?**
- Table shows current MA value (single number)
- Chart shows MA line over time (array of values)

---

## Performance Notes

**CoinGecko Free Tier Limitations:**
- Rate limit: ~10-50 calls/minute
- 365-day historical data is slow (~5-15s response)
- Chart may take 10-20s to load initially
- Switching coins rapidly can hit rate limit

**Mitigation:**
- Server-side caching (Next.js `revalidate`)
- Loading states show progress
- Error states handle failures gracefully

---

## Phase 2 Status: ✅ COMPLETE

### What Works
✅ BTC/ETH/SOL multi-coin support  
✅ Real-time prices from CoinGecko  
✅ 24h change percentage  
✅ Moving averages (30/90/240/365) calculated server-side  
✅ 365-day price chart with MA overlays  
✅ Error handling for API failures  
✅ Loading states for async data  
✅ Mobile-first responsive UI  
✅ Clean server-side architecture  

### Known Issues
⚠️ CoinGecko free tier is slow (5-15s for historical data)  
⚠️ Rate limits can trigger errors on rapid coin switching  
⚠️ Chart may timeout on very slow connections  

---

## Next: Phase 3

**Remaining Features:**
1. Sentiment summary (Fear & Greed Index)
2. News feed (real or curated)
3. Auto-refresh (polling)
4. Deploy to Vercel

**Estimated Time:** 1-2 hours
