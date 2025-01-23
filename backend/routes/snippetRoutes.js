const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');

// Create a new snippet
router.post('/', async (req, res) => {
  const { title , description , code , tags  } = req.body;
  console.log('Received snippet:', { title , description , code ,tags}); // Log the data to verify
  try {
    const newSnippet = new Snippet({
      title,
      description,
      code,
      tags,
    });
    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch (error) {
    res.status(500).json({ message: 'Error creating snippet', error });
  }
});

// Get all snippets
router.get('/', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching snippets', error });
  }
});

// Delete a snippet
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Snippet.findByIdAndDelete(id);
    res.status(200).json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting snippet', error });
  }
});

module.exports = router;
