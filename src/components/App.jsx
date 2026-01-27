import { useEffect, useState } from "react";
import { useRenderer, useKeyboard } from "@opentui/react";
import { useChartData, useChartDataFromYahoo } from "../hooks/useChartData.js";
import { useChartDimensions } from "../hooks/useChartDimensions.js";
import { ChartBody } from "./ChartBody.jsx";
import { Modal } from "./Modal.jsx";
import { TopBar } from "./TopBar.jsx";

/**
 * Main App component
 * Orchestrates chart rendering and user interactions
 */
export function App() {
  // const { data, isLoading, error } = useChartData("./src/data.json");

  const endDate = Math.floor(Date.now() / 1000);
  const options = ["15m", "30m", "1h", "1d"];
  const [isLeaderKeyActive, setIsLeaderKeyActive] = useState(false);

  const [stockOptions, setStockOptions] = useState({
    name: "AAPL",
    interval: "1h",
    end_date: endDate,
    start_date: endDate - 86400 * 3,
  });
  const [selectionOptionsHashMap, setSelectionOptionsHashMap] = useState({
    options: [],
    selected_option: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [updateModalCategory, setUpdateModalCategory] = useState("ROW");
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true)
  const [modalText, setModalText] = useState("");
  const { data, isLoading, error } = useChartDataFromYahoo(
    stockOptions.name,
    stockOptions.interval,
    stockOptions.start_date,
    stockOptions.end_date,
    isAutoRefreshEnabled
  );
  const renderer = useRenderer();
  const {
    chartWidth,
    chartHeight,
    maxValue,
    setMaxValue,
    maxRowsAllowed,
    setMaxRowsAllowed,
    rowValue,
    setRowValue,
    colValue,
  } = useChartDimensions();

  // Initialize renderer and show console
  useEffect(() => {
    renderer.console.show();
  }, [renderer]);

  // Handle keyboard shortcuts
  useKeyboard((key) => {
    if (key.raw === "`") {
      renderer.console.toggle();
    }
    if (key.ctrl && key.name == "t") {
      setIsLeaderKeyActive(true);
      setTimeout(() => {
        setIsLeaderKeyActive(false);
      }, 3000);
    }
    if (key.ctrl && key.name == "r"){
      setIsAutoRefreshEnabled((prev)=>!prev)
    }
    if (isLeaderKeyActive && !showModal) {
      if (key.name == "r") {
        setModalText("Enter the row value: ");
        setUpdateModalCategory("ROW");
        setShowModal(true);
      }
      if (key.name == "c") {
        setModalText("Enter the number of columns: ");
        setUpdateModalCategory("COLUMN");
        setShowModal(true);
      }
      if (key.name == "s") {
        setModalText("Enter the Stock Name: ");
        setUpdateModalCategory("STOCK_NAME");
        setShowModal(true);
      }
      if (key.name == "h") {
        setModalText("Enter the Start Date (dd/mm/yyyy): ");
        setUpdateModalCategory("STOCK_START_DATE");
        setShowModal(true);
      }
      if (key.name == "l") {
        setModalText("Enter the End Date (dd/mm/yyyy): ");
        setUpdateModalCategory("STOCK_END_DATE");
        setShowModal(true);
      }

      if (key.name == "i") {
        setModalText("Enter the Stock Interval: ");
        setSelectionOptionsHashMap({
          selected_option: options[0] != null ? options[0] : null,
          options: options,
        });
        setUpdateModalCategory("STOCK_INTERVAL");
        setShowModal(true);
      }
    }

    if (key.name === "escape") {
      setIsLeaderKeyActive(false);
      setShowModal(false);
      setSelectionOptionsHashMap({
        options: [],
        selected_option: "",
      });
    }
  });

  // Log debug information
  useEffect(() => {
    console.log(`ChartWidth: ${chartWidth}, ChartHeight: ${chartHeight}`);
    console.log(`Data loaded: ${data.length} records`);
    if (error) {
      console.error(`Error loading data: ${error}`);
    } else {
      let maxDataValue = -1;
      let minDataValue = 999;
      for (let i = 0; i < data.length; i++) {
        if (data[i].high > maxDataValue) {
          maxDataValue = data[i].high;
        }
        if (data[i].low < minDataValue) {
          minDataValue = data[i].low;
        }
      }

      setMaxValue((prev) => {
        if (data.length == 0) {
          return prev;
        } else {
          return Math.floor(
            maxDataValue +
            Math.abs(rowValue * chartHeight - (maxDataValue - minDataValue)) /
            2,
          );
        }
      });
    }
  }, [chartWidth, chartHeight, data, error]);

  if (isLoading) {
    return <text>Loading chart data...</text>;
  }

  if (error) {
    return <text color="red">Error loading data: {error}</text>;
  }

  if (!data || data.length === 0) {
    return <text color="yellow">No data available to display</text>;
  }

  return (
    <>
      <TopBar stockOptions={stockOptions} isAutoRefreshEnabled={isAutoRefreshEnabled}/>
      <ChartBody
        data={data}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        maxRowsAllowed={maxRowsAllowed}
        setMaxRowsAllowed={setMaxRowsAllowed}
        stockOptions={stockOptions}
        rowValue={rowValue}
        colValue={colValue}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={modalText}
        updateModalCategory={updateModalCategory}
        selectionOptionsHashMap={selectionOptionsHashMap}
        setSelectionOptionsHashMap={setSelectionOptionsHashMap}
        handleSubmitCallback={(value) => {
          if (updateModalCategory == "ROW") {
            setRowValue(value);
          }
          if (updateModalCategory == "COLUMN") {
            setMaxRowsAllowed(value);
          }
          if (updateModalCategory == "STOCK_NAME") {
            setStockOptions((prev) => ({
              ...prev,
              name: value,
            }));
          }
          if (updateModalCategory == "STOCK_START_DATE") {
            setStockOptions((prev) => ({
              ...prev,
              start_date: prev.end_date > value ? value : prev.start_date,
            }));
          }
          if (updateModalCategory == "STOCK_END_DATE") {
            setStockOptions((prev) => ({
              ...prev,
              end_date: prev.start_date < value ? value : prev.end_date,
            }));
          }

          if (updateModalCategory == "STOCK_INTERVAL") {
            setStockOptions((prev) => ({
              ...prev,
              interval: value,
            }));
            setShowModal(false);
            setSelectionOptionsHashMap({
              options: [],
              selected_option: "",
            });
          }
        }}
      />
    </>
  );
}
