import { loadJSONData } from "../utils/fileLoader";
import { useEffect, useState } from "react";
import { TextAttributes } from "@opentui/core";

export function HelpModal({ showHelpModal }) {
  const [helpJsonData, setHelpJsonData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const loadedData = await loadJSONData("./src/help.json");
      setHelpJsonData(loadedData);
    };

    loadData();
  }, []);

  return (
    <>
      <box
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        position="absolute"
      >
        <box
          border={true}
          backgroundColor="black"
          width="90%"
          height="80%"
          padding={"3%"}
        >
          <text marginBottom={"1%"}>{"Help"}</text>

          {helpJsonData?.sections.map((section) => {
            const shortcuts = section.shortcuts;
            return (
              <box key={section.name} flexDirection="column">
                <text
                  key={section.name}
                  attributes={TextAttributes.BOLD}
                  marginTop={"1%"}
                  marginBottom={"1%"}
                >
                  {section.name}
                </text>
                {shortcuts.map((item, index) => {
                  return (
                    <box
                      key={index}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="space-between"
                    >
                      <text>{item.action}</text>
                      <text>{item.keys}</text>
                    </box>
                  );
                })}
              </box>
            );
          })}

          <box
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          ></box>
        </box>
      </box>
    </>
  );
}
