/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback } from 'react'
import './App.css'

const vibrationPatterns = {
  relax: [500, 1000, 500, 1000],
  soothing: [300, 700, 200, 500],
  deep: [100, 50, 100, 50, 200]
};

let timer: number | null = null;

function App() {
  const [currentMode, setCurrentMode] = React.useState('');
  const [isVibrating, setIsVibrating] = React.useState(false);
  const [info, setInfo] = React.useState('Please select massage mode');

  // Scientific vibration pattern configurations
  // 计算振动总时长
  const calculateDuration = (pattern: number[]) => {
    return Math.round(pattern.reduce((sum, t) => sum + t, 0) / 1000);
  };

  // Component cleanup logic
  React.useEffect(
    () => {
      return () => {
        navigator.vibrate(0); // Stop vibration on component unmount
      };
    }, []);

  // Execute vibration with compatibility handling
  const startVibration = useCallback((pattern: number[]) => {
    if (!navigator.vibrate) {
      setInfo('Vibration not supported on this device');
      return;
    }
    navigator.vibrate(pattern);
    if (isVibrating) {
      timer = setTimeout(() => startVibration(pattern), pattern.reduce((sum, t) => sum + t, 0));
    }
  }, [isVibrating]);

  React.useEffect(() => {
    if (currentMode) {
      setIsVibrating(true);
      startVibration(vibrationPatterns[currentMode as keyof typeof vibrationPatterns]);
    }
    return () => {
      setIsVibrating(false);
      navigator.vibrate(0);
    };
  }, [currentMode, startVibration]);

  return (
    <div className="app-container">
      <h1>Professional Phone Massager</h1>
      <p className="info-text">{info}</p>
      <p>Mode: {currentMode}</p>
      <div className="button-group">
        <button
          className="mode-btn relax"
          onClick={() => {
            setCurrentMode('relax');
            setInfo(`Relaxation mode running (${calculateDuration(vibrationPatterns.relax)}s)`);
            startVibration(vibrationPatterns.relax);
          }}
        >
          Relaxation Mode 🌿
          <span className="duration">{calculateDuration(vibrationPatterns.relax)}s</span>
        </button>

        <button
          className="mode-btn soothing"
          onClick={() => {
            setCurrentMode('soothing');
            setInfo(`Soothing mode active (${calculateDuration(vibrationPatterns.soothing)}s)`);
            startVibration(vibrationPatterns.soothing);
          }}
        >
          Soothing Mode 💆
          <span className="duration">{calculateDuration(vibrationPatterns.soothing)}s</span>
        </button>

        <button
          className="mode-btn deep"
          onClick={() => {
            setCurrentMode('deep');
            setInfo(`Deep tissue session (${calculateDuration(vibrationPatterns.deep)}s)`);
            startVibration(vibrationPatterns.deep);
          }}
        >
          Deep Tissue 💪
          <span className="duration">{calculateDuration(vibrationPatterns.deep)}s</span>
        </button>
        <button
          className="mode-btn stop"
          onClick={() => {
            setCurrentMode('');
            setIsVibrating(false);
            setInfo('Vibration stopped');
            timer && clearTimeout(timer);
            navigator.vibrate(0);
          }}
        >
          Stop Vibration ⏹️
        </button>
      </div>

      <div className="safety-notice">
        <p>⚠️ Usage Guidelines:</p>
        <ul>
          <li>Use vibration only in safe environments</li>
          <li>Avoid prolonged continuous use</li>
          <li>Cardiac patients recommended to use relaxation mode</li>
        </ul>
      </div>
    </div>
  );
}

export default App
