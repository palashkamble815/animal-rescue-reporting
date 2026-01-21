const SuccessStory = require('../models/SuccessStory');
const fs = require('fs');
const path = require('path');
const NGO = require('../models/NGO');

exports.createStory = async (req, res) => {
  try {
    const { title, description, ngoId } = req.body;
    const image = req.file ? req.file.path : null;

    const story = new SuccessStory({
      title,
      description,
      image,
      createdBy: ngoId
    });

    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ error: 'Failed to post success story' });
  }
};

exports.getStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find().populate('createdBy', 'name');
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const storyId = req.params.id;

    const story = await SuccessStory.findById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Success story not found' });
    }

    // Check if the logged-in user (NGO) is the creator of the story
    if (story.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to update this story' });
    }

    // Update fields
    if (title) story.title = title;
    if (description) story.description = description;

    // If new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image file if it exists
      if (story.image && fs.existsSync(story.image)) {
        fs.unlinkSync(story.image);
      }
      story.image = req.file.path;
    }

    await story.save();
    res.json({ message: 'Story updated', story });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update success story' });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ error: 'Success story not found' });
    }

    // Check if the logged-in user (NGO) is the creator of the story
    if (story.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to delete this story' });
    }

    // Delete image file if it exists
    if (story.image && fs.existsSync(story.image)) {
      fs.unlinkSync(story.image);
    }

    await SuccessStory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete story' });
  }
};
