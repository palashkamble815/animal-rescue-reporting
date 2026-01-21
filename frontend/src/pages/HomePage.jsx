import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import API from "../services/api";
import ReportAnimalCard from "../components/ReportAnimalCard";
import AdoptionCard from "../components/AdoptionCard";
import LostFoundCard from "../components/LostFoundCard";
import AuthContext from "../context/AuthContext";
import DashboardSummaryCard from "../components/DashboardSummaryCard";
import ReportsOverviewCard from "../components/ReportsOverviewCard";
import AddSuccessStoryCard from "../components/AddSuccessStoryCard";
import AddLostFoundCard from "../components/AddLostFoundCard";
import AddAdoptionCard from "../components/AddAdoptionCard";

const HomePage = () => {
  const [successStories, setSuccessStories] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchSuccessStories = async () => {
      try {
        const response = await API.get("/success-stories");
        setSuccessStories(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching success stories:", error);
      }
    };
    fetchSuccessStories();
  }, []);

  return (
    <Layout>
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="relative text-center py-16 bg-gradient-to-b from-indigo-50 via-purple-50 to-white">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Help <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">Animals in Need</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we can rescue injured, lost, and stray animals — giving them a second chance at life.
            </p>
          </div>
          <div className="mt-10">
            <Carousel />
          </div>
        </section>

        {/* Action Cards */}
        <section>
          <div className="flex flex-wrap justify-center gap-6 px-4">
            {auth && auth.ngo && auth.token ? (
              <>
                <DashboardSummaryCard />
                <ReportsOverviewCard />
                <AddSuccessStoryCard />
                <AddLostFoundCard />
                <AddAdoptionCard />
                <LostFoundCard />
                <AdoptionCard />
              </>
            ) : (
              <>
                <ReportAnimalCard />
                <AdoptionCard />
                <LostFoundCard />
              </>
            )}
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            ❤️ Our Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {successStories.map((story) => (
              <div
                key={story._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <img
                  src={`http://localhost:5000/${story.image}`}
                  alt={story.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transform transition duration-500"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{story.title}</h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    {story.description.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/success-stories`}
                    className="mt-4 inline-block text-indigo-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/success-stories"
              className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition duration-300"
            >
              View All Success Stories
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { count: "50+", label: "Animals Reported", color: "text-blue-600" },
                { count: "30+", label: "Successfully Rescued", color: "text-green-600" },
                { count: "15+", label: "Adoptions Completed", color: "text-purple-600" },
                { count: "8+", label: "NGOs Partnered", color: "text-orange-600" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition duration-300"
                >
                  <div className={`text-5xl font-extrabold mb-3 ${stat.color}`}>
                    {stat.count}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
