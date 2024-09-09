import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DrugSearch from './component/DrugSerch';
import DrugDetail from './component/DrugDetail';
import NavBar from './NavBar';


const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<DrugSearch />} />
        <Route path="/drugs/:drugName" element={<DrugDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
