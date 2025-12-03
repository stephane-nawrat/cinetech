import { useParams } from 'react-router-dom';

function DetailPage() {
  const { type, id } = useParams();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Détail</h1>
      <p className="text-lg">
        Type: {type} - ID: {id}
      </p>
      <p className="text-lg mt-4">
        Ici apparaîtront : poster, synopsis, casting, suggestions similaires
      </p>
    </div>
  );
}

export default DetailPage;