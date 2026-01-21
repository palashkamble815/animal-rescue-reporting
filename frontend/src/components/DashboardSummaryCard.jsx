import React from 'react';
import { Link } from 'react-router-dom';

const DashboardSummaryCard = () => {
  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
      <h3 className="text-xl font-semibold mb-2">Your Dashboard</h3>
      <p className="text-gray-700 mb-4">View your assigned reports, resolved cases, and overall NGO statistics.</p>
      <Link to="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Dashboard</Link>
    </div>
  );
};

export default DashboardSummaryCard;
