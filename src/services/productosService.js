const db = require('../config/dbConfig');

const operadoresStock = {
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>=',
    EQ: '=',
};

class ProductosService {

    static getAllProductosBy(nombre, stock, stockCompare, page, size, sortBy, callback) {
        const offset = (page - 1) * size;
        const whereConditions = [];
        if (nombre) whereConditions.push(`nombre LIKE '%${nombre}%'`);
        if (stock) {
            if (stockCompare) {
                const operadorStock = operadoresStock[stockCompare.toUpperCase()] || '=';
                whereConditions.push(`stock ${operadorStock} ${stock}`);
            } else {
                whereConditions.push(`stock = ${stock}`);
            }
        }
        let whereClause = '';
        if (whereConditions.length > 0) {
            whereClause = 'WHERE ' + whereConditions.join(' AND ');
        }
        const countQuery = `SELECT COUNT(*) FROM productos ${whereClause} ORDER BY ? LIMIT ? OFFSET ?`;
        db.query(countQuery, [sortBy, size, offset], (error, totalResult) => {
            if (error) {
                return callback(error, null);
            }
            const total = totalResult[0]["COUNT(*)"];
            const pages = Math.ceil(total / size);
            const query = `SELECT * FROM productos ${whereClause} ORDER BY ? LIMIT ? OFFSET ?`;
            db.query(query, [sortBy, size, offset], (error, results) => {
                if (error) {
                    return callback(error, null);
                }
                callback(null, { total, pages, results });
            });
        });
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
