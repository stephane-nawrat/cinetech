import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ItemCard from './ItemCard';

function HorizontalSection({ title, items, type, loading, SkeletonComponent }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // Nouveau state pour le hover

  // Fonction pour scroller vers la gauche
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -800,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour scroller vers la droite
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 800,
        behavior: 'smooth'
      });
    }
  };

  // Détecte la position du scroll pour afficher/masquer les flèches
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section className="mb-12">
      {/* Titre de la section */}
      <h2 
        className="text-3xl font-bold mb-6"
        style={{ fontFamily: '"JetBrains Mono", monospace' }}
      >
        {title}
      </h2>

      {/* Container avec gestion du hover */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        
        {/* Flèche gauche */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Défiler vers la gauche"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Flèche droite */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Défiler vers la droite"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Bande horizontale scrollable SANS scrollbar visible */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <div key={index} className="flex-none w-64">
                  <SkeletonComponent />
                </div>
              ))
            ) : (
              items?.slice(0, 10).map(item => (
                <div key={item.id} className="flex-none w-64">
                  <ItemCard item={item} type={type} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HorizontalSection;