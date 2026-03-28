# Exact Build Path - Android Studio to Google Play

## Prerequisites

**Install Android Studio:**
```bash
# Download: https://developer.android.com/studio
# Version: Latest stable (Hedgehog 2023.1.1 or newer)
# Install default settings
# Wait for SDK download to complete (~2GB)
```

## Step-by-Step Build Path

### Phase 1: Open Project in Android Studio

#### 1. Open Terminal
```bash
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker
```

#### 2. Sync Capacitor (if you made any changes)
```bash
npx cap sync android
```

#### 3. Open in Android Studio
```bash
npx cap open android
```

**What happens:**
- Android Studio launches automatically
- Gradle sync starts (wait 1-2 minutes)
- Project structure appears in left panel

**If Gradle sync fails:**
```bash
# In Android Studio:
File > Sync Project with Gradle Files
```

### Phase 2: Test on Emulator

#### 1. Create Virtual Device (First Time Only)
```
Tools > Device Manager > Create Virtual Device

Select device:
> Phone > Pixel 6 > Next

Select system image:
> Android 13 (Tiramisu) API 33 > Download > Next > Finish
```

**Wait for download:** ~800MB, takes 3-5 minutes

#### 2. Run App
```
1. Select emulator from device dropdown (top toolbar)
2. Click green play button ▶️ (or Shift+F10)
3. Wait for emulator to boot (~30 seconds)
4. App launches automatically
```

**Expected result:**
- Splash screen shows (2 seconds, blue spinner)
- App loads Vercel deployment
- Signal dashboard visible
- BTC/ETH/SOL prices load

**If app doesn't load:**
```
# Check emulator internet:
Open Chrome in emulator > visit google.com

# If no internet:
Emulator menu (⋮) > Settings > Proxy > Use Android Studio HTTP proxy
```

#### 3. Test Features
**Test checklist:**
- [ ] App launches without crash
- [ ] Splash screen shows
- [ ] Prices load for BTC
- [ ] Switch to ETH - prices load
- [ ] Switch to SOL - prices load
- [ ] Chart displays (30-day bars)
- [ ] Tap chart bar - price shows below
- [ ] MAs display (all 4)
- [ ] Sentiment shows
- [ ] News shows
- [ ] Refresh button works
- [ ] Back button (emulator) works correctly

### Phase 3: Test on Physical Device (Optional but Recommended)

#### 1. Enable Developer Options on Phone
```
Settings > About Phone > tap "Build Number" 7 times
```

#### 2. Enable USB Debugging
```
Settings > System > Developer Options > USB Debugging > ON
```

#### 3. Connect Phone via USB
```
# Approve prompt on phone
# Phone appears in Android Studio device dropdown
# Click Run ▶️
```

**Better test than emulator because:**
- Real network conditions
- Real touch interaction
- Actual performance

### Phase 4: Generate Signed AAB for Google Play

#### 1. Start Build Process
```
Build > Generate Signed Bundle / APK
> Select "Android App Bundle"
> Click Next
```

#### 2. Create Keystore (FIRST TIME ONLY)

**⚠️ YOU ONLY DO THIS ONCE. NEVER LOSE THIS FILE.**

```
> Click "Create new..."

Key store path: /Users/johnhung/crypto-tracker-release.jks
Password: [Choose strong password - SAVE IN PASSWORD MANAGER]
Confirm password: [Same password]

> Click OK

Alias: crypto-tracker
Password: [Choose strong password - SAVE IN PASSWORD MANAGER]
Confirm: [Same password]
Validity (years): 25

Certificate:
First and Last Name: [Your name]
Organizational Unit: [Your company or leave blank]
Organization: [Your company or leave blank]
City or Locality: [Your city]
State or Province: [Your state]
Country Code: [TW for Taiwan, US for USA, etc.]

> Click OK
```

**CRITICAL: Backup keystore NOW**
```bash
# Copy keystore to safe location:
cp ~/crypto-tracker-release.jks ~/Dropbox/crypto-tracker-release.jks
# Or Google Drive, iCloud, etc.

# Save passwords in password manager:
Keystore password: [password]
Key alias: crypto-tracker
Key password: [password]
```

**Without this keystore, you can NEVER update your app. Google requires the same keystore forever.**

#### 3. Sign the Bundle (Every Time)

**After first time, you'll see:**
```
Key store path: [Browse to crypto-tracker-release.jks]
Key store password: [Enter saved password]
Key alias: crypto-tracker
Key password: [Enter saved password]
☑ Remember passwords

> Click Next
```

**Build Options:**
```
Destination Folder: [Leave default or choose location]
Build Variants: release
☑ Export encrypted key

> Click Finish
```

#### 4. Wait for Build
```
# Bottom of Android Studio shows progress:
"Gradle Build Running..."

# Takes 1-3 minutes
# When done: "Generate Signed Bundle: APK(s) generated successfully"
```

#### 5. Locate AAB File
```
# Default location:
android/app/release/app-release.aab

# Click "locate" in success dialog
# File size should be ~5-10MB
```

**Verify AAB:**
```bash
# Check file exists:
ls -lh android/app/release/app-release.aab

# Output should show:
# -rw-r--r-- ... ~5.0M ... app-release.aab
```

### Phase 5: Upload to Google Play Console

#### 1. Log into Play Console
```
https://play.google.com/console

# Select your developer account
# Click "Create app" (if first time)
```

#### 2. Create App (First Time)
```
App name: Crypto Tracker
Default language: English (United States)
App or game: App
Free or paid: Free

Declarations:
☑ I confirm this app complies with Google Play policies
☑ I confirm this is not a gambling app with real-world prizes

> Create app
```

#### 3. Complete Dashboard Tasks

**Required before first release:**

**A) Store Settings**
```
Store presence > Main store listing

App name: Crypto Tracker
Short description: Track Bitcoin, Ethereum, and Solana with real-time prices and insights
Full description: [Copy from MVP-RELEASE-CHECKLIST.md]

App icon: [Upload 512x512 PNG]
Feature graphic: [Skip for MVP or upload 1024x500]
Phone screenshots: [Upload 2-8 PNG/JPEG files]

Category: Finance
Email: [Your support email]

> Save
```

**B) Privacy Policy**
```
Store settings > App content > Privacy policy

Privacy policy URL: https://[your-privacy-policy-url]

> Save
```

**C) Content Rating**
```
Store settings > App content > Content rating

> Start questionnaire
Answer all questions honestly
Most likely result: ESRB Everyone

> Save
```

**D) Target Audience**
```
Store settings > App content > Target audience

Target age groups: ☑ 18+

> Save
```

**E) Data Safety**
```
Store settings > App content > Data safety

Does your app collect or share user data?
○ No

> Save
```

#### 4. Create Release

```
Production > Create new release

> Upload: [Select app-release.aab]
> Wait for upload (30 seconds)
> Automatic checks run (1 minute)

Release name: 1 (1.0.0)

Release notes:
"Initial release of Crypto Tracker
• Real-time BTC/ETH/SOL prices
• 30-day price charts
• Moving averages
• Market sentiment
• Crypto news"

> Save > Review release
```

#### 5. Review and Submit

**Pre-submit checklist shows all requirements:**
- ✅ Store listing complete
- ✅ Content rating complete
- ✅ Privacy policy added
- ✅ App content declarations complete
- ✅ App bundle uploaded

**If all green:**
```
> Start rollout to Production

Confirm: "Yes, I want to roll out this release"
```

**Status changes to:**
```
"In review" - Review in progress (1-7 days)
```

### Phase 6: Wait for Review

**Timeline:**
- **Submission:** Instant
- **Review starts:** Within 24 hours
- **Review duration:** 1-7 days (usually 2-3 days)
- **Publication:** Instant after approval

**Monitor status:**
```
Play Console > Dashboard > Production status

Possible statuses:
- "In review" → Wait
- "Changes requested" → Fix and resubmit
- "Approved" → Published! 🎉
- "Rejected" → Read reason, fix, resubmit
```

## Common Issues & Fixes

### Issue: Gradle sync failed
```
Error: "Could not resolve dependencies"

Fix:
File > Invalidate Caches > Invalidate and Restart
Wait for re-sync
```

### Issue: Emulator won't start
```
Error: "Emulator: Process finished with exit code 1"

Fix:
1. Tools > Device Manager > Delete device
2. Create new device with less RAM (2GB instead of 4GB)
3. Or update emulator: SDK Manager > SDK Tools > Android Emulator
```

### Issue: App shows blank screen
```
Symptom: Splash screen shows, then white screen

Fix:
1. Check Vercel URL in browser: https://crypto-tracker-kappa-tan.vercel.app
2. Check emulator internet: Open Chrome > visit google.com
3. Check Android logs: Logcat panel in Android Studio
```

### Issue: Can't find keystore
```
Error: "Key store not found"

Fix:
Browse to exact path: /Users/johnhung/crypto-tracker-release.jks
Or recreate keystore (will need to create NEW app in Play Console)
```

### Issue: Upload fails in Play Console
```
Error: "Upload failed"

Fix:
1. Check file size < 150MB (should be ~5MB)
2. Verify file is .aab not .apk
3. Try Chrome instead of other browser
4. Check internet connection
```

### Issue: Review rejected
```
Reason: Various

Fix:
1. Read full rejection message in Play Console
2. Fix specific issue mentioned
3. Increment version code (1 → 2)
4. Generate new AAB
5. Create new release
6. Resubmit
```

## Files Generated During Build

```
android/app/release/
├── app-release.aab              ← Upload to Play Console
├── app-release.aab.idsig
└── output-metadata.json

~/crypto-tracker-release.jks     ← BACKUP THIS FILE!
```

## Post-Submission

**After submitted:**
1. ✅ Wait for review status email
2. ✅ Monitor Play Console dashboard daily
3. ✅ Respond to any Google requests within 7 days
4. ✅ Fix issues immediately if rejected

**After approved:**
1. 🎉 App is LIVE on Google Play!
2. ✅ Share Play Store link with users
3. ✅ Monitor crash reports in Play Console
4. ✅ Respond to user reviews
5. ✅ Plan v1.1 updates

**Play Store link:**
```
https://play.google.com/store/apps/details?id=com.cryptotracker.app
```

## Quick Reference Commands

```bash
# Sync changes to Android
npx cap sync android

# Open in Android Studio
npx cap open android

# Check what's in APK (after build)
cd android/app/release
unzip -l app-release.aab

# Test locally before upload
# (Use Android Studio Run button)
```

## Troubleshooting Checklist

**Before generating AAB:**
- [ ] Latest changes synced: `npx cap sync android`
- [ ] Gradle build successful
- [ ] App tested in emulator
- [ ] No crashes or errors
- [ ] All features working

**Before uploading to Play:**
- [ ] AAB file generated successfully
- [ ] Keystore backed up safely
- [ ] Store listing complete
- [ ] Screenshots uploaded
- [ ] Privacy policy URL added
- [ ] Content rating completed
- [ ] All Play Console requirements green

**After rejection:**
- [ ] Read rejection message completely
- [ ] Fix specific issue mentioned
- [ ] Increment versionCode in build.gradle
- [ ] Test fix thoroughly
- [ ] Generate new AAB
- [ ] Resubmit within 7 days

## Success Criteria

**You know build was successful when:**
1. ✅ Android Studio shows "Build Successful"
2. ✅ File exists: `android/app/release/app-release.aab`
3. ✅ File size: ~5-10MB
4. ✅ No error messages in Build output

**You know upload was successful when:**
5. ✅ Play Console shows "Processing" then "Ready"
6. ✅ No error messages about bundle
7. ✅ Version shows in Releases dashboard
8. ✅ Green checkmarks on all requirements

**You know you're ready to submit when:**
9. ✅ All dashboard requirements complete
10. ✅ "Review release" button available
11. ✅ No warnings or errors shown
12. ✅ Can click "Start rollout to production"

---

**Total time from start to submit: 60-90 minutes of active work**

**Start now:** `npx cap open android`
