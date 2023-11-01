const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _description: String
});

class Genre {

    constructor(description) {
        this._description = description;
    }

    get descripiton() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }
}

schema.loadClass(Genre);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Genre', schema);