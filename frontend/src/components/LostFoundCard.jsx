import React from 'react';
import { Link } from 'react-router-dom';

const LostFoundCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
      <div className="bg-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
               🔍
      </div>
      <h3 className="text-2xl font-semibold flex items-center justify-center mb-3">Lost & Found Pets</h3>
      <p className="text-gray-700 mb-4">Lost your pet or found a stray? Check our listings or report a lost/found animal to help reunite them with their families.</p>
      <Link to="/lost-and-found" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 flex items-center justify-center">Browse Lost & Found</Link>
    </div>
  );
};

export default LostFoundCard;