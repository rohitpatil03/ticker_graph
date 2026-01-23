import { useState } from "react";
/**
 * Custom hook to calculate chart dimensions based on terminal size
 * @returns {Object} Object with chartWidth, chartHeight, and related calculations
 */
export function useChartDimensions() {
  const chartWidth = process.stdout.columns;
  const chartHeight = process.stdout.rows;
  const [maxValue, setMaxValue] = useState(104)
  const [rowValue, setRowValue] = useState(2)
  const [maxRowsAllowed, setMaxRowsAllowed] = useState(21)
  

  const colValue = chartWidth > 0 ? Math.floor(chartWidth / (chartWidth / 2)) : 1;

  return {
    chartWidth,
    chartHeight,
    maxValue,
    setMaxValue,
    maxRowsAllowed,
    setMaxRowsAllowed,
    rowValue,
    setRowValue,
    colValue,
  };
}
