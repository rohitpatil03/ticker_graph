import { useEffect, useState, useCallback } from "react";

export function Modal({ showModal, setShowModal, modalText, updateModalCategory, handleSubmitCallback }) {
  const [value, setValue] = useState("");
  const [safeValue, setSafeValue] = useState("");

  const handleInputChange = useCallback((value) => {
    let inputNum = Number(value);
    if (typeof inputNum === "number" && !isNaN(inputNum) && inputNum > 0) {
      setSafeValue(inputNum);
    }
  }, [updateModalCategory]);

  const handleSubmit = useCallback((value) => {
    let inputNum = Number(value);
    if (typeof inputNum === "number" && !isNaN(inputNum) && inputNum > 0) {
      handleSubmitCallback(inputNum);
    }

    setShowModal(false);
    setValue("");
  }, [updateModalCategory]);

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
