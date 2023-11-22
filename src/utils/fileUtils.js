const fs = require('fs-extra');
const path = require('path');

const IMGS_FOLDER = 'public/images/';

function move(file, pathTo) {
    fs.access(file.path, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`El archivo no existe en la carpeta temporal: ${file}`);
            return false;
        }
        fs.move(file.path, path.join(IMGS_FOLDER, pathTo, file.filename), { overwrite: true }, (err) => {
            if (err) {
                console.error('Error al mover el archivo:', err);
                return false;
            }
            console.log(`Archivo movido con éxito de ${file.path} a ${pathTo}`);
            return true;
        });
    });
}

function remove(path) {
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`El archivo no existe en la carpeta temporal: ${path}`);
            return true;
        }
        fs.unlink(path, (err) => {
            if (err) {
                console.error('Error al eliminar el archivo:', err);
                return false;
            }
            console.log(`Archivo eliminado con éxito de la carpeta temporal: ${path}`);
            return true;
        });
    });
}

function get(folder, filepath, callback) {
    fs.readFile(path.join(IMGS_FOLDER, folder, filepath), (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo: ${err.message}`);
            return callback(err, null);
        }
        callback(null, data);
    });
}

module.exports = { move, remove, get };
