import { Link } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { getImageUrl } from '../services/tmdbApi';

function ItemCard({ item, type }) {
  // Gère le titre (films = title, séries = name)
  const title = item.title || item.name;
  
  // Limite le synopsis à 150 caractères
  const synopsis = item.overview 
    ? item.overview.slice(0, 150) + '...' 
    : 'Aucun synopsis disponible';

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
      
      {/* Poster du film/série */}
      <img 
        src={getImageUrl(item.poster_path)} 
        alt={title}
        className="w-full h-auto object-cover"
      />

      {/* Overlay au survol */}
      <div className="absolute inset-0 bg-black bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        
        {/* Titre */}
        <h3 
          className="text-lg font-bold text-white mb-2"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {title}
        </h3>
        
        {/* Synopsis */}
        <p 
          className="text-sm text-gray-300 mb-4"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {synopsis}
        </p>
        
        {/* Boutons d'action */}
        <div className="flex gap-2">
          {/* Bouton Détails */}
          <Link 
            to={`/${type}/${item.id}`} 
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-sm py-2 px-3 rounded-md flex items-center justify-center gap-2 transition-colors"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <Play size={16} />
            Détails
          </Link>
          
          {/* Bouton Favoris */}
          <button 
            className="bg-transparent border border-cyan-500 hover:bg-cyan-500 text-cyan-500 hover:text-white py-2 px-3 rounded-md transition-colors"
            onClick={(e) => {
              e.preventDefault();
              console.log('Ajouter aux favoris:', item.id);
              // Fonction à brancher en Phase 5
            }}
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;