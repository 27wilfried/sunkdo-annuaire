import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storageService } from "../../services/storageService";
import { partenairesService } from "../../services/partenairesService";
import { storage } from "../../../firebaseConfig";

const AddPartnerForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);
  const [commission, setCommission] = useState("");
  const [category, setCategory] = useState("");
  const [siegeSocial, setSiegeSocial] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction pour uploader un fichier dans Firebase Storage
  const uploadFile = async (file, path) => {
    if (!file) return null;
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !category || !commission) {
      alert("Veuillez remplir tous les champs obligatoires !");
      setLoading(false);
      return;
    }

    try {
      const logoUrl =  logo ? await uploadFile(logo , "pateners/logos") : "";
      const imageUrl = image ? await uploadFile(image , "pateners/imlages"): "";
       
      const newPartener = {
        name,
        logo: logoUrl,
        imageUrl,
        commission: parseFloat(commission),
        category,
        siegeSocial,
        telephone,
        email,
        description,
        createdAt: new Date().toISOString(),
      }
      await partenairesService.addPartenaire(newPartener)

      alert("Partenaire ajouté avec succès !");
      setName(""); setLogo(null); setImage(null);
      setCommission(""); setCategory(""); setSiegeSocial("");
      setTelephone(""); setEmail(""); setDescription("");

      navigate("/partenaires"); 
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.message);
      alert("Erreur lors de l'ajout : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Ajouter un Partenaire</h2>

      <input
        type="text"
        placeholder="Nom de l'entreprise"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block font-semibold">Logo de l'entreprise</label>
      <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} className="w-full p-2 border rounded" />

      <label className="block font-semibold">Image de l'entreprise</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded" />

      <input
        type="number"
        placeholder="Commission (%)"
        value={commission}
        onChange={(e) => setCommission(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Sélectionner une catégorie</option>
        <option value="Alimentaire">Alimentaire</option>
        <option value="Beauté">Beauté</option>
        <option value="Immobilier">Immobilier</option>
        <option value="Services">Services</option>
        <option value="Textiles">Textiles</option>
      </select>

      <input
        type="text"
        placeholder="Siège social"
        value={siegeSocial}
        onChange={(e) => setSiegeSocial(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Téléphone"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className={`w-full text-white py-2 rounded ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-900 hover:bg-green-700"}`}
        disabled={loading}
      >
        {loading ? "Ajout en cours..." : "Ajouter"}
      </button>
    </form>
  );
};

export default AddPartnerForm;
