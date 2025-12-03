import { getTrending, getPopularMovies, getPopularTVShows } from '../services/tmdbApi';
import SkeletonCard from '../components/SkeletonCard';
import Carousel from '../components/Carousel';
import HorizontalSection from '../components/HorizontalSection';
import useFetch from '../hooks/useFetch';

function HomePage() {
  // Récupère les tendances pour le carrousel
  const { data: trendingData, loading: loadingTrending } = useFetch(getTrending, []);
  
  // Récupère les nouveautés pour la section
  const { data: trendingWeekData, loading: loadingTrendingWeek } = useFetch(
    () => getTrending('all', 'week'), 
    []
  );
  
  // Récupère les films populaires
  const { data: moviesData, loading: loadingMovies, error: errorMovies } = useFetch(
    getPopularMovies, 
    []
  );

  // Récupère les séries populaires
  const { data: tvShowsData, loading: loadingTVShows, error: errorTVShows } = useFetch(
    getPopularTVShows, 
    []
  );

  // Affichage conditionnel : ERROR
  if (errorMovies || errorTVShows) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-900 border border-red-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
          <p className="mb-4">{errorMovies || errorTVShows}</p>
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
  const trendingWeek = trendingWeekData?.results || [];
  const movies = moviesData?.results || [];
  const tvShows = tvShowsData?.results || [];

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

      {/* Section Nouveautés */}
      <HorizontalSection
        title="Nouveautés de la semaine"
        items={trendingWeek}
        type="movie"
        loading={loadingTrendingWeek}
        SkeletonComponent={SkeletonCard}
      />

      {/* Section Films populaires */}
      <HorizontalSection
        title="Films populaires"
        items={movies}
        type="movie"
        loading={loadingMovies}
        SkeletonComponent={SkeletonCard}
      />

      {/* Section Séries populaires */}
      <HorizontalSection
        title="Séries populaires"
        items={tvShows}
        type="tv"
        loading={loadingTVShows}
        SkeletonComponent={SkeletonCard}
      />
    </div>
  );
}

export default HomePage;