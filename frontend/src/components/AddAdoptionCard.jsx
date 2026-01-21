import React from 'react';
import { Link } from 'react-router-dom';

const AddAdoptionCard = () => {
  return (
    <div className="bg-orange-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
      <h3 className="text-xl font-semibold mb-2">Add Adoption Listing</h3>
      <p className="text-gray-700 mb-4">Create a new listing for an animal available for adoption.</p>
      <Link to="/adoptions/new" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Add Listing</Link>
    </div>
  );
};

export default AddAdoptionCard;
