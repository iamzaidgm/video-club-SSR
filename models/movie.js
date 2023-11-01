const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _title: String,
    _genre: {
        type: mongoose.Schema.ObjectId,
        ref: 'Genre'
    },
    _director: {
        type: mongoose.Schema.ObjectId,
        ref: 'Director'
    },
    _cast: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }]
});

class Movie {

    constructor(title, genre, director, cast) {
        this._title = title;
        this._genre = genre;
        this._director = director;
        this._cast = cast;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get genre() {
        return this._genre;
    }

    set genre(value) {
        this._genre = value;
    }

    get director() {
        return this._director;
    }

    set director(value) {
        this._director = value;
    }

    get cast() {
        return this._cast;
    }

    set cast(value) {
        this._cast = value;
    }
}

schema.loadClass(Movie);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Movie', schema);