import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection
import { authService } from "../../services/authService";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Détermine si l'on est en mode connexion ou inscription
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await authService.login(email, password);
      } else {
        await authService.register(email, password);
      }

      navigate("/"); // ✅ Redirection vers la page d'accueil après connexion/inscription
    } catch (err) {
      const errorMessage = await authService.getAuthError(err);
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Nom d'utilisateur (Email)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Entrez votre email"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Entrez votre mot de passe"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
            {isLogin ? "Pas encore inscrit ? S'inscrire" : "Déjà inscrit ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
