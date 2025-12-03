import { getImageUrl } from '../services/tmdbApi';
import { User } from 'lucide-react';

function CastCard({ actor }) {
  return (
    <div className="flex-none w-32 text-center">
      {/* Photo de l'acteur */}
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 mb-2 mx-auto">
        {actor?.profile_path ? (
          <img 
            src={getImageUrl(actor.profile_path, 'w185')} 
            alt={actor?.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <User size={48} className="text-gray-500" />
          </div>
        )}
      </div>
      
      {/* Nom de l'acteur */}
      <p 
        className="text-sm font-semibold text-white mb-1"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {actor?.name}
      </p>
      
      {/* Rôle */}
      <p 
        className="text-xs text-gray-400"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {actor?.character}
      </p>
    </div>
  );
}

export default CastCard;
