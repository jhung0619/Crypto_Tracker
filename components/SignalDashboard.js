"use client";

import { useState, useEffect } from "react";
import { calculateSignal, getSignalDetails } from "@/lib/signals";

export default function SignalDashboard() {
  const [signals, setSignals] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllSignals() {
      setLoading(true);
      const coins = ["BTC", "ETH", "SOL"];
      const results = {};

      // Fetch sentiment once
      let sentiment = 50;
      try {
        const sentRes = await fetch("/api/sentiment");
        const sentData = await sentRes.json();
        if (!sentData.error) {
          sentiment = sentData.score;
        }
      } catch (err) {
        console.error("Sentiment fetch failed:", err);
      }

      // Fetch each coin
      for (const coin of coins) {
        try {
          const res = await fetch(`/api/crypto?coin=${coin}`);
          const data = await res.json();

          if (!data.error) {
            const signal = calculateSignal(
              data.price,
              data.ma30,
              data.ma90,
              sentiment
            );
            const details = getSignalDetails(signal, data.price, data.ma30, sentiment);

            results[coin] = {
              signal,
              details,
              price: data.price,
              change24h: data.change24h,
              ma30: data.ma30,
            };
          }
        } catch (err) {
          console.error(`Failed to fetch ${coin}:`, err);
        }
      }

      setSignals(results);
      setLoading(false);
    }

    fetchAllSignals();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Market Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["BTC", "ETH", "SOL"].map((coin) => (
            <div key={coin} className="bg-gray-900 rounded-xl p-4 animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-10 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Market Signals</h2>
        <p className="text-xs text-gray-500">Updated: {new Date().toLocaleTimeString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(signals).map(([coin, data]) => (
          <div
            key={coin}
            className="bg-gray-900 rounded-xl p-5 border-2 border-gray-700 hover:border-gray-600 transition-all"
          >
            {/* Coin Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">{coin}</h3>
              <span className="text-xs text-gray-500">{data.details.confidence}</span>
            </div>

            {/* Signal Badge */}
            <div
              className={`${data.details.color} ${data.details.textColor} rounded-lg px-4 py-3 mb-3 flex items-center justify-center`}
            >
              <span className="text-2xl mr-2">{data.details.icon}</span>
              <span className="text-xl font-bold">{data.signal}</span>
            </div>

            {/* Price Info */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-white">
                ${data.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
              <p
                className={`text-sm font-semibold ${
                  data.change24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {data.change24h >= 0 ? "+" : ""}
                {data.change24h.toFixed(2)}% (24h)
              </p>
            </div>

            {/* Signal Message */}
            <p className="text-xs text-gray-400">{data.details.message}</p>

            {/* MA Reference */}
            <p className="text-xs text-gray-600 mt-2">
              MA30: ${data.ma30.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
