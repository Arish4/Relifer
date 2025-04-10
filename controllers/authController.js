const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
         const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" }); 
  }
        
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User registered successfully' });
        
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
      
        if (!user) {
          return res.status(404).json({ message: 'User not found' }); 
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: 'Incorrect password' }); 
        }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token });
    } catch (error) {                   
        res.status(500).json({ error: error.message });
    }
};