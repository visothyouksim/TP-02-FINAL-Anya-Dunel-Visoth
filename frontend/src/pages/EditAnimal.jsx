import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditAnimal = () => {
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
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    try {
      const response = await api.get(`/animals/${id}`);
      const animal = response.data;
      setFormData({
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        age: animal.age.toString(),
        gender: animal.gender,
        description: animal.description,
        price: animal.price.toString(),
        color: animal.color,
        vaccinated: animal.vaccinated,
        sterilized: animal.sterilized,
        location: animal.location
      });
    } catch (error) {
      setError('Erreur lors du chargement de l\'animal');
      console.error('Erreur:', error);
    } finally {
      setFetchLoading(false);
    }
  };

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
      await api.put(`/animals/${id}`, {
        ...formData,
        age: parseInt(formData.age),
        price: parseFloat(formData.price)
      });
      navigate('/animals');
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la modification');
    } finally {
      setLoading(false);
    }
  };

  const getBreeds = () => {
    return formData.species === 'Chien' ? dogBreeds : 
           formData.species === 'Chat' ? catBreeds : [];
  };

  if (fetchLoading) return <div className="loading">Chargement...</div>;

  return (
    <div className="animal-form-container">
      <div className="animal-form-card">
        <h2>Modifier l'annonce de {formData.name}</h2>
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
              />
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
                <span>✅ Vacciné(e)</span>
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="sterilized"
                  checked={formData.sterilized}
                  onChange={handleChange}
                />
                <span>✅ Stérilisé(e)</span>
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
              {loading ? 'Modification...' : 'Modifier l\'animal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnimal;