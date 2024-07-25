const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jwt');

exports.registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        user = new User({ username, password });
        await user.save();

        const payload = { id: user.id };
        jwt.sign(payload,  '73475cb40a568e8a92b3a9b39fa3f92f1b123b6f4c8a1d12e2e4e85ebede3e6f6d98a75b2e97d7b6fa72b2e3d32d45f8d60f45b5e7f602fa3bfcfbb85a5f9e5f0' , 
            { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const payload = { id: user.id };
      jwt.sign(payload, '73475cb40a568e8a92b3a9b39fa3f92f1b123b6f4c8a1d12e2e4e85ebede3e6f6d98a75b2e97d7b6fa72b2e3d32d45f8d60f45b5e7f602fa3bfcfbb85a5f9e5f0', 
        { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
