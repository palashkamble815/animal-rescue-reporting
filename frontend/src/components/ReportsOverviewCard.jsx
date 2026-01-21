import React from 'react';
import { Link } from 'react-router-dom';

const ReportsOverviewCard = () => {
  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-lg flex-1 min-w-[300px]">
      <h3 className="text-xl font-semibold mb-2">Manage Reports</h3>
      <p className="text-gray-700 mb-4">View incoming reports, update their status, and track resolved cases.</p>
      <Link to="/reports" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View All Reports</Link>
    </div>
  );
};

export default ReportsOverviewCard;
