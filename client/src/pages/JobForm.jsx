import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import AuthContext from '../contexts/AuthContext';

const JobForm = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', description: '', company: '', location: '', salary: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/jobs', form);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to post job');
    }
  };

  if (user?.role !== 'employer') return <div>Access denied</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
        <input type="text" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required></textarea>
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="text" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Post Job</button>
      </form>
    </div>
  );
};

export default JobForm;