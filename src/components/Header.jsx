import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Heart, LogIn, Sun, Moon, X, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

function Header() {
  // État local pour gérer le thème actuel (light ou dark)
  const [theme, setTheme] = useState('dark');
  
  // État local pour gérer l'ouverture de la barre de recherche
  const [searchOpen, setSearchOpen] = useState(false);
  
  // État pour la recherche
  const [searchQuery, setSearchQuery] = useState('');

  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Fonction pour gérer la soumission de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Vide le champ
      setSearchOpen(false); // Ferme la barre
    }
  };
  
  // Au montage du composant, récupère le thème sauvegardé ou applique 'dark' par défaut
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Fonction pour basculer entre light et dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Couleur de fond du header selon le thème
  const headerBg = theme === 'dark' ? '#0f0f0fff' : '#FAEBD7';

  return (
    <header 
      className="sticky top-0 z-50" 
      style={{ 
        backgroundColor: headerBg,
        borderBottom: '0.5px solid #000000'
      }}
    >
      <div className="flex items-center justify-between px-20 h-16">
        
        {/* GAUCHE : Logo Cinétech */}
        <div className="flex-none">
          <Link 
            to="/" 
            className="text-3xl text-cyan-500 leading-none"
            style={{ fontFamily: 'Menlo, Monaco, monospace', fontWeight: 100 }}
          >
            Cinétech
          </Link>
        </div>

        {/* CENTRE : Navigation */}
        <div className="flex-1 flex justify-start ml-12">
          <nav 
            className="hidden md:flex gap-6 items-center"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            <Link 
              to="/films" 
              className="text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
            >
              Films
            </Link>
            <Link 
              to="/series" 
              className="text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
            >
              Séries
            </Link>
            <Link 
              to="/" 
              className="text-base-content underline decoration-cyan-500 decoration-2 underline-offset-4"
            >
              Nouveautés
            </Link>
          </nav>
        </div>

          {/* DROITE : Recherche déployable + Mes vidéos + Se connecter + Toggle Theme */}
        <div 
          className="flex items-center gap-6 flex-1 justify-end text-sm h-12 "
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          {/* Recherche déployable */}
          {!searchOpen ? (
            // Loupe seule : même taille que la barre déployée pour éviter les décalages
       <button 
          onClick={() => setSearchOpen(true)}
          className="text-base-content hover:text-cyan-500 px-4 py-2 flex items-center justify-center rounded-md"
          style={{ border: '0.5px solid transparent' }}
          aria-label="Rechercher"
        >
          <Search size={22} />
        </button>

          ) : (
         // Barre déployée : même style que "Mes vidéos"
            <form 
              onSubmit={handleSearch}
              className="flex items-center gap-2 px-4 py-2 rounded-md"
              style={{ border: '0.5px solid currentColor' }}
            >
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Film, série, acteur..." 
                className="w-80 bg-transparent focus:outline-none text-sm"
                style={{ fontFamily: 'Menlo, Monaco, monospace' }}
                autoFocus
              />
              <button 
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="text-cyan-500 hover:text-cyan-400"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>
            </form>
          )}

          {/* Mes vidéos avec bordure */}
          <Link 
            to="/profil" 
            className="flex items-center gap-2 hover:underline decoration-cyan-500 decoration-2 underline-offset-4 px-4 py-2 rounded-md"
            style={{ border: '0.5px solid currentColor' }}
          >
            <Heart size={18} />
            <span className="hidden lg:inline">Mes vidéos</span>
          </Link>

          {/* Se connecter / Utilisateur */}
          <Link 
            to="/profil" 
            className="flex items-center gap-2 hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
          >
            {isAuthenticated ? (
              <>
                <User size={18} />
                <span>{user.username}</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Se connecter</span>
              </>
            )}
          </Link>

          {/* Toggle Theme */}
          <button 
            onClick={toggleTheme} 
            className="hover:bg-transparent px-2"
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Moon size={22} className="text-yellow-00" /> : <Sun size={22} className="text-black-400" />}
          </button>
        </div>
        
      </div>
    </header>
  );
}

export default Header;