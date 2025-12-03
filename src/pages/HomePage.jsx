import { getTrending, getPopularMovies } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';
import Carousel from '../components/Carousel';
import useFetch from '../hooks/useFetch';

function HomePage() {
  // Récupère les tendances pour le carrousel
  const { data: trendingData, loading: loadingTrending } = useFetch(getTrending, []);
  
  // Récupère les films populaires pour la section
  const { data: moviesData, loading: loadingMovies, error } = useFetch(getPopularMovies, []);

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

  const trending = trendingData?.results?.slice(0, 3) || [];
  const movies = moviesData?.results || [];

  return (
    <div className="container mx-auto p-8">
      
      {/* Carrousel de nouveautés */}
      <section className="mb-12">
        {loadingTrending ? (
          <div className="h-[500px] bg-gray-700 rounded-lg animate-pulse"></div>
        ) : (
          <Carousel items={trending} />
        )}
      </section>

      {/* Section Films populaires */}
      <section>
        <h2 
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          Films Populaires
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loadingMovies ? (
            [...Array(10)].map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            movies.slice(0, 10).map(movie => (
              <ItemCard key={movie.id} item={movie} type="movie" />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;