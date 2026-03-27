"use client";

import { useState, useEffect } from "react";

export default function SentimentSummary() {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSentiment() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('/api/sentiment');
        const data = await res.json();
        if (data.error) {
          setError(true);
          return;
        }
        setSentiment(data);
      } catch (err) {
        console.error('Failed to fetch sentiment:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSentiment();
  }, []);

  const getColor = (score) => {
    if (score < 25) return "text-red-500";
    if (score < 50) return "text-orange-500";
    if (score < 75) return "text-yellow-500";
    return "text-green-500";
  };

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-red-700">
        <h2 className="text-lg font-bold text-white mb-4">Market Sentiment</h2>
        <p className="text-red-400">Failed to load sentiment data.</p>
      </div>
    );
  }

  if (loading || !sentiment) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-40 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Market Sentiment</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Fear & Greed Index</p>
          <p className={`text-4xl font-bold ${getColor(sentiment.score)}`}>
            {sentiment.score}
          </p>
          <p className="text-sm text-gray-300 mt-1">{sentiment.label}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {sentiment.score < 25 && "Extreme Fear"}
            {sentiment.score >= 25 && sentiment.score < 50 && "Fear"}
            {sentiment.score >= 50 && sentiment.score < 75 && "Greed"}
            {sentiment.score >= 75 && "Extreme Greed"}
          </p>
        </div>
      </div>
      <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${
            sentiment.score < 50 ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${sentiment.score}%` }}
        ></div>
      </div>
    </div>
  );
}
