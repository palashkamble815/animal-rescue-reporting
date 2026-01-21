import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('report');

  const renderContent = () => {
    switch (activeTab) {
      case 'report':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Report an Animal in Need</h3>
            <p className="text-gray-700 mb-4">Found an injured, stray, or lost animal? Your report can make a difference. Provide details and location to help us rescue them.</p>
            <Link to="/reports/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Report Now</Link>
          </div>
        );
      case 'adoption':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Adopt a Pet</h3>
            <p className="text-gray-700 mb-4">Looking for a furry friend? Browse our adorable animals available for adoption. Give a loving home to a pet in need.</p>
            <Link to="/adoptions" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View Adoptable Pets</Link>
          </div>
        );
      case 'lost-found':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-2">Lost & Found Pets</h3>
            <p className="text-gray-700 mb-4">Lost your pet or found a stray? Check our listings or report a lost/found animal to help reunite them with their families.</p>
            <Link to="/lost-and-found" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Browse Lost & Found</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-lg font-medium ${activeTab === 'report' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('report')}
        >
          Report Animal
        </button>
        <button
          className={`ml-4 px-4 py-2 text-lg font-medium ${activeTab === 'adoption' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('adoption')}
        >
          Adoption
        </button>
        <button
          className={`ml-4 px-4 py-2 text-lg font-medium ${activeTab === 'lost-found' ? 'border-b-2 border-yellow-500 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('lost-found')}
        >
          Lost & Found
        </button>
      </div>
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabContainer;
