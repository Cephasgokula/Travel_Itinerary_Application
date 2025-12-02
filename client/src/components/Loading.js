import React from 'react';

function Loading() {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-[#E3F6FF]">
      <div className="inline-block w-12 h-12 border-4 border-[#E3F6FF] border-t-[#0A6EBD] rounded-full animate-spin mb-6"></div>
      <h3 className="text-xl font-semibold text-[#003049] mb-2">Creating your perfect itinerary...</h3>
      <p className="text-gray-500">This may take a few moments</p>
    </div>
  );
}

export default Loading;
