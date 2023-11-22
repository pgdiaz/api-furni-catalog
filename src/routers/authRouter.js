const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use(express.json());

/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: Iniciar sesión
 *       description: Endpoint para iniciar sesión y obtener un token de acceso.
 *       tags: [Autenticación]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: usuarioEjemplo
 *       responses:
 *         200:
 *           description: Inicio de sesión exitoso
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     example: 'jwt-token-aqui'
 *         401:
 *           description: Credenciales inválidas
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                     example: '2023-09-01T13:49:17.151+00:00'
 *                   error:
 *                     type: string
 *                     example: 'Credenciales inválidas'
 */
router.post('/login', authController.login);

module.exports = router;
