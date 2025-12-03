import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdbApi';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupère les films populaires au montage du composant
    getPopularMovies()
      .then(data => {
        console.log('Données TMDB reçues:', data);
        setMovies(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-2xl">Chargement des films...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-2xl text-red-500">Erreur: {error}</p>
        <p className="mt-4">Vérifie ta clé API dans le fichier .env</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Films Populaires (Test API)</h1>
      <div className="space-y-4">
        {movies.slice(0, 5).map(movie => (
          <div key={movie.id} className="border-b pb-4">
            <h2 className="text-2xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-400">ID: {movie.id}</p>
            <p className="mt-2">{movie.overview.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;