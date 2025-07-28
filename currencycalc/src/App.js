import React, { useState, useEffect } from "react";
import "./App.css";

const currencies = [
  { code: 'USD', name: 'US Dollar', countryCode: 'us' },
  { code: 'EUR', name: 'Euro', countryCode: 'eu' },
  { code: 'GBP', name: 'British Pound', countryCode: 'gb' },
  { code: 'INR', name: 'Indian Rupee', countryCode: 'in' },
  { code: 'JPY', name: 'Japanese Yen', countryCode: 'jp' },
  { code: 'CAD', name: 'Canadian Dollar', countryCode: 'ca' },
  { code: 'AUD', name: 'Australian Dollar', countryCode: 'au' },
  { code: 'CHF', name: 'Swiss Franc', countryCode: 'ch' },
  { code: 'CNY', name: 'Chinese Yuan', countryCode: 'cn' },
  { code: 'AED', name: 'UAE Dirham', countryCode: 'ae' },
];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, [fromCurrency]);

  const handleConvert = () => {
    if (!amount || isNaN(amount)) return;
    const result = (amount * rates[toCurrency]).toFixed(2);
    setConvertedAmount(result);
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    setConvertedAmount("");
  };

  const handleClear = () => {
    setAmount("");
    setConvertedAmount("");
  };

  return (
    <div className="converter-container">
      <h2>🌍 Currency Converter</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="currency-row">
          <div className="custom-select">
            <img
              className="flag-icon"
              src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === fromCurrency)?.countryCode}.png`}
              alt={fromCurrency}
            />
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code} - {cur.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSwap} className="swap-btn">⇄</button>

          <div className="custom-select">
            <img
              className="flag-icon"
              src={`https://flagcdn.com/24x18/${currencies.find(c => c.code === toCurrency)?.countryCode}.png`}
              alt={toCurrency}
            />
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {currencies.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.code} - {cur.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="btn-group">
          <button onClick={handleConvert}>Convert</button>
          <button onClick={handleClear} className="clear-btn">Clear</button>
        </div>
      </div>

      {convertedAmount && (
        <div className="result-box">
          <p>
            {amount} {fromCurrency} = <strong>{convertedAmount}</strong> {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
