export function TopBar({ stockOptions, isAutoRefreshEnabled }) {
  return (
    <box flexDirection="row" justifyContent="space-between">
      <box gap={"1%"} flexDirection="row">
        {isAutoRefreshEnabled ? <text>(*)</text> : <></>}
        <text>STOCK NAME: ({stockOptions.name})</text>
      </box>

      <box gap={"10%"} flexDirection="row">
        <text>STOCK INTERVAL: ({stockOptions.interval})</text>
      </box>
    </box>
  );
}
