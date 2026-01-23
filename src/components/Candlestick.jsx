import { calculateCandlePositions } from "../utils/chartCalculations.js";

/**
 * Candlestick component for displaying individual candlestick
 */
export function Candlestick({ candle, index, maxValue, rowValue, colValue }) {
  const isRed = candle.close < candle.open;
  const { highPos, lowPos, bodyTop, bodyHeight, wickHeight } =
    calculateCandlePositions(candle, maxValue, rowValue);

  const dateFormatter = (date) => {
    if (date.toString().length === 10) {
      date *= 1000;
    }
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <box
      height="100%"
      flexDirection="row"
      justifyContent="center"
      marginLeft={colValue + dateFormatter(candle.date).length - 4}
    >
      {/* Wick */}
      <box
        top={highPos}
        left={2}
        width={1}
        height={wickHeight}
        borderColor={isRed ? "red" : "green"}
        border={["right"]}
      ></box>
      {/* Body */}
      <box
        top={bodyTop}
        left={0}
        width={3}
        height={bodyHeight}
        borderColor={isRed ? "red" : "green"}
        border={true}
        backgroundColor={isRed ? "red" : "green"}
      ></box>
    </box>
  );
}
