import React, { useState, useEffect } from 'react'
import TimerControls from './TimerControls'
import TimerDisplay from './TimerDisplay'
import LapList from './LapList'

import './Timer.scss'

const Timer = () => {
    const [milliseconds, setMilliseconds] = useState(0); // 1 hour in milliseconds for testing
    const [timerOn, setTimerOn] = useState(false);
    const [laps, setLaps] = useState([]);

    const formatTime = () => {
        const hours = ("0" + Math.floor(milliseconds / 3600000)).slice(-2)
        const minutes = ("0" + Math.floor(milliseconds / 60000) % 60).slice(-2)
        const seconds = ("0" + Math.floor(milliseconds / 1000) % 60).slice(-2)
        const centiseconds = ("0" + Math.floor(milliseconds / 10) % 100).slice(-2)

        return hours === 0 ? `${minutes}:${seconds}:${centiseconds}` : `${hours}:${minutes}:${seconds}:${centiseconds}`
    }

    const startTimer = (interval) => {
        return setInterval(() => {
            setMilliseconds(prev => {
                if (prev + 10 === 3600000) { // 1 hour
                    clearInterval(interval);
                    setTimerOn(false);
                    return 0;
                }
                return prev + 10;
            });
        }, 10);
    };

    const stopTimer = (interval) => {
        clearInterval(interval);
        setTimerOn(false);
    }

    const resetTimer = () => {
        setMilliseconds(0);
        setTimerOn(false);
    }

    const resetLaps = () => {
        setLaps([]);
    }

    const handleSaveLap = () => {
        setLaps([...laps, formatTime()]);
    }

    useEffect(() => {
        let interval = null;
        if (timerOn) {
            interval = startTimer(interval);
        } else if (!timerOn) {
            stopTimer(interval);
        }
        return () => clearInterval(interval);
    }, [timerOn]);

  return (
    <div className="timer-container">
        <TimerDisplay time={formatTime()} />
        <TimerControls 
            timerOn={timerOn}
            hasMilliseconds={milliseconds > 0}
            onStart={() => setTimerOn(true)}
            onStop={() => setTimerOn(false)}
            onSave={() => handleSaveLap()}
            onReset={() => resetTimer()}
        />
        <LapList laps={laps} resetLaps={resetLaps} />
    </div>
  )
}

export default Timer