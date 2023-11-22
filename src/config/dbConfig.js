const mysql = require('mysql2');
const config = require('./appConfig.json');

const db = mysql.createConnection(config.database);

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos MySQL establecida');
});

db.query('CREATE DATABASE IF NOT EXISTS furni');
db.query('CREATE TABLE IF NOT EXISTS productos (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255) NOT NULL, descripcion TEXT NOT NULL, precio DOUBLE NOT NULL, marca VARCHAR(50) NOT NULL, stock INT DEFAULT 0, imagen VARCHAR(255))');

module.exports = db;
