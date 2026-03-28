import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptotracker.app',
  appName: 'Crypto Tracker',
  webDir: 'public',
  server: {
    url: 'https://crypto-tracker-kappa-tan.vercel.app',
    cleartext: false, // HTTPS only for production
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false, // Disable in production
    backgroundColor: '#1f2937' // Match app background
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1f2937',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      spinnerColor: '#3b82f6'
    }
  }
};

export default config;
