import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AOS from 'aos';
import "aos/dist/aos.css";
import Sidebar from './components/Sidebare/Sidebare';
import Partenaires from './components/Partenaires/Partenaires';
import Footer from './components/Footer/Footer';
<<<<<<< HEAD
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
=======
import FormulairePartenaire from './components/Add/Add';
import PartenaireDetail from "./components/PartenaireDetail/PartenaireDetail";



const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: 'ease-in-sine', delay: 100 });
    AOS.refresh();
  }, []);
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a

  return (
    <Router>
      <Navbar theme={theme} setTheme={setTheme} />
<<<<<<< HEAD
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
=======
      <div className="flex min-h-screen">
        <div className="flex-1 p-6">
          <Routes>
              <Route path="/ajouter-partenaire" element={<FormulairePartenaire />} />
              <Route path="/" element={<Partenaires />} />
              <Route path="/partenaire/:id" element={<PartenaireDetail />} /> {/* Nouvelle route */}
        </Routes>
        </div>
      </div>
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
      <Footer />
    </Router>
  );
};

export default App;
