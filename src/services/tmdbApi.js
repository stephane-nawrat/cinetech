// Configuration de base pour l'API TMDB
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Fonction générique pour faire des requêtes à l'API TMDB
export async function fetchFromTMDB(endpoint, params = {}) {
  // Construction de l'URL avec les paramètres
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "fr-FR"); // Langue française

  // Ajoute les paramètres supplémentaires (ex: page=1)
  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la requête TMDB:", error);
    throw error;
  }
}

// Fonction utilitaire pour construire l'URL complète d'une image
export function getImageUrl(path, size = "w500") {
  if (!path) return "/placeholder.jpg"; // Image par défaut si pas de poster
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Fonction pour récupérer les films populaires
export async function getPopularMovies(page = 1) {
  return fetchFromTMDB("/movie/popular", { page });
}

// Fonction pour récupérer les séries populaires
export async function getPopularTVShows(page = 1) {
  return fetchFromTMDB("/tv/popular", { page });
}

// Fonction pour récupérer les détails d'un film ou d'une série
export async function getDetails(type, id) {
  return fetchFromTMDB(`/${type}/${id}`);
}
