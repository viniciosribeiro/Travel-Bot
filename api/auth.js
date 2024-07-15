const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { connectToDatabase } = require('../utils/database');

module.exports = async (req, res) => {
  await connectToDatabase();
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY);
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } else if (req.method === 'PUT') {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).send('User registered');
  } else {
    res.status(405).send('Method not allowed');
  }
};
