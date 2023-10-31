const express = require('express');
const Genre = require('../models/genre');

//post
function create(req, res, next) {
    const description = req.body.description;

    let genre = new genre({
        description: description
    });

    genre.save()
         .then(object => res.status(200).json({
            message: "New Genre created and saved",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Genre could not be created or saved",
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

    Genre.paginate({}, options)
         .then(objects => res.status(200).json({
            message: "Genres list",
            obj: objects
         })).catch(ex => res.status(500).json({
            message: "Genres list could not be showed",
            obj: ex
         }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    Genre.findOne({ "_id" : id })
         .then(object => res.status(200).json({
            message: `Information of the Genre with id ${id}`,
            obj: object
         })).catch(ex => res.status(500).json({
            message: `Could not show the information of the Genre with id ${id}`,
            obj: ex
         }));
}

//put
function replace(req, res, next) {
    const id = req.params.id;

    const description = req.body.description ? req.body.description : "";

    let genre = new Object({
        _description: description
    });

    Genre.findOneAndUpdate({ "_id" : id }, genre, { new : true })
         .then(object => res.status(200).json({
            message: "Genre replace correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not replace Genre correctly",
            obj: ex
         }));
}

//patch
function update(req, res, next) {
    const id = req.params.id;

    const description = req.body.description;

    let genre = new Object();

    if (description) genre._description = description;

    Genre.findOneAndUpdate({ "_id" : id }, genre)
         .then(object => res.status(200).json({
            message: "Genre updated correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not update Genre correctly",
            obj: ex
         }));
}

//delete
function destroy(req, res, next) {
    const id = req.params.id;

    Genre.findOneAndRemove({ "_id" : id })
         .then(object => res.status(200).json({
            message: "Genre deleted correctly",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "Could not delete Genre correctly",
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