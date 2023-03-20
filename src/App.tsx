import React from 'react';
import Register from './modules/HomeModule/components/Register';
import Login from './modules/HomeModule/components/Login';
import { Routes, Route, Link } from "react-router-dom"
import Home from './modules/HomeModule/components/Home';

const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </>
);

export default App;
