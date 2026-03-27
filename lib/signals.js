/**
 * Calculate market signal based on price vs MA and sentiment
 * Returns: BULLISH / NEUTRAL / BEARISH
 */
export function calculateSignal(price, ma30, ma90, sentiment) {
  if (!price || !ma30 || !ma90) return "NEUTRAL";

  // Calculate position relative to MAs
  const aboveMA30 = price > ma30;
  const aboveMA90 = price > ma90;
  const ma30VsMa90 = ma30 > ma90; // Golden cross if true

  // Price strength
  const priceVsMA30 = ((price - ma30) / ma30) * 100;
  const priceVsMA90 = ((price - ma90) / ma90) * 100;

  // Sentiment factor (0-100)
  const sentimentScore = sentiment || 50;
  const bullishSentiment = sentimentScore > 50;
  const bearishSentiment = sentimentScore < 25;

  // Strong bullish signals
  if (aboveMA30 && aboveMA90 && ma30VsMa90 && priceVsMA30 > 2) {
    return "BULLISH";
  }

  // Bullish signals
  if (aboveMA30 && ma30VsMa90 && !bearishSentiment) {
    return "BULLISH";
  }

  // Strong bearish signals
  if (!aboveMA30 && !aboveMA90 && !ma30VsMa90 && priceVsMA30 < -5) {
    return "BEARISH";
  }

  // Bearish signals
  if (!aboveMA30 && bearishSentiment && priceVsMA90 < -3) {
    return "BEARISH";
  }

  // Default to neutral
  return "NEUTRAL";
}

/**
 * Get signal details for display
 */
export function getSignalDetails(signal, price, ma30, sentiment) {
  const priceVsMA30 = ((price - ma30) / ma30) * 100;
  
  const details = {
    BULLISH: {
      color: "bg-green-600",
      textColor: "text-white",
      icon: "↗",
      message: "Upward trend",
      confidence: Math.abs(priceVsMA30) > 5 ? "High" : "Medium",
    },
    NEUTRAL: {
      color: "bg-yellow-600",
      textColor: "text-white",
      icon: "→",
      message: "Mixed signals",
      confidence: "Medium",
    },
    BEARISH: {
      color: "bg-red-600",
      textColor: "text-white",
      icon: "↘",
      message: "Downward trend",
      confidence: Math.abs(priceVsMA30) > 5 ? "High" : "Medium",
    },
  };

  return details[signal] || details.NEUTRAL;
}
