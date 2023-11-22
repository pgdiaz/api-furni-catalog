const jwt = require('jsonwebtoken');
const config = require('../config/appConfig.json');

const login = (req, res) => {
    const user = {
        username: req.body.username,
    };
    const token = jwt.sign(user, config.jwt.secretKey, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { login };
