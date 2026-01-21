import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (auth.token && auth.ngo) { // Ensure user is logged in and is an NGO
        try {
          const response = await API.get('/ngo/dashboard');
          setDashboardData(response.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          // Handle unauthorized access or other errors
          if (error.response && error.response.status === 401) {
            // Optionally redirect to login or show an error message
            navigate('/login');
          }
        }
      } else {
        // If not an NGO or not logged in, redirect to login
        navigate('/login');
      }
    };

    fetchDashboardData();
  }, [auth, navigate]);

  if (!dashboardData) {
    return <Layout>Loading dashboard...</Layout>;
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">NGO Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Total Reports</h2>
          <p className="text-3xl">{dashboardData.totalReports}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Pending Reports</h2>
          <p className="text-3xl">{dashboardData.pendingReports}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Accepted Reports</h2>
          <p className="text-3xl">{dashboardData.acceptedReports}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Resolved Reports</h2>
          <p className="text-3xl">{dashboardData.resolvedReports}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Success Stories</h2>
          <p className="text-3xl">{dashboardData.successStories}</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/ngo/reports" className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-600 transition duration-300">
          Manage Reports
        </Link>
      </div>
    </Layout>
  );
};

export default DashboardPage;