import React from 'react';
import { Link } from 'react-router-dom';

const AddLostFoundCard = () => {
  return (
    <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
      <h3 className="text-xl font-semibold mb-2">Report Lost/Found Pet</h3>
      <p className="text-gray-700 mb-4">Help reunite lost pets with their owners or report a found animal.</p>
      <Link to="/lost-and-found/new" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Add Report</Link>
    </div>
  );
};

export default AddLostFoundCard;
