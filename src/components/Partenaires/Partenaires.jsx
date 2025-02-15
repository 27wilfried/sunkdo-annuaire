<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig"; // Assurez-vous que votre firebaseConfig est correctement configuré
import { collection, getDocs } from "firebase/firestore"; // Importation pour la récupération des données

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);

  // Récupérer les partenaires depuis Firestore
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const partenairesCollection = collection(db, "partners"); // Assurez-vous que la collection est correcte
        const partenairesSnapshot = await getDocs(partenairesCollection);
        const partenairesList = partenairesSnapshot.docs.map(doc => ({
=======
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Sidebar from "../Sidebare/Sidebare"; // Assurez-vous que le chemin est correct

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [filteredPartenaires, setFilteredPartenaires] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  // Récupérer les partenaires depuis Firebase
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "partners"));
        const partenairesList = querySnapshot.docs.map((doc) => ({
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
          id: doc.id,
          ...doc.data(),
        }));
        setPartenaires(partenairesList);
<<<<<<< HEAD
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires :", error.message);
=======
        setFilteredPartenaires(partenairesList); // Initialiser les partenaires filtrés
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires :", error);
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
      }
    };

    fetchPartenaires();
<<<<<<< HEAD
  }, []); // Le tableau vide [] garantit que la fonction se lance une seule fois

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {partenaires.map((partenaire) => (
        <div
          key={partenaire.id}
          className="border-2 border-dashed border-gray-300 p-4 flex flex-col items-center justify-center text-center"
        >
          <img
            src={partenaire.logo || "/images/default_logo.png"} // Valeur par défaut si l'image est absente
            alt={partenaire.name}
            className="w-32 h-32 object-contain mb-2"
          />
          <h3 className="font-semibold text-lg">{partenaire.name}</h3>
          <p className="text-gray-500">Commission : {partenaire.commission}%</p>
        </div>
      ))}
=======
  }, []);

  // Appliquer les filtres
  const applyFilters = useCallback(() => {
    let filtered = partenaires;

    // Filtre par nom d'entreprise
    if (search) {
      filtered = filtered.filter((p) =>
        p.name && p.name.toLowerCase().includes(search.toLowerCase()) // Vérifier que 'name' existe
      );
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtre par département
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((p) =>
        selectedDepartments.includes(p.department)
      );
    }

    setFilteredPartenaires(filtered);
  }, [search, selectedCategory, selectedDepartments, partenaires]);

  // Gérer les changements de filtres
  const handleFilterChange = ({ search, category, departments }) => {
    setSearch(search);
    setSelectedCategory(category);
    setSelectedDepartments(departments);
  };

  // Appliquer les filtres chaque fois que l'un des paramètres change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="flex">
      {/* Sidebar pour filtres et recherche */}
      <Sidebar onFilterChange={handleFilterChange} />

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Liste des Partenaires</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartenaires.length > 0 ? (
            filteredPartenaires.map((partenaire) => (
              <div
                key={partenaire.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-100 transition"
                onClick={() => window.location.href = `/partenaire/${partenaire.id}`} // Clic sur la carte
              >
                <div className="flex justify-center">
                  <img
                    src={partenaire.logo || "/images/default_logo.png"}
                    alt={partenaire.name || "Logo partenaire"} // Ajout d'un fallback au cas où 'name' est manquant
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h2 className="text-xl font-semibold text-center mt-4">
                  {partenaire.name || "Nom inconnu"}  {/* Fallback si 'name' est manquant */}
                </h2>
                <p className="text-gray-500 text-center">
                  Catégorie : {partenaire.category || "Non spécifiée"} {/* Fallback pour catégorie */}
                </p>
                <p className="text-gray-600 text-center">
                  Commission : {partenaire.commission || "Non spécifiée"} % {/* Fallback pour commission */}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              Aucun partenaire trouvé.
            </p>
          )}
        </div>
      </div>
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
    </div>
  );
}
