import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

function Footer() {
  // Récupère le thème actuel pour adapter le background
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const footerBg = theme === 'dark' ? '#1a1a1a' : '#F5E6D3';

  return (
    <footer 
      style={{ 
        backgroundColor: footerBg,
        borderTop: '0.5px solid #000000',
        fontFamily: '"JetBrains Mono", monospace'
      }}
    >
      {/* Contenu principal : 3 colonnes */}
      <div className="container mx-auto px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Colonne 1 : Informations structurelles */}
          <div>
            <Link 
              to="/" 
              className="text-2xl font-extralight text-cyan-500 mb-6 block"
              style={{ fontFamily: 'Menlo, Monaco, monospace' }}
            >
              Cinétech
            </Link>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="#" 
                  className="text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  to="/films" 
                  className="text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
                >
                  Films
                </Link>
              </li>
              <li>
                <Link 
                  to="/series" 
                  className="text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
                >
                  Séries
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 2 : Références légales */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Mentions légales</h3>
            <p className="text-sm text-base-content mb-3">
              Data provided by The Movie Database (TMDB)
            </p>
            <Link 
              to="#" 
              className="text-sm text-base-content hover:underline decoration-cyan-500 decoration-2 underline-offset-4"
            >
              Politique de Confidentialité
            </Link>
          </div>

          {/* Colonne 3 : Réseaux sociaux + Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Suivez-nous</h3>
            <div className="flex gap-6 mb-6">
              <a 
                href="#" 
                className="text-base-content hover:text-cyan-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-base-content hover:text-cyan-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-base-content hover:text-cyan-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
            <a 
              href="mailto:contact@cinetech.com" 
              className="text-sm text-base-content hover:text-cyan-500 flex items-center gap-2"
            >
              <Mail size={18} />
              contact@cinetech.com
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar : Copyright */}
      <div 
        className="text-center py-4 text-sm"
        style={{ 
          backgroundColor: theme === 'dark' ? '#0a0a0a' : '#E8D4B8',
          borderTop: '0.5px solid #000000'
        }}
      >
        <p>© 2025 Cinétech - Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;