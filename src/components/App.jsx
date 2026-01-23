import { useEffect, useState } from "react";
import { useRenderer, useKeyboard } from "@opentui/react";
import { useChartData, useChartDataFromYahoo } from "../hooks/useChartData.js";
import { useChartDimensions } from "../hooks/useChartDimensions.js";
import { ChartBody } from "./ChartBody.jsx";
import { Modal } from "./Modal.jsx";

/**
 * Main App component
 * Orchestrates chart rendering and user interactions
 */
export function App() {
  // const { data, isLoading, error } = useChartData("./src/data.json");
  const { data, isLoading, error } = useChartDataFromYahoo(
    "AAPL",
    "1h",
    "2026-01-05",
    "2026-01-09",
  );
  const [showModal, setShowModal] = useState(false);
  const [updateXAxis, setUpdateXAxis] = useState(true);
  const [modalText, setModalText] = useState("");
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
    if (key.ctrl && key.name == "r") {
      setModalText("Enter the row value: ");
      setUpdateXAxis(false);
      setShowModal(true);
    }
    if (key.ctrl && key.name == "d") {
      setModalText("Enter the number of columns: ");
      setUpdateXAxis(true);
      setShowModal(true);
    }
    if (key.name === "escape") {
      setShowModal(false);
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
      <text>Apple Inc. (AAPL)</text>
      <ChartBody
        data={data}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
        maxValue={maxValue}
        setMaxValue={setMaxValue}
        maxRowsAllowed={maxRowsAllowed}
        setMaxRowsAllowed={setMaxRowsAllowed}
        rowValue={rowValue}
        colValue={colValue}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalText={modalText}
        updateXAxis={updateXAxis}
        handleSubmitCallback={(value) => {
          if (updateXAxis == false) {
            setRowValue(value);
          } else {
            setMaxRowsAllowed(value);
          }
        }}
      />
    </>
  );
}
