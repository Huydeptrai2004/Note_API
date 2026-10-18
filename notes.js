const express = require('express');
const router = express.Router();
const Note = require('../Models/Note');

// GET /api/notes — danh sách, mới nhất lên đầu
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/notes — tạo ghi chú từ req.body
router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      isPinned: req.body.isPinned,
    });
    const saved = await note.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;