/**
 * Calculate trading signal based on price vs MA and sentiment
 * Returns: BUY / HOLD / SELL
 */
export function calculateSignal(price, ma30, ma90, sentiment) {
  if (!price || !ma30 || !ma90) return "HOLD";

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

  // Strong buy signals
  if (aboveMA30 && aboveMA90 && ma30VsMa90 && priceVsMA30 > 2) {
    return "BUY";
  }

  // Buy signals
  if (aboveMA30 && ma30VsMa90 && !bearishSentiment) {
    return "BUY";
  }

  // Strong sell signals
  if (!aboveMA30 && !aboveMA90 && !ma30VsMa90 && priceVsMA30 < -5) {
    return "SELL";
  }

  // Sell signals
  if (!aboveMA30 && bearishSentiment && priceVsMA90 < -3) {
    return "SELL";
  }

  // Default to hold
  return "HOLD";
}

/**
 * Get signal details for display
 */
export function getSignalDetails(signal, price, ma30, sentiment) {
  const priceVsMA30 = ((price - ma30) / ma30) * 100;
  
  const details = {
    BUY: {
      color: "bg-green-600",
      textColor: "text-white",
      icon: "↗",
      message: "Strong upward momentum",
      confidence: Math.abs(priceVsMA30) > 5 ? "High" : "Medium",
    },
    HOLD: {
      color: "bg-yellow-600",
      textColor: "text-white",
      icon: "→",
      message: "Wait for clearer trend",
      confidence: "Medium",
    },
    SELL: {
      color: "bg-red-600",
      textColor: "text-white",
      icon: "↘",
      message: "Downward pressure",
      confidence: Math.abs(priceVsMA30) > 5 ? "High" : "Medium",
    },
  };

  return details[signal] || details.HOLD;
}
