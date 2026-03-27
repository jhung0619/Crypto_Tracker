import { NextResponse } from 'next/server';

// Mock news data as fallback (CryptoPanic requires auth for most features)
const MOCK_NEWS = [
  {
    id: 1,
    title: "Bitcoin ETF sees $500M inflow as institutional interest surges",
    source: "CoinDesk",
    time: new Date(Date.now() - 2 * 3600000).toLocaleString(),
    url: "https://coindesk.com",
  },
  {
    id: 2,
    title: "Ethereum completes successful upgrade, gas fees drop 40%",
    source: "CryptoSlate",
    time: new Date(Date.now() - 5 * 3600000).toLocaleString(),
    url: "https://cryptoslate.com",
  },
  {
    id: 3,
    title: "Solana network hits new transaction speed record",
    source: "The Block",
    time: new Date(Date.now() - 8 * 3600000).toLocaleString(),
    url: "https://theblock.co",
  },
  {
    id: 4,
    title: "Major exchange lists new crypto derivatives products",
    source: "Bloomberg Crypto",
    time: new Date(Date.now() - 12 * 3600000).toLocaleString(),
    url: "https://bloomberg.com",
  },
  {
    id: 5,
    title: "Regulatory clarity boosts market sentiment across the board",
    source: "Reuters",
    time: new Date(Date.now() - 24 * 3600000).toLocaleString(),
    url: "https://reuters.com",
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coin = searchParams.get('coin') || 'BTC';
  
  // For MVP, return mock news with dynamic timestamps
  // CryptoPanic free tier is very limited
  return NextResponse.json(MOCK_NEWS);
}
