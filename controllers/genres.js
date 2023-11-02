const express = require('express');
const Genre = require('../models/genre');

function create(req, res, next) {
    const description = req.body.description;
    const status = req.body.status;

    let genre = new Genre({
        description: description,
        status: status
    });

    genre.save()
         .then(object => res.status(200).json({
            message: "Nuevo género creado y guardado",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "No se pudo crear ni guardar el género.",
            obj: ex
         }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Genre.paginate({}, options)
         .then(objects => res.status(200).json({
            message: "Lista de géneros",
            obj: objects
         })).catch(ex => res.status(500).json({
            message: "No se pudo mostrar la lista de géneros",
            obj: ex
         }));
}

function index(req, res, next) {
    const id = req.params.id;

    Genre.findOne({ "_id" : id })
         .then(object => res.status(200).json({
            message: `Información del género con el id ${id}`,
            obj: object
         })).catch(ex => res.status(500).json({
            message: `No se pudo mostrar la información del género con el id. ${id}`,
            obj: ex
         }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const description = req.body.description ? req.body.description : "";

    let genre = new Object({
        _description: description
    });

    Genre.findOneAndUpdate({ "_id" : id }, genre, { new : true })
         .then(object => res.status(200).json({
            message: "Género reemplazar correctamente",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar el género correctamente",
            obj: ex
         }));
}

function update(req, res, next) {
    const id = req.params.id;

    const description = req.body.description;

    let genre = new Object();

    if (description) genre._description = description;

    Genre.findOneAndUpdate({ "_id" : id }, genre)
         .then(object => res.status(200).json({
            message: "Género actualizado correctamente",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "No se pudo actualizar el género correctamente",
            obj: ex
         }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Genre.findOneAndRemove({ "_id" : id })
         .then(object => res.status(200).json({
            message: "Género eliminado correctamente",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "No se pudo eliminar el género correctamente",
            obj: ex
         }));
}

module.exports = {create, list, index, replace, update, destroy}