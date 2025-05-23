import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AnimalForm.css';

const dogBreeds = [
  'Labrador', 'Golden Retriever', 'Berger Allemand', 'Bulldog Français', 'Chihuahua',
  'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Husky Sibérien', 'Border Collie',
  'Caniche', 'Beagle', 'Shih Tzu', 'Cocker Spaniel', 'Jack Russell', 'Croisé', 'Autre'
];

const catBreeds = [
  'Européen', 'Persan', 'Maine Coon', 'Siamois', 'British Shorthair',
  'Ragdoll', 'Bengal', 'Abyssin', 'Scottish Fold', 'Sphynx',
  'Chartreux', 'Russian Blue', 'Norvégien', 'Croisé', 'Autre'
];

const CreateAnimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    description: '',
    price: '',
    color: '',
    vaccinated: false,
    sterilized: false,
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/animals', {
        ...formData,
        age: parseInt(formData.age),
        price: parseFloat(formData.price)
      });
      navigate('/animals');
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  const getBreeds = () => {
    return formData.species === 'Chien' ? dogBreeds : 
           formData.species === 'Chat' ? catBreeds : [];
  };

  return (
    <div className="animal-form-container">
      <div className="animal-form-card">
        <h2>Proposer un animal à l'adoption</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom de l'animal *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Ex: Bella, Max, Luna..."
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="species">Espèce *</label>
              <select
                id="species"
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner une espèce</option>
                <option value="Chien">🐕 Chien</option>
                <option value="Chat">🐱 Chat</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="breed">Race *</label>
              <select
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                disabled={!formData.species}
              >
                <option value="">Sélectionner une race</option>
                {getBreeds().map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="age">Âge (en années) *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min={0}
                max={25}
                placeholder="Ex: 2"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gender">Sexe *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionner le sexe</option>
                <option value="Mâle">Mâle</option>
                <option value="Femelle">Femelle</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="color">Couleur *</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
                placeholder="Ex: Noir, Blanc, Marron, Tigré..."
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              maxLength={1000}
              placeholder="Décrivez le caractère, les habitudes, l'histoire de l'animal..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Prix d'adoption (€) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min={0}
                step={1}
                placeholder="Ex: 150"
              />
              <small>Frais couvrant les soins vétérinaires</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Localisation *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Ville, département..."
              />
            </div>
          </div>

          <div className="form-group">
            <label>État de santé</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="vaccinated"
                  checked={formData.vaccinated}
                  onChange={handleChange}
                />
                <span> Vacciné(e)</span>
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="sterilized"
                  checked={formData.sterilized}
                  onChange={handleChange}
                />
                <span> Stérilisé(e)</span>
              </label>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/animals')}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Proposer l\'animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnimal;