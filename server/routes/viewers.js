import express from 'express';
import { auth, adminOnly } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', auth, adminOnly, async (req, res) => {
  const viewers = await User.find({ role: 'viewer' }).select('-password');
  res.json(viewers);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Viewer deleted' });
});

export default router;