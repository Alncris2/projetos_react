import React from 'react'

const LapList = ({ laps, resetLaps}) => {
  return (
    <div className="timer-laps">
        <div className='laps-header'>
            <h3>Voltas:</h3> 
            {laps.length > 0 && <button onClick={resetLaps} className="reset-laps-button">Limpar</button>}
        </div>
        <ul className='lap-list'>
            {laps.map((lap, i) => (
                <li key={i}>{lap}</li>
            ))}
        </ul>
    </div>
  )
}

export default LapList