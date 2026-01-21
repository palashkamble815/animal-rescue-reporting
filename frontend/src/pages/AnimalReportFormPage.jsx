import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

const RecenterMap = ({ location }) => {
  const map = useMapEvents({});
  useEffect(() => {
    if (location) map.setView(location, map.getZoom());
  }, [location, map]);
  return null;
};

const AnimalReportFormPage = () => {
  const [animalType, setAnimalType] = useState("injured");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Geolocation error:", err.message)
      );
    }
  }, [location]);

  const validateForm = () => {
    let newErrors = {};
    if (!animalType) newErrors.animalType = "Please select the animal type.";
    if (!image) {
      newErrors.image = "Please upload an image.";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(image.type)) {
        newErrors.image = "Only JPG or PNG images are allowed.";
      }
      if (image.size > 5 * 1024 * 1024) {
        newErrors.image = "Image size should not exceed 5MB.";
      }
    }
    if (!description.trim())
      newErrors.description = "Please provide a description.";
    if (!location)
      newErrors.location = "Please select a location on the map.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage(''); // Clear any previous success message

    const formData = new FormData();
    formData.append("animalType", animalType);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("latitude", location.lat);
    formData.append("longitude", location.lng);
    formData.append("address", "");

    try {
      await API.post("/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage('Report submitted successfully!');
      handleReset(); // Clear form fields
      setTimeout(() => setSuccessMessage(''), 5000); // Clear message after 5 seconds
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting report");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnimalType("injured");
    setDescription("");
    setImage(null);
    setLocation(null);
    setErrors({});
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert("Could not fetch location: " + err.message)
    );
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-10 px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
            🐾 Report an Animal
          </h1>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> {successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Animal Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Animal Type
              </label>
              <select
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="injured">Injured</option>
                <option value="stray">Stray</option>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              {errors.animalType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.animalType}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Upload Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                           file:rounded-full file:border-0 file:text-sm file:font-semibold 
                           file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe the animal and its condition..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Map Location */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Location on Map
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="mb-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
              >
                📍 Use Current Location
              </button>

              <MapContainer
                center={location || [20.5937, 78.9629]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                className="rounded-xl border border-gray-300 shadow"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationPicker onLocationSelect={setLocation} />
                {location && <Marker position={location} />}
                <RecenterMap location={location} />
              </MapContainer>

              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              > 
                {loading ? "Submitting..." : "📨 Submit Report"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg shadow transition-all duration-300"
              >
               🔄 Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AnimalReportFormPage;