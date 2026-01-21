import React from 'react';
import Layout from '../components/Layout';

const ContactUsPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-8">
            We’d love to hear from you! Whether you have a question, feedback, or
            need assistance — we’re here 24/7.
          </p>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Phone Section */}
            <div className="p-5 bg-indigo-50 rounded-lg flex items-center space-x-4">
              <span className="text-indigo-600 text-2xl">📞</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Customer Support
                </h3>
                <p className="text-gray-600">
                  Toll-Free: <span className="font-medium">1800 000 0000 / +91 88880 XXXXX</span>
                </p>
                <p className="text-gray-500 text-sm">Available : 24/7</p>
              </div>
            </div>

            {/* Address Section */}
            <div className="p-5 bg-indigo-50 rounded-lg flex items-center space-x-4">
              <span className="text-indigo-600 text-2xl">📍</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">XXXX, Hyderabad</p>
                <p className="text-gray-500">
                  Housing Board, Hyderabad
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            We aim to respond to all queries within 24 hours.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUsPage;
