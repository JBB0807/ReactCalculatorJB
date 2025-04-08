function Button({ btnType, className, text, value, handleButtonPressed }) {
  return (
    <div className={`button ${className} ${btnType}`} onClick={() => handleButtonPressed({btnType, value})}>
      <div>{text}</div>
    </div>
  );
}

export default Button;
