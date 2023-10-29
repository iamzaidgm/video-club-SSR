const mongoose = require('mongoose');

// Schema es la estructura de la coleccion en la base de datos
// Se pone guion base en el nombre de las propiedades para escodnerlas y ademas que encaje con la clase
const schema = mongoose.Schema({
    _name: String,
    _lastName: String
});

class Director {
    constructor(name, lastName) {
        this._name = name;
        this._lastName = lastName;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }
}

schema.loadClass(Director);
module.exports = mongoose.model('Director', schema);