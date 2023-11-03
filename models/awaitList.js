const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member'
    },
    _movie: {
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    },
    _format: {
        type: String,
        enum: ['VHS', 'DVD', 'BLU_RAY']
    },
    _date: Date
});

class AwaitList {

    constructor(member, movie, format, date) {
        this._member = member,
        this._movie = movie,
        this._format = format,
        this._date = date
    };

    get member() {
        return this._member;
    }

    set member(value) {
        this._member = value;
    }

    get movie() {
        return this._movie;
    }

    set movie(value) {
        this._movie = value;
    }

    get format() {
        return this._format;
    }

    set format(value) {
        this._format = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }
}

schema.loadClass(AwaitList);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('AwaitList', schema);
