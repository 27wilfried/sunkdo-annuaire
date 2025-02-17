import { useState, useEffect } from "react";
import { Search, CheckCircle, Utensils, Sparkles, ShoppingCart, Wrench, Home, Briefcase, Shirt, X, ChevronDown } from "lucide-react";

export default function Sidebar({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false); // Gestion du dropdown Département
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Gestion du dropdown Catégorie

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

  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange({
        search,
        category: selectedCategory,
        departments: selectedDepartments,
      });
    }
  }, [search, selectedCategory, selectedDepartments, onFilterChange]);

  const toggleDepartment = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? "" : category));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Bouton pour ouvrir/fermer la sidebar en version mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed md:hidden top-4 left-4 z-50 p-2 bg-gray-300 rounded-lg shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gray-300 p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        {/* Barre de recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Rechercher par nom de l'entreprise"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Dropdown pour les départements */}
        <div className="mb-4">
          <button
            onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
            className="w-full flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
          >
            <span className="font-semibold">Département</span>
            <ChevronDown size={18} className={`transform transition-transform ${isDepartmentOpen ? "rotate-180" : ""}`} />
          </button>
          {isDepartmentOpen && (
            <ul className="mt-2 max-h-48 overflow-y-auto bg-white rounded-md shadow-sm">
              {departments.map((dept) => (
                <li
                  key={dept}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
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
          )}
        </div>

        {/* Dropdown pour les catégories */}
        <div className="mb-4">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex justify-between items-center p-2 bg-white rounded-md shadow-sm"
          >
            <span className="font-semibold">Catégories</span>
            <ChevronDown size={18} className={`transform transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
          </button>
          {isCategoryOpen && (
            <ul className="mt-2 max-h-48 overflow-y-auto bg-white rounded-md shadow-sm">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryChange(cat.name)}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Overlay pour fermer la sidebar en version mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}