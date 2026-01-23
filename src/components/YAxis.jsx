/**
 * Y-Axis component displaying price values
 */
export function YAxis({ chartHeight, maxValue, rowValue }) {
  return (
    <box width={"3%"}>
      <box
        alignItems="flex-start"
        justifyContent="flex-start"
        width={"100%"}
        overflow="hidden"
      >
        {Array.from({ length: chartHeight }).map((_, i) => {
          const value = maxValue - i * rowValue;

          return (
            <box key={i} overflow="hidden" padding={0} margin={0}>
              <text>{value}</text>
            </box>
          );
        })}
      </box>
    </box>
  );
}
