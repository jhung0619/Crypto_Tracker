"use client";

import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowOffline(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Only show when offline
  if (!showOffline) return null;

  return (
    <div className="bg-yellow-600 text-white text-center py-2 px-4 text-sm">
      <span className="font-semibold">⚠️ No internet connection</span>
      <span className="ml-2 opacity-90">• Prices may be outdated</span>
    </div>
  );
}
