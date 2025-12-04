import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMulti, getPersonMovieCredits, getPersonTVCredits } from '../services/tmdbApi';
import ItemCard from '../components/ItemCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { User, Film, Tv } from 'lucide-react';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchType, setSearchType] = useState('multi'); // 'multi', 'person_movies', 'person_tv'
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
  setLoading(true);
  setError(null);

  try {
    // Recherche initiale multi
    const data = await searchMulti(query, currentPage);
    
    // Trouve la personne la PLUS populaire dans les résultats (si elle existe)
    const people = data.results.filter(item => item.media_type === 'person');
    const mostPopularPerson = people.length > 0 
      ? people.reduce((prev, current) => (prev.popularity > current.popularity ? prev : current))
      : null;

    // On bascule en mode filmographie si :
    // 1. On a trouvé une personne
    // 2. Elle est dans le top 3 des résultats (pertinente)
    // 3. On est sur la première page
    const topResults = data.results.slice(0, 3);
    const personInTop3 = mostPopularPerson && topResults.some(r => r.id === mostPopularPerson.id);

    if (mostPopularPerson && personInTop3 && currentPage === 1) {
      // Mode filmographie
      setPersonName(mostPopularPerson.name);
      const [movieCredits, tvCredits] = await Promise.all([
        getPersonMovieCredits(mostPopularPerson.id),
        getPersonTVCredits(mostPopularPerson.id)
      ]);

      // Filtre : ne garde que les rôles PRINCIPAUX (order < 10)
      const mainMovieRoles = movieCredits.cast
        .filter(item => item.order < 10) // Rôles principaux
        .map(item => ({ ...item, media_type: 'movie' }));
      
      const mainTVRoles = tvCredits.cast
        .filter(item => item.order < 10)
        .map(item => ({ ...item, media_type: 'tv' }));

      // Combine et trie par popularité
      const allMainRoles = [...mainMovieRoles, ...mainTVRoles]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 30); // Max 30 résultats

      if (allMainRoles.length > 0) {
        setResults(allMainRoles);
        setSearchType('person_filmography');
        setTotalPages(1);
      } else {
        // Si la personne n'a pas de rôles principaux, affiche résultats normaux
        const filteredResults = data.results.filter(
          item => item.media_type === 'movie' || item.media_type === 'tv'
        );
        setResults(filteredResults);
        setSearchType('multi');
        setTotalPages(Math.min(data.total_pages, 500));
      }
    } else {
      // Résultats normaux (films + séries)
      const filteredResults = data.results.filter(
        item => item.media_type === 'movie' || item.media_type === 'tv'
      );
      setResults(filteredResults);
      setSearchType('multi');
      setTotalPages(Math.min(data.total_pages, 500));
    }

    setLoading(false);
  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};

    performSearch();
  }, [query, currentPage]);

  const handlePageChange = (newPage) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  if (!query) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-xl text-center">Utilisez la barre de recherche pour trouver des films, séries ou acteurs.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-900 border border-red-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Erreur de recherche</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      
      {/* En-tête des résultats */}
      <div className="mb-8">
        {searchType === 'person_filmography' ? (
          <>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Filmographie de {personName}
            </h1>
            <p 
              className="text-gray-400"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {results.length} films et séries
            </p>
          </>
        ) : (
          <>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Résultats pour "{query}"
            </h1>
            <p 
              className="text-gray-400"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
            </p>
          </>
        )}
      </div>

      {/* Grille de résultats */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(20)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Aucun résultat trouvé
          </h3>
          <p 
            className="text-gray-400 mb-6"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Essayez avec d'autres mots-clés
          </p>
          <Link
            to="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Retour à l'accueil
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
            {results.map(item => (
              <ItemCard key={`${item.media_type}-${item.id}`} item={item} type={item.media_type} />
            ))}
          </div>

          {/* Pagination (seulement pour recherche normale) */}
          {searchType === 'multi' && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default SearchResultsPage;