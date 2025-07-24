import React, { useState, useEffect } from 'react';
import { Molecule } from '../types/molecule';

interface MolecularDisplayProps {
  molecule: Molecule;
  isLoading: boolean;
}

export const MolecularDisplay: React.FC<MolecularDisplayProps> = ({ 
  molecule, 
  isLoading 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.cid}/PNG?record_type=2d&image_size=large`;

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [molecule.cid]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="relative mb-8">
        {isLoading && (
          <div className="flex items-center justify-center w-96 h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
          </div>
        )}
        
        {!isLoading && !imageError && (
          <div className={`transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src={imageUrl}
              alt={`Molecular structure of ${molecule.name}`}
              className="max-w-96 max-h-96 object-contain rounded-2xl shadow-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        )}

        {imageError && (
          <div className="flex items-center justify-center w-96 h-96 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="text-center text-white/70">
              <div className="text-6xl mb-4">⚗️</div>
              <div className="text-lg">Structure not available</div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
          {molecule.name}
        </h1>
        {molecule.formula && (
          <p className="text-xl text-blue-300 font-mono tracking-wider">
            {molecule.formula}
          </p>
        )}
        <p className="text-sm text-white/60 uppercase tracking-widest">
          CID: {molecule.cid}
        </p>
      </div>
    </div>
  );
};