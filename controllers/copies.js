const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

//post
function create(req, res, next) {
    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie = Movie.findOne({ "_id" : movieId});

    let copy = new Copy({
        number: number,
        format: format,
        movie: movie,
        status: status
    });

    copy.save()
        .then(object => res.status(200).json({
            message: "New Copy created and saved",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Copy could not be created or saved",
            obj: ex
        }));
}

//get
function list(req, res, next) {
    let page = req.params.page ? req.params.page : "";

    const options = {
        page: page,
        limit: 5
    }

    Copy.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Copies list",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "Copies could not be showed",
            obj: ex
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Copy.findOne({ "_id" : id })
        .then(object => res.status(200).json({
            message: `Information of the Copy with id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Copy with id ${id}`,
            obj: ex
        }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const number = req.body.number ? req.body.number : "";
    const format = req.body.format ? req.body.format : "";
    const movieId = req.body.movieId
    const status = req.body.status ? req.body.status : "";

    let movie;

    if (movieId) {
        movie = Movie.findOne({ "_id" : movieId });
    } else {
        movie = "";
    }

    let copy = new Object({
        _number: number,
        _format: format,
        _movie: movie,
        status: status
    });

    Copy.findOneAndUpdate({ "_id" : id }, copy, { new : true })
        .then(object => res.status(200).json({
            message: "Copy replaced correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not replace Copy correctly",
            obj: ex
        }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const number = req.body.number;
    const format = req.body.format;
    const movieId = req.body.movieId;
    const status = req.body.status;

    let movie;
    let copy = new Object();

    if (number) copy._number = number;
    if (format) copy._format = format;
    if (movieId) {
        movie = Movie.findOne({ "_id" : movieId });

        copy._movie = movie;
    }
    if (status) copy._status = status;

    Copy.findOneAndUpdate({ "_id" : id }, copy)
        .then(object => res.status(200).json({
            message: "Copy updated correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not update Copy correctly",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Copy.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Copy deleted correctly",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "Could not delete Copy correctly",
            obj: ex
        }));
}

module.exports = {
    create,
    list,
    index,
    replace,
    update,
    destroy
}