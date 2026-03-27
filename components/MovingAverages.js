"use client";

import { useState, useEffect } from "react";

export default function MovingAverages({ coin }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/crypto?coin=${coin}`);
        const json = await res.json();
        if (json.error) {
          setError(true);
          return;
        }
        setData({
          ma30: json.ma30,
          ma90: json.ma90,
        });
      } catch (err) {
        console.error('Failed to fetch MAs:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [coin]);

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-red-700">
        <h2 className="text-lg font-bold text-white mb-4">Moving Averages</h2>
        <p className="text-red-400">Failed to load moving averages.</p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Moving Averages</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-700/50 rounded-lg p-4 animate-pulse">
              <div className="h-3 bg-gray-600 rounded w-16 mb-2"></div>
              <div className="h-6 bg-gray-600 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Moving Averages</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">30-Day MA</p>
          <p className="text-xl font-semibold text-green-400">
            ${data.ma30 ? data.ma30.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
          </p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">90-Day MA</p>
          <p className="text-xl font-semibold text-yellow-400">
            ${data.ma90 ? data.ma90.toLocaleString(undefined, { maximumFractionDigits: 2 }) : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
