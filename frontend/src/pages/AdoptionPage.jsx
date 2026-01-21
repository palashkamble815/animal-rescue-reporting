import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdoptionPage = () => {
  const [adoptions, setAdoptions] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await API.get('/adoptions');
        setAdoptions(response.data);
      } catch (error) {
        console.error('Error fetching adoptions:', error);
      }
    };

    fetchAdoptions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this adoption post?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/adoptions/${id}`, config);
        alert('Adoption post deleted successfully!');
        setAdoptions(adoptions.filter(adoption => adoption._id !== id));
      } catch (error) {
        console.error('Error deleting adoption post:', error);
        alert('Failed to delete adoption post.');
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          🐾 Adoption Center
        </h1>

        {adoptions.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No adoption posts available at the moment.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {adoptions.map(adoption => (
              <div
                key={adoption._id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={`http://localhost:5000/${adoption.image}`}
                  alt={adoption.name}
                  className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{adoption.name}</h2>
                  <p className="text-gray-600 text-sm mb-3">{adoption.description}</p>
                  <p className="text-sm text-gray-500">📞 {adoption.contactNumber}</p>

                  {auth.ngo && adoption.postedBy && auth.ngo.id === adoption.postedBy.toString() && (
                    <div className="mt-4 flex space-x-3">
                      <Link
                        to={`/adoptions/edit/${adoption._id}`}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(adoption._id)}
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

export default AdoptionPage;
