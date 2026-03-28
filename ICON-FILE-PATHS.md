# Exact Icon File Paths

## Android Project Icon Locations

Replace these files in your project:

```
/Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker/android/app/src/main/res/

├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48)
│   └── ic_launcher_round.png (48x48)
│
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72)
│   └── ic_launcher_round.png (72x72)
│
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96)
│   └── ic_launcher_round.png (96x96)
│
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144)
│   └── ic_launcher_round.png (144x144)
│
└── mipmap-xxxhdpi/
    ├── ic_launcher.png (192x192)
    └── ic_launcher_round.png (192x192)
```

## Play Console Icon

Separate file for Play Console upload:

```
Save to Desktop or easy-to-find location:
~/Desktop/crypto-tracker-icon-512.png (512x512)
```

## Manual Replacement Steps

**If you download individual PNG files:**

```bash
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker/android/app/src/main/res

# Replace each size:
cp ~/Downloads/ic_launcher_48.png mipmap-mdpi/ic_launcher.png
cp ~/Downloads/ic_launcher_72.png mipmap-hdpi/ic_launcher.png
cp ~/Downloads/ic_launcher_96.png mipmap-xhdpi/ic_launcher.png
cp ~/Downloads/ic_launcher_144.png mipmap-xxhdpi/ic_launcher.png
cp ~/Downloads/ic_launcher_192.png mipmap-xxxhdpi/ic_launcher.png

# Sync to Android
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker
npx cap sync android
```

## Using Icon.Kitchen Package

**Recommended method:**

1. Download ZIP from icon.kitchen
2. Extract to ~/Downloads/
3. Run replacement script:

```bash
cd /Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker
./REPLACE-ICON.sh ~/Downloads/icon-kitchen-output/android
```

Script automatically:
- Copies all icon sizes to correct locations
- Saves 512x512 to Desktop
- Tells you to run `npx cap sync android`

## Verify Replacement

**Check icons are in place:**

```bash
ls -lh android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

# Should show file size > 1KB
# Default Capacitor icon is ~9KB
# Your icon should be similar size
```

## After Replacement

**Always sync:**

```bash
npx cap sync android
```

This ensures Android Studio sees the new icons.

## Play Console Upload

When filling out store listing:

```
App icon field → Upload file
Browse to: ~/Desktop/crypto-tracker-icon-512.png
```

Must be exactly 512x512 pixels, PNG format.
