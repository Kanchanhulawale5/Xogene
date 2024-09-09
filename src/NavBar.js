import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import CSS

const NavBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get(`/drugs?name=${query}`)
        .then(response => {
          setResults(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching drugs:', error);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (drugName) => {
    navigate(`/drugs/${drugName}`);
    setQuery('');
    setResults([]);
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand href="/">
             <h3>XOYGENE  </h3>                           
      </Navbar.Brand>
      <Nav className="mr-auto">
    
      </Nav>
    </Navbar>
  );
};

export default NavBar;
