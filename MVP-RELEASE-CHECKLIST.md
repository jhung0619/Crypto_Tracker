# MVP Release Checklist - Google Play

## ✅ Technical Setup (DONE)

### Hardening Complete
- ✅ HTTPS-only mode enabled
- ✅ Splash screen configured (2s, blue spinner)
- ✅ Offline fallback page created
- ✅ Network state permission added
- ✅ Hardware acceleration enabled
- ✅ Back button navigation handling
- ✅ Production WebView settings
- ✅ Version set to 1.0.0 (code: 1)
- ✅ Package name: com.cryptotracker.app
- ✅ App name: Crypto Tracker
- ✅ Server URL: https://crypto-tracker-kappa-tan.vercel.app

## ❌ Assets Required (BLOCKING)

### 1. App Icon (CRITICAL)
**Status:** ❌ Using default Capacitor icon

**Required:**
- Size: 1024x1024 PNG
- Design: Crypto-themed (Bitcoin/chart/CT logo)
- Background: Not transparent
- Safe area: Keep content in center 80%

**Where to place:**
```bash
# Generate all sizes at: https://icon.kitchen/
# Or manually place:
android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png (192x192)
```

**Quick option:**
1. Go to https://icon.kitchen/
2. Upload any crypto logo (or use text "CT")
3. Download Android package
4. Extract to `android/app/src/main/res/`

### 2. Screenshots (CRITICAL)
**Status:** ❌ None created

**Required:**
- Minimum: 2 screenshots
- Recommended: 4-6 screenshots
- Format: PNG or JPEG
- Aspect ratio: 9:16 (portrait)
- Size: 1080x2280 or similar

**What to capture:**
1. **Home screen** - Signal dashboard with BTC/ETH/SOL
2. **Price chart** - 30-day sparkline
3. **Moving averages** - All 4 MAs visible
4. **Full view** - Scrolled to show sentiment + news

**How to capture:**
```bash
# Option 1: From web browser
1. Open https://crypto-tracker-kappa-tan.vercel.app
2. Open Chrome DevTools (F12)
3. Toggle device toolbar (Ctrl+Shift+M)
4. Select "Pixel 5" or similar
5. Screenshot each section

# Option 2: From Android emulator
1. Open in Android Studio emulator
2. Use emulator screenshot button
3. Crop to content
```

### 3. Feature Graphic (OPTIONAL)
**Status:** ❌ Not required for MVP

**Can wait until after first submission.**

Size: 1024x500 PNG

## ❌ Policy Documents (BLOCKING)

### Privacy Policy (CRITICAL)
**Status:** ❌ Not created

**Required:** Public URL to privacy policy

**Quick generate:**
```bash
# Use: https://app-privacy-policy-generator.firebaseapp.com/

Fill in:
- App name: Crypto Tracker
- Developer: [Your name/company]
- Data collection: None
- Third-party services: CoinGecko API, Alternative.me API
- Analytics: None
- Cookies: None

Generate HTML, then either:
A) Host on GitHub Pages (free)
B) Host on your domain
C) Use https://www.freeprivacypolicy.com/ (generates + hosts)
```

**Example simple policy:**
```
Privacy Policy for Crypto Tracker

Last updated: March 28, 2026

Crypto Tracker does not collect, store, or share any personal information.

Data sources:
- CoinGecko API (public market data)
- Alternative.me API (market sentiment)

No user accounts, no tracking, no data collection.

Contact: [your-email]
```

## ❌ Google Play Console (BLOCKING)

### 1. Developer Account
**Status:** ❌ Not created

**Required:**
- $25 one-time fee
- Google account
- Payment method

**Steps:**
1. Go to https://play.google.com/console
2. Click "Sign up"
3. Pay $25 fee
4. Verify identity (may take 48h)

### 2. App Listing
**Status:** ❌ Not created

**Required fields:**

#### App Details
```
App name: Crypto Tracker
Default language: English (United States)
```

#### Short description (80 chars max)
```
Track Bitcoin, Ethereum, and Solana with real-time prices and market insights
```

#### Full description (4000 chars max)
```
Crypto Tracker provides real-time cryptocurrency market data for Bitcoin (BTC), Ethereum (ETH), and Solana (SOL).

Features:
• Real-time price tracking
• 30-day price trend charts
• Moving averages (30/90/240/365 days)
• Market sentiment indicators
• BEARISH/NEUTRAL/BULLISH signals
• Latest crypto news

Perfect for crypto investors who want quick market insights on mobile.

Data sources: CoinGecko, Alternative.me
No account required • Free forever • Real-time data
```

#### App category
```
Category: Finance
Tags: cryptocurrency, bitcoin, ethereum, crypto tracker, market data
```

### 3. Store Listing Assets
**Upload locations in Play Console:**

| Asset | Size | Status |
|-------|------|--------|
| App icon | 512x512 | ❌ Required |
| Feature graphic | 1024x500 | ⏸️ Optional |
| Phone screenshots | 2-8 images | ❌ Required (min 2) |
| 7" tablet screenshots | 2-8 images | ⏸️ Optional |
| 10" tablet screenshots | 2-8 images | ⏸️ Optional |

### 4. Content Rating
**Status:** ❌ Not completed

**Steps:**
1. Start questionnaire
2. Answer questions:
   - Violence: No
   - Sexual content: No
   - Profanity: No
   - Drugs: No
   - Gambling: No
   - User interaction: No
   - User-generated content: No
   - Personal info sharing: No
   - Location data: No

**Expected rating:** Everyone

### 5. Target Audience & Content
**Required selections:**
```
Target age: 18+
Contains ads: No
In-app purchases: No
```

## ❌ Build Files (BLOCKING)

### Signed AAB for Production
**Status:** ❌ Not generated

**Generate in Android Studio:**
```
Build > Generate Signed Bundle / APK
> Android App Bundle
> Create new keystore (FIRST TIME ONLY):
  - Path: crypto-tracker-release.jks
  - Password: [SAVE THIS!]
  - Alias: crypto-tracker
  - Alias password: [SAVE THIS!]
  - Validity: 25 years
  - Organization: [Your name]
> Select "release" build variant
> Finish
```

**Output:** `android/app/release/app-release.aab`

**⚠️ CRITICAL: Back up keystore!**
- Save `crypto-tracker-release.jks` to cloud storage
- Save passwords in password manager
- Can NEVER update app without this keystore

## ✅ Can Wait Until Later

### Not blocking MVP release:
- ⏸️ Feature graphic (1024x500)
- ⏸️ Tablet screenshots
- ⏸️ Promotional video
- ⏸️ Custom app icon (default works for MVP)
- ⏸️ A/B testing
- ⏸️ Pre-registration campaign
- ⏸️ Staged rollout config

## 📋 Strict Blocking Summary

**To submit app, you MUST have:**

1. ❌ **Signed AAB file** (generated in Android Studio)
2. ❌ **2+ screenshots** (from web app or emulator)
3. ❌ **App icon** (512x512 PNG for Play Console)
4. ❌ **Privacy policy URL** (generated + hosted)
5. ❌ **Play Console account** ($25 paid, verified)
6. ❌ **Store listing filled** (name, description, category)
7. ❌ **Content rating completed** (questionnaire)

**Everything else is done:**
- ✅ Android project configured
- ✅ App hardened for production
- ✅ Web app deployed and working
- ✅ Capacitor wrapper ready

## ⏱️ Time Estimate

| Task | Time | Can Parallelize? |
|------|------|------------------|
| Install Android Studio | 20 min | ⏸️ Download while working |
| Create app icon | 15 min | ✅ Yes |
| Take 4 screenshots | 10 min | ✅ Yes |
| Generate privacy policy | 5 min | ✅ Yes |
| Host privacy policy | 5 min | ✅ Yes |
| Create Play account | 5 min | ❌ No (need verification) |
| Generate signed AAB | 10 min | ❌ No (needs Android Studio) |
| Fill store listing | 20 min | ❌ No (needs account) |
| Complete content rating | 10 min | ❌ No (needs account) |
| Upload AAB + submit | 5 min | ❌ No (final step) |
| **Total active time** | **~105 min** | |
| Google verification | 0-48 hours | ⏸️ Waiting |
| Review time | 1-7 days | ⏸️ Waiting |

## 🎯 Fastest Path to Submission

### Today (45 min):
1. ✅ Create app icon (15 min) - https://icon.kitchen/
2. ✅ Take 4 screenshots (10 min) - web browser
3. ✅ Generate privacy policy (5 min) - generator
4. ✅ Host privacy policy (5 min) - GitHub Pages
5. ✅ Create Play Console account (5 min) - pay $25
6. ⏸️ Wait for verification (0-48h)

### Weekend (60 min):
1. ✅ Install Android Studio (20 min)
2. ✅ Open project: `npx cap open android` (2 min)
3. ✅ Test in emulator (10 min)
4. ✅ Generate signed AAB (10 min)
5. ✅ Fill store listing (10 min)
6. ✅ Complete content rating (5 min)
7. ✅ Upload AAB + submit (3 min)

### Next Week:
1. ⏸️ Wait for Google review (1-7 days)
2. ✅ Fix any issues if rejected
3. 🚀 **Launch!**

## 🚨 Common Rejection Reasons

**Avoid these:**
1. ❌ Missing privacy policy URL
2. ❌ Screenshots don't match app
3. ❌ App crashes on launch
4. ❌ Misleading description
5. ❌ Wrong content rating
6. ❌ Broken external links
7. ❌ Icon violates guidelines (copyrighted logo)

**Play it safe:**
- Test app thoroughly before submit
- Use original icon design (not Bitcoin logo)
- Accurate description
- Complete all required fields
- Real screenshots from actual app

## ✅ Final Checklist Before Submit

**Pre-submit verification:**
- [ ] App launches in emulator without errors
- [ ] All features work (BTC/ETH/SOL load)
- [ ] Internet connection required message clear
- [ ] Back button works correctly
- [ ] Splash screen shows for 2 seconds
- [ ] App icon visible in launcher
- [ ] No crashes or ANRs
- [ ] Privacy policy URL accessible
- [ ] Screenshots match actual app
- [ ] Version code: 1, Version name: 1.0.0
- [ ] Package name: com.cryptotracker.app
- [ ] Signed with release keystore
- [ ] AAB file under 150MB (should be ~5MB)

**Submit only when ALL boxes checked.**
