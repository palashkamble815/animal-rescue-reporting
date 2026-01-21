import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import axios from 'axios'; // Import axios for delete operations

const AdoptionCard = ({ adoption, onDelete }) => { // Accept adoption and onDelete props
  const { auth } = useContext(AuthContext);
  const isOwner = auth?.user && adoption?.postedBy && auth?.user.id === adoption?.postedBy;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this adoption post?')) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };
        await axios.delete(`http://localhost:5000/api/adoptions/${adoption._id}`, config);
        alert('Adoption post deleted successfully!');
        if (onDelete) onDelete(adoption._id); // Call onDelete to update parent state
      } catch (error) {
        console.error('Error deleting adoption post:', error);
        alert('Failed to delete adoption post.');
      }
    }
  };

  // If no adoption prop is provided, render the generic card
  if (!adoption) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex-1 min-w-[300px]">
        <div className="bg-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                🏠
              </div>
        <h3 className="text-2xl font-semibold flex items-center justify-center mb-3">Adopt a Pet</h3>
        <p className="text-gray-700 mb-4">Looking for a furry friend? Browse our adorable animals available for adoption. Give a loving home to a pet in need.</p>
        <Link to="/adoptions" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center">View Adoptable Pets</Link>
      </div>
    );
  }

  // Render the adoption post details with edit/delete options
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {adoption.image && (
        <img
          src={"http://localhost:5000/${adoption.image.replace(//g, '/')}"}
          alt={adoption.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{adoption.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Description:</span> {adoption.description}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Health Status:</span> {adoption.healthStatus}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Age:</span> {adoption.age} months
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">Contact:</span> {adoption.contactNumber}
        </p>
        {isOwner && (
          <div className="mt-4 flex justify-end space-x-2">
            <Link
              to={`/adoptions/edit/${adoption._id}`}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionCard;