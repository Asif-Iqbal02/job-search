const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name company');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Create job (employer only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Access denied' });

  const { title, description, company, location, salary } = req.body;
  try {
    const job = new Job({ title, description, company, location, salary, employer: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply for job
router.post('/:id/apply', auth, async (req, res) => {
  if (req.user.role !== 'jobseeker') return res.status(403).json({ message: 'Only jobseekers can apply' });

  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.applicants.includes(req.user.id)) return res.status(400).json({ message: 'Already applied' });

    job.applicants.push(req.user.id);
    await job.save();
    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;