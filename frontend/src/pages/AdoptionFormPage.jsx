import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Layout from '../components/Layout';
import API from '../services/api';
import AuthContext from '../context/AuthContext';
import axios from 'axios'; // Import axios for PUT request

const AdoptionFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    healthStatus: '',
    age: '',
    contactNumber: '', // New field
    image: null
  });
  const [currentImage, setCurrentImage] = useState(''); // To display existing image
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for edit mode
  const isEditMode = !!id; // Check if in edit mode

  useEffect(() => {
    if (isEditMode) {
      const fetchAdoption = async () => {
        try {
          const response = await API.get(`/adoptions/${id}`);
          const adoption = response.data;
          setFormData({
            name: adoption.name,
            description: adoption.description,
            healthStatus: adoption.healthStatus,
            age: adoption.age,
            contactNumber: adoption.contactNumber || '', // Populate new field
            image: null // Image will be handled separately
          });
          setCurrentImage(adoption.image); // Set current image path
        } catch (error) {
          console.error('Error fetching adoption for edit:', error);
          setErrors({ submit: 'Failed to load adoption for editing.' });
        }
      };
      fetchAdoption();
    }
  }, [id, isEditMode]);

  // Live validation on each change
  const validateField = (name, value) => {
    let message = '';
    switch (name) {
      case 'name':
        if (!value.trim()) message = 'Name is required';
        break;
      case 'description':
        if (!value.trim()) message = 'Description is required';
        break;
      case 'healthStatus':
        if (!value.trim()) message = 'Health status is required';
        break;
      case 'age':
        if (!value || isNaN(value) || value <= 0) message = 'Enter a valid positive age';
        break;
      case 'contactNumber': // New validation
        if (!value.trim()) message = 'Contact number is required';
        break;
      case 'image':
        if (!isEditMode && !value) message = 'Image is required'; // Required only for create mode
        break;
      default:
        break;
    }
    return message;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== 'image') { // Image validation handled separately
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    if (!isEditMode && !formData.image) { // Image required for create
      newErrors.image = 'Image is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;
    setFormData({ ...formData, [name]: fieldValue });

    // Validate the field immediately
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image' && !value) return; // Don't append if image is null (not changed in edit)
      data.append(key, value);
    });
    // No need to append ngoId, it's handled by backend auth

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/adoptions/${id}`, data, config);
        alert('Adoption post updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/adoptions', data, config);
        alert('Adoption post created successfully!');
      }
      navigate('/adoptions');
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} adoption post:`, err);
      setErrors({ submit: err.response?.data?.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      healthStatus: '',
      age: '',
      contactNumber: '',
      image: null
    });
    setCurrentImage('');
    setErrors({});
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6 border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {isEditMode ? '🐾 Edit Animal for Adoption' : '🐾 Add an Animal for Adoption'}
        </h1>

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 animate-fadeIn">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[ 
            { label: 'Name', name: 'name', type: 'text' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Health Status', name: 'healthStatus', type: 'text' },
            { label: 'Age', name: 'age', type: 'number' },
            { label: 'Contact Number', name: 'contactNumber', type: 'text' } // New field
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-semibold mb-1">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-blue-500 outline-none ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg transition focus:ring-2 focus:ring-blue-500 outline-none ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                />
              )}
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Image {isEditMode && currentImage ? "(Optional - leave blank to keep current image)" : <span className="text-red-500">*</span>}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-600 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {isEditMode && currentImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Image:</p>
                <img
                  src={"http://localhost:5000/${currentImage.replace(//g, '/')}" }
                  alt="Current Adoption"
                  className="w-32 h-32 object-cover rounded-lg mt-1"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>
            <button
              type="submit" disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {loading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Adoption' : 'Add for Adoption')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AdoptionFormPage;