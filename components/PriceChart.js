"use client";

import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function PriceChart({ coin }) {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clear existing chart
    if (chartRef.current) {
      try {
        chartRef.current.remove();
      } catch (e) {
        // Chart already disposed
      }
      chartRef.current = null;
    }

    async function loadChart() {
      setLoading(true);
      setError(false);
      
      // Timeout after 30 seconds
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      
      try {
        // Fetch from internal API
        console.log('[Chart] Fetching data for', coin);
        const fetchStart = Date.now();
        const res = await fetch(`/api/crypto?coin=${coin}`, { 
          signal: controller.signal 
        });
        clearTimeout(timeout);
        const data = await res.json();
        console.log('[Chart] Data fetched in', Date.now() - fetchStart, 'ms');
        
        if (data.error || !data.prices || data.prices.length === 0) {
          console.log('[Chart] Invalid data received');
          setError(true);
          setLoading(false);
          return;
        }
        
        const priceData = data.prices;
        console.log('[Chart] Got', priceData.length, 'data points');

        // Create chart
        console.log('[Chart] Creating chart...');
        const chartStart = Date.now();
        const chart = createChart(chartContainerRef.current, {
          layout: {
            background: { color: "#1f2937" },
            textColor: "#9ca3af",
          },
          grid: {
            vertLines: { color: "#374151" },
            horzLines: { color: "#374151" },
          },
          width: chartContainerRef.current.clientWidth,
          height: 400,
          timeScale: {
            borderColor: "#4b5563",
          },
        });

        chartRef.current = chart;

        // Add price line
        const lineSeries = chart.addLineSeries({
          color: "#3b82f6",
          lineWidth: 2,
        });
        lineSeries.setData(priceData);

        // Calculate moving average lines for overlay
        const calculateMALine = (data, period) => {
          const result = [];
          for (let i = period - 1; i < data.length; i++) {
            const slice = data.slice(i - period + 1, i + 1);
            const sum = slice.reduce((acc, p) => acc + p.value, 0);
            result.push({
              time: data[i].time,
              value: sum / period,
            });
          }
          return result;
        };

        const ma30Data = calculateMALine(priceData, 30);
        const ma90Data = calculateMALine(priceData, 90);
        const ma240Data = calculateMALine(priceData, 240);

        if (ma30Data.length > 0) {
          const ma30 = chart.addLineSeries({ color: "#10b981", lineWidth: 1 });
          ma30.setData(ma30Data);
        }

        if (ma90Data.length > 0) {
          const ma90 = chart.addLineSeries({ color: "#f59e0b", lineWidth: 1 });
          ma90.setData(ma90Data);
        }

        if (ma240Data.length > 0) {
          const ma240 = chart.addLineSeries({ color: "#ef4444", lineWidth: 1 });
          ma240.setData(ma240Data);
        }

        chart.timeScale().fitContent();
        console.log('[Chart] Chart rendered in', Date.now() - chartStart, 'ms');
        console.log('[Chart] Total time:', Date.now() - fetchStart, 'ms');
        setLoading(false);
      } catch (err) {
        clearTimeout(timeout);
        console.error('Failed to load chart:', err);
        if (err.name === 'AbortError') {
          setError(true); // Timeout
        } else {
          setError(true); // Other error
        }
        setLoading(false);
      }
    }

    loadChart();

    // Responsive resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {
          // Already disposed
        }
      }
    };
  }, [coin]);

  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">{coin} Price Chart (180 Days)</h2>
          {!loading && !error && (
            <p className="text-xs text-gray-500 mt-1">
              Updated: {new Date().toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Price</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">MA30</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-400">MA90</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-400">MA240</span>
          </div>
        </div>
      </div>
      {error ? (
        <div className="w-full h-96 flex flex-col items-center justify-center gap-4">
          <div className="text-red-400 text-center">
            <p className="text-lg font-semibold mb-2">Chart temporarily unavailable</p>
            <p className="text-sm text-gray-500">CoinGecko API may be rate-limited</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="w-full h-96 bg-gray-900 rounded-lg flex flex-col items-center justify-center">
          <div className="animate-pulse mb-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 text-sm">Loading historical data...</p>
          <p className="text-gray-600 text-xs mt-2">This may take 10-15 seconds</p>
        </div>
      ) : (
        <div ref={chartContainerRef} className="w-full"></div>
      )}
    </div>
  );
}
