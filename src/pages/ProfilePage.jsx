import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import ItemCard from '../components/ItemCard';
import { Heart, Film, Tv } from 'lucide-react';

function ProfilePage() {
  const { favorites } = useFavorites();

  // Statistiques
  const totalFavorites = favorites.length;
  const moviesCount = favorites.filter(item => item.media_type === 'movie').length;
  const tvCount = favorites.filter(item => item.media_type === 'tv').length;

  return (
    <div className="container mx-auto p-8">
      
      {/* Header avec statistiques */}
      <div className="mb-12">
        <h1 
          className="text-4xl font-bold mb-6"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          Mon Profil
        </h1>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Heart size={24} className="text-cyan-500" />
              <h3 
                className="text-lg font-semibold"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Total Favoris
              </h3>
            </div>
            <p className="text-3xl font-bold text-cyan-500">{totalFavorites}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Film size={24} className="text-cyan-500" />
              <h3 
                className="text-lg font-semibold"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Films
              </h3>
            </div>
            <p className="text-3xl font-bold text-cyan-500">{moviesCount}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <Tv size={24} className="text-cyan-500" />
              <h3 
                className="text-lg font-semibold"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Séries
              </h3>
            </div>
            <p className="text-3xl font-bold text-cyan-500">{tvCount}</p>
          </div>
        </div>
      </div>

      {/* Section Mes Favoris */}
      <section>
        <h2 
          className="text-3xl font-bold mb-6"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          Mes Favoris
        </h2>

        {/* Si aucun favori */}
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-gray-800 rounded-lg border border-gray-700">
            <Heart size={64} className="text-gray-600 mx-auto mb-4" />
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Aucun favori pour l'instant
            </h3>
            <p 
              className="text-gray-400 mb-6"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Commencez à ajouter des films et séries à vos favoris !
            </p>
            <Link
              to="/"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Découvrir des films
            </Link>
          </div>
        ) : (
          /* Grille de favoris */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map(item => (
              <ItemCard 
                key={item.id} 
                item={item} 
                type={item.media_type || 'movie'} 
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;