const express = require('express');
const Copy = require('../models/copy');
const Movie = require('../models/movie');

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
            message: "Nueva copia creada y guardada",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo crear ni guardar la copia",
            obj: ex
        }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : "";

    const options = {
        page: page,
        limit: 5
    }

    Copy.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Lista de copias",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "No se pudieron mostrar las copias.",
            obj: ex
        }));
}

function index(req, res, next) {
    const id = req.params.id;

    Copy.findOne({ "_id" : id })
        .then(object => res.status(200).json({
            message: `Información de la copia con el id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `No se pudo mostrar la información de la copia con el id.${id}`,
            obj: ex
        }));
}

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
            message: "Copia reemplazada correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar la copia correctamente",
            obj: ex
        }));
}

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
            message: "Copia actualizada correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo actualizar la copia correctamente",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Copy.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Copia eliminada correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo eliminar la copia correctamente",
            obj: ex
        }));
}

module.exports = {create, list, index, replace, update, destroy}