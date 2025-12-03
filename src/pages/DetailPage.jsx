import { useParams } from 'react-router-dom';
import { getDetails, getCredits } from '../services/tmdbApi';
import { getImageUrl } from '../services/tmdbApi';
import { Star, Calendar, Clock, Heart } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import CastCard from '../components/CastCard';

function DetailPage() {
  const { type, id } = useParams();

  // Récupère les détails
  const { data: details, loading: loadingDetails, error: errorDetails } = useFetch(
    () => getDetails(type, id),
    [type, id],
    [type, id]
  );

  // Récupère le casting
  const { data: creditsData, loading: loadingCredits } = useFetch(
    () => getCredits(type, id),
    [type, id],
    [type, id]
  );

  // Gestion des erreurs
  if (errorDetails) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-900 border border-red-500 text-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
          <p>{errorDetails}</p>
        </div>
      </div>
    );
  }

  // Gestion du loading
  if (loadingDetails) {
    return (
      <div className="container mx-auto p-8">
        <div className="h-[500px] bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const title = details?.title || details?.name;
  const releaseDate = details?.release_date || details?.first_air_date;
  const runtime = details?.runtime || details?.episode_run_time?.[0];
  const cast = creditsData?.cast?.slice(0, 10) || [];

  return (
    <div>
      {/* Hero Section avec backdrop */}
      <div 
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(details?.backdrop_path, 'original')})`,
        }}
      >
        {/* Overlay noir */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

        {/* Contenu */}
        <div className="relative container mx-auto h-full flex items-end p-8">
          
          {/* Poster */}
          <div className="flex-none w-64 -mb-16 mr-8">
            <img 
              src={getImageUrl(details?.poster_path, 'w500')} 
              alt={title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Infos principales */}
          <div className="flex-1 pb-8">
            <h1 
              className="text-5xl font-bold text-white mb-4"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {title}
            </h1>

            {/* Métadonnées */}
            <div 
              className="flex items-center gap-6 text-gray-300 mb-4"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {/* Note */}
              <div className="flex items-center gap-2">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-lg font-semibold">{details?.vote_average?.toFixed(1)}</span>
              </div>

              {/* Année */}
              {releaseDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{new Date(releaseDate).getFullYear()}</span>
                </div>
              )}

              {/* Durée */}
              {runtime && (
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{runtime} min</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex gap-2 mb-4">
              {details?.genres?.map(genre => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Bouton Favoris */}
            <button 
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
              onClick={() => console.log('Ajouter aux favoris:', id)}
            >
              <Heart size={20} />
              Ajouter aux favoris
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto p-8 mt-20">
        
        {/* Synopsis */}
        <section className="mb-12">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Synopsis
          </h2>
          <p 
            className="text-lg text-gray-300 leading-relaxed"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {details?.overview || 'Aucun synopsis disponible.'}
          </p>
        </section>

        {/* Casting */}
        {!loadingCredits && cast.length > 0 && (
          <section className="mb-12">
            <h2 
              className="text-3xl font-bold mb-6"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              Casting
            </h2>
            
            {/* Bande horizontale scrollable */}
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-6">
                {cast.map(actor => (
                  <CastCard key={actor.id} actor={actor} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Informations techniques */}
        <section>
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            Informations
          </h2>
          
          <div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {/* Titre original */}
            <div>
              <p className="text-gray-400 text-sm mb-1">Titre original</p>
              <p className="text-white">{details?.original_title || details?.original_name}</p>
            </div>

            {/* Langue */}
            <div>
              <p className="text-gray-400 text-sm mb-1">Langue originale</p>
              <p className="text-white uppercase">{details?.original_language}</p>
            </div>

            {/* Budget (films uniquement) */}
            {details?.budget > 0 && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Budget</p>
                <p className="text-white">${(details.budget / 1000000).toFixed(0)}M</p>
              </div>
            )}

            {/* Revenus (films uniquement) */}
            {details?.revenue > 0 && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Revenus</p>
                <p className="text-white">${(details.revenue / 1000000).toFixed(0)}M</p>
              </div>
            )}

            {/* Nombre de saisons (séries uniquement) */}
            {details?.number_of_seasons && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Saisons</p>
                <p className="text-white">{details.number_of_seasons}</p>
              </div>
            )}

            {/* Nombre d'épisodes (séries uniquement) */}
            {details?.number_of_episodes && (
              <div>
                <p className="text-gray-400 text-sm mb-1">Épisodes</p>
                <p className="text-white">{details.number_of_episodes}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DetailPage;