import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function PartenaireDetail() {
  const { id } = useParams();
  const [partenaire, setPartenaire] = useState(null);

  useEffect(() => {
    const fetchPartenaire = async () => {
      try {
        const partenaireRef = doc(db, "partners", id);
        const partenaireSnap = await getDoc(partenaireRef);

        if (partenaireSnap.exists()) {
          setPartenaire({ id: partenaireSnap.id, ...partenaireSnap.data() });
        } else {
          console.error("Partenaire non trouvé !");
        }
      } catch (error) {
        console.error("Erreur de récupération :", error);
      }
    };

    fetchPartenaire();
  }, [id]);

  if (!partenaire) return <p className="text-center text-gray-500">Chargement...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50">
      {/* Bouton Retour */}
      <Link to="/" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition-colors inline-block mb-6">
        ← Retour
      </Link>

      {/* Détail du Partenaire */}
      <div className="bg-white shadow-lg p-8 rounded-xl space-y-6">
        <div className="flex justify-center">
          <img
            src={partenaire.logo || "/images/default_logo.png"}
            alt={partenaire.name}
            className="w-36 h-36 object-contain mb-4 rounded-full shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800">{partenaire.name}</h1>
        <p className="text-gray-600 text-center">Catégorie : <span className="font-semibold">{partenaire.category}</span></p>

        <div className="space-y-4">
          <p className="text-gray-700"><strong>Commission :</strong> {partenaire.commission}%</p>
          <p className="text-gray-700"><strong>Siège social :</strong> {partenaire.siegeSocial}</p>
          <p className="text-gray-700"><strong>Ville :</strong> {partenaire.ville}</p>
          <p className="text-gray-700"><strong>Département :</strong> {partenaire.departement}</p>
          <p className="text-gray-700"><strong>Téléphone :</strong> {partenaire.telephone}</p>
          <p className="text-gray-700"><strong>Email :</strong> {partenaire.email}</p>
          <p className="text-gray-700"><strong>Description :</strong> {partenaire.description}</p>
        </div>

        {partenaire.imageUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Image de l'entreprise :</h2>
            <img
              src={partenaire.imageUrl}
              alt="Entreprise"
              className="w-full h-auto object-cover mt-4 rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
