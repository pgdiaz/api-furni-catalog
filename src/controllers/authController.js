const jwt = require('jsonwebtoken');

const secretKey = 'api-subscription-key';
const login = (req, res) => {
    const user = {
        username: req.body.username,
    };
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { login };
