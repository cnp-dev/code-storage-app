import express from 'express';
import { auth, adminOnly } from '../middleware/auth.js';
import Code from '../models/Code.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const codes = await Code.find().populate('createdBy', 'username');
  res.json(codes);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { title, code, language, category } = req.body;
  const newCode = new Code({ title, code, language, category, createdBy: req.user.id });
  await newCode.save();
  res.json(newCode);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const code = await Code.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(code);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await Code.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Code deleted' });
});

export default router;