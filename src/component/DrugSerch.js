// SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`http://localhost:3000/drugs?name=${query}`)
        .then(response => {
          console.log('API Response:', response.data); // Debugging log
          setResults(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching drugs:', error);
          setError('Failed to fetch drugs.');
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (drugName) => {
    navigate(`/drugs/${drugName}`); // Navigate to drug details page
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by drug name"
        className="search-input"
      />
      <button onClick={() => setQuery(query)} className="search-button">
        🔍
      </button>

      {loading && <div>Loading...</div>}

      {results.length > 0 ? (
        <div>
          <h3>Search Results:</h3>
          <ul className="search-results">
            {results.map((drug, index) => (
              <li key={index} onClick={() => handleSelect(drug.name)}>
                {`Drug ${index + 1}: ${drug.name}`}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        query && !loading && <div>No results found.</div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default SearchBar;
