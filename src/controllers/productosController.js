const ProductosService = require('../services/productosService');

class ProductosController {

  static getAllProductosBy(req, res) {
    // TODO: Validar minimo, limites, vacios, nulos y no definidos
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const sortBy = req.query.sortBy || 'nombre';
    const nombre = req.query.nombre;
    const stock = req.query.stock;
    const stockCompare = req.query.stockCompare;
    ProductosService.getAllProductosBy(nombre, stock, stockCompare, page, size, sortBy, (err, data) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      res.json(data);
    });
  }

  static getProductoById(req, res) {
    const id = parseInt(req.params.id);
    if (id < 1) {
      return res.status(400).json({ error: 'ID del producto no válido' });
    }
    ProductosService.getProductoById(id, (err, data) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      if (!data || data.length === 0) {
        res.status(404).json({ fecha: new Date().toISOString(), error: 'Producto no encontrado' });
        return;
      }
      res.json(data);
    });
  }

  static createProducto(req, res) {
    // TODO: Validar datos de entradas
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const stock = req.body.stock;
    ProductosService.createProducto(nombre, descripcion, precio, marca, stock, (err) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      res.status(201).json({ message: 'Producto creado con éxito' });
    });
  }

  static updateProducto(req, res) {
    const id = parseInt(req.params.id);
    if (id < 1) {
      return res.status(400).json({ error: 'ID del producto no válido' });
    }
    // TODO: Validar datos de entradas
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const stock = req.body.stock;
    ProductosService.updateProducto(id, nombre, descripcion, precio, marca, stock, (err, data) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      if (data.affectedRows === 0) {
        res.status(404).json({ fecha: new Date().toISOString(), error: 'Producto no encontrado' });
        return;
      }
      res.status(204).json({ message: 'Producto actualizado con éxito' });
    });
  }

  static deleteProducto(req, res) {
    const id = parseInt(req.params.id);
    if (id < 1) {
      return res.status(400).json({ error: 'ID del producto no válido' });
    }
    ProductosService.deleteProducto(id, (err, data) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      if (data.affectedRows === 0) {
        res.status(404).json({ fecha: new Date().toISOString(), error: 'Producto no encontrado' });
        return;
      }
      res.status(204).end();
    });
  }
}

module.exports = ProductosController;
