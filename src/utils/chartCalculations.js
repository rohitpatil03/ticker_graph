/**
 * Process raw data points for chart visualization
 * Scales data to fit within terminal dimensions
 * @param {Array} data - Array of price data points
 * @param {number} width - Chart width in characters
 * @param {number} height - Chart height in rows
 * @returns {Array} Grid rows containing scaled data
 */
export function plotData(data, width, height) {
  if (!data || data.length === 0) return [];

  // Take only the last N points to fit in width
  const points = data.slice(-width);

  const closes = points.map((d) => d.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);

  // scale data to fit height
  const scaled = closes.map((c) =>
    Math.round(((c - min) / (max - min || 1)) * (height - 1)),
  );

  // Initialize empty grid
  const grid = Array.from({ length: height }, () => Array(width).fill(" "));

  // Fill grid with '*'
  scaled.forEach((val, idx) => {
    const y = height - 1 - val; // invert y-axis
    grid[y][idx] = "*";
  });

  // Convert grid rows to strings
  return grid.map((row) => row.join(""));
}

/**
 * Calculate candle positions for rendering
 * @param {Object} candle - Candle data object with high, low, open, close
 * @param {number} maxValue - Maximum value for scaling
 * @param {number} rowValue - Row height value for scaling
 * @returns {Object} Object containing position values for wick and body
 */
export function calculateCandlePositions(candle, maxValue, rowValue) {
  const highPos = Math.floor((maxValue - candle.high) / rowValue);
  const lowPos = Math.floor((maxValue - candle.low) / rowValue);
  const openPos = Math.floor((maxValue - candle.open) / rowValue);
  const closePos = Math.floor((maxValue - candle.close) / rowValue);

  const bodyTop = Math.min(openPos, closePos);
  const bodyHeight = Math.max(1, Math.abs(openPos - closePos));

  return {
    highPos,
    lowPos,
    openPos,
    closePos,
    bodyTop,
    bodyHeight,
    wickHeight: Math.max(1, lowPos - highPos),
  };
}
