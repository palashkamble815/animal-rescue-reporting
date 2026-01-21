import React from 'react';
import { Link } from 'react-router-dom';

const AddSuccessStoryCard = () => {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
      <h3 className="text-xl font-semibold mb-2">Share a Success Story</h3>
      <p className="text-gray-700 mb-4">Document your successful animal rescues and adoptions to inspire others.</p>
      <Link to="/success-stories/new" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Add New Story</Link>
    </div>
  );
};

export default AddSuccessStoryCard;
