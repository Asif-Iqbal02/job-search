import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Job Portal</h1>
        <p className="text-lg mb-8">Find your dream job or hire the best talent.</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Get Started</Link>
          <Link to="/jobs" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;