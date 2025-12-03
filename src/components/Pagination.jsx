import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Limite l'affichage à 5 boutons maximum
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    // Ajuste le startPage si on est vers la fin
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div 
      className="flex items-center justify-center gap-2 my-8"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      {/* Bouton Précédent */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Page précédente"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Bouton première page si nécessaire */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Boutons de pages */}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors ${
            page === currentPage
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Bouton dernière page si nécessaire */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Bouton Suivant */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Page suivante"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export default Pagination;
