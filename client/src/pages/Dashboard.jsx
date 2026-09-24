import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (user?.role === 'employer') {
      api.get('/api/jobs').then(res => {
        setJobs(res.data.filter(job => job.employer._id === user.id));
      });
    } else if (user?.role === 'jobseeker') {
      api.get('/api/jobs').then(res => {
        setJobs(res.data);
      });
    }
  }, [user]);

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', resume);
    try {
      await api.post('/api/users/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Resume uploaded');
    } catch (err) {
      alert('Upload failed');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {user.role === 'employer' ? (
        <div>
          <Link to="/jobs/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post New Job</Link>
          <h2 className="text-2xl mt-8 mb-4">Your Jobs</h2>
          {jobs.map(job => (
            <div key={job._id} className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p>Applicants: {job.applicants.length}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <form onSubmit={handleResumeUpload} className="mb-8">
            <h2 className="text-2xl mb-4">Upload Resume</h2>
            <input type="file" onChange={(e) => setResume(e.target.files[0])} className="mb-4" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Upload</button>
          </form>
          <h2 className="text-2xl mb-4">Available Jobs</h2>
          {jobs.map(job => (
            <div key={job._id} className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p>Company: {job.company}</p>
              <Link to={`/jobs/${job._id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;