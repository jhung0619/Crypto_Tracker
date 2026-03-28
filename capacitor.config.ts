import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptotracker.app',
  appName: 'Crypto Tracker',
  webDir: 'public',
  server: {
    url: 'https://crypto-tracker-kappa-tan.vercel.app',
    cleartext: true
  }
};

export default config;
