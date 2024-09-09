// DrugDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrugDetails = () => {
  const { name } = useParams();
  const [drug, setDrug] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/drugs/${encodeURIComponent(name)}`);
        setDrug(response.data);
        setError('');
      } catch (err) {
        setError('Drug not found');
        console.error(err);
      }
    };

    fetchDrugDetails();
  }, [name]);

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      {drug && (
        <div>
          <h1>{drug.name}</h1>
          <p>ID: {drug.id}</p>
          {/* Add additional details as needed */}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  error: {
    color: 'red',
  },
};

export default DrugDetails;
