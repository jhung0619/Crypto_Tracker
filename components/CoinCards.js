"use client";

import { useState, useEffect } from "react";

export default function CoinCards({ selectedCoin }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/crypto?coin=${selectedCoin}`);
        const json = await res.json();
        if (json.error) {
          setError(true);
          return;
        }
        setData({
          price: json.price,
          change24h: json.change24h,
        });
      } catch (err) {
        console.error('Failed to fetch price:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCoin]);

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-red-700">
        <p className="text-red-400">Failed to load price data. Please try again.</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
            <div className="h-3 bg-gray-700 rounded w-20 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  const isPositive = data.change24h >= 0;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Price */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <p className="text-xs text-gray-400 mb-2">Current Price</p>
        <p className="text-3xl font-bold text-white">
          ${data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* 24h Change */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <p className="text-xs text-gray-400 mb-2">24h Change</p>
        <p className={`text-3xl font-bold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}{data.change24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
