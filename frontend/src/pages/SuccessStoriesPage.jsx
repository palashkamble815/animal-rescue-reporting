import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Assuming axios is used for API calls

const SuccessStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const { auth } = useContext(AuthContext); // Get auth context

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await API.get('/success-stories');
        setStories(response.data);
      } catch (error) {
        console.error('Error fetching success stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/successstories/${id}`, config);
        alert('Story deleted successfully!');
        setStories(stories.filter(story => story._id !== id)); // Remove deleted story from state
      } catch (error) {
        console.error('Error deleting story:', error);
        alert('Failed to delete story.');
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Success Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(story => (
          <div key={story._id} className="border p-4 rounded-lg">
            <img src={`http://localhost:5000/${story.image}`} alt={story.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-xl font-bold">{story.title}</h2>
            <p>{story.description}</p>
            {auth.user && story.createdBy && auth.user.id === story.createdBy && ( // Conditional rendering for owner
              <div className="mt-4 flex justify-end space-x-2">
                <Link
                  to={`/success-stories/edit/${story._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default SuccessStoriesPage;
