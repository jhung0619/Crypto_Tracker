#!/bin/bash

# Replace App Icon Script
# Run after downloading icon from icon.kitchen

echo "Replacing app icon..."

# Icon.kitchen downloads as a ZIP with folder structure
# Extract ZIP first, then run this script from the extracted android/ folder

ICON_SOURCE="$1"  # Path to extracted icon package (e.g., ~/Downloads/icon-kitchen-output/android)
PROJECT_ROOT="/Users/johnhung/.openclaw/workspace-h0gan/crypto-tracker"

if [ -z "$ICON_SOURCE" ]; then
    echo "Usage: ./REPLACE-ICON.sh <path-to-extracted-icon-package>"
    echo "Example: ./REPLACE-ICON.sh ~/Downloads/icon-kitchen-output/android"
    exit 1
fi

# Copy all icon files
echo "Copying icon files..."
cp -r "$ICON_SOURCE/app/src/main/res/mipmap-mdpi" "$PROJECT_ROOT/android/app/src/main/res/"
cp -r "$ICON_SOURCE/app/src/main/res/mipmap-hdpi" "$PROJECT_ROOT/android/app/src/main/res/"
cp -r "$ICON_SOURCE/app/src/main/res/mipmap-xhdpi" "$PROJECT_ROOT/android/app/src/main/res/"
cp -r "$ICON_SOURCE/app/src/main/res/mipmap-xxhdpi" "$PROJECT_ROOT/android/app/src/main/res/"
cp -r "$ICON_SOURCE/app/src/main/res/mipmap-xxxhdpi" "$PROJECT_ROOT/android/app/src/main/res/"

# Copy Play Store icon (512x512) to desktop for easy access
if [ -f "$ICON_SOURCE/ic_launcher-playstore.png" ]; then
    cp "$ICON_SOURCE/ic_launcher-playstore.png" ~/Desktop/crypto-tracker-icon-512.png
    echo "✅ Play Store icon (512x512) saved to Desktop"
fi

echo "✅ Icon replacement complete!"
echo ""
echo "Next steps:"
echo "1. Play Store icon ready at: ~/Desktop/crypto-tracker-icon-512.png"
echo "2. Sync to Android: cd $PROJECT_ROOT && npx cap sync android"
