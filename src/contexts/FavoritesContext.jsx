import { createContext, useState, useEffect, useContext } from 'react';
import { useUser } from './UserContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useUser(); // Récupère l'utilisateur connecté
  const [favorites, setFavorites] = useState([]);

  // Fonction pour obtenir la clé localStorage selon l'utilisateur
  const getFavoritesKey = () => {
    return user ? `favorites_${user.username}` : 'favorites_anonymous';
  };

  // Charge les favoris au montage ET quand l'utilisateur change
  useEffect(() => {
    const key = getFavoritesKey();
    const savedFavorites = localStorage.getItem(key);
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      setFavorites([]); // Réinitialise si pas de favoris pour cet utilisateur
    }
  }, [user]); // Re-exécute quand user change

  // Sauvegarde dans localStorage à chaque modification
  useEffect(() => {
    const key = getFavoritesKey();
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, user]);

  const addFavorite = (item) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  const toggleFavorite = (item) => {
    if (isFavorite(item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}