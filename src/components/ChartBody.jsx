import { Candlestick } from "./Candlestick.jsx";
import { YAxis } from "./YAxis.jsx";
import { XAxis } from "./XAxis.jsx";
import { useKeyboard } from "@opentui/react";
import { useState, useEffect } from "react";

/**
 * Chart body component displaying all candlesticks with axes
 */
export function ChartBody({
  data,
  chartWidth,
  chartHeight,
  maxValue,
  setMaxValue,
  maxRowsAllowed,
  setMaxRowsAllowed,
  rowValue,
  colValue,
}) {
  const [startIndex, setStartIndex] = useState(data.length-maxRowsAllowed);
  const [endIndex, setEndIndex] = useState(data.length);

  useEffect(() => {
    setStartIndex(data.length-maxRowsAllowed)
    setEndIndex(data.length)

  }, [maxRowsAllowed])
  

  useKeyboard((key) => {
    if (key.raw === "h") {
      if (startIndex >= 0) {
        setEndIndex((prev) => prev - 1);
        setStartIndex((prev) => prev - 1);
      }
    }
    if (key.raw === "l") {
      if (endIndex < data.length) {
        setEndIndex((prev) => prev + 1);
        setStartIndex((prev) => prev + 1);
      }
    }
    if(key.raw === "j"){
      setMaxValue((prev)=>prev-rowValue)

    }
    if(key.raw === "k"){
      setMaxValue((prev)=>prev+rowValue)

    }

  });

  return (
    <box width="100%" flexDirection="column">
      {/* Chart area with Y-axis */}
      <box width="100%" height="100%" flexDirection="row">
        {/* Candlesticks area */}
        <box
          border={["right", "bottom"]}
          borderColor="cyan"
          width="100%"
          height="100%"
          flexDirection="row"
          justifyContent="space-evenly"
          overflow="hidden"
        >
          {data.map((candle, i) =>
            i < data.length && i > startIndex && i < endIndex
              ? (() => {
                return (
                  <Candlestick
                    key={i}
                    candle={candle}
                    index={i}
                    maxValue={maxValue}
                    rowValue={rowValue}
                    colValue={colValue}
                  />
                );
              })()
              : null,
          )}
        </box>

        {/* Y-Axis */}
        <YAxis
          chartHeight={chartHeight}
          maxValue={maxValue}
          rowValue={rowValue}
        />
      </box>

      {/* X-Axis */}
      <XAxis
        data={data}
        colValue={colValue}
        maxRowsAllowed={maxRowsAllowed}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </box>
  );
}
