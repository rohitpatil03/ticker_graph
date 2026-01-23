import { useEffect, useState } from "react";
import { loadJSONData } from "../utils/fileLoader.js";
import YahooFinance from "yahoo-finance2";

/**
 * Custom hook to load chart data from JSON file
 * @param {string} filePath - Path to the JSON data file
 * @returns {Object} Object with data array and loading state
 */
export function useChartData(filePath) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const jsonData = await loadJSONData(filePath);
        setData(jsonData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [filePath]);

  return { data, isLoading, error };
}

/**
 * Custom hook to fetch OHLC data from Yahoo Finance.
 *
 * @param {string} symbol - e.g. "AAPL"
 * @param {string} interval - "1d", "1h", "5m"
 * @param {string} startDate - "2024-01-01"
 * @param {string} endDate - "2024-12-31"
 * @returns {Object} { data, isLoading, error }
 */
export function useChartDataFromYahoo(symbol, interval = "1d", startDate, endDate) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol || !startDate || !endDate) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const yahoo = new YahooFinance();

        const result = await yahoo.chart(symbol, {
          period1: startDate,
          period2: endDate,
          interval,
          includePrePost: false,
        });

        const ohlc = (result.quotes || []).map((c) => ({
          date: c.date,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          volume: c.volume,
        }));

        setData(ohlc);
      } catch (err) {
        console.error("Error fetching data from Yahoo:", err.message);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval, startDate, endDate]);

  return { data, isLoading, error };
}
