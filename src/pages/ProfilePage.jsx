import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useUser } from '../contexts/UserContext';
import ItemCard from '../components/ItemCard';
import { Heart, Film, Tv, User, LogOut } from 'lucide-react';

function ProfilePage() {
  const { favorites } = useFavorites();
  const { user, login, logout, isAuthenticated } = useUser();
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setUsername('');
    }
  };

  // Statistiques
  const totalFavorites = favorites.length;
  const moviesCount = favorites.filter(item => item.media_type === 'movie').length;
  const tvCount = favorites.filter(item => item.media_type === 'tv').length;

  return (
    <div className="container mx-auto p-8">
      
      {/* Header avec connexion */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h1 
            className="text-4xl font-bold"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Mon Profil
          </h1>

          {isAuthenticated && (
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              <LogOut size={18} />
              Se déconnecter
            </button>
          )}
        </div>

        {/* Formulaire de connexion si non connecté */}
        {!isAuthenticated ? (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User size={24} className="text-cyan-500" />
              <h2 
                className="text-xl font-semibold"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Connectez-vous pour sauvegarder vos favoris
              </h2>
            </div>
            <form onSubmit={handleLogin} className="flex gap-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Votre pseudo..."
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
                required
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition-colors"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                Se connecter
              </button>
            </form>
          </div>
        ) : (
          /* Message de bienvenue si connecté */
          <div className="bg-gray-800 p-6 rounded-lg border border-cyan-500 mb-8">
            <p 
              className="text-xl"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Salut <span className="text-cyan-500 font-bold">{user.username}</span> !
            </p>
          </div>
        )}

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