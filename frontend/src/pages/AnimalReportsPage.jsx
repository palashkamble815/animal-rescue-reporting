import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import ReportDetailsModal from '../components/ReportDetailsModal';
import ReportCard from '../components/ReportCard';

const AnimalReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await API.get('/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  return (
    <Layout>
      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide 
        text-gray-500 drop-shadow-lg"
      >
        🐾 Animal Reports
      </h1>

      {reports.length === 0 ? (
        <p className="text-center text-gray-300 italic">No reports available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}

      <ReportDetailsModal report={selectedReport} onClose={handleCloseModal} />
    </Layout>
  );
};

export default AnimalReportsPage;
