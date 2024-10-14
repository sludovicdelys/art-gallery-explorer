import React from 'react';
import { Palette } from 'lucide-react';

const ArtLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <Palette size={48} className="text-blue-500 animate-spin mb-4" />
      <div className="text-lg font-semibold text-gray-800" >Loading masterpieces...</div>
    </div>
  );
};

export default ArtLoader;