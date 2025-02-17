import React, { useState, useEffect, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Sidebar from "../Sidebare/Sidebare";

export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);
  const [filteredPartenaires, setFilteredPartenaires] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // État pour la pagination
  const [itemsPerPage] = useState(6); // Nombre d'éléments par page

  // Récupérer les partenaires depuis Firestore
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "partners"));
        const partenairesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartenaires(partenairesList);
        setFilteredPartenaires(partenairesList);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires :", error);
        setError("Erreur lors de la récupération des partenaires. Veuillez réessayer.");
        setLoading(false);
      }
    };

    fetchPartenaires();
  }, []);

  // Appliquer les filtres
  const applyFilters = useCallback(() => {
    let filtered = partenaires;

    // Filtre par nom d'entreprise
    if (search) {
      filtered = filtered.filter((p) =>
        p.name && p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtre par département
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((p) => {
        const partnerDepartment = p.departement ? p.departement.toUpperCase() : "";
        return selectedDepartments.some(
          (department) => department.toUpperCase() === partnerDepartment
        );
      });
    }

    setFilteredPartenaires(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après application des filtres
  }, [search, selectedCategory, selectedDepartments, partenaires]);

  // Appliquer les filtres chaque fois que l'un des paramètres change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPartenaires.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      {/* Sidebar pour filtres et recherche */}
      <Sidebar
        onFilterChange={({ search, category, departments }) => {
          setSearch(search);
          setSelectedCategory(category);
          setSelectedDepartments(departments);
        }}
      />

      {/* Contenu principal */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Liste des Partenaires</h1>
        
        {/* Affichage du message d'erreur */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Affichage du message de chargement */}
        {loading ? (
          <div className="text-center text-gray-500">Chargement des partenaires...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.length > 0 ? (
                currentItems.map((partenaire) => (
                  <div
                    key={partenaire.id}
                    className="bg-white shadow-md rounded-lg p-4 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-100 transition"
                    onClick={() => window.location.href = `/partenaire/${partenaire.id}`}
                  >
                    <div className="flex justify-center">
                      <img
                        src={partenaire.logo || "/images/default_logo.png"}
                        alt={partenaire.name || "Logo partenaire"}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-center mt-4">
                      {partenaire.name || "Nom inconnu"}
                    </h2>
                    <p className="text-gray-500 text-center">
                      Catégorie : {partenaire.category || "Non spécifiée"}
                    </p>
                    <p className="text-gray-600 text-center">
                      Commission : {partenaire.commission || "Non spécifiée"} %
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">
                  Aucun partenaire trouvé.
                </p>
              )}
            </div>

            {/* Pagination responsive */}
            <div className="flex justify-center mt-8">
              <nav className="flex flex-wrap gap-2">
                {/* Bouton Précédent */}
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Précédent
                </button>

                {/* Boutons de pagination */}
                {Array.from({ length: Math.ceil(filteredPartenaires.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === i + 1
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Bouton Suivant */}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredPartenaires.length / itemsPerPage)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === Math.ceil(filteredPartenaires.length / itemsPerPage)
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Suivant
                </button>
              </nav>
            </div>
          </>
        )}
      </div>
    </div>
  );
}