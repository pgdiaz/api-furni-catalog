const ProductosService = require('../services/productosService');

class ProductosController {

  static getAllProductos(req, res) {
    ProductosService.getAllProductos((err, data) => {
      if (err) {
        res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
        return;
      }
      res.json(data);
    });
  }

  static getProductoById(req, res) {
    const id = req.params.id;
    if (!/^[1-9]\d*$/.test(id)) {
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
    const id = req.params.id;
    if (!/^[1-9]\d*$/.test(id)) {
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
    const id = req.params.id;
    if (!/^[1-9]\d*$/.test(id)) {
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
