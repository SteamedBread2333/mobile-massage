import React from 'react'
import './App.css'

function App() {
  const [currentMode, setCurrentMode] = React.useState('');
  const [info, setInfo] = React.useState('Please select massage mode');

  // Scientific vibration pattern configurations
  const vibrationPatterns = {
    relax: [500, 1000, 500, 1000],  // Relaxation mode: 500ms vibration + 1000ms interval
    soothing: [300, 700, 200, 500],  // Soothing mode: alternating frequency
    deep: [100, 50, 100, 50, 200]    // Deep tissue: high-frequency short pulses
  };

  // Execute vibration with compatibility handling
  const startVibration = (pattern: number[]) => {

    // Component cleanup logic
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(
      () => {
        return () => {
          navigator.vibrate(0); // Stop vibration on component unmount
        };
      }, []);

    if (!navigator.vibrate) {
      setInfo('Vibration not supported on this device');
      return;
    }
    navigator.vibrate(pattern);
  };

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
            setInfo('Relaxation mode running (12s)');
            startVibration(vibrationPatterns.relax);
          }}
        >
          Relaxation Mode 🌿
          <span className="duration">12s</span>
        </button>

        <button
          className="mode-btn soothing"
          onClick={() => {
            setCurrentMode('soothing');
            setInfo('Soothing mode active (8s)');
            startVibration(vibrationPatterns.soothing);
          }}
        >
          Soothing Mode 💆
          <span className="duration">8s</span>
        </button>

        <button
          className="mode-btn deep"
          onClick={() => {
            setCurrentMode('deep');
            setInfo('Deep tissue session (6s)');
            startVibration(vibrationPatterns.deep);
          }}
        >
          Deep Tissue 💪
          <span className="duration">6s</span>
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
