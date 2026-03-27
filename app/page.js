"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CoinSelector from "@/components/CoinSelector";
import CoinCards from "@/components/CoinCards";
import PriceChart from "@/components/PriceChart";
import SentimentSummary from "@/components/SentimentSummary";
import NewsFeed from "@/components/NewsFeed";
import MovingAverages from "@/components/MovingAverages";

export default function Home() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
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
