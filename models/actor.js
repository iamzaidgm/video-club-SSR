const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String
});

class Actor {

    constructor(name, lastName) {
        this._name = name;
        this._lastName = lastName
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

schema.loadClass(Actor);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Actor', schema);