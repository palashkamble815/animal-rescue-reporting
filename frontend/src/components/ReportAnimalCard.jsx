import React from 'react';
import { Link } from 'react-router-dom';

const ReportAnimalCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex-1 min-w-[300px]">
      <div className="bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              📸
            </div> 
      <h3 className="text-2xl font-semibold flex items-center justify-center mb-3">Report an Animal in Need</h3>
      <p className="text-gray-700 mb-4">Found an injured, stray, or lost animal? Your report can make a difference. Provide details and location to help us rescue them.</p>
      <Link to="/reports/new" className=" flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600 ">Report Now</Link>
    </div>
  );
};

export default ReportAnimalCard;
