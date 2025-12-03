import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getImageUrl } from '../services/tmdbApi';

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation suivant
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigation précédent
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Autoplay toutes les 5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000); // 5000ms = 5 secondes

    // Nettoyage du timer quand le composant se démonte
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Sécurité : si pas d'items, on affiche rien
  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const title = currentItem?.title || currentItem?.name;
  const type = currentItem?.media_type || 'movie';

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(currentItem?.backdrop_path, 'original')})`,
        }}
      >
        {/* Overlay noir pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="relative h-full flex flex-col justify-end p-12 z-10">
        
        {/* Titre */}
        <h2 
          className="text-5xl font-bold text-white mb-4"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {title}
        </h2>

        {/* Synopsis */}
        <p 
          className="text-lg text-gray-200 mb-6 max-w-2xl"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {currentItem?.overview?.slice(0, 200)}...
        </p>

        {/* Bouton Voir les détails */}
        <div>
          <Link
            to={`/${type}/${currentItem?.id}`}
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <Play size={20} />
            Voir les détails
          </Link>
        </div>
      </div>

      {/* Flèches de navigation */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-20"
        aria-label="Précédent"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-20"
        aria-label="Suivant"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicateurs (dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-cyan-500 w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;