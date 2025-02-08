import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AOS from 'aos';
import "aos/dist/aos.css";
import Sidebar from './components/Sidebare/Sidebare';
import Partenaires from './components/Partenaires/Partenaires';
import Footer from './components/Footer/Footer';
import FormulairePartenaire from './components/Add/Add'; // 🔹 Importation du formulaire

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // AOS initialization
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []); // Ajout de [] pour que le code ne se répète pas à chaque re-rendu

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
      <Routes>
        {/* Route pour la page d'ajout de partenaire */}
        <Route path="/ajouter-partenaire" element={<FormulairePartenaire />} />
        {/* Page principale avec sidebar et partenaires */}
        <Route path="/" element={
          <div className="flex min-h-screen">
            <div className="w-64 p-4 rounded-lg shadow-md">
              <Sidebar />
            </div>
            <div className="flex-1 p-6">
              <Partenaires />
            </div>
          </div>
        } />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
