import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get('/api/jobs').then(res => setJobs(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Job Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{job.title}</h2>
            <p className="mb-2">{job.company}</p>
            <p className="mb-4">{job.location}</p>
            <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;