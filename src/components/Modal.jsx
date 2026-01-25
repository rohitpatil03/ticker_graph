import { useEffect, useState, useCallback } from "react";
import { useKeyboard } from "@opentui/react";

export function Modal({
  showModal,
  setShowModal,
  modalText,
  updateModalCategory,
  selectionOptionsHashMap,
  setSelectionOptionsHashMap,
  handleSubmitCallback,
}) {
  const [value, setValue] = useState("");
  const [safeValue, setSafeValue] = useState("");

  useKeyboard((key) => {
    if (key.name === "tab" && selectionOptionsHashMap != {}) {
      setSelectionOptionsHashMap((prev) => {
        let newSelectedOption = null;
        for (let i = 0; i < prev.options.length; i++) {
          if (prev.selected_option == prev.options[i]) {
            newSelectedOption = prev.options[(i + 1) % prev.options.length];
            break;
          }
        }
        return {
          ...prev,
          selected_option: newSelectedOption,
        };
      });
    }
    if (key.name === "return" && selectionOptionsHashMap != {}) {
      handleSubmitCallback(selectionOptionsHashMap.selected_option);
    }
  });

  const handleInputChange = useCallback(
    (value) => {
      let inputNum = Number(value);
      if (
        typeof inputNum === "number" &&
        !isNaN(inputNum) &&
        inputNum > 0 &&
        updateModalCategory == "ROW" &&
        updateModalCategory == "COLUMN"
      ) {
        setSafeValue(inputNum);
      } else {
        setSafeValue(value);
      }
    },
    [updateModalCategory],
  );

  const handleSubmit = useCallback(
    (value) => {
      let inputNum = Number(value);
      const [day, month, year] = value.split(/[\/-]/).map(Number);
      const inputDate = new Date(year, month - 1, day);
      if (
        typeof inputNum === "number" &&
        !isNaN(inputNum) &&
        inputNum > 0 &&
        (updateModalCategory == "ROW" || updateModalCategory == "COLUMN")
      ) {
        handleSubmitCallback(inputNum);
      }
      if (
        inputDate instanceof Date &&
        !isNaN(inputDate) &&
        (updateModalCategory == "STOCK_START_DATE" ||
          updateModalCategory == "STOCK_END_DATE")
      ) {
        handleSubmitCallback(Math.floor(inputDate.getTime() / 1000));
      } else {
        handleSubmitCallback(value);
      }

      setShowModal(false);
      setValue("");
    },
    [updateModalCategory],
  );

  return (
    <>
      {showModal && (
        <box
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          position="absolute"
        >
          <box border={true} backgroundColor="black" width="30%" height="25%" padding={"1%"}>
            <text marginBottom={"1%"}>{modalText}</text>
            {selectionOptionsHashMap.options.length == 0 ? (
              <input
                placeholder="Enter Your Input here..."
                value={value}
                onInput={handleInputChange}
                onSubmit={handleSubmit}
                focused={showModal}
              />
            ) : (
              <></>
            )}

            <box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              {selectionOptionsHashMap.options.map((item) => (
                <box
                  key={item}
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  gap={"5%"}
                  width={"20%"}
                  borderColor={
                    selectionOptionsHashMap.selected_option == item
                      ? "cyan"
                      : "white"
                  }
                >
                  <text>{item}</text>
                </box>
              ))}
            </box>
          </box>
        </box>
      )}
    </>
  );
}
