import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Sidebar from "../Sidebare/Sidebare";

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [filteredPartenaires, setFilteredPartenaires] = useState([]);
  const [filters, setFilters] = useState({ search: "", category: "", departments: [] });

  // Récupérer les partenaires depuis Firestore
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const partenairesCollection = collection(db, "partners");
        const partenairesSnapshot = await getDocs(partenairesCollection);
        const partenairesList = partenairesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartenaires(partenairesList);
        setFilteredPartenaires(partenairesList);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires :", error.message);
      }
    };

    fetchPartenaires();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = partenaires;

    // Filtre par recherche (nom de l'entreprise)
    if (filters.search) {
      filtered = filtered.filter((p) =>
        p.name && p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filtre par départements
    if (filters.departments.length > 0) {
      filtered = filtered.filter((p) => p.departement && filters.departments.includes(p.departement));
    }

    setFilteredPartenaires(filtered);
  }, [filters, partenaires]);

  return (
    <div className="flex">
      {/* Sidebar avec gestion des filtres */}
      <Sidebar onFilterChange={setFilters} />

      {/* Liste des partenaires filtrés */}
      <div className="grid grid-cols-3 gap-6 p-6 w-full">
        {filteredPartenaires.length > 0 ? (
          filteredPartenaires.map((partenaire) => (
            <div
              key={partenaire.id}
              className="border-2 border-dashed border-gray-300 p-6 w-full max-w-xs flex flex-col items-center justify-center text-center shadow-lg rounded-lg"
            >
              <img
                src={partenaire.logo || "/images/default_logo.png"}
                alt={partenaire.name}
                className="w-48 h-48 object-contain mb-4"
              />
              <h3 className="font-semibold text-xl">{partenaire.name}</h3>
              <p className="text-gray-500">Commission : {partenaire.commission}%</p>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-500">Aucun partenaire trouvé.</p>
        )}
      </div>
    </div>
  );
}
