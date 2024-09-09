import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Import CSS

const DrugDetail = () => {
  const { drugName } = useParams(); // Get drug name from URL parameters
  const [drugInfo, setDrugInfo] = useState({});
  const [ndcs, setNdcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        setLoading(true);
        // Fetch drug details
        const response = await axios.get(`/drugs/${drugName}`);
        setDrugInfo(response.data);

        // Fetch associated NDCs
        const ndcsResponse = await axios.get(`/rxcui/${response.data.rxcui}/ndcs`);
        setNdcs(ndcsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching drug details:', error);
        setError('Failed to load drug details.');
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [drugName]);

  return (
    <div className="drug-detail">
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <div>
          <h1>{drugInfo.name}</h1>
          <p><strong>RxCUI:</strong> {drugInfo.rxcui}</p>
          <p><strong>Synonyms:</strong> {drugInfo.synonym}</p>

          <h3>Associated NDCs:</h3>
          {ndcs.length > 0 ? (
            <ul>
              {ndcs.map((ndc) => (
                <li key={ndc}>{ndc}</li>
              ))}
            </ul>
          ) : (
            <p>No NDCs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DrugDetail;
