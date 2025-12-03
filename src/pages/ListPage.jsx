function ListPage({ type }) {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        {type === 'movie' ? 'Films' : 'Séries'}
      </h1>
      <p className="text-lg">
        Liste des {type === 'movie' ? 'films' : 'séries'} avec pagination
      </p>
    </div>
  );
}

export default ListPage;