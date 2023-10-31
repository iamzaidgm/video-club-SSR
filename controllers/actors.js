const express = require('express');
const Actor = require('../models/actor');

//post
function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Actor({
        name: name,
        lastName: lastName
    });

    actor.save()
            .then(object => res.status(200).json({
                message: "New Actor created and saved",
                obj: object
            })).catch(ex => res.status(500).json({
                massage: "Actor could not be created or saved",
                obj: ex
            }));
}

//get
function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Actor.paginate({}, options)
            .then(objects => res.status(200).json({
                message: "Actors list",
                obj: objects
            })).catch(ex => res.status(500).json({
                message: "Actors list could not be showed",
                obj: ex
            }));
}

function index(req, res, next) {
    const id = req.params.id;
  
    Actor.findOne({ "_id" : id })
           .then(object => res.status(200).json({
              message: `Information of the Actor with id ${id}`,
              obj: object
           })).catch(ex => res.status(500).json({
              message: `Could not show the information of the Actor with id ${id}`,
             obj: ex
           }));
}

//put
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
                message: "Actor replaced correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not replace Actor correctly",
                obj: ex
            }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;
    
    const name = req.body.name;
    const lastName = req.body.lastName;

    let actor = new Object();

    if (name) actor._name = name;
    if (lastName) actor._lastName = lastName;
  
    Actor.findOneAndUpdate({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Actor updated correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not update Actor correctly",
                obj: ex
            }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Actor.findByIdAndRemove({ "_id" : id })
            .then(object => res.status(200).json({
                message: "Actor deleted correctly",
                obj: object
            })).catch(ex => res.status(500).json({
                message: "Could not delete Actor correctly",
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
