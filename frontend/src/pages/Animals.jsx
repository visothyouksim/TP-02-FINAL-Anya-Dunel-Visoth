import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Animals.css';

const Animals = ({ user }) => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('Tous');
  const [selectedGender, setSelectedGender] = useState('Tous');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnimals();
  }, []);

  useEffect(() => {
    filterAnimals();
  }, [animals, selectedSpecies, selectedGender]);

  const fetchAnimals = async () => {
    try {
      const response = await api.get('/animals');
      setAnimals(response.data);
    } catch (error) {
      setError('Erreur lors du chargement des animaux');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAnimals = () => {
    let filtered = animals;
    
    if (selectedSpecies !== 'Tous') {
      filtered = filtered.filter(animal => animal.species === selectedSpecies);
    }
    
    if (selectedGender !== 'Tous') {
      filtered = filtered.filter(animal => animal.gender === selectedGender);
    }
    
    setFilteredAnimals(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet animal ?')) {
      try {
        await api.delete(`/animals/${id}`);
        setAnimals(animals.filter(animal => animal._id !== id));
      } catch (error) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', error);
      }
    }
  };

  const canModifyAnimal = (animal) => {
    return user && animal.author && (
      animal.author._id === user.id || 
      animal.author === user.id
    );
  };

  if (loading) return <div className="loading">Chargement des animaux...</div>;

  return (
    <div className="animals-page">
      <div className="animals-header">
        <h1>Nos Animaux à Adopter</h1>
        {user && (
          <Link to="/create-animal" className="btn btn-primary">
            + Proposer un animal
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <h3>Filtrer les animaux :</h3>
        <div className="filter-row">
          <div className="filter-group">
            <label>Espèce :</label>
            <select 
              value={selectedSpecies} 
              onChange={(e) => setSelectedSpecies(e.target.value)}
            >
              <option value="Tous">Tous</option>
              <option value="Chien">Chiens</option>
              <option value="Chat">Chats</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sexe :</label>
            <select 
              value={selectedGender} 
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="Tous">Tous</option>
              <option value="Mâle">Mâles</option>
              <option value="Femelle">Femelles</option>
            </select>
          </div>
        </div>
      </div>

      <div className="animals-grid">
        {filteredAnimals.length === 0 ? (
          <p className="no-animals">Aucun animal trouvé avec ces critères.</p>
        ) : (
          filteredAnimals.map(animal => (
            <div key={animal._id} className="animal-card">
              <div className="animal-header">
                <h3>{animal.name}</h3>
                <div className="animal-badges">
                  <span className={`species-badge ${animal.species.toLowerCase()}`}>
                    {animal.species === 'Chien' ? '🐕' : '🐱'} {animal.species}
                  </span>
                  <span className="gender-badge">{animal.gender}</span>
                </div>
              </div>
              
              <div className="animal-info">
                <p className="breed">Race: {animal.breed}</p>
                <p className="age">Âge: {animal.age} {animal.age === 1 ? 'an' : 'ans'}</p>
                <p className="color">Couleur: {animal.color}</p>
                <p className="description">{animal.description.substring(0, 100)}...</p>
              </div>
              
              <div className="animal-details">
                <div className="price">{animal.price} €</div>
                <div className="location">📍 {animal.location}</div>
                <div className="author">Par {animal.author?.username || 'Utilisateur'}</div>
                <div className="health-info">
                  {animal.vaccinated && <span className="health-badge vaccinated">✅ Vacciné</span>}
                  {animal.sterilized && <span className="health-badge sterilized">✅ Stérilisé</span>}
                </div>
              </div>
              
              <div className="animal-actions">
                <Link to={`/animals/${animal._id}`} className="btn btn-outline">
                  Voir détails
                </Link>
                
                {canModifyAnimal(animal) && (
                  <>
                    <Link 
                      to={`/edit-animal/${animal._id}`} 
                      className="btn btn-secondary"
                    >
                      Modifier
                    </Link>
                    <button 
                      onClick={() => handleDelete(animal._id)} 
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Animals;