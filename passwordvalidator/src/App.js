import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleShow = () => setShow(!show);
  const toggleDark = () => setDarkMode(!darkMode);
  const clearPassword = () => setPassword('');

  const validations = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const validCount = Object.values(validations).filter(Boolean).length;

  let strength = '';
  if (validCount <= 2) strength = 'Weak';
  else if (validCount === 3 || validCount === 4) strength = 'Medium';
  else strength = 'Strong';

  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <div className="top-bar">
        <h1>Password Validator 🔐</h1>
        <button className="theme-btn" onClick={toggleDark}>
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="input-group">
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button className="eye-btn" onClick={toggleShow}>
          {show ? '🙈' : '👁️'}
        </button>
      </div>

      <button className="clear-btn" onClick={clearPassword}>Clear</button>

      <div className="strength-meter">
        Strength: <span className={strength.toLowerCase()}>{strength}</span>
      </div>

      <div className="rules">
        <Rule valid={validations.length} text="At least 8 characters" />
        <Rule valid={validations.upper} text="One uppercase letter" />
        <Rule valid={validations.lower} text="One lowercase letter" />
        <Rule valid={validations.number} text="One number" />
        <Rule valid={validations.special} text="One special character" />
      </div>
    </div>
  );
}

function Rule({ valid, text }) {
  return (
    <div className={valid ? 'valid' : 'invalid'}>
      {valid ? '✅' : '❌'} {text}
    </div>
  );
}

export default App;
