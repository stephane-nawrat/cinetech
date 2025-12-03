import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPopularMovies()
      .then(data => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch(err => {
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
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        Films Populaires
      </h1>
      
      {/* Grille de cartes */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map(movie => (
          <ItemCard key={movie.id} item={movie} type="movie" />
        ))}
      </div>
    </div>
  );
}

export default HomePage;