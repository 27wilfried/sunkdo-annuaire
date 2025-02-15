<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
import {
  Search,
  CheckCircle,
  Utensils,
  Sparkles,
  ShoppingCart,
  Wrench,
  Home,
  Briefcase,
  Shirt,
} from "lucide-react";

<<<<<<< HEAD
export default function Sidebar() {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
=======
export default function Sidebar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a

  const departments = [
    "GUADELOUPE",
    "GUYANE",
    "MARTINIQUE",
    "Nord",
    "Pyrénées-Atlantiques",
    "REUNION",
  ];

  const categories = [
    { name: "Alimentaire", icon: <Utensils size={16} /> },
    { name: "Beauté", icon: <Sparkles size={16} /> },
    { name: "Bricolage", icon: <Wrench size={16} /> },
    { name: "ESOTERISME", icon: <Sparkles size={16} /> },
    { name: "Hypermarché", icon: <ShoppingCart size={16} /> },
    { name: "Immobilier", icon: <Home size={16} /> },
    { name: "Services", icon: <Briefcase size={16} /> },
    { name: "Textiles", icon: <Shirt size={16} /> },
  ];

<<<<<<< HEAD
=======
  // ✅ Utilisation de useEffect avec une vérification sur `onFilterChange`
  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        search,
        category: selectedCategory,
        departments: selectedDepartments,
      });
    }
  }, [search, selectedCategory, selectedDepartments]);

>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
  const toggleDepartment = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
  };

<<<<<<< HEAD
=======
  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? "" : category));
  };

>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
  return (
    <aside className="w-64 bg-gray-300 p-4 rounded-lg shadow-md">
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
<<<<<<< HEAD
          placeholder="Rechercher"
=======
          placeholder="Rechercher par nom de l'entreprise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
          className="w-full pl-10 pr-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Filtres par département */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Département</h3>
        <ul className="space-y-2">
          {departments.map((dept) => (
            <li
              key={dept}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleDepartment(dept)}
            >
              <CheckCircle
                size={18}
                className={`${
                  selectedDepartments.includes(dept)
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              />
              <span>{dept}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Filtres par catégorie */}
      <div className="mt-4">
<<<<<<< HEAD
        <h3 className="text-lg font-semibold mb-2">Villes</h3>
=======
        <h3 className="text-lg font-semibold mb-2">Catégories</h3>
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
<<<<<<< HEAD
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
=======
              onClick={() => handleCategoryChange(cat.name)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md shadow-sm ${
                selectedCategory === cat.name ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
