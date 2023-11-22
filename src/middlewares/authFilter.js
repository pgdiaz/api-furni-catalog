const jwt = require('jsonwebtoken');

const secretKey = 'api-subscription-key';
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ fecha: new Date().toISOString(), mensaje: 'Token de autenticación no proporcionado' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ fecha: new Date().toISOString(), mensaje: 'Token de autenticación inválido' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { requireAuth };
