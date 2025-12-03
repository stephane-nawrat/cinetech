function SkeletonCard() {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden animate-pulse">
      {/* Rectangle gris pour simuler le poster */}
      <div className="bg-gray-700 h-80"></div>
      
      {/* Rectangle gris pour simuler le titre */}
      <div className="p-4">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;