import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 font-['DM_Sans']">
        <div className="container mx-auto px-0 py-0">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;