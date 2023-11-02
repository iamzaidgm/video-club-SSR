const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next) {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    let salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: passwordHash,
        salt: salt
    });

    user.save()
        .then(object => res.status(200).json({
            message: "Nuevo usuario creado y guardado",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo crear ni guardar el usuario",
            obj: ex
        }));
}


function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    User.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Lista de usuarios",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "No se pudo mostrar la lista de usuarios",
            obj: ex
        }));
}

//get
function index(req, res, next) {
    const id = req.params.id;

    User.findOneAndUpdate({ "_id" : id })
        .then(object => res.status(200).json({
            message: `Información del usuario con el id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `No se pudo mostrar la información del usuario con el id ${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const name = req.body.name ? req.body.name : "";
    const lastName = req.body.lastName ? req.body.lastName : "";
    const email = req.body.email ? req.body.email : "";
    const password = req.body.password ? req.body.password : "";

    let user = new Object({
        _name: name,
        _lastName: lastName,
        _email: email,
        _password: password
    });

    User.findOneAndUpdate({ "_id" : id }, user, { new : true })
        .then(object => res.status(200).json({
            message: "Usuario reemplazado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar el usuario correctamente",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;

    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    let user = new Object();

    if (name) user._name = name;
    if (lastName) user._lastName = lastName;
    if (email) user._email = email;
    if (password) user._password = password;

    User.findOneAndUpdate({ "_id" : id}, user)
        .then(object => res.status(200).json({
            message: "Usuario actualizado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo actualizar el usuario correctamente",
            obj: ex
        }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    User.findOneAndRemove({ "_id" : id })
        .then(object => res.status(200).json({
            message: "Usuario eliminado correctamente",
            obj: object
        })).catch(ex => res.status(500).json({
            message: "No se pudo eliminar el usuario correctamente",
            obj: ex
        }));
}

module.exports = {create, list, index, replace, update, destroy}