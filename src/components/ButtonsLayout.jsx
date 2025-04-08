import Button from "./Button";
import { calculatorButtons } from "../assets/calculatorButtons";

function ButtonsLayout({
  handleButtonPressed,
  startIndex = 0,
  endIndex = calculatorButtons.length,
}) {
  const buttonElements = [];

  for (let i = startIndex; i < endIndex; i++) {
    const button = calculatorButtons[i];
    buttonElements.push(
      <Button
        key={i}
        btnType={button.type}
        className={button.className}
        text={button.text}
        value={button.value}
        handleButtonPressed={handleButtonPressed}
      />
    );
  }

  return <div className="div-button-grid">{buttonElements}</div>;
}

export default ButtonsLayout;
