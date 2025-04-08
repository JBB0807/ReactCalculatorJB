import { useState, useEffect } from "react";
import "./App.css";
import ButtonsLayout from "./ButtonsLayout";
import Display from "./Display";
import { computer } from "../assets/computer";

function App() {
  const [display, setDisplay] = useState("0");
  const [pressedButton, setPressedButton] = useState({btnType:null, value:null});

  function handleButtonPressed(button) {
    setPressedButton(button);
  }

  useEffect(() => {
    setDisplay(
      computer.onButtonPressed(pressedButton.btnType, pressedButton.value)
    );
  }, [pressedButton]);

  return (
    <>
      <Display displayValue={display}/>
      <ButtonsLayout handleButtonPressed={handleButtonPressed} endIndex={2}/>
      <ButtonsLayout handleButtonPressed={handleButtonPressed} startIndex={2}/>
    </>
  );
}

export default App;
