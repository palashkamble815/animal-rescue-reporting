import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Layout from '../components/Layout';
import API from '../services/api';
import Button from '../components/Button';
import AuthContext from '../context/AuthContext'; // Import AuthContext
import axios from 'axios'; // Import axios for PUT request

const LostFoundFormPage = () => {
  const [description, setDescription] = useState('');
  const [ageInMonths, setAgeInMonths] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('Unknown');
  const [contact, setContact] = useState('');
  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(''); // To display existing photo

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for edit mode
  const isEditMode = !!id; // Check if in edit mode
  const { auth } = useContext(AuthContext); // Get auth context

  useEffect(() => {
    if (isEditMode) {
      const fetchReport = async () => {
        try {
          const response = await API.get(`/lost-and-found/${id}`);
          const report = response.data;
          setDescription(report.description);
          setAgeInMonths(report.ageInMonths);
          setBreed(report.breed);
          setGender(report.gender);
          setContact(report.contact);
          setCurrentPhoto(report.photo); // Set current photo path
        } catch (error) {
          console.error('Error fetching lost and found report for edit:', error);
          setErrors({ api: 'Failed to load report for editing.' });
        }
      };
      fetchReport();
    }
  }, [id, isEditMode]);

  const validateForm = () => {
    const newErrors = {};

    if (!description.trim()) newErrors.description = 'Description is required.';
    if (!ageInMonths || isNaN(ageInMonths) || Number(ageInMonths) <= 0)
      newErrors.ageInMonths = 'Enter a valid positive number.';
    if (!breed.trim()) newErrors.breed = 'Breed is required.';
    if (!contact.trim()) newErrors.contact = 'Contact information is required.';
    // Photo is required only for create mode or if a new photo is selected in edit mode
    if (!isEditMode && !photo) newErrors.photo = 'Please upload a photo.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('description', description);
    formData.append('ageInMonths', ageInMonths);
    formData.append('breed', breed);
    formData.append('gender', gender);
    formData.append('contact', contact);
    if (photo) { // Only append photo if a new one is selected
      formData.append('photo', photo);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`,
        },
      };

      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/lost-and-found/${id}`, formData, config);
        alert('Lost & Found report updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/lost-and-found', formData, config);
        alert('Lost & Found report created successfully!');
      }
      navigate('/lost-and-found');
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} lost and found report:`, err);
      setErrors({ api: err.response?.data?.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setDescription('');
    setAgeInMonths('');
    setBreed('');
    setGender('Unknown');
    setContact('');
    setPhoto(null);
    setCurrentPhoto('');
    setErrors({});
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          {isEditMode ? "🐾 Edit Lost or Found Pet Report" : "🐾 Report a Lost or Found Pet"}
        </h1>

        {errors.api && (
          <p className="text-red-500 mb-4 bg-red-50 p-2 rounded">{errors.api}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Describe the pet and any identifying features..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Age in Months</label>
            <input
              type="number"
              value={ageInMonths}
              onChange={(e) => setAgeInMonths(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 ${
                errors.ageInMonths ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter age in months"
            />
            {errors.ageInMonths && <p className="text-red-500 text-sm mt-1">{errors.ageInMonths}</p>}
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Breed</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 ${
                errors.breed ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter breed (if known)"
            />
            {errors.breed && <p className="text-red-500 text-sm mt-1">{errors.breed}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Unknown">Unknown</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`mt-1 block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 ${
                errors.contact ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Phone number or email"
            />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Photo {isEditMode && currentPhoto ? "(Optional - leave blank to keep current photo)" : ""}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className={`mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 file:text-sm file:font-semibold 
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
            {isEditMode && currentPhoto && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Photo:</p>
                <img
                  src={`http://localhost:5000/uploads/${currentPhoto}`}
                  alt="Current Lost & Found"
                  className="w-32 h-32 object-cover rounded-lg mt-1"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <Button type="submit" disabled={loading} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              {loading ? (isEditMode ? 'Updating...' : 'Submitting...') : (isEditMode ? 'Update Report' : 'Submit Report')}
            </Button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LostFoundFormPage;
