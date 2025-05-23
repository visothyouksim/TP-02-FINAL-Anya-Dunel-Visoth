import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AnimalDetail.css';

const AnimalDetail = ({ user }) => {
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimal();
  }, [id]);

  const fetchAnimal = async () => {
    try {
      const response = await api.get(`/animals/${id}`);
      setAnimal(response.data);
    } catch (error) {
      setError('Erreur lors du chargement de l\'animal');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const canModifyAnimal = (animal) => {
    return user && animal.author && (
      animal.author._id === user.id || 
      animal.author === user.id
    );
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      try {
        await api.delete(`/animals/${id}`);
        navigate('/animals');
      } catch (error) {
        setError('Erreur lors de la suppression');
        console.error('Erreur:', error);
      }
    }
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!animal) return <div className="error-message">Animal non trouvé</div>;

  return (
    <div className="animal-detail">
      <div className="detail-header">
        <Link to="/animals" className="back-link">
          ← Retour aux animaux
        </Link>
      </div>

      <div className="detail-card">
        <div className="detail-header-info">
          <h1>{animal.name}</h1>
          <div className="animal-badges">
            <span className={`species-badge ${animal.species.toLowerCase()}`}>
              {animal.species === 'Chien' ? '🐕' : '🐱'} {animal.species}
            </span>
            <span className="gender-badge">{animal.gender}</span>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <div className="price-section">
              <div className="price">{animal.price} €</div>
              <small>Frais d'adoption</small>
            </div>

            <div className="animal-info-section">
              <h3>Informations sur {animal.name}</h3>
              <div className="info-grid">
                <div className="info-item">
                  <strong>🐾 Race :</strong> {animal.breed}
                </div>
                <div className="info-item">
                  <strong>🎂 Âge :</strong> {animal.age} {animal.age === 1 ? 'an' : 'ans'}
                </div>
                <div className="info-item">
                  <strong>🎨 Couleur :</strong> {animal.color}
                </div>
                <div className="info-item">
                  <strong>📍 Localisation :</strong> {animal.location}
                </div>
              </div>
            </div>

            <div className="health-section">
              <h3>État de santé</h3>
              <div className="health-badges">
                <span className={`health-badge ${animal.vaccinated ? 'yes' : 'no'}`}>
                  {animal.vaccinated ? '✅' : '❌'} Vacciné(e)
                </span>
                <span className={`health-badge ${animal.sterilized ? 'yes' : 'no'}`}>
                  {animal.sterilized ? '✅' : '❌'} Stérilisé(e)
                </span>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p className="description">{animal.description}</p>
            </div>

            <div className="publication-info">
              <p><strong>📅 Publié le :</strong> {new Date(animal.createdAt).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="owner-card">
              <h3>Propriétaire</h3>
              <div className="owner-info">
                <div className="owner-name">
                  👤 {animal.author?.username || 'Utilisateur'}
                </div>
                <div className="contact-info">
                  📧 {animal.author?.email || 'Email non disponible'}
                </div>
              </div>
            </div>

            <div className="actions-card">
              <h3>Actions</h3>
              
              {canModifyAnimal(animal) ? (
                <div className="owner-actions">
                  <Link 
                    to={`/edit-animal/${animal._id}`} 
                    className="btn btn-primary"
                  >
                    ✏️ Modifier l'annonce
                  </Link>
                  
                  <button 
                    onClick={handleDelete}
                    className="btn btn-danger"
                  >
                    🗑️ Supprimer l'annonce
                  </button>
                  
                  <p className="owner-message">
                    ✅ Vous êtes le propriétaire de cette annonce
                  </p>
                </div>
              ) : (
                <div className="visitor-actions">
                  {user ? (
                    <>
                      <button className="btn btn-primary">
                        💕 Je veux adopter {animal.name}
                      </button>
                      <button className="btn btn-outline">
                        💬 Contacter le propriétaire
                      </button>
                      <p className="visitor-message">
                        ℹ️ Seul le propriétaire peut modifier cette annonce
                      </p>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="btn btn-primary">
                        🔐 Se connecter pour adopter
                      </Link>
                      <p className="login-message">
                        Connectez-vous pour adopter {animal.name}
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;