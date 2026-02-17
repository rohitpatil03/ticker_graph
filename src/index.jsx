import { createCliRenderer, ConsolePosition } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Onboarding } from "./components/Onboarding.jsx";



async function main() {

  const renderer = await createCliRenderer({
    consoleOptions: {
      position: ConsolePosition.BOTTOM,
      sizePercent: 30,
      colorInfo: "#00FFFF",
      colorWarn: "#FFFF00",
      colorError: "#FF0000",
      startInDebugMode: true,
    },
  });

  createRoot(renderer).render(<Onboarding />);
}

main();
