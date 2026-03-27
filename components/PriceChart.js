"use client";

import { useEffect, useState } from "react";

export default function PriceChart({ coin }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(false);
      
      try {
        const res = await fetch(`/api/crypto?coin=${coin}`);
        if (!res.ok) throw new Error('API failed');
        
        const json = await res.json();
        if (!json.prices || json.prices.length === 0) {
          throw new Error('No data');
        }
        
        // Take last 30 days only for display
        const recentPrices = json.prices.slice(-30);
        const min = Math.min(...recentPrices.map(p => p.value));
        const max = Math.max(...recentPrices.map(p => p.value));
        
        setData({
          prices: recentPrices,
          min,
          max,
          totalDays: json.prices.length,
        });
        setLoading(false);
        
      } catch (err) {
        console.error('[Chart Error]', err);
        setError(true);
        setLoading(false);
      }
    }

    loadData();
  }, [coin]);

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">{coin} Price Trend</h2>
        <div className="w-full h-48 flex flex-col items-center justify-center gap-4 bg-gray-900 rounded-lg">
          <p className="text-red-400 text-lg font-semibold">Chart unavailable</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">{coin} Price Trend</h2>
        <div className="w-full h-48 bg-gray-900 rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate normalized heights for sparkline
  const range = data.max - data.min;
  const heights = data.prices.map(p => {
    const normalized = (p.value - data.min) / range;
    return Math.round(normalized * 100);
  });

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">{coin} Price Trend</h2>
          <p className="text-xs text-gray-500 mt-1">
            Last 30 days • {data.totalDays} days available
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Range</p>
          <p className="text-sm text-gray-300">
            ${Math.round(data.min).toLocaleString()} - ${Math.round(data.max).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Simple CSS sparkline */}
      <div className="w-full h-48 bg-gray-900 rounded-lg p-4 flex items-end justify-between gap-0.5">
        {heights.map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-blue-500 rounded-t transition-all hover:bg-blue-400"
            style={{ height: `${height}%`, minHeight: '2px' }}
            title={`$${Math.round(data.prices[i].value).toLocaleString()}`}
          />
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Hover over bars to see price
      </div>
    </div>
  );
}
