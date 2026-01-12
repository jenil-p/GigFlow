import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import FormBuilder from './pages/admin/FormBuilder';
import ResponseExplorer from './pages/admin/ResponseExplorer';
import GuestFormView from './pages/guest/GuestFormView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;