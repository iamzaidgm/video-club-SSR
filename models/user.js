const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _email: String,
    _password: String
});

class User {

    constructor(name, lastName, email, password) {
        this._name = name;
        this._lastName = lastName;
        this._email = email;
        this._password = password;
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

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}

schema.loadClass(User);
module.exports = mongoose.model('User', schema);