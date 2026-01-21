const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');  
const successStoryController = require('../controllers/successStoryController');

//posting success stories
router.post('/', upload.single('image'), successStoryController.createStory);

//getting all success stories
router.get('/', successStoryController.getStories);

// Updating a success story
router.put('/:id', upload.single('image'), successStoryController.updateStory);

// Deleting a success story
router.delete('/:id', successStoryController.deleteStory);

// router.get('/by-ngo-name/:name', getStoriesByNGOName);


module.exports = router;
