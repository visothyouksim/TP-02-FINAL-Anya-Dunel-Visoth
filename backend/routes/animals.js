const express = require('express');
const {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
} = require('../controllers/animalController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/', getAllAnimals);
router.get('/:id', getAnimalById);

// Routes protégées
router.post('/', auth, createAnimal);
router.put('/:id', auth, updateAnimal);
router.delete('/:id', auth, deleteAnimal);

module.exports = router;