import { Facebook, Instagram } from "lucide-react";
<<<<<<< HEAD

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-6 px-10">
      <div className="container mx-auto grid grid-cols-3 gap-6">
        
        {/* Logo et description */}
        <div>
          <img src="/images/logo.png" alt="Sunkdo" className="w-24 mb-2" />
          <p className="text-sm">
            <strong>Bienvenue chez Sunkdo - La Carte Cadeau Multi-Enseigne en France et dans les DROM</strong>
          </p>
          <p className="text-sm">
            Découvrez l'univers des cadeaux sans frontières avec Sunkdo, votre partenaire privilégié pour offrir des expériences uniques.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="font-semibold mb-2">Liens rapides</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">À propos de nous</a></li>
            <li><a href="#" className="hover:underline">Partenaires</a></li>
          </ul>
        </div>

        {/* Politique */}
        <div>
          <h3 className="font-semibold mb-2">Politique</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Politique du vendeur</a></li>
            <li><a href="#" className="hover:underline">Mentions Légales</a></li>
          </ul>
        </div>
      </div>

      {/* Ligne de séparation */}
      <hr className="border-gray-700 my-4" />

      {/* Réseaux sociaux et droits réservés */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
          <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
        </div>
        <p>© 2025 Sunkdo. Tous droits réservés</p>
      </div>
    </footer>
  );
}
=======
import logo from "../../assets/logo.png"; // Si le fichier Footer.jsx est dans src/components


export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grille pour les sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Logo et description */}
          <div className="text-center md:text-left">
            <img src={logo} alt="Sunkdo" className="w-45 mb-4 mx-auto md:mx-0" /> {/* Utilisation du logo importé */}
            <p className="text-sm mb-2">
              <strong>Bienvenue chez Sunkdo - La Carte Cadeau Multi-Enseigne en France et dans les DROM</strong>
            </p>
            <p className="text-sm">
              Découvrez l'univers des cadeaux sans frontières avec Sunkdo, votre partenaire privilégié pour offrir des expériences uniques.
            </p>
          </div>

          {/* Liens rapides */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">À propos de nous</a></li>
              <li><a href="#" className="hover:underline">Partenaires</a></li>
            </ul>
          </div>

          {/* Politique */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4">Politique</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Politique du vendeur</a></li>
              <li><a href="#" className="hover:underline">Mentions Légales</a></li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <hr className="border-gray-700 my-6" />

        {/* Réseaux sociaux et droits réservés */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="hover:text-gray-400"><Instagram size={20} /></a>
          </div>
          <p>© 2025 Sunkdo. Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
>>>>>>> 77465b7b0f0c30da822c99f0c08c4e66ccb0dc4a
