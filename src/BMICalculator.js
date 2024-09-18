import React, { useState } from "react";
import './BMICalculator.css';

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");
  const [tips, setTips] = useState("");

  const calculateBMI = () => {
    let heightInMeters = height / 100; // Convert cm to meters
    let weightInKg = weight;

    if (weightInKg > 0 && heightInMeters > 0) {
      const calculatedBMI = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(calculatedBMI);
      let healthMessage = "";
      let healthTips = "";

      if (calculatedBMI < 18.5) {
        healthMessage = "Underweight";
        healthTips = "Consider eating more nutrient-rich foods.";
      } else if (calculatedBMI >= 18.5 && calculatedBMI <= 24.9) {
        healthMessage = "Normal weight";
        healthTips = "Maintain your healthy lifestyle.";
      } else if (calculatedBMI >= 25 && calculatedBMI <= 29.9) {
        healthMessage = "Overweight";
        healthTips = "Incorporate more exercise and healthy eating.";
      } else {
        healthMessage = "Obesity";
        healthTips = "Consider consulting with a healthcare provider for personalized advice.";
      }

      setMessage(healthMessage);
      setTips(healthTips);
    } else {
      alert("Please enter valid weight and height");
    }
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setMessage("");
    setTips("");
  };

  return (
    <div className="bmi-calculator-enhanced">
      <h2>BMI Calculator</h2>

      <div className="input-container">
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            required
            min="1"
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            required
            min="1"
          />
        </label>
      </div>

      <button onClick={calculateBMI} className="calculate-btn" aria-label="Calculate BMI">Calculate</button>
      <button onClick={reset} className="reset-btn" aria-label="Reset inputs">Reset</button>

      {bmi && (
        <div className="bmi-result">
          <h3>Your BMI is: {bmi}</h3>
          <p>Status: {message}</p>
          <p>Health Tip: {tips}</p>

          <div className="bmi-ranges">
            <h4>BMI Ranges:</h4>
            <p><strong>Underweight:</strong> Less than 18.5</p>
            <p><strong>Normal weight:</strong> 18.5 - 24.9</p>
            <p><strong>Overweight:</strong> 25 - 29.9</p>
            <p><strong>Obesity:</strong> 30 or more</p>
          </div>

          {/* BMI Chart */}
          <div className="bmi-chart">
            <div
              className="bmi-range"
              style={{
                width: `${Math.min((bmi / 40) * 100, 100)}%`,
                backgroundColor:
                  bmi < 18.5
                    ? '#ffeb3b' // Underweight
                    : bmi <= 24.9
                    ? '#4caf50' // Normal weight
                    : bmi <= 29.9
                    ? '#ff5722' // Overweight
                    : '#ff6347', // Obesity
              }}
            ></div>
          </div>

          {/* Labels on the BMI chart */}
          <div className="bmi-chart-labels">
            <span style={{ left: '0%' }}>0</span>
            <span style={{ left: '46.25%' }}>18.5</span>
            <span style={{ left: '62.25%' }}>24.9</span>
            <span style={{ left: '74.75%' }}>29.9</span>
            <span style={{ left: '100%' }}>40</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
