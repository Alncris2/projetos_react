import React from "react";

const TimerControls = ({ timerOn, hasMilliseconds, onStart, onStop, onSave, onReset }) => {
  return (
    <div className="timer-controls">
        {!timerOn && <button onClick={onStart} className="start-button">Iniciar</button>}
        {timerOn && <button onClick={onStop} className="stop-button">Parar</button>}
        {hasMilliseconds && <button onClick={onSave} className="save-button">Gravar</button>}
        <button onClick={onReset} className="reset-button">Zerar</button>
    </div>
  );
};

export default TimerControls;
