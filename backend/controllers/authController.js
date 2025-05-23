const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Inscription
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifications
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Cet email est déjà utilisé' : 'Ce nom d\'utilisateur est déjà pris'
      });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Générer le token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir l'utilisateur actuel
const getMe = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
    });
  } catch (error) {
    console.error('Erreur getMe:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { register, login, getMe };