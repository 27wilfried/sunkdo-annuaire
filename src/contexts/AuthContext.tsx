import React, { createContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { ADMIN_EMAILS } from '../constantes/admin';
import { User } from '../utils/types';
import { auth } from '../../firebaseConfig';

interface AuthContextType {
  user: User | null;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate(); // ✅ Ajout de useNavigate pour la redirection

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Écoute en temps réel des données utilisateur
          const userRef = doc(db, 'users', firebaseUser.uid);
          const unsubscribeDoc = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email || '');

              const userData: User = {
                id: docSnapshot.id,
                email: firebaseUser.email || '',
                isAdmin,
              };

              setUser(userData);
              setError(null);
              navigate('/'); // ✅ Redirection vers la page d'accueil après connexion
            }
            setLoading(false);
          });

          return () => unsubscribeDoc();
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erreur d’authentification'));
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]); // ✅ Dépendance ajoutée pour éviter les erreurs

  return (
    <AuthContext.Provider value={{ user, error }}>
      {children}
    </AuthContext.Provider>
  );
};
