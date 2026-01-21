import React from "react";
import Layout from "../components/Layout";

const AboutUsPage = () => {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
            About Us
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Dedicated to rescuing, protecting, and rehoming animals in need.
          </p>

          {/* Mission Section */}
          <div className="space-y-6">
            <div className="p-5 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🐾 Our Mission
              </h3>
              <p className="text-gray-600">
                Our mission is to provide shelter, medical care, and love to
                injured, abandoned, and lost animals while working tirelessly to
                find them a safe and loving home.
              </p>
            </div>

            {/* What We Do */}
            <div className="p-5 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                ❤️ What We Do
              </h3>
              <p className="text-gray-600">
                We collaborate with NGOs, volunteers, and communities to rescue
                animals, promote adoptions, and create awareness about animal
                welfare. Every rescue story brings us closer to a world where no
                animal is left behind.
              </p>
            </div>

            {/* Our Vision */}
            <div className="p-5 bg-indigo-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                🌍 Our Vision
              </h3>
              <p className="text-gray-600">
                To build a compassionate world where animals are treated with
                kindness, respect, and dignity — ensuring they have a safe and
                happy life.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            Together, we can make a difference. 🐶🐱
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUsPage;
