const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const User = require('../model/User')

router.get('/', ensureGuest, (req, res) => {
  res.redirect('http://localhost:5731')
})

router.get("/log", ensureAuth, async (req, res) => {
  res.redirect('http://localhost:5173/dashboard')
})

// routes/auth.js
router.get('/profile', ensureAuth, (req, res) => {
  if (req.isAuthenticated()) {
    // Send user details if authenticated
    res.json(req.user);
  } else {
    // Send an error message if not authenticated
    res.status(401).json({ message: 'Not authenticated' });
  }
});

router.post('/addJobs', ensureAuth, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { companyName, jobRole, url, notes, jobStatus } = req.body;

      // Find the user and update their jobs array
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.jobs.push({
        companyName,
        jobRole,
        url,
        notes,
        jobStatus,
      });

      await user.save();
      res.status(201).json({ message: 'Job added successfully' });
    } catch (error) {
      console.error('Error adding job:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// routes/auth.js
router.put('/updateJob/:id', ensureAuth, async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const { id } = req.params;
      const { companyName, jobRole, url, notes, jobStatus } = req.body;

      // Find the user and update the specific job
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const job = user.jobs.id(id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      job.companyName = companyName;
      job.jobRole = jobRole;
      job.url = url;
      job.notes = notes;
      job.jobStatus = jobStatus;

      await user.save();
      res.status(200).json({ message: 'Job updated successfully', job });
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});



module.exports = router;