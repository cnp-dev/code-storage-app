import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Home from './pages/Home.jsx';
import LanguagePage from './pages/LanguagePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ViewerManagement from './pages/ViewerManagement.jsx';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: decoded.id, role: decoded.role });
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} /> {/* Pass user to Home */}
        <Route path="/language/:language" element={<LanguagePage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Home user={user} />} />
        <Route path="/viewers" element={user?.role === 'admin' ? <ViewerManagement /> : <Home user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;