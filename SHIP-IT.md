# Ship It - Final Checklist

## ✅ Technical: READY

**Wrapper hardened:**
- ✅ External links → Open in browser
- ✅ Back button → Exit app
- ✅ Splash screen → 2s blue spinner
- ✅ HTTPS-only
- ✅ Hardware acceleration
- ✅ Version: 1.0.0 (code 1)
- ✅ Package: com.cryptotracker.app

**Risks assessed:**
- ✅ Financial disclaimer present
- ✅ Vercel 99.99% uptime
- ⚠️ 6s load time (acceptable)
- ⚠️ No offline mode (disclosed)

## ❌ Blockers (3)

### 1. AAB File
```bash
npx cap open android
# Build > Generate Signed Bundle / APK
# Output: android/app/release/app-release.aab
```

### 2. Privacy Policy URL
```bash
# Generate: https://app-privacy-policy-generator.firebaseapp.com/
# Must state: No data collection, third-party APIs only
# Must include: "Not financial advice" disclaimer
```

### 3. Play Console Account
```bash
# Create: https://play.google.com/console
# Pay: $25
# Wait: 0-48h verification
```

## ⚠️ Should Fix (2)

### 4. App Icon
```bash
# Quick: https://icon.kitchen/ → Upload "CT" text
# Or: Ship with default blue icon (update later)
```

### 5. Screenshots
```bash
# Capture: 2-4 images from web app or emulator
# Size: 1080x2280 or similar (9:16)
```

## 🚀 Final Build Steps

### Step 1: Open Android Studio
```bash
npx cap open android
```

### Step 2: Test
```
Create emulator: Pixel 6, Android 13
Run app: Click ▶️
Test: All features work, no crashes
```

### Step 3: Generate AAB
```
Build > Generate Signed Bundle / APK
Create keystore (first time):
  Path: ~/crypto-tracker-release.jks
  Passwords: [SAVE IN PASSWORD MANAGER]
Select: release variant
Wait: 1-3 minutes
Backup: Copy .jks to cloud storage
```

### Step 4: Upload to Play
```
1. Fill store listing (name, description, category)
2. Upload icon (512x512) + screenshots (2-4)
3. Add privacy policy URL
4. Complete content rating questionnaire
5. Upload app-release.aab
6. Submit for review
```

## 📊 Time to Launch

| Task | Time |
|------|------|
| Generate AAB | 10 min |
| Create assets | 30 min |
| Play Console setup | 30 min |
| **Active work** | **70 min** |
| Google review | **1-7 days** |

## 🚨 Wrapper Risks

### Will NOT cause rejection:
- ✅ WebView architecture (standard)
- ✅ External API dependency (disclosed)
- ✅ Internet required (disclosed)
- ✅ Financial disclaimer (present)

### Could cause bad reviews:
- ⚠️ 6s load time → Plan v1.1 optimization
- ⚠️ No offline mode → Plan v2.0 feature
- ⚠️ Generic icon → Replace before submit

### Mitigation:
- Monitor crash reports
- Respond to reviews quickly
- Update via Vercel (instant)
- Plan v1.1 improvements

## ✅ Ready to Ship

**Decision:** ✅ **SHIP IT**

**Why:**
- Wrapper approach is solid
- Risks are minimal and disclosed
- Fast to market
- Easy to update

**Next action:**
```bash
npx cap open android
```

---

**You are 70 minutes away from submitting to Google Play.**
