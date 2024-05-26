const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.delete('/', async (req, res) => {
    const filePath = req.query.filePath;
  if (!filePath) {
    return res.status(400).json({ error: 'File path is missing.' });
  }
  try {
    await fs.unlink(filePath);
    res.json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Failed to delete file.' });
  }
});

router.get('/', async (req, res) => {
    req.json({"a":"ahmet"})
  });

module.exports = router;
