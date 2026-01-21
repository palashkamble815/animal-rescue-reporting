import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';
import Layout from '../components/Layout';
import API from '../services/api';

const RegisterPage = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation rules
  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value))
          error = 'Invalid email format';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'phone':
        if (!value) error = 'Phone is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const payload = { ...formData };
    let url = '/auth/user/register';
    if (userType === 'ngo') {
      url = '/auth/register';
    } else if (userType === 'pet-hospital') {
      url = '/auth/pet-hospital/register';
      payload.lat = 0;
      payload.lng = 0;
    }

    try {
      await API.post(url, payload);
      navigate('/login');
    } catch (err) {
      setErrors({ api: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const fieldIcons = {
    name: <FaUser className="text-gray-500" />,
    email: <FaEnvelope className="text-gray-500" />,
    password: <FaLock className="text-gray-500" />,
    phone: <FaPhone className="text-gray-500" />,
    address: <FaHome className="text-gray-500" />,
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg transition-transform transform hover:scale-[1.01]">
          <h1 className="text-4xl font-extrabold text-center mb-6  text-indigo-700">
            Create an Account
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Join our community and help make a difference for animals.
          </p>

          {errors.api && (
            <p className="text-red-500 text-center mb-4">{errors.api}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Register as
              </label>
              <select
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="ngo">NGO</option>
                <option value="pet-hospital">Pet Hospital</option>
              </select>
            </div>

            {/* Dynamic Fields */}
            {['name', 'email', 'password', 'phone', 'address'].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-gray-700 font-medium mb-1 capitalize"
                >
                  {field}
                </label>
                <div className="flex items-center border rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-400">
                  {fieldIcons[field]}
                  <input
                    type={
                      field === 'password'
                        ? 'password'
                        : field === 'email'
                        ? 'email'
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="ml-3 flex-1 outline-none"
                    placeholder={`Enter your ${field}`}
                  />
                </div>
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-200"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
