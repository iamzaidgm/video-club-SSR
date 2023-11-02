const express = require('express');
const Actor = require('../models/actor');

function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });

    actor.save()
            .then(object => res.status(200).json({
                message: "Nuevo actor creado y guardado",
                obj: object
            })).catch(ex => res.status(500).json({
                massage: "No se pudo crear ni guardar el actor",
                obj: ex
            }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Actor.paginate({}, options)
            .then(objects => res.status(200).json({
                message: "Lista de actores",
                obj: objects
            })).catch(ex => res.status(500).json({
                message: "No se pudo mostrar la lista de actores",
                obj: ex
            }));
}

function index(req, res, next) {
    const id = req.params.id;
  
    Actor.findOne({ "_id" : id })
           .then(object => res.status(200).json({
              message: `Información del Actor con el id ${id}`,
              obj: object
           })).catch(ex => res.status(500).json({
              message: `No se pudo mostrar la información del Actor con el id. ${id}`,
             obj: ex
           }));
}

function replace(req, res, next) {
    const id = req.params.id;

    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let actor = new Object({
        _name: name,
        _lastName: lastName
    });
    
    Actor.findOneAndUpdate({ "_id" : id }, actor, { new : true })
            .then(object => res.status(200).json({
                message: "Actor reemplazado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo reemplazar al actor correctamente",
                obj: ex
            }));
}

function update(req, res, next) {
    const id = req.params.id;
    
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Object();

    if (name) actor._name = name;
    if (lastName) actor._lastName = lastName;
  
    Actor.findOneAndUpdate({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Actor actualizado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo actualizar Actor correctamente",
                obj: ex
            }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Actor.findByIdAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Actor eliminado correctamente",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "No se pudo eliminar el actor correctamente",
                obj: ex
            }));
}

module.exports = { create, list, index, replace, update, destroy}
