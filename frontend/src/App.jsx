import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Animals from './pages/Animals';
import CreateAnimal from './pages/CreateAnimal';
import AnimalDetail from './pages/AnimalDetail';
import EditAnimal from './pages/EditAnimal';
import { getToken, removeToken } from './utils/auth';
import api from './utils/api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (error) {
        console.error('Erreur auth:', error);
        removeToken();
        setUser(null);
      }
    }
    setLoading(false);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} logout={logout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/animals" replace /> : <Login setUser={setUser} />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/animals" replace /> : <Register setUser={setUser} />} 
            />
            <Route path="/animals" element={<Animals user={user} />} />
            <Route path="/animals/:id" element={<AnimalDetail user={user} />} />
            <Route 
              path="/create-animal" 
              element={user ? <CreateAnimal user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/edit-animal/:id" 
              element={user ? <EditAnimal user={user} /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;