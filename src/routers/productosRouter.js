const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productosController');
const MutipartStorage = require('../middlewares/multipartStorage');

router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Operaciones relacionadas con los productos del catálogo.
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Búqueda paginada de productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: false
 *         description: Filtro por nombre del producto
 *         schema:
 *           type: string
 *           example: Butaca
 *       - in: query
 *         name: stock
 *         required: false
 *         description: Filtro por stock del producto
 *         schema:
 *           type: integer
 *           format: int64
 *           minimum: 0
 *           example: 20
 *       - in: query
 *         name: stockCompare
 *         required: false
 *         description: Operador de comparación para el filtro de stock
 *         schema:
 *           $ref: "#/components/schemas/Comparador"
 *       - in: query
 *         name: page
 *         required: false
 *         description: Número de pagina
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           example: 1
 *       - in: query
 *         name: size
 *         required: false
 *         description: Cantidad maxima de registros que se devolvera por página
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 200
 *           example: 5
 *       - in: query
 *         name: sortBy
 *         required: false
 *         description: Campo de ordenamiento del resultado
 *         schema:
 *           type: string
 *           default: name
 *           example: precio
 *     responses:
 *       200:
 *         description: Lista de productos paginada obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Producto"
 *       400:
 *         description: Parámetros de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get('/productos', ProductosController.getAllProductosBy);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 28
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Producto"
 *       400:
 *         description: Parámetros de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.get('/productos/:id', ProductosController.getProductoById);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Parámetros de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post('/productos', ProductosController.createProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 28
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       400:
 *         description: Datos del producto inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.put('/productos/:id', ProductosController.updateProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 28
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.delete('/productos/:id', ProductosController.deleteProducto);

/**
 * @swagger
 * /productos/{id}/imagenes:
 *   post:
 *     summary: Subir imagen asociada a un producto
 *     description: Sube una imagen asociada al producto identificado por su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto.
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida correctamente.
 *       400:
 *         description: Error en el archivo o formato no permitido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               fecha: "2023-11-20T03:59:22.328Z"
 *               error: Formato de archivo no permitido.
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               fecha: "2023-11-20T03:59:22.328Z"
 *               error: Producto no encontrado.
 *       500:
 *         description: Error en el servidor al cargar la imagen.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               fecha: "2023-11-20T03:59:22.328Z"
 *               error: Error en el servidor al cargar la imagen.
 */
router.post('/productos/:id/imagenes', MutipartStorage.handleImageUpload, ProductosController.setImageProducto);

/**
 * @swagger
 * /productos/{id}/imagenes:
 *   get:
 *     summary: Obtener una imagen asociada a un producto.
 *     description: Retorna la imagen asociada a un producto en base a su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     produces:
 *       - image/jpeg
 *       - image/png
 *       - image/gif
 *     responses:
 *       200:
 *         description: Imagen encontrada y devuelta con éxito.
 *         content:
 *           'image/jpeg':
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Producto no encontrado o imagen no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               fecha: "2023-11-20T03:59:22.328Z"
 *               error: Producto no encontrado.
 *       500:
 *         description: Error en el servidor al obtener la imagen.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *             example:
 *               fecha: "2023-11-20T03:59:22.328Z"
 *               error: Error en el servidor.
 */
router.get('/productos/:id/imagenes', ProductosController.getImageProducto);

module.exports = router;
