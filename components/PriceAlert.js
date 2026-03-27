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
    warning: "bg-yellow-900/50 border-yellow-600 text-yellow-200",
    bullish: "bg-green-900/50 border-green-600 text-green-200",
    bearish: "bg-red-900/50 border-red-600 text-red-200",
  };

  return (
    <div className={`rounded-xl p-4 border ${colors[alert.type]} mb-4 flex items-start justify-between`}>
      <div className="flex-1">
        <p className="font-semibold mb-1">{alert.message}</p>
        <p className="text-sm opacity-90">{alert.detail}</p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
