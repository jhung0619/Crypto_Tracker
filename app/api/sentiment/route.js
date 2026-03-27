import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.alternative.me/fng/', {
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    const data = await res.json();
    const fng = data.data[0];

    return NextResponse.json({
      score: parseInt(fng.value),
      label: fng.value_classification,
      timestamp: parseInt(fng.timestamp),
    });
  } catch (error) {
    console.error('Fear & Greed API error:', error);
    return NextResponse.json({ error: 'Failed to fetch sentiment' }, { status: 500 });
  }
}
