
export function TopBar({stockOptions}) {
  return(
    <box border={true} flexDirection="row" justifyContent="space-between">
      <text>STOCK NAME: ({stockOptions.name})</text>

      <text>STOCK INTERVAL: ({stockOptions.interval})</text>
    </box>
  )

}
