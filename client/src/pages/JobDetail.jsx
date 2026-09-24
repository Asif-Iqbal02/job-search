import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../contexts/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);

  useEffect(() => {
    api.get(`/api/jobs/${id}`).then(res => setJob(res.data));
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post(`/api/jobs/${id}/apply`);
      alert('Applied successfully');
    } catch (err) {
      alert('Application failed');
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <p className="text-lg mb-2">{job.company}</p>
        <p className="mb-2">{job.location}</p>
        <p className="mb-4">{job.description}</p>
        {job.salary && <p className="mb-4">Salary: {job.salary}</p>}
        {user?.role === 'jobseeker' && (
          <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
        )}
      </div>
    </div>
  );
};

export default JobDetail;