import React, { useState } from "react";
import "./App.css";

function App() {
  const [unit, setUnit] = useState("us");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    let heightMeters, weightKg;

    if (unit === "us") {
      const totalInches = parseFloat(heightFeet) * 12 + parseFloat(heightInches);
      heightMeters = totalInches * 0.0254;
      weightKg = parseFloat(weight) * 0.453592;
    } else {
      heightMeters = parseFloat(heightCm) / 100;
      weightKg = parseFloat(weight);
    }

    if (!heightMeters || !weightKg || !age) return;

    const bmi = weightKg / (heightMeters * heightMeters);
    const ponderalIndex = weightKg / Math.pow(heightMeters, 3);

    let label = "";
    if (bmi < 18.5) label = "Underweight";
    else if (bmi < 25) label = "Healthy";
    else if (bmi < 30) label = "At risk of overweight";
    else label = "Overweight";

    const minWeightKg = 18.5 * heightMeters * heightMeters;
    const maxWeightKg = 24.9 * heightMeters * heightMeters;
    const lbsToLose = weightKg - maxWeightKg;

    setResult({
      bmi: bmi.toFixed(1),
      label,
      healthyRange: `18.5 - 24.9 kg/m²`,
      healthyWeight: `${(minWeightKg * 2.20462).toFixed(1)} - ${(maxWeightKg * 2.20462).toFixed(1)} lbs`,
      lbsToLose: lbsToLose > 0 ? lbsToLose.toFixed(1) : null,
      ponderalIndex: ponderalIndex.toFixed(1),
    });
  };

  const handleClear = () => {
    setAge("");
    setGender("");
    setHeightFeet("");
    setHeightInches("");
    setHeightCm("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="App">
    <div className="container">
      <h1 className="bmi-heading">BMI Calculator</h1>

      <div className="tabs">
        <button className={unit === "us" ? "active" : ""} onClick={() => setUnit("us")}>US Units</button>
        <button className={unit === "metric" ? "active" : ""} onClick={() => setUnit("metric")}>Metric Units</button>
      </div>

      <div className="form">
        <label>Age:
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>

        <label>Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>

        {unit === "us" ? (
          <>
            <label>Height:
              <div className="height-inputs">
                <input type="number" placeholder="feet" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />
                <input type="number" placeholder="inches" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
              </div>
            </label>
            <label>Weight (lbs):
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </label>
          </>
        ) : (
          <>
            <label>Height (cm):
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
            </label>
            <label>Weight (kg):
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </label>
          </>
        )}

        <div className="buttons">
          <button onClick={handleCalculate}>Calculate</button>
          <button onClick={handleClear} className="clear">Clear</button>
        </div>
      </div>

      {result && (
        <div className="result">
          <h2>BMI = {result.bmi} kg/m²</h2>
          <div className="meter">
            <div className="gauge">
              <div className={`needle needle-${Math.min(Math.floor(result.bmi), 40)}`}></div>
            </div>
            <p className="risk-label">{result.label}</p>
          </div>
          <ul>
            <li>Healthy BMI range: {result.healthyRange}</li>
            <li>Healthy weight for your height: {result.healthyWeight}</li>
            {result.lbsToLose && <li>Lose {result.lbsToLose} lbs to reach healthy BMI</li>}
            <li>Ponderal Index: {result.ponderalIndex} kg/m³</li>
          </ul>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
