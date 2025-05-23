import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Adoptions Chiens & Chats</h1>
        <p>Trouvez votre compagnon idéal près de chez vous</p>
        <div className="hero-buttons">
          <Link to="/animals" className="btn btn-primary">
            Voir nos animaux
          </Link>
        </div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>🐕 Chiens adorables</h3>
          <p>Découvrez des chiens de toutes races qui cherchent une famille aimante</p>
        </div>
        <div className="feature">
          <h3>🐱 Chats câlins</h3>
          <p>Trouvez le chat parfait qui s'adaptera à votre mode de vie</p>
        </div>
        <div className="feature">
          <h3>💕 Adoption responsable</h3>
          <p>Tous nos animaux sont vaccinés et vérifiés par des professionnels</p>
        </div>
      </div>
    </div>
  );
};

export default Home;