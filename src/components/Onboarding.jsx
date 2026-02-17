import { useState, useCallback } from "react";
import { App } from "./App";

export function Onboarding() {
  const [isOboardingDone, setIsOboardingDone] = useState(false);
  const [value, setValue] = useState("");

  const handleInputChange = useCallback((value) => {
    setValue(value);
  }, []);

  const handleSubmit = useCallback((value) => {
    setValue(value);
    setIsOboardingDone(true);
  }, []);

  return (
    <>
      {isOboardingDone ? (
        <App stockName={value} />
      ) : (
        <box
          justifyContent="flex-start"
          alignItems="center"
          width={"100%"}
          height={"100%"}
        >
          <box marginBottom={"5%"}></box>
          <ascii-font text="Ticker  Graph" font="block" marginBottom={"3%"} />
          <box
            border={true}
            width={"25%"}
            height={"10%"}
          >
            <input
              width={"100%"}
                height={"100%"}
              placeholder="Enter Stock Input here..."
              value={value}
              onInput={handleInputChange}
              onSubmit={handleSubmit}
              focused={true}
            />
          </box>
        </box>
      )}
    </>
  );
}
