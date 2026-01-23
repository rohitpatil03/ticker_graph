import { useEffect, useState, useCallback } from "react";

export function Modal({ showModal, setShowModal, modalText, updateXAxis, handleSubmitCallback }) {
  const [value, setValue] = useState("");
  const [safeValue, setSafeValue] = useState("");

  const handleInputChange = useCallback((value) => {
    console.log("1) value", value);
    let inputNum = Number(value);
    if (typeof inputNum === "number" && !isNaN(inputNum) && inputNum > 0) {
      console.log("2) InputNum", inputNum);
      setSafeValue(inputNum);
    }
  }, [updateXAxis]);

  const handleSubmit = useCallback((value) => {
    let inputNum = Number(value);
    if (typeof inputNum === "number" && !isNaN(inputNum) && inputNum > 0) {
      handleSubmitCallback(inputNum);
    }

    setShowModal(false);
    setValue("");
  }, [updateXAxis]);

  return (
    <>
      {showModal && (
        <>
          <box
            width={"100%"}
            height={"100%"}
            justifyContent="center"
            alignItems="center"
            position="absolute"
          >
            <box border={true} backgroundColor="black" width="30%" height="15%">
              <text>{modalText}</text>
              <input
                placeholder="Enter Your Input here..."
                value={value}
                onInput={handleInputChange}
                onSubmit={handleSubmit}
                focused={showModal}
              />
            </box>
          </box>
        </>
      )}
    </>
  );
}
