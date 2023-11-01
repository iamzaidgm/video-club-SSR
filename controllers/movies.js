const express = require('express');
const Movie = require('../models/movie');
const Director = require('../models/director');
const Genre = require('../models/genre');

function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;
    const cast = req.body.cast;

    let movie = new Movie({
        title: title,
        genre: genreId,
        director: directorId,
        cast: cast
    });

    movie.save()
         .then(object => res.status(200).json({
            message: "New movie created and saved",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Movie could not be created or saved",
            obj: ex
         }));
}

function list(req, res, next) {
    const page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5,
        populate: ["_director", "_genre", "_cast"]
    };

    Movie.paginate({}, options)
         .then(objects => res.status(200).json({
            message: "Movies list",
            obj: objects
         })).catch(ex => res.status(500).json({
            message: "Movies list could not be showed",
            obj: ex
         }));
}

function index(req, res, next) {
    const id = req.params.id;

    Movie.findOne({ "_id" : id }).populate(["_director", "_genre", "_cast"])
        .then(object => res.status(200).json({
            message: `Information of the Movie with id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Movie with id ${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const title = req.body.title ? req.body.title : "";
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;
    const cast = req.body.cast ? req.body.cast : [];

    let director;
    let genre;

    if (directorId) {
        director = Director.findOne({ "_id" : directorId });
    } else {
        director = "";
    }

    if (genreId) {
        genre = Genre.findOne({ "_id" : genreId });
    }

    let movie = new Movie({
        _title: title,
        _genre: genre,
        _director: director,
        _cast: cast
    });

    Movie.findOneAndUpdate({ "_id" : id }, movie, { new : true })
         .then(object => res.status(200).json({
            message: "Movie replaced correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not replaced Movie correctly",
            obj: ex
         }));
}

function update(req, res, next) {
    const id = req.params.id;

    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;
    const cast = req.body.cast;

    let director, genre;
    let movie = new Object();

    if (title) movie._title = title;
    
    if (genreId) {
        genre = Genre.findOne({ "_id" : genreId });

        movie._genre = genre;
    }
    
    if (directorId) {
        director = Director.findOne({ "_id" : directorId });

        movie._director = director;
    }

    if (cast) movie._cast = cast;

    Movie.findOneAndUpdate({ "_id" : id }, movie)
         .then(object => res.status(200).json({
            message: "Movie updated correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not update Movie correctly",
            obj: ex
         }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Movie.findOneAndRemove({ "_id" : id })
         .then(object => res.status(200).json({
            message: "Movie deleted correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not delete Movie correctly"
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