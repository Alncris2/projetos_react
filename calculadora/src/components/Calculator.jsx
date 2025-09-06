import React, { useState } from "react";
import "./Calculator.scss";

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") return val;
      else return prevValue + val;
    });

    setCompleteOperation((prevOperation) => prevOperation + val);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation("");
  };

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + operation);
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue("0");
  };

  const handleCalculate = () => {
    console.log(pendingOperation);

    if (!pendingOperation || !pendingValue) {
      return;
    }

    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);
    let result;

    switch (pendingOperation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
            result = num1 / num2;
        } else {
            setCompleteOperation("Error: Division by zero");
            setCurrentValue("0");
            setPendingOperation(null);
            setPendingValue(null);
            return;
        }
        break;
      default:
        return;
    }

    setCompleteOperation(`${pendingValue} ${pendingOperation} ${currentValue} =`);
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  };

  // função para tratar os handles com map no type
  const mapHandler = (type, value) => {
    switch (type) {
      case "clear":
        handleClear();
        break;
      case "number":
        handleClick(value);
        break;
      case "operator":
        handleOperation(value);
        break;
      case "calculate":
        handleCalculate();
        break;
    }
  };

  const buttons = [
    { label: "AC", type: "clear", className: "" },
    { label: "/", type: "operator", className: "" },
    { label: "*", type: "operator", className: "" },
    { label: "-", type: "operator", className: "" },
    { label: "7", type: "number", className: "" },
    { label: "8", type: "number", className: "" },
    { label: "9", type: "number", className: "" },
    { label: "+", type: "operator", className: "plus" },
    { label: "4", type: "number", className: "" },
    { label: "5", type: "number", className: "" },
    { label: "6", type: "number", className: "" },
    { label: "1", type: "number", className: "" },
    { label: "2", type: "number", className: "" },
    { label: "3", type: "number", className: "" },
    { label: "=", type: "calculate", className: "equals" },
    { label: "0", type: "number", className: "zero" },
  ];

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            className={button.className}
            onClick={() => {
              mapHandler(button.type, button.label);
            }}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
