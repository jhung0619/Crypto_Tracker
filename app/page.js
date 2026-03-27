"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SignalDashboard from "@/components/SignalDashboard";
import CoinSelector from "@/components/CoinSelector";
import CoinCards from "@/components/CoinCards";
import PriceChart from "@/components/PriceChart";
import SentimentSummary from "@/components/SentimentSummary";
import NewsFeed from "@/components/NewsFeed";
import MovingAverages from "@/components/MovingAverages";
import PriceAlert from "@/components/PriceAlert";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [priceData, setPriceData] = useState(null);
  const [maData, setMaData] = useState(null);

  // Fetch data for alerts
  useEffect(() => {
    async function fetchAlertData() {
      try {
        const res = await fetch(`/api/crypto?coin=${selectedCoin}`);
        const data = await res.json();
        if (!data.error) {
          setPriceData({ price: data.price });
          setMaData({ ma30: data.ma30 });
        }
      } catch (err) {
        console.error("Failed to fetch alert data:", err);
      }
    }
    fetchAlertData();
  }, [selectedCoin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Signal Dashboard - Top Priority */}
        <SignalDashboard />

        {/* Price Alert - Prominent */}
        {priceData && maData && (
          <PriceAlert
            coin={selectedCoin}
            currentPrice={priceData.price}
            ma30={maData.ma30}
          />
        )}

        {/* Coin Selector */}
        <CoinSelector selected={selectedCoin} onSelect={setSelectedCoin} />
        
        {/* Coin Overview Cards */}
        <CoinCards selectedCoin={selectedCoin} />
        
        {/* Price Chart */}
        <PriceChart coin={selectedCoin} />
        
        {/* Sentiment Summary */}
        <SentimentSummary />
        
        {/* Moving Averages Table */}
        <MovingAverages coin={selectedCoin} />
        
        {/* News Feed */}
        <NewsFeed coin={selectedCoin} />
      </main>
    </div>
  );
}
