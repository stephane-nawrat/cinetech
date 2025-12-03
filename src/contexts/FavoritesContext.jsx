import { createContext, useState, useEffect, useContext } from 'react';

// Création du Context
const FavoritesContext = createContext();

// Provider qui enveloppe l'app
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Au montage, récupère les favoris depuis localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Sauvegarde dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Ajouter un favori
  const addFavorite = (item) => {
    setFavorites(prev => {
      // Vérifie si déjà présent
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  // Retirer un favori
  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  // Vérifier si un item est dans les favoris
  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  // Toggle (ajoute si absent, retire si présent)
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

// Hook personnalisé pour utiliser le context facilement
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}