import { Facebook, Instagram } from "lucide-react";

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
