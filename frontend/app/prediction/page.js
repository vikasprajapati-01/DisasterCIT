'use client';
import { useState } from 'react';
import styles from './Prediction.module.css'; // Import the CSS module

export default function Prediction() {
  // Define state variables
  const [location, setLocation] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [severity, setSeverity] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    // Prepare the data to send
    const payload = {
      location: location,
      disaster_type: disasterType,
      severity: severity,
      lat: lat,
      lon: lon,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.risk_level); // Expecting "risk_level" from your backend
      } else {
        setError(data.error || 'An error occurred while fetching data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disaster Risk Prediction</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Location input */}
        <div>
          <label className={styles.label}>Location:</label>
          <input
            type="number"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Disaster Type input */}
        <div>
          <label className={styles.label}>Disaster Type:</label>
          <input
            type="number"
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Severity input */}
        <div>
          <label className={styles.label}>Severity:</label>
          <input
            type="number"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Latitude input */}
        <div>
          <label className={styles.label}>Latitude:</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Longitude input */}
        <div>
          <label className={styles.label}>Longitude:</label>
          <input
            type="number"
            step="any"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Loading...' : 'Predict Risk Level'}
        </button>
      </form>

      {/* Display the result */}
      {result && (
        <div className={styles.result}>
          <h2>Prediction Result:</h2>
          <p>{result}</p>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
