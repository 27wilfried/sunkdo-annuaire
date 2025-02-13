import { useState } from "react";
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

export default function Sidebar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const toggleDepartment = (department) => {
    setSelectedDepartments((prev) => {
      const newDepartments = prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department];

      onFilterChange({ search, category: selectedCategory, departments: newDepartments });
      return newDepartments;
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => {
      const newCategory = prevCategory === category ? "" : category;
      onFilterChange({ search, category: newCategory, departments: selectedDepartments });
      return newCategory;
    });
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // Pass search, category, and departments to the parent (onFilterChange)
    onFilterChange({ search: newSearch, category: selectedCategory, departments: selectedDepartments });
  };

  return (
    <aside className="w-64 bg-gray-300 p-4 rounded-lg shadow-md">
      {/* Barre de recherche */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Rechercher par nom de l'entreprise"
          value={search}
          onChange={handleSearchChange}
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
        <h3 className="text-lg font-semibold mb-2">Catégories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => handleCategoryChange(cat.name)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md shadow-sm ${
                selectedCategory === cat.name ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
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
