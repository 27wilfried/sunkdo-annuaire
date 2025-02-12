import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore"; // Importation pour la récupération des données
import { db } from "../../../firebaseConfig";
export default function Partenaires() {
  const [partenaires, setPartenaires] = useState([]);

  // Récupérer les partenaires depuis Firestore
  useEffect(() => {
    const fetchPartenaires = async () => {
      try {
        const partenairesCollection = collection(db, "partners"); // Assurez-vous que la collection est correcte
        const partenairesSnapshot = await getDocs(partenairesCollection);
        const partenairesList = partenairesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartenaires(partenairesList);
      } catch (error) {
        console.error("Erreur lors de la récupération des partenaires :", error.message);
      }
    };

    fetchPartenaires();
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
    </div>
  );
}
