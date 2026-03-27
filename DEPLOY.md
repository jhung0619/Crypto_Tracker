# Deployment Guide

## Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free)

### Option 1: Deploy via GitHub (Easiest)

1. **Push to GitHub**
```bash
cd crypto-tracker
git init
git add .
git commit -m "Initial commit"
gh repo create crypto-tracker --public --source=. --remote=origin --push
# Or manually create repo and push
```

2. **Connect to Vercel**
- Go to https://vercel.com/new
- Import your GitHub repository
- Vercel auto-detects Next.js
- Click "Deploy"

3. **Done!**
- Production URL: `https://crypto-tracker-*.vercel.app`
- Auto-deploys on every push to main

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd crypto-tracker
vercel

# Follow prompts
# Production deployment
vercel --prod
```

### Environment Variables

**Not required** — all APIs use free tiers with no auth.

Optional (future):
```
COINGECKO_API_KEY=your_key_here
```

---

## Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
cd crypto-tracker
railway init

# Deploy
railway up
```

---

## Render

1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Deploy

---

## Performance Tips

**CoinGecko Free Tier:**
- 10-50 calls/minute
- Use server-side caching
- Enable Next.js ISR (already configured)

**Vercel Edge Config (optional upgrade):**
- Cache sentiment/news globally
- Reduce API calls
- Faster response times

---

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS (Vercel provides instructions)
4. SSL auto-provisioned

### Cloudflare (optional)
- Add Cloudflare in front for additional caching
- Free tier includes CDN + DDoS protection

---

## Monitoring

**Vercel Analytics (free):**
- Real User Monitoring (RUM)
- Web Vitals tracking
- Enable in dashboard

**Error Tracking:**
- Sentry (free tier)
- Vercel Log Drains
- Next.js error boundaries (already implemented)

---

## Scaling Considerations

**Free Tier Limits:**
- CoinGecko: 10-50 calls/min
- Vercel: 100GB bandwidth/month

**If traffic grows:**
1. Upgrade to CoinGecko Pro ($129/mo → 500 calls/min)
2. Add Redis caching (Upstash free tier)
3. Implement request queuing
4. Rate limit users client-side

---

## Troubleshooting

**Build fails:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**API errors in production:**
- Check Vercel logs
- Verify API routes are server-side (not client)
- Check CoinGecko rate limits

**Slow chart loading:**
- Expected on free tier (5-15s for 365 days)
- Consider reducing to 180 days for faster load
- Add loading timeout with retry

---

## Post-Deploy Checklist

✅ Test all 3 coins (BTC/ETH/SOL)  
✅ Verify chart loads with MAs  
✅ Check sentiment displays  
✅ Confirm news loads  
✅ Test mobile responsive  
✅ Check error states (disable network)  
✅ Verify refresh button works  
✅ Test on different browsers  

---

## Next Steps

**Immediate:**
- Share production URL
- Gather user feedback
- Monitor error rates

**Future Enhancements:**
- Auto-refresh (polling)
- More coins (top 20)
- Portfolio tracking
- Price alerts
- Historical comparison

**Performance:**
- Add Redis caching
- Implement WebSocket for real-time
- Progressive Web App (PWA)
- Service worker for offline
