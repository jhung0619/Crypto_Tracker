"use client";

import { useState, useEffect } from "react";

export default function NewsFeed({ coin }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/news?coin=${coin}`);
        const data = await res.json();
        if (data.error) {
          setError(true);
          return;
        }
        setNews(data);
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [coin]);

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-red-700">
        <h2 className="text-lg font-bold text-white mb-4">Latest News</h2>
        <p className="text-red-400">Failed to load news.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-bold text-white mb-4">Latest News</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-gray-700/50 rounded-lg animate-pulse">
              <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-600 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-bold text-white mb-4">Latest News</h2>
      <div className="space-y-4">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-white font-medium mb-2">{article.title}</h3>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>{article.source}</span>
              <span>{article.time}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
