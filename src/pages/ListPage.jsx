import { useState } from 'react';
import { getPopularMovies, getPopularTVShows } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';

function ListPage({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const fetchFunction = type === 'movie' ? getPopularMovies : getPopularTVShows;
  const { data, loading, error } = useFetch(fetchFunction, [currentPage], [currentPage]);

  const handlePageChange = (newPage) => {
    if (isFading) return;
    
    // Lance le fondu de sortie
    setIsFading(true);
    
    // Après 200ms, scroll et change de page
    setTimeout(() => {
      window.scrollTo(0, 0);
      setCurrentPage(newPage);
      
      // Réactive après un délai pour le fondu d'entrée
      setTimeout(() => {
        setIsFading(false);
      }, 100);
    }, 200);
  };

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

  const items = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <div className="container mx-auto p-8">
      
      <h1 
        className="text-4xl font-bold mb-8"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {type === 'movie' ? 'Films populaires' : 'Séries populaires'}
      </h1>

      {/* Grille avec transition de fondu */}
      <div 
        className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8 transition-opacity duration-200 ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {loading ? (
          [...Array(20)].map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          items.map(item => (
            <ItemCard key={item.id} item={item} type={type} />
          ))
        )}
      </div>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ListPage;