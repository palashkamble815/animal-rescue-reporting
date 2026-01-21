import React, { useState, useEffect } from 'react';

const ReportCard = ({ report, onViewDetails }) => {
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

  return (
    <div
      className="backdrop-blur-md bg-[#2A1B3D]/80 rounded-2xl overflow-hidden 
                 shadow-lg hover:shadow-xl 
                 border border-[#D4AF37]/40 
                 hover:scale-[1.02] transition-all duration-500"
    >
      {/* Image */}
      <div className="relative group">
        <img
          src={`http://localhost:5000${report.image}`}
          alt={report.description}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-6 text-gray-100">
        <h2 className="text-2xl font-semibold mb-3 text-white">
          {report.description}
        </h2>
        <p className="text-sm text-gray-300 flex items-center gap-2">
          📍 {address}
        </p>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#D4AF37]/30 flex justify-center">
        <button
          onClick={() => onViewDetails(report)}
          className="px-6 py-2 text-sm font-semibold rounded-full 
                           bg-[#D4AF37] 
                           text-[#2A1B3D] shadow-md 
                           hover:shadow-lg hover:scale-105 
                           transition-all duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
