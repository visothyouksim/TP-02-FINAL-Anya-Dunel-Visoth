const Animal = require('../models/Animal');

// Obtenir tous les animaux
const getAllAnimals = async (req, res) => {
  try {
    const { species, breed, gender } = req.query;
    const filter = {};
    
    if (species) filter.species = species;
    if (breed) filter.breed = { $regex: breed, $options: 'i' };
    if (gender) filter.gender = gender;
    
    const animals = await Animal.find(filter)
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(animals);
  } catch (error) {
    console.error('Erreur getAllAnimals:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir un animal par ID
const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id)
      .populate('author', 'username email');

    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }

    res.json(animal);
  } catch (error) {
    console.error('Erreur getAnimalById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un animal
const createAnimal = async (req, res) => {
  try {
    const { name, species, breed, age, gender, description, price, color, vaccinated, sterilized, location } = req.body;

    if (!name || !species || !breed || age === undefined || !gender || !description || price === undefined || !color || !location) {
      return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    if (age < 0 || age > 25) {
      return res.status(400).json({ message: 'L\'âge doit être entre 0 et 25 ans' });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Le prix doit être positif' });
    }

    const animal = new Animal({
      name,
      species,
      breed,
      age,
      gender,
      description,
      price,
      color,
      vaccinated: vaccinated || false,
      sterilized: sterilized || false,
      location,
      author: req.user._id // ID automatiquement récupéré via le token JWT
    });

    await animal.save();
    await animal.populate('author', 'username');

    res.status(201).json({
      message: 'Animal ajouté avec succès',
      animal
    });
  } catch (error) {
    console.error('Erreur createAnimal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un animal
const updateAnimal = async (req, res) => {
  try {
    const { name, species, breed, age, gender, description, price, color, vaccinated, sterilized, location } = req.body;
    
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      { name, species, breed, age, gender, description, price, color, vaccinated, sterilized, location },
      { new: true, runValidators: true }
    ).populate('author', 'username');

    res.json({
      message: 'Animal mis à jour avec succès',
      animal: updatedAnimal
    });
  } catch (error) {
    console.error('Erreur updateAnimal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un animal
const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }

    await Animal.findByIdAndDelete(req.params.id);

    res.json({ message: 'Animal supprimé avec succès' });
  } catch (error) {
    console.error('Erreur deleteAnimal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
};