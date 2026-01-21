import React, { useState, useEffect } from 'react';

const ReportDetailsModal = ({ report, onClose }) => {
  const [address, setAddress] = useState('Loading...');

  useEffect(() => {
    if (report?.location) {
      const { latitude, longitude } = report.location;
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
          setAddress(data.display_name || 'Address not found');
        })
        .catch(error => {
          console.error('Error fetching address:', error);
          setAddress('Could not fetch address');
        });
    }
  }, [report]);

  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all scale-95">
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Report Details</h2>
        </div>
        <div className="p-6">
          <img
            src={`http://localhost:5000${report.image}`}
            alt={report.description}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Description:</span> {report.description}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Location:</span> {address}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Reported At:</span> {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;