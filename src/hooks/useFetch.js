import { useState, useEffect } from "react";

function useFetch(fetchFunction, dependencies = [], params = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Appelle la fonction avec les paramètres
    fetchFunction(...params)
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [...dependencies, ...params]); // Re-exécute si les params changent

  return { data, loading, error };
}

export default useFetch;
