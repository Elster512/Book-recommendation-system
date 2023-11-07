import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout/Layout';
import Home from './pages/Home/Home';
import SingleBookPage from './pages/SingleBookPage/SingleBookPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":bookID" element={<SingleBookPage />} />
      </Route>
    </Routes>
  );
};

export default App;
