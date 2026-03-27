import { NextResponse } from 'next/server';

const COIN_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coin = searchParams.get('coin') || 'BTC';
  const coinId = COIN_IDS[coin];

  try {
    // Fetch current price
    const priceRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`,
      { next: { revalidate: 60 } }
    );
    const priceData = await priceRes.json();

    // Fetch historical data (365 days - CoinGecko free tier max)
    const historyRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365&interval=daily`,
      { next: { revalidate: 3600 } }
    );
    const historyData = await historyRes.json();

    // Format response
    const prices = historyData.prices.map(([timestamp, price]) => ({
      time: Math.floor(timestamp / 1000),
      value: price,
    }));

    // Calculate moving averages
    const calculateMA = (data, period) => {
      if (data.length < period) return null;
      const slice = data.slice(-period);
      const sum = slice.reduce((acc, p) => acc + p.value, 0);
      return sum / period;
    };

    const coinData = priceData[coinId];

    return NextResponse.json({
      price: coinData.usd,
      change24h: coinData.usd_24h_change || 0,
      prices,
      ma30: calculateMA(prices, 30),
      ma90: calculateMA(prices, 90),
      ma240: calculateMA(prices, 240),
      ma365: calculateMA(prices, 365),
    });
  } catch (error) {
    console.error('CoinGecko API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
