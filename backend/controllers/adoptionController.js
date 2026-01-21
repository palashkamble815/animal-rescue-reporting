const fs = require('fs');
const Adoption = require('../models/Adoption');

exports.createAdoption = async (req, res) => {
  try {
    const { name, description, healthStatus, age, contactNumber } = req.body; // Changed location to contactNumber
    const image = req.file ? req.file.path : null;

    const pet = new Adoption({
      name,
      description,
      healthStatus,
      age,
      contactNumber, // Changed location to contactNumber
      image,
      postedBy: req.user.id // Use req.user.id for security
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to post adoption' });
  }
};

exports.getAdoptions = async (req, res) => {
  try {
    const pets = await Adoption.find().populate('postedBy', 'name');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch adoptions' });
  }
};


exports.updateAdoptionPost = async (req, res) => {
  try {
    const adoptionId = req.params.id;
    const { name, description, healthStatus, age, contactNumber } = req.body; // Changed location to contactNumber

    const adoptionPost = await Adoption.findById(adoptionId);
    if (!adoptionPost) {
      return res.status(404).json({ error: 'Adoption post not found' });
    }

    // Check if the logged-in user (NGO) is the creator of the adoption post
    if (adoptionPost.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to update this adoption post' });
    }

    // Update fields
    if (name) adoptionPost.name = name;
    if (description) adoptionPost.description = description;
    if (healthStatus) adoptionPost.healthStatus = healthStatus;
    if (age) adoptionPost.age = age;
    if (contactNumber) adoptionPost.contactNumber = contactNumber; // Changed location to contactNumber

    // Handle image update
    if (req.file) {
      if (adoptionPost.image && fs.existsSync(adoptionPost.image)) {
        fs.unlinkSync(adoptionPost.image); // remove old image
      }
      adoptionPost.image = req.file.path;
    }

    await adoptionPost.save();
    res.json({ message: 'Adoption post updated', adoptionPost });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update adoption post' });
  }
};

exports.deleteAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({ error: 'Adoption post not found' });
    }

    // Check if the logged-in user (NGO) is the creator of the adoption post
    if (adoption.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized to delete this adoption post' });
    }

    // Delete image file if it exists
    if (adoption.image && fs.existsSync(adoption.image)) {
      fs.unlinkSync(adoption.image);
    }

    await Adoption.findByIdAndDelete(req.params.id);
    res.json({ message: 'Adoption deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to delete adoption' });
  }
};
