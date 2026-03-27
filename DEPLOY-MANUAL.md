# Manual Deployment to Vercel

## ✅ Build Verified

Build completed successfully:
- Route: / (155 kB)
- 3 API routes: /api/crypto, /api/sentiment, /api/news
- No build errors

## Option 1: Deploy via Vercel Web UI (Simplest)

### Step 1: Push to GitHub

```bash
# From crypto-tracker directory
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker

# Create GitHub repo manually at https://github.com/new
# Name: crypto-tracker
# Public
# Don't initialize with README

# Then push:
git remote add origin https://github.com/YOUR_USERNAME/crypto-tracker.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository: `crypto-tracker`
4. Vercel auto-detects Next.js settings
5. Click "Deploy"
6. Wait 2-3 minutes for deployment
7. Get your live URL: `https://crypto-tracker-*.vercel.app`

### Environment Variables

**None required** — all APIs use free tiers without authentication.

---

## Option 2: Deploy via Vercel CLI (If npm cache fixed)

```bash
# Fix npm permissions first
sudo chown -R 501:20 "/Users/johnhung/.npm"

# Install Vercel CLI
npm install -g vercel

# Deploy
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker
vercel --prod
```

---

## Current Status

**Ready for deployment:**
- ✅ Git initialized
- ✅ Initial commit created
- ✅ Build passing (npm run build successful)
- ✅ All features tested locally
- ✅ No environment variables needed

**Next:** Push to GitHub and deploy via Vercel web UI

---

## Post-Deploy Checklist

After deployment:

1. **Test live URL:**
   - BTC/ETH/SOL prices load
   - Charts display
   - Moving averages calculated
   - Sentiment shows
   - News loads

2. **Performance:**
   - Initial load < 3s
   - Chart load < 15s (CoinGecko free tier)

3. **Mobile:**
   - Test on real device
   - Responsive layout works
   - Touch targets sized correctly

---

## Troubleshooting

**If build fails on Vercel:**
- Check Node version (16+)
- Verify package.json has all dependencies
- Look at Vercel deployment logs

**If APIs fail in production:**
- Check Vercel function logs
- Verify CoinGecko is accessible
- Check rate limits

**If chart doesn't load:**
- Expected on free tier (5-15s)
- Check browser console for errors
- Verify TradingView chart library loaded
