// DrugSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [drugs, setDrugs] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/drugs?name=${searchTerm}`);
      setDrugs(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching drugs');
      console.error(err);
    }
  };

  const handleDrugClick = (drugName) => {
    navigate(`/drugs/${encodeURIComponent(drugName)}`);
  };

  return (
    <div style={styles.container}>
      <h1>Drug Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter drug name"
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
      {error && <p style={styles.error}>{error}</p>}
      <ul>
        {drugs.map(drug => (
          <li key={drug.id} onClick={() => handleDrugClick(drug.name)} style={styles.drugItem}>
            {drug.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    width: '300px',
  },
  button: {
    padding: '10px',
    margin: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  drugItem: {
    cursor: 'pointer',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  }
};

export default DrugSearch;
