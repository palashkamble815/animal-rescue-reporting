import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const NGORepositoryPage = () => {
  const [reports, setReports] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      if (!auth.token || !auth.ngo) {
        navigate('/login');
        return;
      }
      try {
        const response = await API.get(`/reports/ngo/${auth.ngo._id}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching animal reports:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchReports();
  }, [auth, navigate]);

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await API.put(`/api/animalreports/${reportId}/status`, { status: newStatus, ngoId: auth.ngo._id });
      // Update the status in the local state
      setReports(reports.map(report =>
        report._id === reportId ? { ...report, status: newStatus } : report
      ));
    } catch (error) {
      console.error('Error updating report status:', error);
      alert('Failed to update report status.');
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Manage Animal Reports</h1>
      {reports.length === 0 ? (
        <p>No animal reports assigned to your NGO.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <div key={report._id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={report.image} alt={report.reportType} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold capitalize">{report.reportType}</h2>
              <p className="text-gray-600">{report.description}</p>
              <p className="text-gray-500 text-sm">Location: {report.location.address}</p>
              <div className="mt-2">
                <label htmlFor={`status-${report._id}`} className="block text-sm font-medium text-gray-700">Status:</label>
                <select
                  id={`status-${report._id}`}
                  name="status"
                  value={report.status}
                  onChange={(e) => handleStatusChange(report._id, e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  disabled={
                    (report.status === 'pending' && report.assignedTo && report.assignedTo !== auth.ngo._id) ||
                    (report.status !== 'pending' && report.assignedTo !== auth.ngo._id) ||
                    report.status === 'resolved' ||
                    report.status === 'rejected'
                  }
                >
                  {report.status === 'pending' && !report.assignedTo ? (
                    <option value="accepted">Accept</option>
                  ) : (
                    <>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default NGORepositoryPage;