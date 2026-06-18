import express from 'express';
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working' });
});

// Login route (temporary)
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint', user: { name: 'Test User' } });
});

export default router;