import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
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

  // Affichage conditionnel : LOADING
  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 
          className="text-4xl font-bold mb-8"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          Films Populaires
        </h1>
        
        {/* Grille de skeletons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Affichage conditionnel : ERROR
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-900 border border-red-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Affichage conditionnel : SUCCESS
  return (
    <div className="container mx-auto p-8">
      <h1 
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        Films Populaires
      </h1>
      
      {/* Grille de cartes réelles */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map(movie => (
          <ItemCard key={movie.id} item={movie} type="movie" />
        ))}
      </div>
    </div>
  );
}

export default HomePage;