import { epochToDDMMYY } from "../utils/dateFormatter.js";

/**
 * X-Axis component displaying date labels
 */
export function XAxis({ data, colValue, maxRowsAllowed, startIndex, endIndex }) {
  return (
    <box
      flexDirection="row"
      justifyContent="space-evenly"
      marginRight={3}
    >
      {data.map((candle, i) =>
        i < data.length && i>startIndex && i<endIndex
          ? (() => {
              return (
                <box key={i} marginLeft={colValue}>
                  <text>{epochToDDMMYY(candle.date)}</text>
                </box>
              );
            })()
          : null,
      )}
    </box>
  );
}
