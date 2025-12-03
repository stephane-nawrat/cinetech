import { useState, useEffect } from "react";

function useFetch(fetchFunction, dependencies = []) {
  // États pour gérer les données, le chargement et les erreurs
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Réinitialise les états au début de chaque requête
    setLoading(true);
    setError(null);

    // Exécute la fonction de fetch passée en paramètre
    fetchFunction()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, dependencies); // Re-exécute si les dépendances changent

  // Retourne un objet avec les 3 états
  return { data, loading, error };
}

export default useFetch;
