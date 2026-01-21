import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Phone } from 'lucide-react'; // Optional icon

const LostFoundPage = () => {
  const [lostFounds, setLostFounds] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchLostFounds = async () => {
      try {
        const response = await API.get('/lost-and-found');
        setLostFounds(response.data);
      } catch (error) {
        console.error('Error fetching lost and founds:', error);
      }
    };

    fetchLostFounds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lost and found post?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/lost-and-found/${id}`, config);
        alert('Lost & Found post deleted successfully!');
        setLostFounds(lostFounds.filter(lostFound => lostFound._id !== id));
      } catch (error) {
        console.error('Error deleting lost and found post:', error);
        alert('Failed to delete lost and found post.');
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          🔍 Lost & Found
        </h1>

        {lostFounds.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No Lost & Found posts available.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lostFounds.map(lostFound => (
              <div
                key={lostFound._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={`http://localhost:5000/uploads/${lostFound.photo}`}
                  alt={lostFound.description}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <p className="text-gray-700 text-base mb-3">{lostFound.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{lostFound.contact}</span>
                  </div>

                  {auth.ngo && lostFound.postedBy && auth.ngo.id === lostFound.postedBy.toString() && (
                    <div className="mt-4 flex space-x-3">
                      <Link
                        to={`/lost-and-found/edit/${lostFound._id}`}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(lostFound._id)}
                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LostFoundPage;
