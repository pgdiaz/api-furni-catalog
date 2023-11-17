const db = require('../config/dbConfig');

class ProductosService {

    static getAllProductos(callback) {
        db.query('SELECT * FROM productos', callback);
    }

    static getProductoById(id, callback) {
        db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
    }

    static createProducto(nombre, descripcion, precio, marca, stock, callback) {
        db.query('INSERT INTO productos (nombre, descripcion, precio, marca, stock) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, marca, stock],
            callback);
    }

    static updateProducto(id, nombre, descripcion, precio, marca, stock, callback) {
        db.query('UPDATE productos SET nombre=?, descripcion=?, precio=?, marca=?, stock=? WHERE id = ?',
            [nombre, descripcion, precio, marca, stock, id],
            callback);
    }

    static deleteProducto(id, callback) {
        db.query('DELETE FROM productos WHERE id = ?', [id], callback);
    }

}

module.exports = ProductosService;
