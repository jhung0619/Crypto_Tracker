"use client";

import { useState, useEffect } from "react";

export default function PriceAlert({ coin, currentPrice, ma30 }) {
  const [alert, setAlert] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!currentPrice || !ma30) return;

    // Check if price crosses MA30
    const priceDiff = currentPrice - ma30;
    const percentDiff = (priceDiff / ma30) * 100;

    if (Math.abs(percentDiff) < 0.5) {
      // Price is very close to MA30 (within 0.5%)
      setAlert({
        type: "warning",
        message: `${coin} is trading near MA30`,
        detail: `Price: $${currentPrice.toLocaleString()} | MA30: $${ma30.toLocaleString()}`,
      });
    } else if (priceDiff > 0 && percentDiff > 5) {
      // Price significantly above MA30
      setAlert({
        type: "bullish",
        message: `${coin} above MA30`,
        detail: `+${percentDiff.toFixed(1)}% above moving average`,
      });
    } else if (priceDiff < 0 && percentDiff < -5) {
      // Price significantly below MA30
      setAlert({
        type: "bearish",
        message: `${coin} below MA30`,
        detail: `${percentDiff.toFixed(1)}% below moving average`,
      });
    } else {
      setAlert(null);
    }
  }, [coin, currentPrice, ma30]);

  if (!alert || dismissed) return null;

  const colors = {
    warning: "bg-yellow-600 border-yellow-500 text-white shadow-yellow-900/50",
    bullish: "bg-green-600 border-green-500 text-white shadow-green-900/50",
    bearish: "bg-red-600 border-red-500 text-white shadow-red-900/50",
  };

  const icons = {
    warning: "⚠️",
    bullish: "📈",
    bearish: "📉",
  };

  return (
    <div
      className={`rounded-2xl p-6 border-2 ${colors[alert.type]} mb-6 flex items-start justify-between shadow-2xl animate-pulse-slow`}
    >
      <div className="flex items-start gap-4 flex-1">
        <span className="text-4xl">{icons[alert.type]}</span>
        <div className="flex-1">
          <p className="text-xl font-bold mb-2">{alert.message}</p>
          <p className="text-base opacity-95">{alert.detail}</p>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 text-white hover:text-gray-200 text-2xl font-bold"
      >
        ✕
      </button>
    </div>
  );
}
