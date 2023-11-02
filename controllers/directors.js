const express = require('express');
const Director = require('../models/director');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Director({
        name: name,
        lastName: lastName
    });

    director.save()
            .then(object => res.status(200).json({
                message: "Nuevo director creado y guardado",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo crear ni guardar el director",
                obj: ex
            }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5 // Objetos por pagina
    };

    Director.paginate({}, options)
            .then(objects => res.status(200).json({
                message: "Lista de directores",
                obj: objects
            })).catch(ex => res.status(500).json({
                message: "No se pudo mostrar la lista de directores",
                obj: ex
            }));
} 

function index(req, res, next) {
    const id = req.params.id;

    Director.findOne({ "_id" : id })
            .then(object => res.status(200).json({
                message: `Datos del director con el id ${id}`,
                obj: object
            })).catch(ex => res.status(500).json({
                message: `No se pudo mostrar la información del Director con el id ${id}`,
                obj: ex
            }));
}

function replace(req, res, next) {
    const id = req.params.id;
    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";

    let director = new Object({
        _name: name,
        _lastName: lastName
    });

    Director.findOneAndUpdate({ "_id" : id }, director, { new : true })
            .then(object => res.status(200).json({
                message: "Director reemplazado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo reemplazar al director correctamente",
                obj: ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const lastName = req.body.lastName;

    let director = new Object();

    if(name) director._name = name;
    if(lastName) director._lastName = lastName;

    Director.findOneAndUpdate({ "_id" : id }, director)
            .then(object => res.status(200).json({
                message: "Director actualizado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo actualizar director correctamente",
                obj: ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Director.findByIdAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Director eliminado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo eliminar al director correctamente",
                obj: ex
            }));
}

module.exports = {create, list, index, replace, update, destroy}