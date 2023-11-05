const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _startDate: Date,
    _endDate: Date,
    _member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member'
    },
    _copy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Copy'
    },
    _status: Boolean
});

class Booking {

    constructor(startDate, endDate, member, copy, status) {
        this._startDate = startDate;
        this._endDate = endDate;
        this._member = member;
        this._copy = copy;
        this._status = status;
    }

    get startDate() {
        return this._startDate;
    }

    set startDate(value) {
        this._startDate = value;
    }

    get endDate() {
        return this._endDate;
    }

    set endDate(value) {
        this._endDate = value;
    }

    get member() {
        return this._member;
    }

    set member(value) {
        this._member = value;
    }

    get copy() {
        return this._copy;
    }

    set copy(value) {
        this._copy = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}

schema.loadClass(Booking);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Booking', schema);
