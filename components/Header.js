"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Crypto Tracker</h1>
            <p className="text-sm text-gray-400">Real-time market insights</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
            >
              Refresh
            </button>
            <div className="text-right">
              <p className="text-xs text-gray-500">Last updated</p>
              <p className="text-sm text-gray-300">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
