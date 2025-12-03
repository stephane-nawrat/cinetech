import { getPopularMovies } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';
import useFetch from '../hooks/useFetch';

function HomePage() {
  // Utilisation du custom hook (1 seule ligne au lieu de 15 !)
  const { data: moviesData, loading, error } = useFetch(getPopularMovies, []);

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

  // Extraction des films (gestion du cas où data est null)
  const movies = moviesData?.results || [];

  // Affichage conditionnel : SUCCESS
  return (
    <div className="container mx-auto p-8">
      <h1 
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        Films Populaires
      </h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.slice(0, 10).map(movie => (
          <ItemCard key={movie.id} item={movie} type="movie" />
        ))}
      </div>
    </div>
  );
}

export default HomePage;