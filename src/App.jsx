import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AOS from 'aos';
import "aos/dist/aos.css";
import Sidebar from './components/Sidebare/Sidebare';
import Partenaires from './components/Partenaires/Partenaires';
import Footer from './components/Footer/Footer';
import FormulairePartenaire from './components/Add/Add';
import PartenaireDetail from "./components/PartenaireDetail/PartenaireDetail";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Change le thème basé sur l'état 'theme'
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Initialisation d'AOS pour les animations au scroll
  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: 'ease-in-sine', delay: 100 });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="flex min-h-screen">
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/ajouter-partenaire" element={<FormulairePartenaire />} />
            <Route path="/" element={<Partenaires />} />
            <Route path="/partenaire/:id" element={<PartenaireDetail />} /> {/* Nouvelle route */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
